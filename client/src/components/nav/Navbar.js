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

class Navbar extends React.Component {
  killSession = (event) => {
    logout({}).then((response) => {
      console.log("logout request");
      this.props.history.push("/");
      this.props.updateUser(null);
      message.info(response.message);
    });
  };

  render() {
    return (
      <div>
        <Link to="/">
          <h1>NAME SITE</h1>
        </Link>
        {this.props.userInSession ? (
          <div>
            <ProfileButton />
            <LogoutButton
              onClick={(event) => {
                this.killSession(event);
              }}
            />
          </div>
        ) : (
          <>
            <LoginButton />
            <SignupButton />
          </>
        )}
      </div>
    );
  }
}

export default Navbar;
