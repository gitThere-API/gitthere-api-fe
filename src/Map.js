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
        trimet: [],
        lat: 45.5233858,
        lng: -122.6809206
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
            .get(`https://desolate-bayou-65072.herokuapp.com/api/lime?lat=${this.state.lat}&lon=${this.state.lng}`)
            .set('Authorization', token)
        await this.setState({ lime: response.body, loading: false })

    }

    fetchNike = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request
            .get('https://desolate-bayou-65072.herokuapp.com/api/nike')
            .set('Authorization', token)

        await this.setState({ nike: response.body, loading: false })
    }

    fetchSpin = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request
            .get('https://desolate-bayou-65072.herokuapp.com/api/spin')
            .set('Authorization', token)

        await this.setState({ spin: response.body, loading: false })
    }

    fetchTrimet = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request
            .get('https://desolate-bayou-65072.herokuapp.com/api/trimet')
            .set('Authorization', token)
            .send(this.state.lat, this.state.lng)

        await this.setState({ trimet: response.body, loading: false })
    }

    componentDidMount = async () => {
        await this.fetchLime()
        await this.fetchNike()
        await this.fetchSpin()
        await this.fetchTrimet()
    }

    handleSubmit = async (e) => {
        const { token } = this.props;

        e.preventDefault();

        const newLocation = {
            location: this.state.location,
        };

        await this.setState({ loading: true });

        const response = await request.get('https://desolate-bayou-65072.herokuapp.com/api/location')
            .send(newLocation)
            .set('Authorization', token);

        this.setState({
            lat: response.body.lat,
            lng: response.body.lng
        })

        await this.fetchLime();
        await this.fetchNike();
        await this.fetchSpin();
        await this.fetchTrimet();
    }

    handleFavoriteClick = async () => {
        await this.setState({ loading: true });
        const faveName = prompt("What would you like to call this favorite location?");

        await request.post('https://desolate-bayou-65072.herokuapp.com/api/favorites')
            .send({
                name: faveName,
                lat: 45.5233858,
                lng: -122.6809206,
                address: this.state.location,
            })
            .set('Authorization', this.props.token)
    }

    render() {

        console.log(this.state.lime);

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
                        <div>Current location: <span>xx.xxxx, xx.xxxx</span>
                            <button onClick={this.handleFavoriteClick}>Save current location</button>
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


