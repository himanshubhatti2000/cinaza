import React from 'react';
import imdbi from '../imdb.png'
import rotten from '../rotten.png'
import metac from '../metac.png'

const Ratings = ({imdb,rottenTomatoes,metaCritic}) => {
    return (
        <div className="ratings-cover">
                                    <div className="ratings">
                                        <div className="rating"><img src={imdbi} alt=""/> <p>{imdb?imdb:"N.A."}</p></div>
                                        <div className="rating"><img src={rotten} alt=""/>  <p>{rottenTomatoes?rottenTomatoes:"N.A."}</p></div>
                                    </div>
                                    <div className="ratings">
                                        <div className="rating"><img src={metac} alt=""/>  <p>{metaCritic?metaCritic:"N.A."}</p></div>
                                        <div className="rating"><img src={imdbi} alt=""/>  <p>{metaCritic?metaCritic:"N.A."}</p></div>
                                    </div>
                                
                                </div>
    );
}

export default Ratings;
