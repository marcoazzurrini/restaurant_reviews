import React, { Component } from "react";
import Map from "./Map";
import Sidebar from "./Sidebar";
import { fetchPlaces } from "../Utils/PlacesAPI";
import { fetchDetails } from "../Utils/PlacesDetails";
import PlacesJSON from "../Places/places.json";
import PlacesContext from "../Context/PlacesContext";

class App extends Component {
  state = {
    center: {},
    zoom: 11,
    details: PlacesJSON
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.startApp(center);
      });
    }
  }

  startApp = (center = this.state.center, rating = 1) => {
    this.setState({ details: PlacesJSON });
    fetchPlaces(center.lat, center.lng).then(data => {
      data.forEach(place => {
        fetchDetails(place.place_id).then(details =>
          this.setState({
            details: [...this.state.details, details.result].filter(
              place => place.rating > rating
            ),
            center: center
          })
        );
      });
    });
  };
  filterByRating = rating => {
    this.startApp(this.state.center, rating);
  };

  addPlace = (lat, lng, name, formatted_address) => {
    let newPlace = {
      name,
      formatted_address,
      geometry: {
        location: {
          lat: lat,
          lng: lng
        }
      },
      reviews: []
    };
    this.setState({ details: [...this.state.details, newPlace] });
  };

  addReview = (review, rating, index) => {
    let placeDetails = this.state.details;
    placeDetails[index].reviews.push({ text: review, rating });

    this.setState({ details: placeDetails });
  };

  render() {
    return (
      <PlacesContext.Provider value={this.state}>
        <Map
          center={this.state.center}
          zoom={this.state.zoom}
          places={this.state.places}
          addPlace={this.addPlace}
        />
        <Sidebar
          addReview={this.addReview}
          filterByRating={this.filterByRating}
        />
      </PlacesContext.Provider>
    );
  }
}

export default App;
