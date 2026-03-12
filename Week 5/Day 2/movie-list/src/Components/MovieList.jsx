import  MovieCard  from "./MovieCard"
import { getMovies } from "../context/MovieProvider";
import '../style.css'
function MovieList(){
    const {movies, loading} = getMovies();

       if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div> 
                <p>Fetching amazing movies...</p>
            </div>
        );
    }
    // throw new Error("this is error");
    if (movies.length === 0) {
        return <p>No movies found matching your criteria.</p>;
    }

    let list = movies.map((item)=>{
        return <MovieCard title={item.original_title} image={item.poster_path} vote={item.vote_average} key={item.id}/>
    })
    return(
        <>
        <div className="movie-grid">
            {list}
        </div>
        </>
    )
}
export default MovieList;