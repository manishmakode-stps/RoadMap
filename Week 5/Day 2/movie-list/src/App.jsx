import { useState } from 'react'
import './App.css'
import Header from './Components/Header';
import MovieList from './Components/MovieList';
import { MovieProvider } from './context/MovieProvider';
import ErrorBoundary from './Components/ErrorBoundary';
function App() {
  return (
    <>
      <Header />
      <MovieProvider>
        <ErrorBoundary falback={ "Opps!! the movie list failed to load"}>
        <MovieList />
        </ErrorBoundary>
      </MovieProvider>
    </>
  )
}

export default App
