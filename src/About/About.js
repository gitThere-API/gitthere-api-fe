import React, { Component } from 'react'

import BasicMarkerGitHub from '../About/BasicMarkerGitHub.js';
import BasicMarkerLinkedIn from '../About/BasicMarkerLinkedIn.js';


import './About.css';

export default class About extends Component {
    render() {
        return (
            <>
                <h2 className="about-h2">About Us</h2>
                <div className="about">
                    <div className="about-div">
                        <img src='https://avatars3.githubusercontent.com/u/18178118?s=460&u=290e25028eca8625d7937546f483102a26a15124&v=4' alt="perry-sittser" />
                        <p className="name">Perry Sittser</p>
                        <span className="title"><div className="about-icon"><a href={`https://github.com/sittserp`}><BasicMarkerGitHub /></a></div><div className="about-icon"><a href={`https://www.linkedin.com/in/sittserp/`}>< BasicMarkerLinkedIn /></a></div></span>
                        <span className="bio">Perry is a full-stack software engineer.  When he's not coding, you can usually find him outside discovering nature with his kids and family. </span>
                    </div >
                    <div className="about-div">
                        <img src='https://avatars1.githubusercontent.com/u/64820882?s=460&v=4' alt="shane-upchurch" />
                        <p className="name">Shane Upchurch</p>
                        <span className="title"><div className="about-icon"><a href={`https://github.com/ShaneUP1`}
                        ><BasicMarkerGitHub /></a></div><div className="about-icon"><a href={`https://www.linkedin.com/in/shaneupchurch/`}>< BasicMarkerLinkedIn /></a></div></span>
                        <span className="bio">Shane is full-stack software engineer. He enjoys long scoot rides on the beach, pedalling to the nearest cidery, and bus rides to the nearest park with his family. </span>
                    </div>
                    <div className="about-div">
                        <img src='https://avatars3.githubusercontent.com/u/70562690?s=460&u=d9a1117c21f766c795ca7f7126960a31084a54b6&v=4' alt="erik-graciosa" />
                        <p className="name">Erik Graciosa</p>
                        <span className="title"><div className="about-icon"><a href={`https://github.com/ErikGraciosa`}><BasicMarkerGitHub /></a></div><div className="about-icon"><a href={`https://www.linkedin.com/in/erikgraciosa/`}>< BasicMarkerLinkedIn /></a></div></span>
                        <span className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo </span>
                    </div>
                </div >
            </>
        )
    }
}
