import { Suspense, lazy, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInitialMovies,
  fetchNextMovies,
  setSearchTerm,
  toggleTheme,
} from "../features/movies/moviesSlice";
import { useMoviesBootstrap } from "../hooks/useMoviesBootstrap";
import StatusState from "../components/StatusState";

const SearchBar = lazy(() => import("../components/SearchBar"));
const MovieGrid = lazy(() => import("../components/MovieGrid"));

export default function MoviePage() {
  useMoviesBootstrap();

  const dispatch = useDispatch();
  const { items, status, error, searchTerm, theme, currentPage, lastPage, isFetchingNext } = useSelector(
    (state) => state.movies,
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const filteredMovies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return items;
    }

    return items.filter((movie) => movie.original_title?.toLowerCase().includes(term));
  }, [items, searchTerm]);

  const handleSearch = useCallback(
    (event) => {
      dispatch(setSearchTerm(event.target.value));
    },
    [dispatch],
  );

  const handleRetry = useCallback(() => {
    dispatch(fetchInitialMovies());
  }, [dispatch]);

  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const handleNearEnd = useCallback(() => {
    dispatch(fetchNextMovies());
  }, [dispatch]);

  return (
    <main className="page">
      <Suspense fallback={<div className="subtle-loading">Preparing interface...</div>}>
        <SearchBar
          value={searchTerm}
          onChange={handleSearch}
          totalCount={items.length}
          visibleCount={filteredMovies.length}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      </Suspense>

      {status === "loading" && <StatusState type="loading" />}
      {status === "failed" && items.length === 0 && (
        <StatusState type="error" message={error} onRetry={handleRetry} />
      )}

      {status === "succeeded" && filteredMovies.length === 0 && (
        <StatusState type="empty" message="No movie matches your search." />
      )}

      {status === "succeeded" && filteredMovies.length > 0 && (
        <Suspense fallback={<div className="subtle-loading">Rendering movies...</div>}>
          <MovieGrid movies={filteredMovies} onNearEnd={handleNearEnd} />
        </Suspense>
      )}

      {status === "succeeded" && (
        <p className="subtle-loading">
          Loaded page {currentPage} of {lastPage}
          {isFetchingNext ? " • Loading more..." : ""}
        </p>
      )}
    </main>
  );
}