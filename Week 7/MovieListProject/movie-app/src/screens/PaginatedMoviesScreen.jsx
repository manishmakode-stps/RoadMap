import { useState } from 'react';
import MovieGrid from '../components/MovieGrid.jsx';
import PaginationControls from '../components/PaginationControls.jsx';
import StatusPanel from '../components/StatusPanel.jsx';
import { useMoviePageQuery } from '../hooks/useMoviePageQuery.js';
import { filterMovies } from '../utils/movieHelpers.js';

const PaginatedMoviesScreen = ({ searchTerm }) => {
  const [page, setPage] = useState(1);
  const { data, error, isPending, isFetching } = useMoviePageQuery(page);
  const visibleMovies = filterMovies(data?.movies ?? [], searchTerm);

  if (isPending) {
    return (
      <StatusPanel>
        <div className="loader" />
        <p>Loading movies...</p>
      </StatusPanel>
    );
  }

  if (error) {
    return (
      <StatusPanel tone="error">
        <p>{error.message}</p>
      </StatusPanel>
    );
  }

  return (
    <>
      <section className="info-bar">
        <p>Page: {data?.currentPage ?? page}</p>
        <p>Movies: {visibleMovies.length}</p>
        <p>{data ? `Showing ${data.from}-${data.to} of ${data.total}` : 'Loading...'}</p>
      </section>

      {visibleMovies.length === 0 ? (
        <StatusPanel tone="empty">
          <p>No movies on this page matched "{searchTerm || 'your search'}".</p>
        </StatusPanel>
      ) : (
        <MovieGrid movies={visibleMovies} />
      )}

      <PaginationControls
        currentPage={data?.currentPage ?? page}
        lastPage={data?.lastPage ?? '...'}
        canGoBack={Boolean(data?.hasPreviousPage) && !isFetching}
        canGoForward={Boolean(data?.hasNextPage) && !isFetching}
        onPrevious={() => setPage((current) => current - 1)}
        onNext={() => setPage((current) => current + 1)}
        isFetching={isFetching}
      />
    </>
  );
};

export default PaginatedMoviesScreen;
