import "./App.css";
import React from "react";

// import Vector1 from "./images/vector1.svg";
// import Vector2 from "./images/vector2.svg";
// import Vector3 from "./images/vector3.svg";

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
import BackButton from "./components/nav/BackButton";
import EditProfile from "./components/profile/EditProfile";
import Parallax from "./components/Parallax";

class App extends React.Component {
  state = { loggedInUser: null };

  fetchUser() {
    if (this.state.loggedInUser === null) {
      console.log("coucou");
      loggedin()
        .then((data) => {
          this.setState({ loggedInUser: data });
          console.log("user", this.state.loggedInUser);
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
    //if (isnull(this.state.loggedInUser)) return "..loading";

    return (
      <div className='App'>
        {/* <div className='wrapper'>
          <div className='parallax-container'>
            <div className='background'>
              <img className='vector1' src={Vector1} alt='' />
              <img className='vector2' src={Vector2} alt='' />
              <img className='vector3' src={Vector3} alt='' />
            </div>
            <div className='foreground'> */}
        <Route
          render={(props) => (
            <>
              <Navbar
                userInSession={this.state.loggedInUser}
                updateUser={this.updateLoggedInUser}
                {...props}
              />

              <BackButton />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/parallax' component={Parallax} />

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
              <Footer userInSession={this.state.loggedInUser} />
            </>
          )}></Route>
        {/* </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default App;
