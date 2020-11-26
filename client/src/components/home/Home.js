import React, { Component } from "react";
import { getRessources } from "../auth/auth-service";
import Card from "../profile/Card";

export default class Home extends Component {
  state = {
    ressources: [],
    search: "",
    randomRessource: [],
  };

  findRessources = () => {
    getRessources()
      .then((response) => {
        console.log("getRessources", response)
        return this.setState({ ressources: response });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  componentDidMount() {
    this.findRessources();
  }

  getRandomRessources = () => {
    let index = Math.floor(Math.random() * this.state.ressources.length);
    console.log(index);
    return this.setState({
      randomRessource: this.state.ressources[index],
    });
  };

  render() {
    let searchRessources = this.state.ressources.filter((el) => {
      return el.title
        .toLowerCase()
        .includes(this.state.search.toLocaleLowerCase());
    });
    console.log("findRessources",this.state.ressources)

    return (
      <>
        <div>NAVBAR</div>
        <div>Le texte de présentation qui vend du rêve</div>
        <input onChange={this.handleChange}></input>
        <button onClick={this.getRandomRessources}>Random button</button>
        <div>{this.state.randomRessource.title}</div>
        <div>Filters</div>
        {this.props.ressources ? ( 
          <Card data={this.props.ressources} />)
          : ( "Loading...")
        }
        
      </>
    );
  }
}
