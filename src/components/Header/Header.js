import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css';

export default class Header extends Component {


    render() {
        return (
            
            <div className="nav">
                {this.props.token
                    ? <><div className="header-user">
                        <div>Hello, {this.props.username}</div>
                        <div><button onClick={this.props.logOut}>Log Out</button></div>
                    </div>
                        <div className="header-nav-links">
                            <Link className="nav-link-button" to="/">Home</Link>
                            <Link className="nav-link-button" to="/map">Map</Link>
                            <Link className="nav-link-button" to="/about">About</Link>
                        </div>
                    </>
                    :

                    <div className="header-nav-links">
                        <Link className="nav-link-button" to="/">Home</Link>
                        <Link className="nav-link-button" to="/demomap">Preview</Link>
                        <Link className="nav-link-button" to="/about">About</Link>
                    </div>

                }
                <div className="header-title">
                    <h1>gitThere: API</h1>
                </div>

            </div >

        )
    }
}
