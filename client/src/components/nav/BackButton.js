import React from "react";

import { RiArrowLeftSLine } from "react-icons/ri";

import { useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();
  return (
    <button className="back-button" onClick={history.goBack}>
      <RiArrowLeftSLine
        style={{ height: "1.5em", width: "1.5em" }}
        viewBox="0 0 24 15"
      />
    </button>
  );
};

export default BackButton;
