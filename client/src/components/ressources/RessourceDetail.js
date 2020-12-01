import React, { Component } from "react";

import BackButton from "../BackButton";

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
    return (
      <div>
        {this.state.ressource &&
        this.state.ressource.technology &&
        this.state.ressource.type &&
        this.state.ressource.votes &&
        this.state.ressource.comments ? (
          <div>
            <h1>{ressource.title}</h1>
            <p>
              Technologies :
              {ressource.technology.map((technology, index) => {
                return <span key={index}>{technology} </span>;
              })}
            </p>
            <p>
              Types :
              {ressource.type.map((type, index) => {
                return <span key={index}>{type} </span>;
              })}
            </p>
            {ressource.votes.length === 0 ? (
              "No vote"
            ) : (
              <p>
                Votes :
                {ressource.votes.map((vote, index) => {
                  return <span key={index}>{vote} </span>;
                })}
              </p>
            )}
            <p>Languages : {ressource.language}</p>
            <p>Level : {ressource.level}</p>
            <p>Price : {ressource.price}</p>
            <p>
              <a href={ressource.link} rel='noreferrer' target='_blank'>
                Find your way
              </a>
            </p>
            <p>{ressource.description}</p>
            <p>
              <img src={ressource.image} alt={ressource.title} />
            </p>
            {ressource.comments.length === 0 ? (
              "No comment"
            ) : (
              <p>
                Comments :
                {ressource.comments.map((comment, index) => {
                  return <span key={index}>{comment} </span>;
                })}
              </p>
            )}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
