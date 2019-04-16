import React, { Component } from "react";
import axios from "axios";

class JobList extends Component {
  state = {
    jobs: []
  };

  componentDidMount() {
    this.loadJobs(this.props.id);
  }

  componentWillReceiveProps(newProps) {
    this.loadJobs(newProps.id);
  }

  loadJobs(id) {
    axios.get(`/api/businesses/${id}/jobs`).then(response => {
      this.setState({ jobs: response.data });
    });
  }

  render() {
    if (this.state.jobs.length === 0) {
      return (
        <div className="small-font">Currently not hiring at this moment.</div>
      );
    }
    return (
      <ol className="small-font">
        {this.state.jobs.map(job => (
          <li>
            <b> Job: </b> {job.title}, {job.schedule_type} <br />
            <b> Posted Date: </b> {job.posted_date} <br />
            <b> Pay Range: </b> {job.pay_range} <br />
            <b> Requirements: </b> {job.requirements} <br />
            <b> Description: </b> {job.description} <br />
            <b> How to Apply: </b> {job.how_to_apply}
          </li>
        ))}
      </ol>
    );
  }
}

export default JobList;
