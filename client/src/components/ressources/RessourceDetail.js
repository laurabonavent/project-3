import React, { Component } from "react";

import { getOneRessource } from "../auth/auth-service";
import { addFavorite } from "../auth/auth-service";
import { deleteFavorite } from "../auth/auth-service";
import { deleteRessource } from "../auth/auth-service";

import { getCats } from "../auth/cat-service";

import { Link } from "react-router-dom";

import { Button, Popconfirm, message } from "antd";
import isnull from "lodash.isnull";

import BackGround from "../BackGround";

import { randomCats } from "../auth/cat-service";
import { cat } from "../auth/cat-service";

export default class RessourceDetail extends Component {
  state = {
    ressource: {},
  };

  // getOneCat = () => {
  //   getCats()
  //     .then((response) => {
  //       console.log("response", response.url);
  //       this.setState({ image: response.url });
  //     })
  //     .catch((error) => console.log(error));
  // };

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
        //console.log("response", response);
        //console.log("addFav", response);
        const user = response.user;
        this.props.updateUser(user);
        this.setState({ fav: true });
        message.success(response.message);
      })
      .catch((error) => {
        message.error(error.message);
        console.log(error);
      });
  };

  deleteFavorite = (id) => {
    deleteFavorite(this.state.ressource._id)
      .then((response) => {
        //console.log("deletFav", response);
        const user = response.user;
        //console.log("new user update - delete", user);
        this.props.updateUser(user);
        this.setState({ fav: false });
        message.success(response.message);
      })
      .catch((error) => {
        message.error(error.message);
        console.log(error);
      });
  };

  deleteRessource = (id) => {
    deleteRessource(this.state.ressource._id)
      .then((response) => {
        //console.log("deleteRessource", response.data);
        this.props.history.push("/");
        console.log(this.props.history);
      })
      .catch((error) => {
        message.error(error.message);
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

    console.log("image", this.state.image);

    if (isnull(this.props.userInSession)) {
      return <div>Loading...</div>;
    }

    if (this.props.userInSession === false) {
      message.error("You need to log in before access this page");
      this.props.history.push("/");
      //return <Redirect to="/" />;
      return;
    }

    let favIds = [];
    this.props.userInSession.favorites.map((favorite) => {
      favIds.push(favorite._id);
      //console.log(favIds);
    });

    if (favIds.includes(this.props.match.params.id)) {
      //console.log("fav yes");
      this.setState({ fav: true });
    } else {
      //console.log("fav no");
      this.setState({ fav: false });
    }
  }

  render() {
    const ressource = this.state.ressource;
    let language = ressource.language;
    let level = ressource.level;
    let price = ressource.price;
    //console.log(this.props);

    if (isnull(this.props.userInSession)) {
      return <div>Loading...</div>;
    }

    return (
      <div className='main detail-ressource'>
        <BackGround />
        {this.state.ressource &&
        this.state.ressource.technology &&
        this.state.ressource.type &&
        this.state.ressource.votes &&
        this.state.ressource.comments ? (
          <div>
            <h1>{ressource.title}</h1>
            <div className='button-ressource'>
              {this.state.fav === true ? (
                <p>
                  <Button onClick={this.deleteFavorite}>
                    Delete favorite 🌟
                  </Button>
                </p>
              ) : (
                <p>
                  <Button onClick={this.addAFavorite}>Add favorite ⭐️ </Button>
                </p>
              )}
              {this.props.userInSession.role === "admin" ? (
                <div className='admin-button'>
                  <Link
                    className='ant-btn'
                    to={`/ressources/edit/${this.state.ressource._id}`}>
                    ✍️
                  </Link>
                  {/* <Button onClick={this.deleteRessource}>Delete</Button> */}
                  <Popconfirm
                    title='Are you sure to delete this ressource?'
                    onConfirm={this.deleteRessource}
                    onCancel={this.cancel}
                    okText='Yes I do'
                    cancelText='Nope'>
                    <a className='ant-btn' href='#' alt='delete'>
                      🗑
                    </a>
                  </Popconfirm>
                </div>
              ) : null}
            </div>
            <p className='image-container'>
              <img
                className='preview'
                src={ressource.image ? ressource.image : cat}
                alt={ressource.title}
              />
            </p>
            <div className='content-ressource'>
              <p className='technology-p'>
                {/* <span className='label'>Technologies : </span> */}
                {ressource.technology.map((technology, index) => {
                  if (technology !== "") {
                    return (
                      <span className='technology' key={index}>
                        {technology.charAt(0).toUpperCase() +
                          technology.slice(1)}{" "}
                      </span>
                    );
                  }
                })}
              </p>
              <p>{ressource.description}</p>
              <p>
                <span className='label'>Types : </span>
                {ressource.type.map((type, index) => {
                  return (
                    <span key={index}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                    </span>
                  );
                })}
              </p>
              {/* {ressource.votes.length === 0 ? (
                "No vote"
              ) : (
                <p>
                  <span className='label'> Votes : </span>
                  {ressource.votes.map((vote, index) => {
                    return <span key={index}>{vote} </span>;
                  })}
                </p>
              )} */}
              <p>
                <span className='label'>Languages : </span>
                {language.charAt(0).toUpperCase() + language.slice(1)}
              </p>
              <p>
                <span className='label'>Level : </span>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </p>
              <p>
                <span className='label'>Price : </span>
                {price.charAt(0).toUpperCase() + price.slice(1)}
              </p>
              <p>
                <a
                  className='link'
                  href={ressource.link}
                  rel='noreferrer'
                  target='_blank'>
                  Find your way
                </a>
              </p>
              {/* {ressource.comments.length === 0 ? (
                "No comment"
              ) : (
                <p>
                  Comments :
                  {ressource.comments.map((comment, index) => {
                    return <span key={index}>{comment} </span>;
                  })}
                </p>
              )} */}
            </div>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
