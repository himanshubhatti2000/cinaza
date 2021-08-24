import React, { Component } from 'react';

class List extends Component {
    titleResultJSX=()=>{
        return this.props.results.map((movie)=>{
            let i=0
            i+=1
            console.log(movie.id+i)
            return <div key={movie.id+i} className="title-result" onClick={()=>{this.props.setState({selected: movie,displayTitleModal: false})
            console.log(this.state)}}>
                <div className="content">
                <h1>{movie.title}</h1>
                <br/>
                <p>{ movie.description}</p>
                </div>
                <img src={movie.image}/>
            </div>
        })
    }
    render() {
        
        return (
            <div>
                {this.props.condition?<div className="title-modal">{this.titleResultJSX()}</div>:null}
            </div>
        );
    }
}

export default List;
