import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import PlacesJSON from "../Places/places.json";
import Marker from "./Marker";
import { fetchPlaces } from "../Utils/PlacesAPI";

class Map extends Component {
  state = {
    center: {},
    zoom: 11,
    places: PlacesJSON
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        fetchPlaces(center.lat, center.lng).then(data =>
          this.setState({
            places: [...this.state.places, ...data],
            center: center
          })
        );
      });
    }
  }

  render() {
    if (this.state.center.lat) {
      return (
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_API
            }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            {this.state.places.map((place, index) => {
              return (
                <Marker
                  lat={place.geometry.location.lat}
                  lng={place.geometry.location.lng}
                  key={index}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      );
    } else return "";
  }
}

export default Map;
