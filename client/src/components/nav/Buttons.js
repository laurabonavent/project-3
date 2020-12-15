import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Dashboard from "../../images/dashboard.svg";
import Turnoff from "../../images/turnoff.svg";

import { RiAccountPinCircleLine } from "react-icons/ri";

const LoginButton = () => {
  return <Link to="/login">Log/in</Link>;
};

export { LoginButton };

const SignupButton = () => {
  return <Link to="/signup">Sign/up</Link>;
};

export { SignupButton };

const LogoutButton = (props) => {
  return (
    <Link to="/" {...props}>
      <img className="turnoff" src={Turnoff} alt="turnoff" />
    </Link>
  );
};

export { LogoutButton };

const ProfileButton = () => {
  return (
    <Link to="/profile">
      <img className="dashboard" src={Dashboard} alt="dashboard" />
    </Link>
  );
};

export { ProfileButton };

const SuggestRessource = () => {
  return (
    <Link to="/">
      <Button type="primary" shape="round">
        Suggest a ressource
      </Button>
    </Link>
  );
};

export { SuggestRessource };
