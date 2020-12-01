import React from "react";
import { Button } from 'antd';
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (<Link to="/"><Button type="primary" shape="round">Login</Button></Link>);
}

export { LoginButton }

const SignupButton = () => {
  return (<Link to="/signup"><Button type="primary" shape="round">Sign up</Button></Link>);
}

export {SignupButton}

const LogoutButton = () => {
  return (<Link to="/"><Button type="primary" shape="round">Log out</Button></Link>);
};

export { LogoutButton }

const ProfileButton = () => {
  return (<Link to="/profile"><Button type="primary" shape="round">Profile</Button></Link>);
};

export { ProfileButton };

const SuggestRessource = () => {
  return (<Link to="/"><Button type="primary" shape="round">Suggest a ressource</Button></Link>);
};

export { SuggestRessource };