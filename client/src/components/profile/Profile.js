import React, { Component } from "react";
import { getUser, getFavorites } from "../auth/auth-service";
import Card from "../card/Card";
import Filters from "../Filters";
import SearchBar from "../SearchBar";

export default class Profile extends Component {
  state = { user: {}, favorites: [], search: "", filters: [] };

  findUserInfo = () => {
    getUser()
      .then((response) => {
        console.log("response", response);
        this.setState({ user: response.user });
      })
      .catch((error) => console.log(error));
  };

  findUserFavorites = () => {
    getFavorites()
      .then((response) => {
        console.log("favorites", response);
        // const autocompleteFavorite = response.favorites.map((favorite) => {
        //   return { value: favorite.title };
        // });
        // console.log(autocompleteFavorite);
        // this.setState({ favorites: autocompleteFavorite });
        this.setState({ favorites: response });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  componentDidMount() {
    this.findUserInfo();
    this.findUserFavorites();
  }

  getFilterValues = (event) => {
    console.log("event: ", event);

    this.setState({
      filters: event,
      //[...new Set([...this.state.filters, ...event])], // newSet pour éviter d'avoir des doubons d'event
    });
  };

  render() {
    const user = this.state.user;
    //const options = this.state.favorites;
    const showedfavorites = this.state.favorites.filter((item, index) => {
      return item.title.toLowerCase().includes(this.state.search.toLowerCase());
    });

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
      // ["french", "free", "article", "", "javascript", "html", "css", "padawan"]

      // checker si les tous filtres sont compris dans les valeurs de la ressource en question
      let checker = this.state.filters.every((filter) =>
        valuesRess.includes(filter)
      ); // return true or false

      // Si les tous les filters sont contenus dans les valeurs de la ressource, alors filtrer showed ressources.
      if (checker) {
        filteredRessources.push(ressource);
        showedfavorites = filteredRessources; // méthode brutus
      }

      // showedRessources.filter((ress) => {
      //   return ress._id === ressource._id;
      // });
      //}
    });

    return (
      <div>
        {this.state.user && this.state.favorites ? (
          <div>
            <img src={user.avatar} alt="" />
            <p>{user.username}'s dashboard</p>
            <p>Email : {user.email}</p>
            {/* <AutoComplete
              //options={options}
              notFoundContent='Wait..'
              placeholder='Find a favorite'
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }>
              {options.map((option, index) => {
                console.log("one option", option);
                return <Option key={index} value={option.value} />;
              })}
            </AutoComplete> */}
            <SearchBar handleChange={this.handleChange}/>
            {/* <form action="">
              <input
                type="search"
                name="search"
                placeholder="Search"
                //value={this.state.search}
                onChange={this.handleChange}
              />
            </form> */}
            {/* TODO : Rendre dynamiques les filtres avec les valeurs des enum du model */}
            <h3>Filtres</h3>
            <Filters handleChange={this.getFilterValues} />
            <h3>My favorites</h3>
            <Card data={showedfavorites} />
            {/* {user.favorites.map((favorite, index) => (
              <Favorites favorite={favorite} />
            ))} */}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
