import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import BasicMarker from './BasicMarker.js';
import './App.css';
import './Map.css';


export default class Map extends Component {
    static defaultProps = {
        center: {
          lat: 45.5051,
          lng: -122.6750
        },
        zoom: 18
      };

    render() {
        return (
        <div>
            <div className='MapHeader'>
                <h2>This is the map page, here you will input location and save location and see results, bus details below.</h2>
            </div>
            <div className='MapSubHeader'>
                <section>
                    <form>
                        <label>Input location to return<br/>
                            <input></input>
                            <button>Submit location</button>
                        </label>
                    </form>
                </section>
                <section>
                    <div>Current location: <span>xx.xxxx, xx.xxxx</span><button>Save current location</button>
                    </div>
                    <div>
                        <span className='LocationList'>1. <span>Location Description</span><span>Lat: </span><span>Long: </span><button>Delete</button></span>
                        <span className='LocationList'>2. <span>Location Description</span><span>Lat: </span><span>Long: </span><button>Delete</button></span>
                        <span className='LocationList'>3. <span>Location Description</span><span>Lat: </span><span>Long: </span><button>Delete</button></span>
                        <span className='LocationList'>4. <span>Location Description</span><span>Lat: </span><span>Long: </span><button>Delete</button></span>
                    </div>
                </section>
            </div>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                >
                    <BasicMarker
                        lat={45.5051}
                        lng={-122.6750}
                        text="My Marker"
                    />
                    <BasicMarker
                        lat={45.5060}
                        lng={-122.6750}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
            <section className='BusButtons'><h2>Here are where the bus buttons will go to then go on to details.</h2>
                <button>
                    Sample Bus button
                </button>
                <button>
                    Sample Bus button
                </button>
                <button>
                    Sample Bus button
                </button>
                <button>
                    Sample Bus button
                </button>
            </section>
        </div>    
            
        )
    }
}


