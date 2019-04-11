import React, { Component } from 'react'
import ListJobs from '../components/ListJobs'



class HomePage extends Component {
  render() {
    return <div className="center">
    <h1>Jobs Near you</h1>
    <h4>A simple app to show you a map of the places hiring near your!</h4>
    {/* <ListJobs /> */}
    </div>
  }
}

export default HomePage

// googlemaps api key: AIzaSyDjPXB1ZTe7m6ns_8Ma4KmsaSwCR2_KzjU
// jobs api key: 
// https://github.com/toddmotto/public-apis#jobs
