import React from "react";
import {
  LoginButton,
  SignupButton,
  LogoutButton,
  ProfileButton,
} from "./Buttons";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../auth/auth-service";
import { message } from "antd";
import Logo from "../../images/logo.svg";

class Navbar extends React.Component {
  killSession = (event) => {
    logout({}).then((response) => {
      //console.log("logout request");
      this.props.history.push("/");
      this.props.updateUser(null);
      message.info(response.message);
    });
  };

  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="skyrocket" />
          </Link>
        </div>
        {this.props.userInSession ? (
          <div className="links">
            <ProfileButton className="navbar-buttons" />
            <LogoutButton
              className="navbar-buttons"
              onClick={(event) => {
                this.killSession(event);
              }}
            />
          </div>
        ) : (
          <div className="links">
            <>
              <LoginButton className="navbar-buttons" />
              <SignupButton className="navbar-buttons" />
            </>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
