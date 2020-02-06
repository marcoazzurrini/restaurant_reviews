import React, { Component } from "react";

export default class Reviews extends Component {
  state = { review: "", rating: "" };

  handleChange = e => {
    this.setState({ [e.target.dataset.id]: e.target.value });
  };

  // componentDidMount() {
  //   this.setState({ reviews: this.props.reviews });
  // }

  onSubmit = e => {
    e.preventDefault();

    this.props.addReview(
      this.state.review,
      this.state.rating,
      this.props.index
    );
  };
  render() {
    return (
      <div>
        <ul className="sidebar__reviews">
          {this.props.reviews.map((review, index) => {
            return (
              <li className="sidebar__reviews--item" key={index}>
                {review.text}
                <p>{review.rating}</p>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.onSubmit}>
          <input
            className="sidebar__reviews--input"
            type="text"
            data-id="review"
            value={this.state.review}
            onChange={this.handleChange}
          />
          <input
            className="sidebar__reviews--input"
            type="number"
            data-id="rating"
            value={this.state.rating}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
