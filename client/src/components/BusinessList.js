import React, { Component } from 'react';
import axios from 'axios'
import BusinessDetail from '../components/BusinessDetail'
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
               <div className="center"> <input type="search" placeholder="Search by Address or Zipcode"></input>
    <button className="search">Search</button>  
    <p></p> </div>
                    <Map businesses={this.state.businesses} />
              <ul>
                  {
                      this.state.businesses.map(business => 
                    <BusinessDetail key={business.id} business={business} />
                      )}
            </ul>  
            </div>
        );
    }
}

export default BusinessList;