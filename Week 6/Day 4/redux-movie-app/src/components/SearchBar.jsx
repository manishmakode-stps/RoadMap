import { memo } from "react";

function SearchBar({ value, onChange, totalCount, visibleCount, theme, onToggleTheme }) {
  return (
    <header className="toolbar">
      <h1>Movie Explorer</h1>
      <div className="toolbar-actions">
        <div className="search-group">
          <input
            type="search"
            placeholder="Search by title..."
            value={value}
            onChange={onChange}
            aria-label="Search movies by title"
          />
          <p>
            Showing <strong>{visibleCount}</strong> of <strong>{totalCount}</strong>
          </p>
        </div>
        <button type="button" className="theme-toggle" onClick={onToggleTheme}>
          {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>
    </header>
  );
}

export default memo(SearchBar);