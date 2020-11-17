import React, { Component } from 'react'
import request from 'superagent';
import PrivateRoute from './PrivateRoute.js';

export default class Home extends Component {

    state = {
        signUpEmail: '',
        signUpPassword: '',
        loginEmail: '',
        loginPassword: '',
        loading: false,
    }

    handleSignupSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);

        this.setState({ loading: true })
        const user = await request
            .post('https://desolate-bayou-65072.herokuapp.com/auth/signup')
            .send(this.state.signUpEmail, this.state.signUpPassword);

        localStorage.setItem('USERNAME', user.email);

        this.props.handleTokenChange(user.body.token);
        this.props.handleUsernameChange(user.body.email);

        this.setState({ loading: false })

        this.props.history.push('/map')
    }

    handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);

        this.setState({ loading: true })
        const user = await request
            .post('https://desolate-bayou-65072.herokuapp.com/auth/signin')
            .send(this.state.loginEmail, this.state.loginPassword);

        localStorage.setItem('USERNAME', user.email);

        this.props.handleTokenChange(user.body.token);
        this.props.handleUsernameChange(user.body.email);

        this.setState({ loading: false })

        this.props.history.push('/map')
    }


    render() {
        return (
            <>
                <h2>gitThere: API</h2>
                <div><img src="https://www.placecage.com/g/700/450" alt="map-example" /></div>
                Sign Up
                <form onSubmit={this.handleSignupSubmit}>
                    <label>
                        Username: <input onChange={(e) => this.setState({ signUpEmail: e.target.value })} value={this.state.signUpEmail} type="email" />
                    </label>
                    <label>
                        Password: <input onChange={(e) => this.setState({ signUpPassword: e.target.value })} value={this.state.signUpPassword} type="password" />
                    </label>
                    {
                        this.state.loading
                            ? 'Loadddiiinnnnnggggggg'
                            : <button>Sign Up!</button>
                    }
                </form>
                Log In
                <form onSubmit={this.handleLoginSubmit}>
                    <label>
                        Username: <input onChange={(e) => this.setState({ loginEmail: e.target.value })} value={this.state.loginEmail} type="email" />
                    </label>
                    <label>
                        Password: <input onChange={(e) => this.setState({ loginPassword: e.target.value })} value={this.state.loginPassword} type="password" />
                    </label>
                    {
                        this.state.loading
                            ? 'Loadddiiinnnnnggggggg'
                            : <button>Log in!</button>
                    }
                </form>
            </>
        )
    }
}