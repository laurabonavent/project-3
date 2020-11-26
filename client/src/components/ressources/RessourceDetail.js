import React, { Component } from "react";

import { getOneRessource } from "../auth/auth-service";

export default class RessourceDetail extends Component {
  state = { ressource: {} };

  findRessource = (id) => {
    getOneRessource(id)
      .then((response) => {
        console.log("response", response);
        this.setState({ ressource: response });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.findRessource(params.id);
  }

  render() {
    const ressource = this.state.ressource;
    console.log("ressource", ressource);
    return (
      <div>
        {this.state.ressource ? (
          <div>
            <h1>{ressource.title}</h1>
            {/* <ul>
              {this.state.technology.map((techno) => {
                return <li>{techno}</li>;
              })}
            </ul> */}
            <a href={ressource.link} rel='noreferrer' target='_blank'>
              Find your way
            </a>
            <p>{ressource.description}</p>
            <img src={ressource.image} alt={ressource.title} />
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
