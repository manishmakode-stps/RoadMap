import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchMoviePage, movieQueryOptions } from '../api/movies.js';

export const useMoviePageQuery = (page) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['movies', 'page', page],
    queryFn: ({ signal }) => fetchMoviePage({ pageParam: page, signal }),
    placeholderData: keepPreviousData,
    ...movieQueryOptions,
  });

  useEffect(() => {
    if (!query.data?.hasNextPage) {
      return;
    }

    queryClient.prefetchQuery({
      queryKey: ['movies', 'page', page + 1],
      queryFn: ({ signal }) => fetchMoviePage({ pageParam: page + 1, signal }),
      ...movieQueryOptions,
    });
  }, [page, query.data?.hasNextPage, queryClient]);

  return query;
};
