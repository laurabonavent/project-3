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

import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import DarkRed from "../../images/dark-red.svg";
import Yellow from "../../images/yellow.svg";
import OrangeRed from "../../images/orange-red.svg";
import Purple from "../../images/purple.svg";
import LightOrange from "../../images/light-orange.svg";
import LightPink from "../../images/light-pink.svg";
import Rocket from "../../images/rocket.png";

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
    console.log("event: ", event);

    this.setState({
      filters: event,
      //[...new Set([...this.state.filters, ...event])], // newSet pour éviter d'avoir des doubons d'event
    });
  };

  changePage = (value) => {
    console.log("value: ", value);

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
    console.log("event.target.innerHTML: ", event.target.innerHTML);
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
        <Parallax
          ref={(ref) => (this.parallax = ref)}
          pages={4.55}
          className='home-container'>
          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            className='background'
            style={{
              //   backgroundImage: url("stars", true),
              backgroundSize: "cover",
            }}></ParallaxLayer>

          <ParallaxLayer
            offset={0.5}
            speed={0.5}
            style={{ opacity: 15 }}
            className='background'>
            <img
              src={DarkRed}
              alt=''
              style={{
                display: "block",
                width: "20%",
                marginLeft: "70%",
                marginTop: "-18%",
              }}
            />
            <img
              alt=''
              src={LightPink}
              style={{
                display: "block",
                width: "30%",
                marginLeft: "20%",
                marginTop: "-18%",
              }}
            />
            <img
              alt=''
              src={Purple}
              style={{
                display: "block",
                width: "20%",
                marginLeft: "65%",
                marginTop: "8%",
              }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.4} style={{ opacity: 10 }}>
            <img
              src={OrangeRed}
              alt=''
              style={{
                display: "block",
                width: "70%",
                marginLeft: "15%",
                marginTop: "-18%",
              }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.4} speed={-0.3} style={{ opacity: 10 }}>
            <img
              alt=''
              src={Purple}
              className='purple'
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
            <img
              alt=''
              src={LightOrange}
              className='light-orange'
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
            <img
              alt=''
              src={LightPink}
              className='light-pink'
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={0.9} speed={0.2} style={{ opacity: 5 }}>
            <img
              alt=''
              src={Yellow}
              style={{ display: "block", width: "10%", marginLeft: "10%" }}
            />
            <img
              alt=''
              src={LightOrange}
              style={{ display: "block", width: "20%", marginLeft: "75%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.0}
            speed={0}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}>
            <img className='dark-red' src={DarkRed} alt='' />
            <img className='yellow' src={Yellow} alt='' />
            <img className='orange-red' src={OrangeRed} alt='' />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0.5}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              margin: "-4% 0% 0% -3%",
            }}>
            <div className='footer'>
              <p>Website created with love</p>
              <img alt='' src={Rocket} style={{ width: "10%" }} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={0} factor={3} className='content'>
            <img src={this.props.userInSession.avatar} alt='' />
            <p>{this.props.userInSession.username}'s dashboard</p>
            <p>Email : {this.props.userInSession.email}</p>
            <Link to='/profile/edit'>
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
          </ParallaxLayer>
        </Parallax>
      </div>
    );
  }
}
