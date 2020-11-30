import React from "react";
import {SuggestRessource} from "./Buttons";

const Navbar = (props) => {
  return (
    <>
      {props.userInSession ? (
        <>
          <SuggestRessource />
        </>
      ) : (
        <>
          <p>Website created with love</p>
        </>
      )}
    </>
  );
};

export default Navbar;
