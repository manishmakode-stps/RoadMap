export const formatDate = (value) => {
  if (!value) {
    return 'Release unavailable';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const filterMovies = (movies, searchTerm) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return movies;
  }

  return movies.filter((movie) => {
    const title = movie.original_title?.toLowerCase() ?? '';
    const overview = movie.overview?.toLowerCase() ?? '';
    const language = movie.original_language?.toLowerCase() ?? '';
    const castNames =
      movie.casts?.map((cast) => cast.name.toLowerCase()).join(' ') ?? '';

    return (
      title.includes(normalizedSearch) ||
      overview.includes(normalizedSearch) ||
      language.includes(normalizedSearch) ||
      castNames.includes(normalizedSearch)
    );
  });
};
