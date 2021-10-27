import React, { Component } from 'react';
import StateContext from '../Context/StateContext';




class BasicCard extends Component {
    static contextType=StateContext
   
    render() {
        //console.log(this.props)
        return (
            <div  className="basic-card" onClick={async()=>{
                //console.log(this.props.id)
                if(!this.props.id){
               //console.log("return")
                return}
                await this.context.movieInfo(this.props.id)
            }}>
                <div className="image" style={{backgroundImage: `url(${this.props.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"}}></div>
                <h3>{this.props.name}</h3>
                {this.props.role?<p>{this.props.role}</p>:null}
            </div>
        );
    }
}

export default BasicCard;


