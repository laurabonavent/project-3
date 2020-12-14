import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      {props.userInSession ? (
        <>
          <Link to='/ressources/suggest'>Suggest a ressource</Link>
        </>
      ) : (
        <>
          <p>Website created with love 🚀</p>
        </>
      )}
    </>
  );
};

export default Navbar;
