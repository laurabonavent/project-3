import "./App.css";
import React from "react";
import isnull from "lodash.isnull";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { loggedin } from "./components/auth/auth-service";

import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import Signup from "./components/auth/Signup";
import Profile from "./components/profile/Profile";
import Ressource from "./components/ressources/RessourceDetail";
import CreateRessource from "./components/ressources/CreateRessource";
import EditRessource from "./components/ressources/EditRessource";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/nav/Footer";
import BackButton from "./components/BackButton";
import EditProfile from "./components/profile/EditProfile";

class App extends React.Component {
  state = { loggedInUser: null };

  fetchUser() {
    if (this.state.loggedInUser === null) {
      console.log("coucou");
      loggedin()
        .then((data) => {
          this.setState({ loggedInUser: data });
        })
        .catch((err) => {
          this.setState({ loggedInUser: false });
        });
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    if (isnull(this.state.loggedInUser)) return "..loading";
    return (
      <div className="App">
        <Navbar userInSession={this.state.loggedInUser} />
        <BackButton />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                history={props.history}
                updateUser={this.updateLoggedInUser}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup history={props.history} />}
          />
          <Route
            exact
            path="/profile/edit"
            render={(props) => (
              <EditProfile
                history={props.history}
                updateUser={this.updateLoggedInUser}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={(props) => (
              <Profile {...props} userInSession={this.state.loggedInUser} />
            )}
          />
          <Route exact path="/ressources/create" component={CreateRessource} />
          <Route exact path="/ressources/edit/:id" component={EditRessource} />
          <Route
            exact
            path="/ressources/:id"
            render={(props) => (
              <Ressource
                {...props}
                updateUser={this.updateLoggedInUser}
                userInSession={this.state.loggedInUser}
              />
            )}
          />
        </Switch>
        <Footer userInSession={this.state.loggedInUser} />
      </div>
    );
  }
}

export default App;
