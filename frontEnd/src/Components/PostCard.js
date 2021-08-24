import React from 'react';
import history from '../History/history';
import imdbi from '../imdb.png'
import rotten from '../rotten.png'
import metac from '../metac.png'



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
                             
                                <div className="ratings-cover">
                                    <div className="ratings">
                                        <div className="rating"><img src={imdbi} alt=""/> <p>{imdb}</p></div>
                                        <div className="rating"><img src={rotten} alt=""/>  <p>{rottenTomatoes}</p></div>
                                    </div>
                                    <div className="ratings">
                                        <div className="rating"><img src={metac} alt=""/>  <p>{metaCritic}</p></div>
                                        <div className="rating"><img src={imdbi} alt=""/>  <p>{metaCritic}</p></div>
                                    </div>
                                
                                </div>
                              
                            </div>
                            <div className="poster" style={{backgroundImage: `url(${image})`}}></div>
                        </div>
                        
        
    );
}

export default PostCard;
