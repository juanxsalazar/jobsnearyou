import React, { Component } from "react";
import MapGL, { Marker, NavigationControl, Popup } from "react-map-gl";
import axios from "axios";
import ppl from "../images/ppl.png";
import cash from "../images/cash.png";
import JobList from "./JobList";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      userLocation: null,
      popupInfo: null,
      sideBarJobs: null,
      viewport: {
        latitude: 27.7700989,
        longitude: -82.6364093,
        zoom: 12.5,
        bearing: 0,
        pitch: 0
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      this.setState({
        userLocation: { lat: latitude, lng: longitude }
      });
    });
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  navStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px"
  };

  renderSideBarJobs = () => {
    const { popupInfo } = this.state;

    if (!popupInfo) {
      return (
        <div>
          <h3>Please click on a marker to see job postings.</h3>
        </div>
      );
    }

    return <JobList id={popupInfo.id} />;
  };

  renderPopup = () => {
    const { popupInfo } = this.state;

    if (!popupInfo) {
      return;
    }

    return (
      <Popup
        tipSize={10}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => {
          this.setState({ popupInfo: null });
        }}
      >
        <div className="infobox">
          <p>{popupInfo.name}</p>
          <p>{popupInfo.address}</p>
        </div>
      </Popup>
    );
  };

  searchChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  doSearch = event => {
    axios
      .get(`/api/geocode/lookup?search=${this.state.search}`)
      .then(response => {
        this.setState({
          userLocation: { lat: response.data[0], lng: response.data[1] },
          viewport: {
            latitude: response.data[0],
            longitude: response.data[1],
            zoom: 12.5,
            bearing: 0,
            pitch: 0
          }
        });
      });
  };

  render() {
    const { viewport } = this.state;

    return (
      <>
        <div className="center">
          <input
            type="search"
            onChange={this.searchChange}
            value={this.search}
            placeholder="Search by Address or Zipcode"
          />
          <button onClick={this.doSearch} className="search">
            Search
          </button>
        </div>
        <div id="map" className="map">
          <div className="sidebar">{this.renderSideBarJobs()}</div>
          <MapGL
            {...viewport}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken="pk.eyJ1IjoianVhbjIzc2FsYXphciIsImEiOiJjanUyaW0xMWIwY3QxNDRvN3ZnMW91N3BxIn0._YtrtrN7f2ba2F4S3HVL2Q"
            onViewportChange={this._updateViewport}
          >
            {this.renderPopup()}
            {this.props.businesses.map(business => (
              <Marker
                latitude={business.latitude}
                longitude={business.longitude}
                offsetTop={-32}
                offsetLeft={-16}
              >
                <img
                  width={32}
                  height={32}
                  src={cash}
                  onClick={() => {
                    this.setState({ popupInfo: business });
                  }}
                />
              </Marker>
            ))}
            {this.state.userLocation && (
              <Marker
                latitude={this.state.userLocation.lat}
                longitude={this.state.userLocation.lng}
                offsetTop={-32}
                offsetLeft={-16}
              >
                <img width={32} height={32} src={ppl} />
              </Marker>
            )}
            <div className="nav" style={this.navStyle}>
              <NavigationControl onViewportChange={this._updateViewport} />
            </div>
          </MapGL>
        </div>
      </>
    );
  }
}

export default Map;
