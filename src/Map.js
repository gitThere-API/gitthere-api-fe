import React, { Component } from 'react'
import request from 'superagent';
import GoogleMapReact from 'google-map-react';
import BasicMarkerLime from './BasicMarkerLime.js';
import BasicMarkerNike from './BasicMarkerNike.js';
import BasicMarkerSpin from './BasicMarkerSpin.js';
import './App.css';
import './Map.css';

export default class Map extends Component {

    state = {
        location: '',
        loading: false,
        lime: [],
        nike: [],
        spin: [],
        trimet: []
    }

    static defaultProps = {
        center: {
            lat: 45.5233858,
            lng: -122.6809206
        },
        zoom: 19
    };

    fetchLime = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request
            .get('https://desolate-bayou-65072.herokuapp.com/api/lime')
            .set('Authorization', token)
        await this.setState({ lime: JSON.parse(response.body.text).data.bikes, loading: false })
    }

    fetchNike = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request
            .get('https://desolate-bayou-65072.herokuapp.com/api/nike')
            .set('Authorization', token)

        await this.setState({ nike: JSON.parse(response.body.text).data.bikes, loading: false })
    }

    fetchSpin = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request
            .get('https://desolate-bayou-65072.herokuapp.com/api/spin')
            .set('Authorization', token)

        await this.setState({ spin: JSON.parse(response.body.text).data.bikes, loading: false })
    }

    fetchTrimet = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request
            .get('https://desolate-bayou-65072.herokuapp.com/api/trimet')
            .set('Authorization', token)
        // .send(this.state.lat, this.state.lon)

        await this.setState({ trimet: response.body, loading: false })
    }

    componentDidMount = async () => {
        await this.fetchLime()
        await this.fetchNike()
        await this.fetchSpin()
        // await this.fetchTrimet()
    }

    handleSubmit = async (e) => {
        const { token } = this.props;

        e.preventDefault();

        const newLocation = {
            location: this.state,
        };

        await this.setState({ loading: true });

        await request.post('https://desolate-bayou-65072.herokuapp.com/location')
            .send(newLocation)
            .set('Authorization', token);

        await this.fetchLime();
        await this.fetchNike();
        await this.fetchSpin();
        // await this.fetchTrimet();
    }

    render() {


        return (
            <div>
                <div className='MapHeader'>
                    <h2>This is the map page, here you will input location and save location and see results, bus details below.</h2>
                </div>
                <div className='MapSubHeader'>
                    <section>
                        <form onSubmit={this.handleSubmit}>
                            <label>Input location to return<br />
                                <input
                                    value={this.state.location}
                                    onChange={(e) => this.setState({ location: e.target.value })}
                                />
                            </label>
                            <button>Submit location</button>
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
                        {/* lime stub editted, will probably need subs corrected */}
                        {this.state.lime.map(onelime =>
                            <BasicMarkerLime
                                lat={onelime.lat}
                                lng={onelime.lon}
                                text={onelime.bike_id}
                            />
                        )}
                        {this.state.nike.map(onelime =>
                            <BasicMarkerNike
                                lat={onelime.lat}
                                lng={onelime.lon}
                                text={onelime.bike_id}
                            />
                        )}
                        {this.state.spin.map(onelime =>
                            <BasicMarkerSpin
                                lat={onelime.lat}
                                lng={onelime.lon}
                                text={onelime.bike_id}
                            />
                        )}
                        {/* No trimet data at this time. */}
                        {/* {allTriMet.map(onelime => 
                        <BasicMarkerTrimet
                        lat={onelime.lat}
                        lng={onelime.lon}
                        text={onelime.bike_id}
                        />
                    )} */}
                        {/* Beginning example marker */}
                        {/* <BasicMarker
                        lat={45.5060}
                        lng={-122.6750}
                        text="My Marker"
                    /> */}
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


