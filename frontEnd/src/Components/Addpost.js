import React, { Component, createRef } from 'react';
import axios from 'axios'
import StateContext from '../Context/StateContext';
import { disable } from 'debug';
import List from './List';
class Addpost extends Component {
    static contextType=StateContext
    constructor(props){
        super(props)
        this.rating=createRef()
        this.review=createRef()
        this.watched=createRef()
    }
    initialState={
        movies: [],
        selected: {
            title: "",
            description: "",
            image: "",
            id:""
        },
        displayTitleModal: true,
        rating: ''
    }
    state=this.initialState
    titleHandler=(e)=>{
        this.setState({selected: {title: e.target.value},displayTitleModal: true})
        console.warn(this.state.title)
        if(!e.target.value){
            return
        }
        console.log(e.target.value)
        if(this.timeOut){
            clearTimeout(this.timer)
          }
          this.timeOut=1000
          this.timer=setTimeout(async ()=>{
              //k_6l9r4zyc
              //k_o0pe7bt5
              console.log("context is",this.context)
            const movies=await this.context.searchMovies(e.target.value)
            this.setState({movies})
          },this.timeOut)
          
    }
    /*titleResultJSX=()=>{
        return this.state.movies.map((movie)=>{
            return <div key={movie.id} className="title-result" onClick={()=>{this.setState({selected: movie,displayTitleModal: false})
            console.log(this.state)}}>
                <div className="content">
                <h1>{movie.title}</h1>
                <br/>
                <p>{ movie.description}</p>
                </div>
                <img src={movie.image}/>
            </div>
        })
    }*/
    SubmitHandler=async ()=>{
        console.log(this.state)
        alert(`title: ${this.state.selected.title},
        rating: ${this.rating.current.value},
        watched: ${this.watched.current.value},
        movieID: ${this.state.selected.id},
        review:${this.review.current.value},
        image: ${this.state.selected.image}`)
        const post={
            title: this.state.selected.title,
            movieimage: this.state.selected.image,
            rating: this.rating.current.value,
            haswatched: this.watched.current.value,
            id: this.state.selected.id,
            review:this.review.current.value
        }
        console.log(this.context)
        await this.context.SendPost(post)
        this.setState(this.initialState)
        await this.context.getNewsfeed()
      }
    ratingHandler=(e)=>{
        if(e.target.value.length<=1 || e.target.value==="10"){
            this.setState({rating: e.target.value})
        }
    }
    render() {
        return (
            <div className="add-post">
                            <div className="content">
                                <input id="title" autoComplete="off" onChange={this.titleHandler} value={this.state.selected.title} placeholder="Enter Movie/series title"/>
                                <List setState={this.setState.bind(this)} results={this.state.movies} condition={this.state.movies && this.state.movies.length>0 && this.state.selected.title &&this.state.displayTitleModal} />
                                <div className="sub-info">
                                    <input ref={this.rating} onChange={(e)=>this.ratingHandler(e)} value={this.state.rating} type="number" id="rating" min="1" max="10" placeholder="Rating"/>
                                    <select ref={this.watched} name="watch" id="watch" >
                                    <option value="true">has watched</option>
                                    <option value="false">will watch</option>
                                   </select>
                                </div>
                                <textarea ref={this.review} maxLength="350" placeholder="Write something about movie..." style={{resize:"none"}}/>
                                <button className="btn-2" disabled={!this.state.selected.image} onClick={this.SubmitHandler}>post</button>
                            </div>
                            {this.state.selected.image?<img src={this.state.selected.image} alt={this.state.selected.title}/>: <div className="img-poster" />}
           </div>
        );
    }
}

export default Addpost;
