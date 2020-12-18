import React from "react";
import { Link } from "react-router-dom";
import LogoWhite from "../../images/skyrocket-white.svg";

const Navbar = (props) => {
  return (
    <div className="footer">
      <img src={LogoWhite} alt="skyrocket" />
      {props.userInSession ? (
        <>
          <Link to="/ressources/suggest" className="suggest-text">
            Suggest a ressource
          </Link>
        </>
      ) : (
        <>
          <p>Website created with love for IronHack students</p>
        </>
      )}
    </div>
  );
};

export default Navbar;
