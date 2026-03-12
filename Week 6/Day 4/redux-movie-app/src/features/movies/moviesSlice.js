import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://jsonfakery.com/movies/paginated";
const MAX_RETRIES = 4;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRetryAfter(headers) {
  const retryAfter = headers.get("retry-after");
  if (!retryAfter) {
    return null;
  }

  const seconds = Number(retryAfter);
  if (!Number.isNaN(seconds)) {
    return Math.max(0, seconds * 1000);
  }

  const dateMs = new Date(retryAfter).getTime();
  if (!Number.isNaN(dateMs)) {
    return Math.max(0, dateMs - Date.now());
  }

  return null;
}

async function fetchPageWithRetry(page) {
  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    const response = await fetch(`${API_URL}?page=${page}`);

    if (response.ok) {
      return response.json();
    }

    const status = response.status;
    const canRetry = status === 429 || status >= 500;
    if (!canRetry || attempt === MAX_RETRIES) {
      throw new Error(`Failed to fetch movies: ${status}`);
    }

    const retryAfterMs = parseRetryAfter(response.headers);
    const backoffMs = retryAfterMs ?? Math.min(6000, 600 * 2 ** attempt);
    await sleep(backoffMs);
    attempt += 1;
  }

  throw new Error("Failed to fetch movies after retries");
}

function dedupeMovies(items) {
  return Array.from(new Map(items.map((movie) => [movie.id || movie.movie_id, movie])).values());
}

export const fetchInitialMovies = createAsyncThunk(
  "movies/fetchInitialMovies",
  async (_, thunkAPI) => {
    try {
      const firstPage = await fetchPageWithRetry(1);
      return {
        items: Array.isArray(firstPage?.data) ? firstPage.data : [],
        currentPage: Number(firstPage?.current_page) || 1,
        lastPage: Number(firstPage?.last_page) || 1,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to load movies");
    }
  },
  {
    condition: (_, { getState }) => {
      const { status, currentPage } = getState().movies;
      if (status === "loading") {
        return false;
      }
      if (currentPage > 0) {
        return false;
      }
      return true;
    },
  },
);

export const fetchNextMovies = createAsyncThunk(
  "movies/fetchNextMovies",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState().movies;
      const nextPage = state.currentPage + 1;

      if (state.lastPage && nextPage > state.lastPage) {
        return {
          items: [],
          currentPage: state.currentPage,
          lastPage: state.lastPage,
        };
      }

      const pagePayload = await fetchPageWithRetry(nextPage);
      return {
        items: Array.isArray(pagePayload?.data) ? pagePayload.data : [],
        currentPage: Number(pagePayload?.current_page) || nextPage,
        lastPage: Number(pagePayload?.last_page) || state.lastPage || nextPage,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to load next page");
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().movies;
      if (state.status !== "succeeded") {
        return false;
      }
      if (state.isFetchingNext) {
        return false;
      }
      if (state.lastPage && state.currentPage >= state.lastPage) {
        return false;
      }
      return true;
    },
  },
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  searchTerm: "",
  theme: "dark",
  currentPage: 0,
  lastPage: 1,
  isFetchingNext: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    resetMoviesState(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
      state.searchTerm = "";
      state.currentPage = 0;
      state.lastPage = 1;
      state.isFetchingNext = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchInitialMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = dedupeMovies(action.payload.items);
        state.currentPage = action.payload.currentPage;
        state.lastPage = action.payload.lastPage;
      })
      .addCase(fetchInitialMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message || "Request failed";
      })
      .addCase(fetchNextMovies.pending, (state) => {
        state.isFetchingNext = true;
        state.error = null;
      })
      .addCase(fetchNextMovies.fulfilled, (state, action) => {
        state.isFetchingNext = false;
        state.currentPage = action.payload.currentPage;
        state.lastPage = action.payload.lastPage;
        state.items = dedupeMovies([...state.items, ...action.payload.items]);
      })
      .addCase(fetchNextMovies.rejected, (state, action) => {
        state.isFetchingNext = false;
        state.error = action.payload || action.error.message || "Request failed";
      });
  },
});

export const { setSearchTerm, toggleTheme, resetMoviesState } = moviesSlice.actions;

export default moviesSlice.reducer;