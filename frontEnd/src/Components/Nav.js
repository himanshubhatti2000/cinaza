import React, { Component } from 'react';
import {NavLink} from "react-router-dom"
import StateContext from '../Context/StateContext';

class Nav extends Component {
    static contextType=StateContext
    render() {
        //nav
        return (
            <nav>
            <ul>
                    <li><NavLink activeClassName="active-style" to="/new-movies">New Movies</NavLink></li>
                    <li><NavLink activeClassName="active-style"  to="/coming-soon">Coming Soon</NavLink></li>
                    <li><NavLink activeClassName="active-style"  to="/top-250-movies">Top 250 movies</NavLink></li>
                    <li><NavLink activeClassName="active-style"  to="/top-250-tvseries">Top 250 tvSeries</NavLink></li>
                    <li><NavLink activeClassName="active-style"  to="/most-popular-movies">Most Popular Movies</NavLink></li>
                    <li><NavLink activeClassName="active-style" to="/most-popular-tvs">Most Popular TV series</NavLink></li>
                    <li onClick={()=>{this.context.logout()}}><button style={{textDecoration: "none", border: "none"}}> Logout</button></li>
                   
                    
                </ul>
            </nav>
        );
    }
}

export default Nav;
