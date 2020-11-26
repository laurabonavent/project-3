import React, { Component } from "react";

import { getUser } from "../auth/auth-service";
import { getFavorites } from "../auth/auth-service";

import { AutoComplete } from "antd";

import Card from "./Card";
//const { Option } = AutoComplete;

export default class Profile extends Component {
  state = { user: {}, favorites: [], search: "" };

  findUserInfo = () => {
    getUser()
      .then((response) => {
        console.log("response", response);
        this.setState({ user: response.user });
      })
      .catch((error) => console.log(error));
  };

  findUserFavorites = () => {
    getFavorites()
      .then((response) => {
        console.log("favorites", response);
        // const autocompleteFavorite = response.favorites.map((favorite) => {
        //   return { value: favorite.title };
        // });
        // console.log(autocompleteFavorite);
        // this.setState({ favorites: autocompleteFavorite });
        this.setState({ favorites: response });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  componentDidMount() {
    this.findUserInfo();
    this.findUserFavorites();
  }

  render() {
    const user = this.state.user;
    //const options = this.state.favorites;
    const list = this.state.favorites.filter((item, index) => {
      return item.title.toLowerCase().includes(this.state.search.toLowerCase());
    });

    return (
      <div>
        {this.state.user && this.state.favorites ? (
          <div>
            <img src={user.avatar} alt="" />
            <p>{user.username}'s dashboard</p>
            <p>Email : {user.email}</p>
            {/* <AutoComplete
              //options={options}
              notFoundContent='Wait..'
              placeholder='Find a favorite'
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }>
              {options.map((option, index) => {
                console.log("one option", option);
                return <Option key={index} value={option.value} />;
              })}
            </AutoComplete> */}
            <form action="">
              <input
                type="search"
                name="search"
                placeholder="Search"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </form>
            {/* TODO : Rendre dynamiques les filtres avec les valeurs des enum du model */}
            <h3>Filtres</h3>
            <label>
              Technology
              <select multiple>
                <option value="option 1">Option 1</option>
                <option value="option 2">Option 2</option>
              </select>
            </label>
            <label>
              Type
              <select multiple>
                <option value="option 1">Option 1</option>
                <option value="option 2">Option 2</option>
              </select>
            </label>
            <h3>My favorites</h3>
            <Card data={list} />
            {/* {user.favorites.map((favorite, index) => (
              <Favorites favorite={favorite} />
            ))} */}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
