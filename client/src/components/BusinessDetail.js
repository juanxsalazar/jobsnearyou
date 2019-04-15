import React, { Component } from 'react';
import axios from 'axios'

class BusinessDetail extends Component {
   state = {
    jobs: []
   }

componentDidMount() {
    this.loadJobs(this.props.id)
}

componentWillReceiveProps(newProps) {
    this.loadJobs(newProps.id)
}

loadJobs(id) {
    axios
    .get(`/api/businesses/${id}/jobs`)
    .then(response => {
        this.setState({ jobs: response.data})
    })
 
}

    render() {
        return (
            <div> 
                {
                        this.state.jobs.map(job => <p>
                       Job: {job.title}, {job.schedule_type}  <br></br>   
                       Posted Date: {job.posted_date} <br></br>
                       Pay Range: {job.pay_range}      <br></br>
                       Requirements: {job.requirements}   <br></br>     
                       Description: {job.description}    <br></br>    
                       How to Apply: {job.how_to_apply}         
                        </p>)
                    }
        
            </div>
        );
    }
}

export default BusinessDetail;