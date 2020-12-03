import React from "react";
import {
  LoginButton,
  SignupButton,
  LogoutButton,
  ProfileButton,
} from "./Buttons";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <Link to="/">
        <h1>NAME SITE</h1>
      </Link>
      {props.userInSession ? (
        <>
          <ProfileButton />
          <LogoutButton />
        </>
      ) : (
        <>
          <LoginButton />
          <SignupButton />
        </>
      )}
    </>
  );
};

export default Navbar;
