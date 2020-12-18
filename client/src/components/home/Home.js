import React, { Component } from "react";
import { getRessources } from "../auth/auth-service";
import Card from "../card/Card";
import Filters from "../Filters";
import SearchBar from "../SearchBar";
import Loading from "../Loading";
import { Button, Popover } from "antd";
import { Spring, animated } from "react-spring/renderprops";

import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import DarkRed from "../../images/dark-red.svg";
import Yellow from "../../images/yellow.svg";
import OrangeRed from "../../images/orange-red.svg";
import Purple from "../../images/purple.svg";
import LightOrange from "../../images/light-orange.svg";
import LightPink from "../../images/light-pink.svg";
import Rocket from "../../images/rocket.svg";
import Arrow from "../../images/down-arrow.svg";
import LogoRocket from "../../images/logo-rocket.svg";
import Cat1 from "../../images/cat/chat1.png";

export default class Home extends Component {
  state = {
    ressources: [],
    search: "",
    randomRessource: [],
    filters: [],
    minValue: 0,
    pageSize: 10,
    maxValue: 10,
    offSetValue: 5.7,
  };

  componentDidMount() {
    this.findRessources();
  }

  findRessources = () => {
    getRessources()
      .then((response) => {
        return this.setState({ ressources: response });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  getRandomRessources = () => {
    let index = Math.floor(Math.random() * this.state.ressources.length);
    return this.setState({
      randomRessource: this.state.ressources[index],
    });
  };

  hideRandom = () => {
    this.setState({
      randomRessource: [],
    });
  };

  getFilterValues = (event) => {
    this.setState({
      filters: event,
      //[...new Set([...this.state.filters, ...event])], // newSet pour éviter d'avoir des doubons d'event
    });
  };

  loadMore = (value) => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: this.state.pageSize,
      });
    } else {
      this.setState({
        //minValue: this.state.maxValue,
        maxValue: this.state.maxValue + this.state.pageSize,
      });
    }
  };

  render() {
    let showedRessources = this.state.ressources.filter((el) => {
      return el.title.toLowerCase().includes(this.state.search.toLowerCase());
    });

    let filteredRessources = [];
    showedRessources.map((ressource) => {
      const valuesRess = [
        ...new Set([
          ...ressource.language,
          ...ressource.price,
          ...ressource.type,
          ...ressource.technology,
          ...ressource.level,
        ]),
      ];
      // ["french", "free", "article", "", "javascript", "html", "css", "padawan"]

      // checker si les tous filtres sont compris dans les valeurs de la ressource en question
      let checker = this.state.filters.every((filter) =>
        valuesRess.includes(filter)
      ); // return true or false

      // Si les tous les filters sont contenus dans les valeurs de la ressource, alors filtrer showed ressources.
      if (checker) {
        filteredRessources.push(ressource);
        showedRessources = filteredRessources; // méthode brutus
      }

      // showedRessources.filter((ress) => {
      //   return ress._id === ressource._id;
      // });
      //}
    });

    return (
      <>
        <div className="header">
          <div className="random-content">
            <Popover
              placement="left"
              content={<Card data={this.state.randomRessource} />}>
              <button onClick={this.getRandomRessources}></button>
            </Popover>

            {/* {this.state.randomRessource.length !== 0 && (
              <div>
                <Button onClick={this.hideRandom}>X</Button>
                <Card data={this.state.randomRessource} />
              </div>
            )} */}
          </div>
          <div className="header-top">
            <img src={LogoRocket} alt="logorocket" />
          </div>
          <div className="header-bottom">
            <div className="header-h1">To infinity, and beyond!</div>
            <p>
              Find resources to continue your training after IronHack and all
              the useful tools to make your developers' life easier.
            </p>
            <span className="scroll-down et-pb-icon show_icon">
              <img className="arrow" src={Arrow} alt="arrow" />
            </span>
          </div>
        </div>
        <div className="search-container">
          <div className="title-search-container">
            Search your happiness here
          </div>
          <SearchBar handleChange={this.handleChange} />

          <Filters handleChange={this.getFilterValues} />
        </div>

        <div className="home-container background-full">
          <div className="content">
            {this.state.ressources ? (
              <>
                <div className="home-card-container">
                  {showedRessources &&
                    showedRessources.length > 0 &&
                    showedRessources
                      .slice(this.state.minValue, this.state.maxValue)
                      .map((val, index) => <Card data={val} key={index} />)}
                </div>

                <Button className="load-more" onClick={this.loadMore}>
                  Load more
                </Button>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </>
    );
  }
}
