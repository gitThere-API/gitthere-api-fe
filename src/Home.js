import React, { Component } from 'react'
import request from 'superagent';

export default class Home extends Component {

    state = {
        email: '',
        password: '',
        loading: false,
    }

    handleSignupSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);

        const user = await request
            .post('https://desolate-bayou-65072.herokuapp.com/signup')
            .send(this.state);

        localStorage.setItem('USERNAME', user.email);

        this.props.handleTokenChange(user.body.token);
        this.props.handleUsernameChange(user.body.email);

        this.props.history.push('/map')
    }

    handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);

        const user = await request
            .post('https://desolate-bayou-65072.herokuapp.com/signin')
            .send(this.state);

        localStorage.setItem('USERNAME', user.email);

        this.props.handleTokenChange(user.body.token);
        this.props.handleUsernameChange(user.body.email);

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
                        Username: <input onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} />
                    </label>
                    <label>
                        Password: <input onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} type="password" />
                    </label>
                    <button>Sign Up!</button>
                </form>
                Log In
                <form onSubmit={this.handleLoginSubmit}>
                    <label>
                        Username: <input onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} />
                    </label>
                    <label>
                        Password: <input onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} type="password" />
                    </label>
                    <button>Log in!</button>
                </form>
            </>
        )
    }
}
