import React, { Component } from 'react';
import StateContext from '../Context/StateContext'
import PostCard from './PostCard';
import Addpost from './Addpost';

class NewsFeed extends Component {
    static contextType=StateContext
    componentDidMount=async()=>{
        await this.context.getNewsfeed()
        console.log(this.context.newsfeed)
    }
    postJSX=()=>{
        return this.context.newsfeed.map(post=>{
            return <PostCard key={post.result._id}
             id={post.result.id}
             name={post.profile.firstName +" "+post.profile.lastName}
              uploader={post.result.uploader}
               hasWatched={post.result.hasWatched}
                image={post.result.movieimage}
                imdb={post.result.imdb}
                metaCritic={post.result.metacritic}
                rottenTomatoes={post.result.rottentomatoes}
                review={post.result.review}   />
        })
    }
    render() {
      
            return (
                <section className="newsfeed">
                <div className="posts">
                    <Addpost />
                   {this.postJSX()}
                </div>
            </section>
          
        );
    }
}

export default NewsFeed;
