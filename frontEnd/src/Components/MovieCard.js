import React from 'react';
import imdb from '../imdb.png'
const MovieCard = ({crew,id,imDbRating,imDbRatingCount,image,rank,title,year}) => {
    return (
        <div className="movie-card">
            <div className="movie-content">
                <h1><span className="rank">{rank}.  </span>{title}</h1>
                <div className="sub-info"><p>{year}</p>
                    <div className="rating"> <img src={imdb} alt=""/>&nbsp;  <p>{imDbRating}</p></div>
                   </div>
                <p><span className="prop">imDbRatingCount:</span>{imDbRatingCount}</p>
                <p><span className="prop">Crew:</span>{crew}</p>
                <button className="btn-1">Details</button>
            </div>
            <div className="poster" style={{backgroundImage: `url(${image})`}} ></div>
        </div>
    );
}

export default MovieCard;
