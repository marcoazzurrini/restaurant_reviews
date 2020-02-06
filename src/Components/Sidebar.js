import React, { Component } from "react";
import ChevronRight from "../img/triangle_right.png";
import PlacesContext from "../Context/PlacesContext";
import Reviews from "../Components/Reviews";
import Filter from "../Components/Filter";

const calculateRating = ratingArr => {
  return (
    ratingArr.map(review => review.rating).reduce((acc, val) => acc + val) /
    ratingArr.length
  );
};

export default class Sidebar extends Component {
  state = { toggle: "" };

  toggleDisplay = () => {
    switch (this.state.toggle) {
      case "show":
        this.setState({ toggle: "" });
        break;
      case "":
        this.setState({ toggle: "show" });
        break;
      default:
        console.log("something went wrong");
    }
  };

  filterByRating = rating => {
    this.props.filterByRating(rating);
  };

  render() {
    return (
      <div className={`sidebar ${this.state.toggle}`}>
        <div
          onClick={this.toggleDisplay}
          className={`sidebar__toggle ${this.state.toggle}`}
        >
          <img src={ChevronRight} alt="toggle" />
        </div>
        <Filter filterByRating={this.filterByRating} />
        <PlacesContext.Consumer>
          {value =>
            value.details
              ? value.details.map((place, index) => {
                  return (
                    <div key={index} className="sidebar__item">
                      <h3 className="sidebar__item--name">{place.name}</h3>
                      <p className="sidebar__item--rating">
                        Rating:
                        {parseInt(calculateRating(place.reviews))}
                      </p>
                      <img
                        className="sidebar__item--img"
                        src={
                          place.geometry
                            ? `https://maps.googleapis.com/maps/api/streetview?size=400x250&location=${place.geometry.location.lat},${place.geometry.location.lng}&heading=151.78&pitch=-0.76&key=${process.env.REACT_APP_GOOGLE_API}`
                            : ""
                        }
                        alt="restaurant"
                      />

                      <Reviews
                        index={index}
                        addReview={this.props.addReview}
                        reviews={place.reviews}
                      />
                    </div>
                  );
                })
              : ""
          }
        </PlacesContext.Consumer>
      </div>
    );
  }
}
