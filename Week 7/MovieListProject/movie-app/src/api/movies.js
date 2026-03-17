const API_URL = 'https://jsonfakery.com/movies/paginated';

export const movieQueryOptions = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
};

// Normalize the API response once so every screen can consume the same shape.
export const fetchMoviePage = async ({ pageParam = 1, signal }) => {
  const response = await fetch(`${API_URL}?page=${pageParam}`, { signal });

  if (!response.ok) {
    throw new Error('Unable to fetch movies right now.');
  }

  const payload = await response.json();

  return {
    movies: payload.data ?? [],
    currentPage: payload.current_page,
    lastPage: payload.last_page,
    total: payload.total,
    from: payload.from,
    to: payload.to,
    hasNextPage: Boolean(payload.next_page_url),
    hasPreviousPage: Boolean(payload.prev_page_url),
  };
};
