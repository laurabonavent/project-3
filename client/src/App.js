import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { loggedin } from "./components/auth/auth-service";

import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import Signup from "./components/auth/Signup";
import Profile from "./components/profile/Profile";
import Ressource from "./components/ressources/RessourceDetail";
import CreateRessource from "./components/ressources/CreateRessource";

class App extends React.Component {
  state = { loggedInUser: null };

  // fetchUser() {
  //   if (this.state.loggedInUser === null) {
  //     loggedin()
  //       .then((response) => {
  //         this.setState({ loggedInUser: response });
  //       })
  //       .catch((err) => {
  //         this.setState({ loggedInUser: false });
  //       });
  //   }
  // }

  // componentDidMount() {
  //   this.fetchUser();
  // }

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            exact
            path='/login'
            render={(props) => (
              <Login
                history={props.history}
                updateUser={this.updateLoggedInUser}
              />
            )}
          />
          <Route
            exact
            path='/signup'
            render={(props) => <Signup history={props.history} />}
          />
          {/* <Route exact path='/profile' component={Profile} />
        <Route exact path='/edit-profile' component={EditProfile} />
          {/* <Route exact path='/signup' component={Signup} />*/}
          <Route exact path='/profile' render={() => <Profile />} />
          {/* <Route exact path='/edit-profile' component={EditProfile} />*/}
          <Route exact path='/ressources/create' component={CreateRessource} />
          <Route exact path='/ressources/:id' component={Ressource} />
          {/*<Route exact path='/ressources/edit/:id' component={EditRessource} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
