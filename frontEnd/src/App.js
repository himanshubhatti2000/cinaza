import React, { Component } from 'react';
import { Route,Router,Switch } from 'react-router-dom';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login'
import Signup from './Components/Signup'
import Cinaza from './Components/Cinaza'
import StateContext from './Context/StateContext'
import {getMovies} from './actions/imdbApi'
import history from './History/history';
class App extends Component {
  constructor(props){
    super(props)
    this.SendPost=async (post)=>{
      console.log(post)
      const res=await axios.post("http://localhost:5000/addpost",post,{ withCredentials: true })
      console.log(res)
    }
    this.Login=async(loginCredentials)=>{
      console.log(loginCredentials)
      const res=await axios.post("http://localhost:5000/login",loginCredentials,{ withCredentials: true })
      console.log(res)
      if(typeof res.data!=="string")
     this.setState({user: res.data})
    }
    this.Signup=async(userData)=>{
      console.log(userData)
     
      const res=await axios.post("http://localhost:5000/signup",userData,{ withCredentials: true })
     
      console.log(res)
    }
    this.NewsFeedPosts=async()=>{
      const res=await axios.get("url")
      console.log(res)
    }
    this.getNewsfeed=async()=>{
      console.log("i am in newsfeed")
      const res=await axios.get("http://localhost:5000/allpost",{ withCredentials: true })
      //console.log(res)
      await this.setState({newsfeed: res.data})
      console.log(this.state.newsfeed)
    }
    this.getFriendSuggestion=async()=>{
      const res=await axios.get("url")
    }
    this.getFriends=async()=>{
      const res=await axios.get("http://localhost:5000/searchfriends",{ withCredentials: true })
      console.log(res)
    }
    this.searchFriends=async(friendsearched)=>{
      console.log("searching")
      const res=await axios.get("http://localhost:5000/searchfriends",{ withCredentials: true })
      console.log(res)
    }
    
    this.searchMovies=async (searchString)=>{
    const res=await axios.get(`https://imdb-api.com/en/API/Search/${process.env.REACT_APP_IMDB_KEY}/${searchString}`)
    console.log(res.data.results)
    return res.data.results
  
  }
  this.movieInfo=async (movieId)=>{
    const res=await axios.get(` https://imdb-api.com/en/API/Title/${process.env.REACT_APP_IMDB_KEY}/${movieId}`)
   
    console.log(res.data)
   this.setState({selectedMovieDetail: res.data})
  
  }
 
 this.getLoginStatus=async()=>{
  const res=await axios.get("http://localhost:5000/user",{ withCredentials: true })
  if(typeof res.data!=="string"){
    this.setState({user: res.data})
  }
 }
 this.logout=async()=>{
  const res=await axios.get("http://localhost:5000/logout",{ withCredentials: true })
  if(res.status===200){
    this.setState(initialState)
  }
 }
  this.getMovies= async(type)=>{
    console.log("iam in")
    let query
    switch(type){
      case "newMovies":
        query="InTheaters"
        break;
      case "comingSoon":
        query="ComingSoon"
        break;
      case "top250Movies":
        query="top250movies"
          break;
      case "top250TV":
        query="top250TVs"
          break;
      case "mostPopularMovies":
        query="MostPopularMovies"
          break;
      case "mostPopularTVs":
        query="MostPopularTVs"
          break;
    }
  

    const res=await axios.get(`https://imdb-api.com/en/API/${query}/${process.env.REACT_APP_IMDB_KEY}`)
    console.log(res,type,process.env.IMDB_KEY)
    await this.setState({[type]: res.data.items})
  }

   const initialState={
    user: {firstName: "",lastName: ""},
    friends: [],
    suggestedFriends: [],
    myPosts: [],
    newsfeed:[],
    selectedMovieDetail: {title: "",image:"",actorList: [], similars: [],genres: "",type: ""},
    newMovies:[],
    comingSoon:[],
    top250Movies: [],
    top250TV:[],
    mostPopularMovies:[],
    mostPopularTVs:[],
    SendPost: this.SendPost,
    Login: this.Login,
    Signup: this.Signup,
    getNewsfeed: this.getNewsfeed,
    selectedMovie: this.selectedMovie,
    getFriends: this.getFriends,
    getFriendSuggestion: this.getFriendSuggestion,
    getMovies: this.getMovies,
    movieInfo:this.movieInfo,
    searchMovies:this.searchMovies,
    getLoginStatus:this.getLoginStatus,
    logout: this.logout,
    searchFriends: this.searchFriends

  }
    this.state=initialState
  }
  
  
  render() {
    //console.log(this.state)
    return (
      <StateContext.Provider value={this.state}>
      <div>
       <Router history={history}>
         <Switch>
         <Route exact  path="/signup" component={Signup}/>
           <Route   path="/" component={this.state.user.firstName!==""?Cinaza:Login}/>
         </Switch>
       </Router>
      </div>
      </StateContext.Provider>
    );
  }
}

export default App;
console.log(" key is", process.env.IMDB_KEY)