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

import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import DarkRed from "./images/dark-red.svg";
import Yellow from "./images/yellow.svg";
import OrangeRed from "./images/orange-red.svg";
import Purple from "./images/purple.svg";
import LightOrange from "./images/light-orange.svg";
import LightPink from "./images/light-pink.svg";
import Rocket from "./images/rocket.png";

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
        <Parallax ref={(ref) => (this.parallax = ref)} pages={3}>
          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            className='background'
            style={{
              //   backgroundImage: url("stars", true),
              backgroundSize: "cover",
            }}></ParallaxLayer>

          <ParallaxLayer
            offset={0.5}
            speed={0.5}
            style={{ opacity: 15 }}
            className='background'>
            <img
              src={DarkRed}
              alt=''
              style={{
                display: "block",
                width: "20%",
                marginLeft: "70%",
                marginTop: "-18%",
              }}
            />
            <img
              alt=''
              src={LightPink}
              style={{
                display: "block",
                width: "30%",
                marginLeft: "20%",
                marginTop: "-18%",
              }}
            />
            <img
              alt=''
              src={Purple}
              style={{
                display: "block",
                width: "20%",
                marginLeft: "65%",
                marginTop: "8%",
              }}
            />
          </ParallaxLayer>
          <ParallaxLayer offset={1} speed={0.4} style={{ opacity: 10 }}>
            <img
              src={OrangeRed}
              alt=''
              style={{
                display: "block",
                width: "70%",
                marginLeft: "15%",
                marginTop: "-18%",
              }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.4} speed={-0.3} style={{ opacity: 10 }}>
            <img
              alt=''
              src={Purple}
              className='purple'
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
            <img
              alt=''
              src={LightOrange}
              className='light-orange'
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
            <img
              alt=''
              src={LightPink}
              className='light-pink'
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={0.9} speed={0.2} style={{ opacity: 5 }}>
            <img
              alt=''
              src={Yellow}
              style={{ display: "block", width: "10%", marginLeft: "10%" }}
            />
            <img
              alt=''
              src={LightOrange}
              style={{ display: "block", width: "20%", marginLeft: "75%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.0}
            speed={0}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}>
            <img className='dark-red' src={DarkRed} alt='' />
            <img className='yellow' src={Yellow} alt='' />
            <img className='orange-red' src={OrangeRed} alt='' />
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={0} factor={1} className='content'>
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
                  {/* <Footer userInSession={this.state.loggedInUser} /> */}
                </>
              )}></Route>
          </ParallaxLayer>
          <ParallaxLayer
            offset={2}
            speed={-0.5}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              margin: "-4% 0% 0% -3%",
            }}>
            <div className='footer'>
              <p>Website created with love</p>
              <img alt='' src={Rocket} style={{ width: "10%" }} />
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
    );
  }
}

export default App;
