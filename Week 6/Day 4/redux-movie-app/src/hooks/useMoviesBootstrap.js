import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialMovies } from "../features/movies/moviesSlice";

export function useMoviesBootstrap() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInitialMovies());
    }
  }, [dispatch, status]);
}