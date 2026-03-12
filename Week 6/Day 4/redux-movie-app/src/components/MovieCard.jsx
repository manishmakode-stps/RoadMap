import { memo } from "react";

const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Poster";

function getReleaseYear(dateValue) {
  if (!dateValue || typeof dateValue !== "string") {
    return "N/A";
  }

  const match = dateValue.match(/(\d{4})$/);
  return match ? match[1] : "N/A";
}

function MovieCard({ movie }) {
  return (
    <article className="movie-card" title={movie.original_title}>
      <img
        className="movie-poster"
        src={movie.poster_path || FALLBACK_POSTER}
        alt={movie.original_title}
        loading="lazy"
      />
      <div className="movie-details">
        <h3>{movie.original_title}</h3>
        <p>Year: {getReleaseYear(movie.release_date)}</p>
        <p>Popularity: {Number(movie.popularity || 0).toFixed(2)}</p>
        <p>Rating: {Number(movie.vote_average || 0).toFixed(1)}</p>
      </div>
    </article>
  );
}

export default memo(MovieCard);