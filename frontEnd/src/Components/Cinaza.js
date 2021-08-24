import React, { Component } from 'react';
import {Switch,Route, BrowserRouter } from 'react-router-dom'

import Header from './Header';
import Nav from './Nav';
import NewsFeed from './NewsFeed';
import MovieList from './MoviesList'
import StateContext from '../Context/StateContext';
import MovieDetail from './MovieDetail';
class Cinaza extends Component {
    static contextType=StateContext
    componentDidMount=()=>{
        if(Object.getOwnPropertyNames(this.context.user).length >= 1){
            this.context.getLoginStatus()
        }
    }
    render() {
        return (
            <div className="cinaza">
                <Header />
                <div className="app-body">
                <Nav />
                    <div className="dynamic-page">
                 
                    <Switch>
                        <Route exact path="/" component={NewsFeed}/>
                        <Route path="/new-movies" render={()=>{return <MovieList key="1"  type="newMovies" movies={this.context.newMovies} />}}/>
                        <Route path="/coming-soon" render={()=>{return <MovieList key="2"  type="comingSoon" movies={this.context.comingSoon}  />}}/>
                        <Route path="/top-250-movies" render={()=>{return <MovieList key="3"  type="top250Movies" movies={this.context.top250Movies} />}}/>
                        <Route path="/top-250-tvseries" render={()=>{return <MovieList key="4" type="top250TV" movies={this.context.top250TV} />}}/>
                        <Route path="/most-popular-movies" render={()=>{return <MovieList key="5" type="mostPopularMovies" movies={this.context.mostPopularMovies} />}}/>
                        <Route path="/most-popular-tvs" render={()=>{return <MovieList key="6" type="mostPopularTVs"  movies={this.context.mostPopularTVs}/> }} />
                        <Route exact path="/movie-detail/:id" component={MovieDetail}/>
                    </Switch>
     
                    </div>
                </div>
            </div>
        );
    }
}

export default Cinaza;
