import '../style.css'
import React from 'react';
function MovieCard({title, image, vote}){
    return(
        <div className="movie-card">
            <img src={image} alt={title} className="movie-poster" />
            <div className="movie-info">
                <h3 className="movie-title">{title}</h3>
                <span className="movie-vote">{vote}</span>
            </div>
        </div>
    )
}

export default React.memo(MovieCard);
