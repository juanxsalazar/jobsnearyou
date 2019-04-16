import React, { Component } from 'react';
import axios from 'axios'
import Map from '../components/Map'

class BusinessList extends Component {
state = {
    businesses: [] 
}

componentDidMount() {
    axios.get('/api/businesses/').then(response => {
        this.setState({businesses: response.data })
    })
}

    render() {
        return (
            <div>
                    <Map businesses={this.state.businesses} />
            </div>
        );
    }
}

export default BusinessList;