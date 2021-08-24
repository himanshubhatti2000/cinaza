import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StateContext from '../Context/StateContext';
import List from './List';
class Header extends Component {
    static contextType=StateContext
    state={
        user:"",
        results:"",
        selected: {
            name: ""
        },
        displayModal: false
    }
    componentDidMount=()=>{
        this.setState({user: this.context.user.firstName+this.context.user.lastName})
    }
    SeachHandler=(e)=>{
        console.log(e.target.value)
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
            const results=await this.context.searchFriends(e.target.value)
           // this.setState({results})
          },this.timeOut)
          
    }
    render() {
        return (
            <header>
            <div className="header">
            <Link to="/"><div className="logo"></div></Link>
            <input placeholder="Search" onChange={this.SeachHandler}/>
            <List setState={this.setState.bind(this)} condition={this.state.results && this.state.results.length>0 && this.state.displayModal && this.selected.name}/>
            <div className="profile-pic">{this.context.user.firstName?this.context.user.firstName[0]+this.context.user.lastName[0]:null}</div>
             </div>
         </header>
        );
    }
}

export default Header;

{/* <div className="header">
            
            <div className="profile-pic"></div>
            
            </div>*/}