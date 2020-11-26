import React, { Component } from "react";

export default class Favorites extends Component {
  state = { favorites: this.props.favorites };

  render() {
    const favorites = this.props.favorites;
    return (
      <div>
        {favorites.map((favorite, index) => {
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
        })}
      </div>
    );
  }
}
