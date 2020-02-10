import React, { Component } from "react";
import showMoreSVG from "../img/open-menu.svg";

export default class Reviews extends Component {
  state = { review: "", rating: "", toggleReviews: 1 };

  handleChange = e => {
    this.setState({ [e.target.dataset.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.addReview(
      this.state.review,
      this.state.rating,
      this.props.index
    );
    this.setState({ review: "", rating: "" });
  };

  toggleReviews = () => {
    this.state.toggleReviews === 1
      ? this.setState({ toggleReviews: this.props.reviews.length })
      : this.setState({ toggleReviews: 1 });
  };
  render() {
    return (
      <div>
        <ul className="sidebar__reviews">
          {this.props.reviews.map((review, index) => {
            if (index < this.state.toggleReviews) {
              return (
                <li className="sidebar__reviews--item" key={index}>
                  <p className="sidebar__reviews--text">{review.text}</p>
                  <p className="sidebar__reviews--rating">
                    Rating :{review.rating}
                  </p>
                </li>
              );
            }
            return "";
          })}
        </ul>
        <button
          className="sidebar__reviews--btnOutline"
          onClick={this.toggleReviews}
        >
          Show more <img src={showMoreSVG} alt="show more" />
        </button>
        <form onSubmit={this.onSubmit}>
          <input
            className="sidebar__reviews--input"
            type="text"
            data-id="review"
            placeholder="Enter review"
            value={this.state.review}
            onChange={this.handleChange}
          />
          <input
            className="sidebar__reviews--input"
            type="number"
            data-id="rating"
            placeholder="Enter rating"
            value={this.state.rating}
            onChange={this.handleChange}
          />
          <button className="sidebar__reviews--btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
