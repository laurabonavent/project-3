import React, { Component } from "react";
import { getUser, getFavorites } from "../auth/auth-service";
import Card from "../card/Card";
import Filters from "../Filters";
import SearchBar from "../SearchBar";
import { Pagination, Button } from "antd";
import isnull from "lodash.isnull";
import { Link } from "react-router-dom";
import { message } from "antd";
import Carousel from "../card/Carousel";

export default class Profile extends Component {
  state = {
    search: "",
    filters: [],
    minValue: 0,
    pageSize: 20,
    maxValue: 20,
    sortQuery: "",
  };

  // findUserInfo = () => {
  //   getUser()
  //     .then((response) => {
  //       console.log("response", response);
  //       this.setState({ user: response.user });
  //     })
  //     .catch((error) => console.log(error));
  // };

  // findUserFavorites = () => {
  //   getFavorites()
  //     .then((response) => {
  //       console.log("favorites", response);
  //       // const autocompleteFavorite = response.favorites.map((favorite) => {
  //       //   return { value: favorite.title };
  //       // });
  //       // console.log(autocompleteFavorite);
  //       // this.setState({ favorites: autocompleteFavorite });
  //       this.setState({ favorites: response });
  //     })
  //     .catch((error) => console.log(error));
  // };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  componentDidMount() {
    //this.findUserInfo();
    //this.findUserFavorites();
  }

  getFilterValues = (event) => {
    //console.log("event: ", event);

    this.setState({
      filters: event,
      //[...new Set([...this.state.filters, ...event])], // newSet pour éviter d'avoir des doubons d'event
    });
  };

  changePage = (value) => {
    //console.log("value: ", value);

    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: this.state.pageSize,
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * this.state.pageSize,
      });
    }
  };

  sortBy = (event) => {
    //console.log("event.target.innerHTML: ", event.target.innerHTML);
    if (
      event.target.innerHTML === "technology" ||
      event.target.innerHTML === "type"
    ) {
      this.setState({
        sortQuery: event.target.innerHTML,
      });
    } else {
      this.setState({
        sortQuery: "",
      });
    }
  };

  render() {
    if (isnull(this.props.userInSession)) return "..loading";

    let showedfavorites = this.props.userInSession.favorites.filter(
      (item, index) => {
        console.log("item", item);
        return item.title
          .toLowerCase()
          .includes(this.state.search.toLowerCase());
      }
    );

    let filteredRessources = [];
    showedfavorites.map((ressource) => {
      const valuesRess = [
        ...new Set([
          ...ressource.language,
          ...ressource.price,
          ...ressource.type,
          ...ressource.technology,
          ...ressource.level,
        ]),
      ];
      let checker = this.state.filters.every((filter) =>
        valuesRess.includes(filter)
      );
      if (checker) {
        filteredRessources.push(ressource);
        showedfavorites = filteredRessources;
      }

      return ressource;
    });

    return (
      <div>
        <img src={this.props.userInSession.avatar} alt="" />
        <p>{this.props.userInSession.username}'s dashboard</p>
        <p>Email : {this.props.userInSession.email}</p>
        <Link to="/profile/edit">
          <Button>Edit Profile</Button>
        </Link>
        <SearchBar handleChange={this.handleChange} />

        <h2>Sort by</h2>
        <Button onClick={this.sortBy}>technology</Button>
        <Button onClick={this.sortBy}>type</Button>
        <Button onClick={this.sortBy}>no sorting</Button>
        <Carousel data={showedfavorites} sortQuery={this.state.sortQuery} />
        {this.state.sortQuery === "" && (
          <Filters handleChange={this.getFilterValues} />
        )}
        {/* {showedfavorites &&
          showedfavorites.length > 0 &&
          showedfavorites
            .slice(this.state.minValue, this.state.maxValue)
            .map((val, index) => <Card data={val} key={index} />)}
        <Pagination
          showSizeChanger={false}
          responsive
          defaultCurrent={1}
          onChange={this.changePage}
          total={showedfavorites.length}
        /> */}
      </div>
    );
  }
}
