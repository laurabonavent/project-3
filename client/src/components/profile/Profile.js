import React, { Component } from "react";

import { getUser } from "../auth/auth-service";
import { getFavorites } from "../auth/auth-service";

import { AutoComplete } from "antd";

import Card from "./Card";

// TODO : Rendre dynamique les options avec les favoris de l'utilisateur dans options
const options = [
  {
    value: "Favorite 1",
  },
  {
    value: "Favorite 2",
  },
  {
    value: "Favorite 3",
  },
];

export default class Profile extends Component {
  state = { user: null, favorites: null };

  findUserInfo = () => {
    getUser()
      .then((response) => {
        this.setState({ user: response.user });
      })
      .catch((error) => console.log(error));
  };

  findUserFavorites = () => {
    getFavorites()
      .then((response) => {
        this.setState({ favorites: response.favorites });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.findUserInfo();
    this.findUserFavorites();
  }

  render() {
    // const options = this.state.favorites.map((favorite) => {
    //   return { value: favorite.title };
    // });
    // console.log(options);
    const user = this.state.user;
    return (
      <div>
        {this.state.user ? (
          <div>
            <img src={user.avatar} alt='' />
            <p>{user.username}'s dashboard</p>
            <p>Email : {user.email}</p>
            <AutoComplete
              style={{
                width: 200,
              }}
              options={options}
              placeholder='Find a favorite'
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
            {/* TODO : Rendre dynamiques les filtres avec les valeurs des enum du model */}
            <h3>Filtres</h3>
            <label>
              Technology
              <select multiple>
                <option value='option 1'>Option 1</option>
                <option value='option 2'>Option 2</option>
              </select>
            </label>
            <label>
              Type
              <select multiple>
                <option value='option 1'>Option 1</option>
                <option value='option 2'>Option 2</option>
              </select>
            </label>
            <h3>My favorites</h3>
            {user.favorites.map((favorite) => (
              <Card data={favorite} />
            ))}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
