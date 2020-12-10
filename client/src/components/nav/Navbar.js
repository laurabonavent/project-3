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
      <div className='navbar'>
        <div className='logo'>
          <Link to='/'>Skyrocket 🚀</Link>
        </div>
        {this.props.userInSession ? (
          <div className='links'>
            <ProfileButton />
            <LogoutButton
              onClick={(event) => {
                this.killSession(event);
              }}
            />
          </div>
        ) : (
          <div className='links'>
            <>
              <LoginButton />
              <SignupButton />
            </>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
