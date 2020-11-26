import React, { Component } from "react";

export default class Favorites extends Component {
  state = { favorite: this.props.favorite };

  render() {
    const favorite = this.props.favorite;
    return (
      <div>
        <a href={favorite.link} rel='noreferrer' target='_blank'>
          {favorite.title}
        </a>
        <p>{favorite.description}</p>
        <ul>
          {favorite.type.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </div>
    );
  }
}
