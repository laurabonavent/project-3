import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { RiAccountPinCircleLine } from "react-icons/ri";

const LoginButton = () => {
  return <Link to='/login'>Login</Link>;
};

export { LoginButton };

const SignupButton = () => {
  return <Link to='/signup'>Sign up</Link>;
};

export { SignupButton };

const LogoutButton = (props) => {
  return <Link {...props}>Log out</Link>;
};

export { LogoutButton };

const ProfileButton = () => {
  return <Link to='/profile'>Profile</Link>;
};

export { ProfileButton };

const SuggestRessource = () => {
  return (
    <Link to='/'>
      <Button type='primary' shape='round'>
        Suggest a ressource
      </Button>
    </Link>
  );
};

export { SuggestRessource };
