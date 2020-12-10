import React from "react";

import { RiArrowLeftSLine } from "react-icons/ri";

import { useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();
  return (
    <div>
      <button className='back-button' onClick={history.goBack}>
        <RiArrowLeftSLine />
      </button>
    </div>
  );
};

export default BackButton;
