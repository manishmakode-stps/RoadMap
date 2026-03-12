export default function StatusState({ type = "loading", message, onRetry }) {
  if (type === "error") {
    return (
      <div className="status-card error">
        <h2>Failed to load movies</h2>
        <p>{message || "Something went wrong."}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  }

  if (type === "empty") {
    return (
      <div className="status-card">
        <h2>No results</h2>
        <p>{message || "Try another movie title."}</p>
      </div>
    );
  }

  return (
    <div className="status-card">
      <h2>Loading movies...</h2>
      <p>Please wait while we fetch data.</p>
    </div>
  );
}