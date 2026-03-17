const SearchBar = ({ value, onChange }) => (
  <label className="search-bar" htmlFor="movie-search">
    <span className="search-label">Search</span>
    <input
      id="movie-search"
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search by title, language or cast"
    />
  </label>
);

export default SearchBar;
