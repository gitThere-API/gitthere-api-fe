import React, { Component } from 'react'

import './About.css';

export default class About extends Component {
    render() {
        return (
            <>
                <h2>About Us</h2>
                <div className="about">
                    <div>
                        <img src='https://avatars3.githubusercontent.com/u/18178118?s=460&u=290e25028eca8625d7937546f483102a26a15124&v=4' alt="perry-sittser" />
                        <h6>Perry Sittser:</h6>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo </span>
                    </div>
                    <div>
                        <img src='https://avatars1.githubusercontent.com/u/64820882?s=460&v=4' alt="shane-upchurch" />
                        <h6>Shane Upchurch:</h6>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo </span>
                    </div>
                    <div>
                        <img src='https://avatars3.githubusercontent.com/u/70562690?s=460&u=d9a1117c21f766c795ca7f7126960a31084a54b6&v=4' alt="erik-graciosa" />
                        <h6>Erik Graciosa:</h6>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo </span>
                    </div>
                </div>
            </>
        )
    }
}
