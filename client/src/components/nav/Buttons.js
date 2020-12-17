import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Dashboard from "../../images/dashboard.svg";
import Logout from "../../images/logout.svg";
import Adduser from "../../images/adduser.svg";
import Padlock from "../../images/padlock.svg";

import { RiAccountPinCircleLine } from "react-icons/ri";

const LoginButton = () => {
  return (
    <Link to="/login">
      <img className="buttons-img" src={Padlock} alt="login" />
      <div className="buttons-text">
        LOG<span>/</span>IN
      </div>
    </Link>
  );
};

export { LoginButton };

const SignupButton = () => {
  return (
    <Link to="/signup">
      <img className="buttons-img" src={Adduser} alt="signup" />
      <div className="buttons-text">
        SIGN<span>/</span>UP
      </div>
    </Link>
  );
};

export { SignupButton };

const LogoutButton = (props) => {
  return (
    <Link to="/" {...props}>
      <img className="buttons-img" src={Logout} alt="logout" />
      <div className="buttons-text">
        LOG<span>/</span>OUT
      </div>
    </Link>
  );
};

export { LogoutButton };

const ProfileButton = () => {
  return (
    <Link to="/profile">
      <img className="buttons-img" src={Dashboard} alt="dashboard" />
      <div className="buttons-text">DASH/BOARD</div>
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
