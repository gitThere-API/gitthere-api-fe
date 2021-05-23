import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import XMLParser from 'react-xml-parser';
import GoogleMapReact from 'google-map-react';
import BasicMarkerLime from '../../components/Map/BasicMarkerLime.js';
import BasicMarkerNike from '../../components/Map/BasicMarkerNike.js';
import BasicMarkerSpin from '../../components/Map/BasicMarkerSpin.js';
import BasicMarkerTriMet from '../../components/Map/BasicMarkerTriMet.js';
import Legend from '../../components/Legend/Legend.jsx';
import SearchSave from '../../components/SearchSave/SearchSave.jsx';
import { getScooters, 
    getFavorites,
    deleteFavorite,
    getLocation, 
    addFavorite} from '../../services/scooters.js';
import '../../components/App/App.css';
import './MapPage.css';
import Favorites from '../../components/Favorites/Favorites.jsx';
import BasicMarkerBird from '../../components/Map/BasicMarkerBird.js';
import BasicMarkerBolt from '../../components/Map/BasicMarkerBolt.js';

const BRANDS = ['lime', 'nike', 'spin', 'bird', 'bolt'];
const TRIMET = 'trimet';

export default class Map extends Component {

    state = {
        location: '',
        enteredLocation: '',
        loading: false,
        lime: [],
        nike: [],
        spin: [],
        bird: [],
        bolt: [],
        trimet: [],
        favorites: [],
        lat: Number(localStorage.getItem('LAT')) || 45.5234109,
        lng: Number(localStorage.getItem('LNG')) || -122.681133
    }

    static defaultProps = {
        zoom: 17
    };

    componentDidMount = async () => {
        this.getAllScooters();
        await this.fetchFavorites();
        await this.fetchTrimet();
    }

    getAllScooters = () => {
        BRANDS.forEach(async (brand) => {
            try {
                await this.scooters(brand);
            } catch(err) {
                console.log(`${brand} fetch failed`);
                console.log(err);
            }
        });
    }

    scooters = async (brand) => {
        const { lat, lng } = this.state;
        await this.setState({ loading: true });

        const response = await getScooters(lat, lng, this.props.token, brand);

        await this.setState({ [brand]: response.body, loading: false });
    }    

    fetchTrimet = async () => {
        await this.setState({ loading: true });
        const response = await getScooters(this.state.lat, this.state.lng, this.props.token, TRIMET);
        const xml = new XMLParser().parseFromString(response.body.text);
        await this.setState({ trimet: xml.children, loading: false })
    }

    fetchFavorites = async () => {
        const response = await getFavorites(this.props.token);
        const topThreeFaves = response.body.slice(-3);
        await this.setState({ favorites: topThreeFaves });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState({ loading: true, enteredLocation: this.state.location });
        const response = await getLocation(this.state.location, this.props.token);

        this.setState({
            lat: Number(response.body.lat),
            lng: Number(response.body.lng),
            loading: false
        })

        this.getAllScooters();
        await this.fetchTrimet();
    }

    handleFavoriteClick = async () => {
        const {lat, lng, location} = this.state;
        await this.setState({ loading: true });

        const faveName = prompt("What would you like to call this favorite location?");
        if (faveName === null) return;

        await addFavorite(faveName, lat, lng, location, this.props.token);
        await this.fetchFavorites();
        await this.setState({ loading: false });
    }

    handleDeleteClick = async (someId) => {
        await this.setState({ loading: true });
        await deleteFavorite(someId, this.props.token);
        await this.fetchFavorites();
        this.setState({ loading: false });
    }

    handleUseFavorite = async (someLat, someLng, someDesc) => {
        await this.setState({
            loading: true,
            lat: Number(someLat),
            lng: Number(someLng),
            location: someDesc,
            enteredLocation: someDesc
        });
        this.getAllScooters();
        await this.fetchTrimet();
    }

    handleDetailClick = () => {
        localStorage.setItem('LAT', this.state.lat);
        localStorage.setItem('LNG', this.state.lng);
    }

    updateLocation = (e) => {
        this.setState({ location: e.target.value })
    }

    render() {
        console.log(this.state.bird, this.state.bolt)
        return (
            <div>
                <div className='MapSubHeader'>
                    <SearchSave
                        handleSubmit={this.handleSubmit}
                        location={this.state.location}
                        updateLocation={this.updateLocation}
                        enteredLocation={this.state.enteredLocation}
                        handleFavoriteClick={this.handleFavoriteClick}/>
                    <Favorites
                        favorites={this.state.favorites}
                        handleUseFavorite={this.handleUseFavorite}
                        handleDeleteClick={this.handleDeleteClick}/>
                </div>
                <Legend />
                <div style={{ height: '65vh', width: '100%' }}>
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
                                key={`${onelime.lat}${onelime.lon}`}
                                lat={onelime.lat}
                                lng={onelime.lon}
                            />
                        )}
                        {this.state.nike.map(onenike =>
                            <BasicMarkerNike
                                key={`${onenike.lat}${onenike.lon}`}
                                lat={onenike.lat}
                                lng={onenike.lon}
                            />
                        )}
                        {this.state.spin.map(onespin =>
                            <BasicMarkerSpin
                                key={`${onespin.lat}${onespin.lon}`}
                                lat={onespin.lat}
                                lng={onespin.lon}
                            />
                        )}
                        {this.state.bird.map(onebird =>
                            <BasicMarkerBird
                                key={`${onebird.lat}${onebird.lon}`}
                                lat={onebird.lat}
                                lng={onebird.lon}
                            />
                        )}
                        {this.state.bolt.map(onebolt =>
                            <BasicMarkerBolt
                                key={`${onebolt.lat}${onebolt.lon}`}
                                lat={onebolt.lat}
                                lng={onebolt.lon}
                            />
                        )}
                        {!this.state.loading && this.state.trimet.map(oneStop =>
                            <Link onClick={this.handleDetailClick} to={`/detail/${oneStop.attributes.locid}`}
                                key={`${oneStop.attributes.locid}-${Math.random()}`}
                                lat={oneStop.attributes.lat}
                                lng={oneStop.attributes.lng}
                                text={oneStop.attributes.locid}
                            >
                                <BasicMarkerTriMet/>
                            </Link>
                        )}
                    </GoogleMapReact>
                </div>
            </div >
        )
    }
}
