import { formatDate } from '../utils/movieHelpers.js';

const MovieCard = ({ movie }) => (
  <article className="movie-card">
    <img src={movie.poster_path} alt={`${movie.original_title} poster`} />
    <div className="movie-content">
      <div className="movie-topline">
        <span>{movie.original_language?.toUpperCase() || 'N/A'}</span>
        <span>{formatDate(movie.release_date)}</span>
      </div>
      <h2>{movie.original_title}</h2>
      <div className="movie-footer">
        <span>Rating {movie.vote_average ?? 'N/A'}</span>
        <span>Votes {movie.vote_count ?? 'N/A'}</span>
      </div>
    </div>
  </article>
);

export default MovieCard;
