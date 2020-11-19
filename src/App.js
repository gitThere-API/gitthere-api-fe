import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';

import Detail from './Detail/Detail.js';

import About from './About/About.js';
import Map from './Map/Map.js';
import Home from './Home/Home.js'
import PrivateRoute from './PrivateRoute.js';
import Header from './Header/Header.js';

export default class App extends Component {
  state = {
    token: localStorage.getItem('TOKEN') || '',
    username: localStorage.getItem('USERNAME') || ''
  }

  handleTokenChange = (myToken) => {
    this.setState({ token: myToken });
    localStorage.setItem('TOKEN', myToken);
  }

  handleUsernameChange = (myUsername) => {
    this.setState({ username: myUsername });
    localStorage.setItem('USERNAME', myUsername);
  }

  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');

    this.setState({
      username: '',
      token: ''
    })

  }

  render() {
    return (
      <div>
        <Router>
          <Header token={this.state.token} username={this.state.username} logOut={this.logOut} />
          <Switch>
            <Route exact path='/'
              render={(routerProps) => <Home
                {...routerProps} handleTokenChange={this.handleTokenChange}
                handleUsernameChange={this.handleUsernameChange} />}
            />
            <Route exact path='/about'
              render={(routerProps) => <About
                {...routerProps} />}
            />
            <PrivateRoute
              token={this.state.token}
              exact
              path='/map'
              render={(routerProps) => <Map
                {...routerProps} token={this.state.token}
              />} />
            <PrivateRoute
              token={this.state.token}
              exact
              path='/detail/:id'
              render={(routerProps) => <Detail
                {...routerProps} token={this.state.token}
              />} />
          </Switch>
        </Router>
      </div>
    )
  }
}