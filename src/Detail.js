import React, { Component } from 'react'
import './Detail.css';
import request from 'superagent';

export default class Detail extends Component {

    state = {
        trimetLocation: {}
    }

    componentDidMount = async () => {

        await this.fetchTrimetLocation();
    }

    fetchTrimetLocation = async () => {
        const { token } = this.props;

        const response = await request
            .get(`https://desolate-bayou-65072.herokuapp.com/api/trimet/detail?locid=${this.props.match.params.id}`)
            .set('Authorization', token)

        await this.setState({ trimetLocation: response.body })

    }
    makeThreeDigitNumber = (routeNumber) => {
        //if 3 digits add no zeros, if 2 digits add leading zero, if 1 digit add 2 leading zeros.
        const oneZero = '0';
        const twoZeros = '00';
        const threeDigitNumber = routeNumber.toString();

        if (threeDigitNumber.length === 2) {
            return oneZero.concat(threeDigitNumber);
        } else if (threeDigitNumber.length === 1) {
            return twoZeros.concat(threeDigitNumber)
        }
        return threeDigitNumber;
    }


    render() {
        console.log(this.makeThreeDigitNumber(this.state.trimetLocation.resultSet.arrival[0].route))

        console.log(this.state.trimetLocation.resultSet.arrival[0].route.toString())

        return (
            <div className='detailsPage'>
                <div className='subHeader'>
                    <h2>This is the details page. Will send query to Trimet based on the button clicked that has the location id that is fed into the API request and return next bus/train, query does return array that could also display more arrivals.</h2>
                </div>
                <section>
                    <div>
                        <h2>Route Number: {this.state.trimetLocation.resultSet.arrival[0].route}</h2>
                    </div>
                    <div>
                        <h3>Estimated arrival time to station/stop: {new Date(this.state.trimetLocation.resultSet.arrival[0].estimated).toLocaleTimeString('en-US')}</h3>
                    </div>
                </section>

                {/* Need digit code to be 3 digit but pull from data */}
                <img src={`https://trimet.org/schedules/img/${this.makeThreeDigitNumber(this.state.trimetLocation.resultSet.arrival[0].route)}.png`} alt='busmap'></img>

            </div>
        )
    }
}
