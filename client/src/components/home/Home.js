import React, { Component } from "react";
import { getRessources } from "../auth/auth-service";
import Card from "../card/Card";
import Filters from "../Filters";
import SearchBar from "../SearchBar";
import { Pagination } from "antd";

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

  render() {
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

    return (
      <>
        {this.state.ressources ? (
          <>
            <div>Le texte de présentation qui vend du rêve</div>
            <SearchBar handleChange={this.handleChange} />
            <button onClick={this.getRandomRessources}>Random button</button>
            <div>{this.state.randomRessource.title}</div>
            <Filters handleChange={this.getFilterValues} />

            <div className="home-card-container">
              {showedRessources &&
                showedRessources.length > 0 &&
                showedRessources
                  .slice(this.state.minValue, this.state.maxValue)
                  .map((val, index) => <Card data={val} key={index} />)}
            </div>

            <Pagination
              showSizeChanger={false}
              responsive
              defaultCurrent={1}
              onChange={this.changePage}
              total={showedRessources.length}
            />
            {/* <Card data={showedRessources} /> */}
          </>
        ) : (
          "Loading"
        )}
      </>
    );
  }
}
