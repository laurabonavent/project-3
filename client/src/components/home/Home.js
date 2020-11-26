import React, { Component } from "react";
import { getRessources } from "../auth/auth-service";
import Card from "../card/Card";

export default class Home extends Component {
  state = {
    ressources: [],
    search: "",
    randomRessource: [],
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
    console.log(index);
    return this.setState({
      randomRessource: this.state.ressources[index],
    });
  };

  

  render() {
    const searchRessources = this.state.ressources.filter((el) => {
      return el.title
        .toLowerCase()
        .includes(this.state.search.toLocaleLowerCase());
    });

    return (
      <>
        {this.state.ressources ? (
          <>
            <div>NAVBAR</div>
            <div>Le texte de présentation qui vend du rêve</div>
            <input onChange={this.handleChange}></input>
            <button onClick={this.getRandomRessources}>Random button</button>
            <div>{this.state.randomRessource.title}</div>
            <div>Filter Techno</div>
            <div>Filter type</div>
            <div>Filter language</div>
            <div>Filter price</div>
            <div>Filter level</div>
            <Card data={searchRessources} />
          </>
        ) : (
          "Loading"
        )}
      </>
    );
  }
}
