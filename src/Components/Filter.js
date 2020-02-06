import React from "react";

export default function Filter(props) {
  return (
    <select onChange={e => props.filterByRating(e.target.value)}>
      <option value="1">1 start</option>
      <option value="2">2 start</option>
      <option value="3">3 start</option>
      <option value="4">4+ start</option>
    </select>
  );
}
