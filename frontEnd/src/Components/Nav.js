import React, { Component } from 'react';
import {Link} from "react-router-dom"
import StateContext from '../Context/StateContext';

class Nav extends Component {
    static contextType=StateContext
    render() {
        //nav
        return (
            <nav>
            <ul>
                    <li><Link to="/new-movies">New Movies</Link></li>
                    <li><Link to="/coming-soon">Coming Soon</Link></li>
                    <li><Link to="/top-250-movies">Top 250 movies</Link></li>
                    <li><Link to="/top-250-tvseries">Top 250 tvSeries</Link></li>
                    <li><Link to="/most-popular-movies">Most Popular Movies</Link></li>
                    <li><Link to="/most-popular-tvs">Most Popular TV series</Link></li>
                    <li onClick={()=>{this.context.logout()}}> Logout</li>
                   
                    
                </ul>
            </nav>
        );
    }
}

export default Nav;
