const PaginationControls = ({ currentPage, lastPage, canGoBack, canGoForward, onPrevious, onNext, isFetching }) => (
  <section className="pagination-panel">
    <button type="button" onClick={onPrevious} disabled={!canGoBack}>
      Previous
    </button>
    <div className="page-indicator">
      <p>
        Page {currentPage} of {lastPage}
      </p>
      <span>{isFetching ? 'Updating page...' : 'Cached data stays visible while loading.'}</span>
    </div>
    <button type="button" onClick={onNext} disabled={!canGoForward}>
      Next
    </button>
  </section>
);

export default PaginationControls;
