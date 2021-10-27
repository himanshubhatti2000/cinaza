import React, { Component } from 'react';
import StateContext from '../Context/StateContext';
import BasicCard from './BasicCard';
import Ratings from './Ratings';
class MovieDetail extends Component {
    static contextType=StateContext
    state={id: this.props.match.params.id}
    componentDidMount=async ()=>{
      
        console.log(this.props)
        await this.context.movieInfo(this.props.match.params.id)
    }
    ActorJSX=()=>{
        if(!this.context.selectedMovieDetail.actorList){
            return <div />
        }
        return this.context.selectedMovieDetail.actorList.map(
            actor=><BasicCard key={actor.id}  name={actor.name} image={actor.image} role={actor.asCharacter}/>
        )
    }
    SimilarJSX=()=>{
        if(!this.context.selectedMovieDetail.actorList){
            return <div />
        }
        return this.context.selectedMovieDetail.similars.map(
            movie=><BasicCard key={movie.id} id={movie.id} name={movie.title} image={movie.image}/>
        )
    }
    /*componentDidUpdate=()=>{
        if ((this.props.match.params.id)!== this.state.id) {
            console.log(this.props.match.params.id)
            this.setState({ id: this.props.match.params.id });
        }
        window.scrollTo(0, 0)
    }*/
    render() {
        window.scrollTo(0, 0)
        return (
            <>
            <div className="movie-basic" key={this.state.id}>
                <div className="content">
                    <h1>{this.context.selectedMovieDetail.title}<span style={{fontSize: "1rem",fontWeight: "normal",color: "gray"}}>({this.context.selectedMovieDetail.type})</span></h1>
                    <h3>{this.context.selectedMovieDetail.genres}</h3>
                    <p>{this.context.selectedMovieDetail.plot}</p>
                </div>
                <div className="poster" style={{backgroundImage: `URL(${this.context.selectedMovieDetail.image})`}}></div>
            </div>
            <div  className="cast movie-section-layout">
                <h1>Cast</h1>
                <div className="cast flex-box-cards">
                <this.ActorJSX />
                </div>
               
            </div>
            <div className="similar-movies movie-section-layout">
            <h1>Similar Movies</h1>
                <div className="cast flex-box-cards">
                    <this.SimilarJSX />
                </div>
            </div>
            </>
        );
    }
}

export default MovieDetail;
