import React, { Component } from 'react';
import MovieCard from './MovieCard';
import StateContext from '../Context/StateContext';
class MoviesList extends Component {
    static contextType=StateContext
    state= {
        movies: []
    }
    componentDidMount=async()=>{
        console.log("hiiii i am in list")
        this.context.getMovies(this.props.type)
       /*this.setState({movies: this.props.holdedMovies})
       const movies=await this.props.movieFunction()
       this.setState({movies})
       //console.log(movies)*/
    }
    
   /* componentWillUnmount=async()=>{
        this.props.movieHoldFunction(this.state.movies)
    }*/
    moviesJSX=()=>{
        console.log("movies are",this.props.type) 
        return this.props.movies.map(movie=>{
            return <MovieCard key={movie.id} crew={movie.crew} imDbRating={movie.imDbRating} imDbRatingCount={movie.imDbRatingCount} image={movie.image} rank={movie.rank} title={movie.title} year={movie.year}/>
        })
    }
    render() {
        //console.log(this.context.top250Movies)
        return (
            <div className="movie-list">
                {this.moviesJSX()}
            </div>
        );
    }
}

export default MoviesList;
