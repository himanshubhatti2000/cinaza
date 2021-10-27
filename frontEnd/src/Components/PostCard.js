import React from 'react';
import history from '../History/history';
import Ratings from './Ratings';


const PostCard = ({id,name,review,uploader,hasWatched,image,imdb,metaCritic,rottenTomatoes}) => {
    return (

        <div className="post" onClick={()=>{history.push(`/movie-detail/${id}`)}}>
                            <div className="content">
                                <div className="movie-review">
                                <div className="user-post-detail">
                                    <div className="user-pic"></div>
                                    <h3 className="user-name">{name}</h3>
                                </div>
                             
                                <p>
                                   {review}
                                </p>
                                </div>
                             
                               <Ratings imdb={imdb} rottenTomatoes={rottenTomatoes} metaCritic={metaCritic}/>
                              
                            </div>
                            <div className="poster" style={{backgroundImage: `url(${image})`}}></div>
                        </div>
                        
        
    );
}

export default PostCard;
