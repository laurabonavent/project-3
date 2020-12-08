import React from "react";

import { useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();
  return (
    <div>
      <button className="button icon-left" onClick={history.goBack}>
        Back
      </button>
    </div>
  );
};

export default BackButton;
