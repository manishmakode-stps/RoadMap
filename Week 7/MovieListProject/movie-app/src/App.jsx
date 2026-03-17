import { useDeferredValue, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import PaginatedMoviesScreen from './screens/PaginatedMoviesScreen.jsx';
import './App.css';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const deferredSearch = useDeferredValue(searchValue);

  return (
    <main className="app">
      <h1>Movie List App</h1>
      <p className="subtitle">Search movies and browse page by page.</p>
      <SearchBar value={searchValue} onChange={setSearchValue} />
      <PaginatedMoviesScreen searchTerm={deferredSearch} />
    </main>
  );
}

export default App;
