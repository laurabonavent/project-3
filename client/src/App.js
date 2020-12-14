//import "./App.css";
import "./App.less";
import React from "react";

import isnull from "lodash.isnull";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

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
import EditProfile from "./components/profile/EditProfile";
import SuggestRessource from "./components/ressources/SuggestRessource";

class App extends React.Component {
  state = { loggedInUser: null, windowWidth: window.innerWidth };

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
    console.log("WW APP.JS", this.state.windowWidth);
  };

  fetchUser() {
    if (this.state.loggedInUser === null) {
      loggedin()
        .then((data) => {
          this.setState({ loggedInUser: data });
          //console.log("loggedInUser", this.state.loggedInUser);
        })
        .catch((err) => {
          this.setState({ loggedInUser: false });
        });
    }
  }

  componentDidMount() {
    this.fetchUser();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    //if (isnull(this.state.loggedInUser)) return "..loading";
    console.log("user", this.state.loggedInUser);

    return (
      <div className='App'>
        <Route
          render={(props) => (
            <>
              <Navbar
                userInSession={this.state.loggedInUser}
                updateUser={this.updateLoggedInUser}
                {...props}
              />

              <Switch>
                <Route exact path='/' component={Home} />
                {/* <Route exact path='/parallax' component={Parallax} /> */}

                <Route
                  exact
                  path='/login'
                  render={(props) => (
                    <Login
                      userInSession={this.state.loggedInUser}
                      history={props.history}
                      updateUser={this.updateLoggedInUser}
                    />
                  )}
                />
                <Route
                  exact
                  path='/signup'
                  render={(props) => (
                    <Signup
                      history={props.history}
                      updateUser={this.updateLoggedInUser}
                    />
                  )}
                />
                <Route
                  exact
                  path='/profile/edit'
                  render={(props) => (
                    <EditProfile
                      {...props}
                      history={props.history}
                      updateUser={this.updateLoggedInUser}
                      userInSession={this.state.loggedInUser}
                    />
                  )}
                />
                <Route
                  exact
                  path='/profile'
                  render={(props) => (
                    <Profile
                      {...props}
                      userInSession={this.state.loggedInUser}
                    />
                  )}
                />
                <Route
                  exact
                  path='/ressources/create'
                  component={CreateRessource}
                />
                <Route
                  exact
                  path='/ressources/suggest'
                  component={SuggestRessource}
                />
                <Route
                  exact
                  path='/ressources/edit/:id'
                  render={(props) => (
                    <EditRessource
                      {...props}
                      userInSession={this.state.loggedInUser}
                    />
                  )}
                />
                <Route
                  exact
                  path='/ressources/:id'
                  render={(props) => (
                    <Ressource
                      {...props}
                      updateUser={this.updateLoggedInUser}
                      userInSession={this.state.loggedInUser}
                    />
                  )}
                />
              </Switch>
              {/* <Footer userInSession={this.state.loggedInUser} /> */}
            </>
          )}></Route>
      </div>
    );
  }
}

export default App;
