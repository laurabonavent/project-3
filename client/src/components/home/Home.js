import React, { Component } from "react";
import { getRessources } from "../auth/auth-service";
import Card from "../card/Card";
import Filters from "../Filters";
import SearchBar from "../SearchBar";
import { Pagination, Button } from "antd";
import { Spring, animated } from "react-spring/renderprops";

import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import DarkRed from "../../images/dark-red.svg";
import Yellow from "../../images/yellow.svg";
import OrangeRed from "../../images/orange-red.svg";
import Purple from "../../images/purple.svg";
import LightOrange from "../../images/light-orange.svg";
import LightPink from "../../images/light-pink.svg";
import Rocket from "../../images/rocket.png";

export default class Home extends Component {
  state = {
    ressources: [],
    search: "",
    randomRessource: [],
    filters: [],
    minValue: 0,
    pageSize: 10,
    maxValue: 10,
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
    //console.log(index);
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

  loadMore = (value) => {
    //console.log("value: ", value);

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
    console.log("coucou", this.state.randomRessource);
    // filtrer les réponses en fonction de la search bar
    let showedRessources = this.state.ressources.filter((el) => {
      return el.title.toLowerCase().includes(this.state.search.toLowerCase());
    });
    //console.log("showedRessources: ", showedRessources);
    // [{...}, {...}, ...]

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

    const { toggle } = this.state;

    return (
      <>
        <div className="header">
          <div className="multiple-h1">
            <h1>{`<Link to=`}</h1>
            <h1>infinity, and beyond!</h1>
            <h1>{`/>`}</h1>
          </div>
          <p>
            Skyrocket, a website made with lots of love and kittens, lists
            resources to help you continue your training after IronHack, but
            also all the useful tools to make your developers' life easier.
          </p>
        </div>
        <Parallax
          ref={(ref) => (this.parallax = ref)}
          pages={4.55}
          className="home-container">
          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            className="background"
            style={{
              //   backgroundImage: url("stars", true),
              backgroundSize: "cover",
            }}></ParallaxLayer>

          <ParallaxLayer
            offset={0.5}
            speed={0.5}
            style={{ opacity: 15 }}
            className="background">
            <img
              src={DarkRed}
              alt=""
              style={{
                display: "block",
                width: "20%",
                marginLeft: "70%",
                marginTop: "-18%",
              }}
            />
            <img
              alt=""
              src={LightPink}
              style={{
                display: "block",
                width: "30%",
                marginLeft: "20%",
                marginTop: "-18%",
              }}
            />
            <img
              alt=""
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
              alt=""
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
              alt=""
              src={Purple}
              className="purple"
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
            <img
              alt=""
              src={LightOrange}
              className="light-orange"
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
            <img
              alt=""
              src={LightPink}
              className="light-pink"
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={0.9} speed={0.2} style={{ opacity: 5 }}>
            <img
              alt=""
              src={Yellow}
              style={{ display: "block", width: "10%", marginLeft: "10%" }}
            />
            <img
              alt=""
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
            <img className="dark-red" src={DarkRed} alt="" />
            <img className="yellow" src={Yellow} alt="" />
            <img className="orange-red" src={OrangeRed} alt="" />
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
            <div className="footer">
              <p>Website created with love</p>
              <img alt="" src={Rocket} style={{ width: "10%" }} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={0} factor={3} className="content">
            {this.state.ressources ? (
              <>
                <div className="search-container">
                  <SearchBar
                    className="search-bar"
                    handleChange={this.handleChange}
                  />

                  <Filters
                    className="filters-bar"
                    handleChange={this.getFilterValues}
                  />
                </div>
                <Button onClick={this.getRandomRessources}>
                  Get a random ressource
                </Button>

                {this.state.randomRessource.length !== 0 && (
                  <div>
                    <Button onClick={this.hideRandom}>X</Button>
                    <Card data={this.state.randomRessource} />
                  </div>
                )}

                <div className="home-card-container">
                  {showedRessources &&
                    showedRessources.length > 0 &&
                    showedRessources
                      .slice(this.state.minValue, this.state.maxValue)
                      .map((val, index) => <Card data={val} key={index} />)}
                </div>

                <Button onClick={this.loadMore}>Load More</Button>

                {/* <Pagination
                  showSizeChanger={false}
                  responsive
                  defaultCurrent={1}
                  onChange={this.changePage}
                  total={showedRessources.length}
                /> */}
              </>
            ) : (
              "Loading"
            )}
          </ParallaxLayer>
        </Parallax>
      </>
    );
  }
}
