import React, { Component } from "react";
import { getUser, getFavorites } from "../auth/auth-service";
import Card from "../card/Card";
import Filters from "../Filters";
import SearchBar from "../SearchBar";
import { Pagination, Button } from "antd";
import isnull from "lodash.isnull";
import { Link } from "react-router-dom";
import { message } from "antd";
import Carousel2 from "../card/Carousel2";

import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import DarkRed from "../../images/dark-red.svg";
import Yellow from "../../images/yellow.svg";
import OrangeRed from "../../images/orange-red.svg";
import Purple from "../../images/purple.svg";
import LightOrange from "../../images/light-orange.svg";
import LightPink from "../../images/light-pink.svg";
import Rocket from "../../images/rocket.svg";

import { VscListSelection } from "react-icons/vsc";

import BackButton from "../nav/BackButton";
import Loading from "../Loading";

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
    console.log("WW PROFILE.JS", this.props.windowWidth);
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
    if (isnull(this.props.userInSession)) return <Loading />;

    let showedfavorites = this.props.userInSession.favorites.filter(
      (item, index) => {
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
    console.log("showedFav", showedfavorites);

    return (
      <div className="profile-container">
        <BackButton />

        <div className="welcome-block">
          <img
            className="avatar"
            src={this.props.userInSession.avatar}
            alt=""
          />
          <div className="welcome-block-text">
            <h1>
              {this.props.userInSession.username.charAt(0).toUpperCase() +
                this.props.userInSession.username.slice(1)}
              's dashboard
            </h1>
            <div className="welcome-block-buttons-flex">
              <Link className="button-ressource" to="/profile/edit">
                <Button>✍️</Button>
              </Link>

              {this.props.userInSession.role === "admin" ? (
                <div>
                  <Link className="button-ressource" to="/ressource/create">
                    <Button>Add ressource</Button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="search-container">
          <div className="title-search-container">Search in your favorites</div>
          <SearchBar handleChange={this.handleChange} />
          <span className="sort-title">Sort by </span>
          <div className="sort-buttons">
            <Button className="button-sort-profile" onClick={this.sortBy}>
              <VscListSelection
                style={{ height: "1.5em", width: "1.5em" }}
                viewBox="0 0 15 15"
              />
            </Button>
            <Button className="button-sort-profile" onClick={this.sortBy}>
              technology
            </Button>
            <Button className="button-sort-profile" onClick={this.sortBy}>
              type
            </Button>
          </div>
        </div>
        <div className="content background-full">
          <Carousel2 data={showedfavorites} sortQuery={this.state.sortQuery} />

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
      </div>
    );
  }
}
