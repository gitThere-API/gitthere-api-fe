import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import './App.css';
import About from './About.js';
import Map from './Map.js';
import Detail from './Detail.js';
import Home from './Home.js'
import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {
  state = {
    token: localStorage.getItem('TOKEN' || ''),
    username: localStorage.getItem('USERNAME' || '')
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
          <ul>
            {
              this.state.token
                ? <div>
                  Hello, {this.state.username}
                  <button onClick={this.logOut}>Log out</button>
                </div>
                : <>
                  <Link to="/login"><div>log in</div></Link>
                  <Link to="/signup"><div>sign up</div></Link>
                </>}
          </ul>
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
              exact
              path='/map'
              token={this.state.token}
              render={(routerProps) => <Map
                {...routerProps}
                token={this.state.token} />} />
            <PrivateRoute
              exact
              path='/detail/:id'
              token={this.state.token}
              render={(routerProps) => <Detail
                {...routerProps}
                token={this.state.token} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}