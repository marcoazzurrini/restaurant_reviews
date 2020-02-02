import React, { Component } from "react";
import ChevronRight from "../img/triangle_right.png";

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

  render() {
    return (
      <div className={`sidebar ${this.state.toggle}`}>
        <div onClick={this.toggleDisplay} className="sidebar__toggle">
          <img src={ChevronRight} alt="toggle" />
        </div>
      </div>
    );
  }
}
