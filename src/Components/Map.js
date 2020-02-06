import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import PlacesContext from "../Context/PlacesContext";

import React, { Component } from "react";

export default class Map extends Component {
  state = {
    toggleInput: false,
    lat: "",
    lng: "",
    name: "",
    rating: "",
    x: "",
    y: ""
  };
  getLatLng = e => {
    console.log(e, e.clientX);
    if (this.state.toggleInput === false)
      this.setState({
        toggleInput: true,
        lat: e.lat,
        lng: e.lng,
        x: e.x,
        y: e.y
      });
    else this.setState({ toggleInput: false, name: "" });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  addMarker = e => {
    e.preventDefault();

    this.props.addPlace(
      this.state.lat,
      this.state.lng,
      this.state.name,
      this.state.rating
    );
    this.setState({ toggleInput: false, name: "" });
  };

  render() {
    if (this.props.center.lat) {
      return (
        <div style={{ height: "100vh", width: "100%" }}>
          {this.state.toggleInput ? (
            <form
              style={{
                zIndex: "5",
                position: "absolute",
                left: `${this.state.x}px`,
                top: `${this.state.y}px`
              }}
              onSubmit={this.addMarker}
            >
              <input
                type="text"
                id="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <input
                type="number"
                id="rating"
                value={this.state.rating}
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </form>
          ) : (
            ""
          )}
          <PlacesContext.Consumer>
            {value => (
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_API
                }}
                defaultCenter={value.center}
                defaultZoom={value.zoom}
                yesIWantToUseGoogleMapApiInternals
                onClick={this.getLatLng}
                // style={{ position: "relative" }}
              >
                {value.details
                  ? value.details.map((place, index) => {
                      return (
                        <Marker
                          lat={place.geometry.location.lat}
                          lng={place.geometry.location.lng}
                          key={index}
                        />
                      );
                    })
                  : ""}
              </GoogleMapReact>
            )}
          </PlacesContext.Consumer>
        </div>
      );
    } else return "";
  }
}
