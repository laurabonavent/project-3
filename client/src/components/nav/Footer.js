import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";

const Navbar = (props) => {
  return (
    <div className="footer">
      <img src={Logo} alt="skyrocket" />
      {props.userInSession ? (
        <>
          <Link to="/ressources/suggest" className="suggest-text">
            Suggest a ressource
          </Link>
        </>
      ) : (
        <>
          <p>Website created with love</p>
        </>
      )}
    </div>
  );
};

export default Navbar;
