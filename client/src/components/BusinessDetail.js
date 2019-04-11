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
                <ul>
                {
                        this.state.jobs.map(job => <li>
                       {job.title}    
                        </li>)
                    }
                    </ul>
            </div>
        );
    }
}

export default BusinessDetail;