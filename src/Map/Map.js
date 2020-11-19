import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import XMLParser from 'react-xml-parser';
import request from 'superagent';
import GoogleMapReact from 'google-map-react';
import BasicMarkerLime from './BasicMarkerLime.js';
import BasicMarkerNike from './BasicMarkerNike.js';
import BasicMarkerSpin from './BasicMarkerSpin.js';
import BasicMarkerTriMet from './BasicMarkerTriMet.js';
import '../App.css';
import './Map.css';

export default class Map extends Component {

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
        await this.fetchFavorites()
        await this.fetchTrimet()
    }

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
            .get(`https://desolate-bayou-65072.herokuapp.com/api/nike?lat=${this.state.lat}&lon=${this.state.lng}`)
            .set('Authorization', token)
        await this.setState({ nike: response.body, loading: false })
    }

    fetchSpin = async () => {
        const { token } = this.props;
        await this.setState({ loading: true });
        const response = await request
            .get(`https://desolate-bayou-65072.herokuapp.com/api/spin?lat=${this.state.lat}&lon=${this.state.lng}`)
            .set('Authorization', token)
        await this.setState({ spin: response.body, loading: false })
    }

    fetchTrimet = async () => {
        const { token } = this.props;
        await this.setState({ loading: true });
        const response = await request
            .get(`https://desolate-bayou-65072.herokuapp.com/api/trimet?lat=${this.state.lat}&lng=${this.state.lng}`)
            .set('Authorization', token)
        const xml = new XMLParser().parseFromString(response.body.text);
        await this.setState({ trimet: xml.children, loading: false })
    }

    fetchFavorites = async () => {
        const { token } = this.props;
        const response = await request.get('https://desolate-bayou-65072.herokuapp.com/api/favorites')
            .set('Authorization', token)
        await this.setState({ favorites: response.body })
    }

    handleSubmit = async (e) => {
        const { token } = this.props;
        e.preventDefault();
        await this.setState({ loading: true, enteredLocation: this.state.location });
        const response = await request.get(`https://desolate-bayou-65072.herokuapp.com/api/location?search=${this.state.location}`)
            .set('Authorization', token);

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

    handleFavoriteClick = async () => {
        await this.setState({ loading: true });
        const faveName = prompt("What would you like to call this favorite location?");
        if (faveName === null) return;
        await request.post('https://desolate-bayou-65072.herokuapp.com/api/favorites')
            .send({
                name: faveName,
                lat: this.state.lat,
                lng: this.state.lng,
                address: this.state.location,
            })
            .set('Authorization', this.props.token)

        await this.fetchFavorites()
        await this.setState({ loading: false, enteredLocation: '' });

    }

    handleDeleteClick = async (someId) => {
        await this.setState({ loading: true });

        await request.delete(`https://desolate-bayou-65072.herokuapp.com/api/favorites/${someId}`)
            .set('Authorization', this.props.token)

        await this.fetchFavorites()
        this.setState({ loading: false });
    }

    handleUseFavorite = async (someLat, someLng, someDesc) => {
        await this.setState({
            loading: true,
            lat: Number(someLat),
            lng: Number(someLng),
            location: someDesc
        });
        await this.fetchLime();
        await this.fetchNike();
        await this.fetchSpin();
        await this.fetchTrimet();
        // await this.props.history.push('/map')
    }

    handleDetailClick = () => {
        localStorage.setItem('LAT', this.state.lat);
        localStorage.setItem('LNG', this.state.lng);
        // await this.props.history.push('/map')
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
                        <div className="current-location">Current location: <br></br> <span>{this.state.enteredLocation}</span>
                            <br></br>
                            <button onClick={this.handleFavoriteClick}>Save current location</button>
                        </div>
                    </section>
                    <section className="fave-locations">

                        <div className="faves-list">
                            <>
                                {this.state.favorites.map(favorite =>
                                    <div className='location-list' key={`${favorite.lat}${favorite.lng}${Math.random()}`}>
                                        <p class="pointer" onClick={() =>
                                            this.handleUseFavorite(favorite.lat, favorite.lng, favorite.address)}>{favorite.name}</p>
                                        <button onClick={() => this.handleDeleteClick(favorite.id)}>Delete</button>
                                    </div>
                                )}
                            </>
                        </div>
                    </section>
                </div>
                <div className="legend">
                    <div>
                        <BasicMarkerNike /> Nike
                    </div>
                    <div>
                        <BasicMarkerSpin />Spin
                    </div>
                    <div>
                        <BasicMarkerLime />Lime
                    </div>
                    <div>
                        <BasicMarkerTriMet /> Trimet
                    </div>
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
                        {!this.state.loading && this.state.trimet.map(oneStop =>
                            <Link onClick={this.handleDetailClick} to={`/detail/${oneStop.attributes.locid}`}
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


