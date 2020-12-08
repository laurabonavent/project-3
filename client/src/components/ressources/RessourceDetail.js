import React, { Component } from "react";

import { getOneRessource } from "../auth/auth-service";
import { addFavorite } from "../auth/auth-service";
import { deleteFavorite } from "../auth/auth-service";
import { deleteRessource } from "../auth/auth-service";

import { Link } from "react-router-dom";

import { Button, Popconfirm, message } from "antd";
import isnull from "lodash.isnull";

export default class RessourceDetail extends Component {
  state = { ressource: {} };

  findRessource = (id) => {
    getOneRessource(id)
      .then((response) => {
        //console.log("response", response);
        this.setState({ ressource: response });
      })
      .catch((error) => console.log(error));
  };

  addAFavorite = (id) => {
    addFavorite(this.state.ressource._id)
      .then((response) => {
        console.log("addFav", response);
        const user = response.user;
        this.props.updateUser({ user });
        this.setState({ fav: true });
        message.info(response.message);
      })
      .catch((error) => {
        message.info(error.message);
        console.log(error);
      });
  };

  deleteFavorite = (id) => {
    deleteFavorite(this.state.ressource._id)
      .then((response) => {
        console.log("deletFav", response.data);
        const user = response.user;
        console.log(user);
        this.props.updateUser({ user });
        this.setState({ fav: false });
        message.info(response.message);
      })
      .catch((error) => {
        message.info(error.message);
        console.log(error);
      });
  };

  deleteRessource = (id) => {
    deleteRessource(this.state.ressource._id)
      .then((response) => {
        console.log("deleteRessource", response.data);
        this.props.history.push("/");
        console.log(this.props.history);
      })
      .catch((error) => {
        message.info(error.message);
        console.log(error);
      });
  };

  cancel = (e) => {
    console.log(e);
    message.error("Change your mind ?");
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.findRessource(params.id);
    //console.log("userInSession", this.props.userInSession);

    if (isnull(this.props.userInSession)) return "..loading";

    if (this.props.userInSession === false) {
      message.info("You need to log in before access this page");
      this.props.history.push("/");
      //return <Redirect to="/" />;
      return;
    }

    if (this.props.userInSession.favorites.includes(params.id)) {
      this.setState({ fav: true });
    } else {
      this.setState({ fav: false });
    }
  }

  render() {
    const ressource = this.state.ressource;
    //console.log(this.props);
    return (
      <div>
        {this.state.ressource &&
        this.state.ressource.technology &&
        this.state.ressource.type &&
        this.state.ressource.votes &&
        this.state.ressource.comments ? (
          <div>
            <h1>{ressource.title}</h1>
            {this.state.fav === true ? (
              <p>
                <Button onClick={this.deleteFavorite}>Delete favorite</Button>
              </p>
            ) : (
              <p>
                <Button onClick={this.addAFavorite}>Add favorite</Button>
              </p>
            )}
            {this.props.userInSession.role === "admin" ? (
              <div>
                <Link to={`/ressources/edit/${this.state.ressource._id}`}>
                  Edit
                </Link>
                {/* <Button onClick={this.deleteRessource}>Delete</Button> */}
                <Popconfirm
                  title='Are you sure to delete this ressource?'
                  onConfirm={this.deleteRessource}
                  onCancel={this.cancel}
                  okText='Yes I do'
                  cancelText='Nope'>
                  <a href='#' alt='delete'>
                    Delete
                  </a>
                </Popconfirm>
              </div>
            ) : null}
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
