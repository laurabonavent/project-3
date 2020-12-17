import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";

const Navbar = (props) => {
  return (
    <div className='footer'>
      {props.userInSession ? (
        <>
          <Link to='/ressources/suggest'>Suggest a ressource</Link>
        </>
      ) : (
        <>
          <p>
            Website created with love <img src={Logo} alt='skyrocket' />
          </p>
        </>
      )}
    </div>
  );
};

export default Navbar;
