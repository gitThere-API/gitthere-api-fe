import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import XMLParser from 'react-xml-parser';
import request from 'superagent';
import GoogleMapReact from 'google-map-react';
import BasicMarkerLime from './BasicMarkerLime.js';
import BasicMarkerNike from './BasicMarkerNike.js';
import BasicMarkerSpin from './BasicMarkerSpin.js';
import BasicMarkerTriMet from './BasicMarkerTriMet.js';
import '../App/App.css';
import './DemoMap.css';

// const URL = 'http://localhost:7890';
const URL = 'https://desolate-bayou-65072.herokuapp.com';

export default class DemoMap extends Component {

    state = {
        location: '',
        enteredLocation: '',
        loading: false,
        lime: [],
        nike: [],
        spin: [],
        trimet: [],
        favorites: [],
        lat: Number(localStorage.getItem('LAT')) || 45.5234109,
        lng: Number(localStorage.getItem('LNG')) || -122.681133
    }

    static defaultProps = {
        zoom: 17
    };

    componentDidMount = async () => {
        await this.fetchLime()
        await this.fetchNike()
        await this.fetchSpin()
        // await this.fetchFavorites()
        await this.fetchTrimet()
    }

    fetchLime = async () => {
        // const { token } = this.props;
        await this.setState({ loading: true });

        const response = await request
            .get(`${URL}/api/lime?lat=${this.state.lat}&lon=${this.state.lng}`)
            // .set('Authorization', token)

        await this.setState({ lime: response.body, loading: false })
    }

    fetchNike = async () => {
        await this.setState({ loading: true });

        const response = await request
            .get(`${URL}/api/nike?lat=${this.state.lat}&lon=${this.state.lng}`)

        await this.setState({ nike: response.body, loading: false })
    }

    fetchSpin = async () => {
        await this.setState({ loading: true });

        const response = await request
            .get(`${URL}/api/spin?lat=${this.state.lat}&lon=${this.state.lng}`)

        await this.setState({ spin: response.body, loading: false })
    }

    fetchTrimet = async () => {
        await this.setState({ loading: true });

        const response = await request
            .get(`${URL}/api/trimet?lat=${this.state.lat}&lng=${this.state.lng}`)

        const xml = new XMLParser().parseFromString(response.body.text);
        await this.setState({ trimet: xml.children, loading: false })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState({ loading: true, enteredLocation: this.state.location });
        const response = await request.get(`${URL}/api/location?search=${this.state.location}`)

        this.setState({
            lat: Number(response.body.lat),
            lng: Number(response.body.lng),
            loading: false
        })

        await this.fetchLime();
        await this.fetchNike();
        await this.fetchSpin();
        await this.fetchTrimet();
    }

    handleDetailClick = () => {
        localStorage.setItem('LAT', this.state.lat);
        localStorage.setItem('LNG', this.state.lng);
    }

    render() {
        return (
            <div>
                <div className='MapSubHeader'>
                    <section className="submit-location">
                        <form onSubmit={this.handleSubmit}>
                            <label>Search Location<br />
                                <input className="location-search"
                                    required
                                    value={this.state.location}
                                    onChange={(e) => this.setState({ location: e.target.value })}
                                />
                            </label>
                            <button>Submit location</button>
                        </form>
                        {/* <div className="current-location">Current location: <br></br> <span>{this.state.enteredLocation}</span>
                            <br></br>
                            <button onClick={this.handleFavoriteClick}>Save current location</button>
                        </div> */}
                    </section>
                    {/* <section className="fave-locations">

                        <div className="faves-list">
                            <>
                                {this.state.favorites.map(favorite =>
                                    <div className='location-list' key={`${favorite.lat}${favorite.lng}${Math.random()}`}>
                                        <p className="pointer" onClick={() =>
                                            this.handleUseFavorite(favorite.lat, favorite.lng, favorite.address)}>{favorite.name}</p>
                                        <button onClick={() => this.handleDeleteClick(favorite.id)}>Delete</button>
                                    </div>
                                )}
                            </>
                        </div>
                    </section> */}
                </div>
                <div className="legend">
                    <div className="single-icon">
                        <a href="https://apps.apple.com/us/app/biketownpdx/id1132076989">
                            <div className="legend-icon-nike">
                                <BasicMarkerNike />
                            </div>
                            Nike
                        </a>
                    </div>
                    <a href="https://apps.apple.com/us/app/spin-electric-scooters/id1241808993">
                        <div className="single-icon">
                            <BasicMarkerSpin />Spin
                            </div>
                    </a>
                    <div className="single-icon">
                        <a href="https://apps.apple.com/us/app/lime-your-ride-anytime/id1199780189">
                            <div className="legend-icon-lime">
                                <BasicMarkerLime />
                            </div>
                            Lime
                        </a>
                    </div>
                    <a href="https://trimet.org/#/planner">
                        <div className="single-icon">
                            <BasicMarkerTriMet />Trimet
                            </div>
                    </a>
                </div>
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        className="live-map"
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                        defaultCenter={{
                            lat: this.state.lat,
                            lng: this.state.lng
                        }}
                        center={{
                            lat: this.state.lat,
                            lng: this.state.lng
                        }}
                        defaultZoom={this.props.zoom}
                    >
                        {this.state.lime.map(onelime =>
                            <BasicMarkerLime
                                key={`${onelime.bike_id}-${Math.random()}`}
                                lat={onelime.lat}
                                lng={onelime.lon}
                                text={onelime.bike_id}
                            />
                        )}
                        {this.state.nike.map(onelime =>
                            <BasicMarkerNike
                                key={`${onelime.bike_id}-${Math.random()}`}
                                lat={onelime.lat}
                                lng={onelime.lon}
                                text={onelime.bike_id}
                            />
                        )}
                        {this.state.spin.map(onelime =>
                            <BasicMarkerSpin
                                key={`${onelime.bike_id}-${Math.random()}`}
                                lat={onelime.lat}
                                lng={onelime.lon}
                                text={onelime.bike_id}
                            />
                        )}
                        {!this.state.loading && this.state.trimet.map(oneStop =>
                            <Link onClick={this.handleDetailClick} to={`/detail/${oneStop.attributes.locid}`}
                                key={`${oneStop.attributes.locid}-${Math.random()}`}
                                lat={oneStop.attributes.lat}
                                lng={oneStop.attributes.lng}
                                text={oneStop.attributes.locid}
                            >
                                <BasicMarkerTriMet
                                />
                            </Link>
                        )}
                    </GoogleMapReact>
                </div>
            </div >

        )
    }
}


