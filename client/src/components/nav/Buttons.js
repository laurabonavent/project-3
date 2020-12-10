import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { RiAccountPinCircleLine } from "react-icons/ri";

const LoginButton = () => {
  return (
    <Link to='/login'>
      <RiAccountPinCircleLine />
    </Link>
  );
};

export { LoginButton };

const SignupButton = () => {
  return <Link to='/signup'>Sign up</Link>;
};

export { SignupButton };

const LogoutButton = (props) => {
  return (
    <Button type='primary' shape='round' {...props}>
      Log out
    </Button>
  );
};

export { LogoutButton };

const ProfileButton = () => {
  return (
    <Link to='/profile'>
      <Button type='primary' shape='round'>
        Profile
      </Button>
    </Link>
  );
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
