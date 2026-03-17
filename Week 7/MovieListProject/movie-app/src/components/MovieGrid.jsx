import MovieCard from './MovieCard.jsx';

const MovieGrid = ({ movies }) => (
  <section className="movie-grid">
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </section>
);

export default MovieGrid;
