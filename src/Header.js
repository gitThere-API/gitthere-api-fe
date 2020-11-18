import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css';

export default class Header extends Component {
    render() {
        return (

            <div className="nav">

                {this.props.token
                    ? <><div className="user">
                        Hello, {this.props.username}
                        <button onClick={this.props.logOut}>Log Out</button>
                    </div>
                        <div className="nav-links">
                            <Link to="/">| Home |</Link>
                            <Link to="/map"> Map |</Link>
                            <Link to="/about"> About |</Link>
                        </div>
                    </>
                    :
                    <div>
                        <Link to="/">| Home |</Link>
                        <Link to="/about"> About |</Link>
                    </div>
                }
                <div className="title">
                    <h1>gitThere: API</h1>
                </div>

            </div >

        )
    }
}
