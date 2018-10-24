import React from "react";

import "./TitleBar.less";

const TitleBar = () => {
  return (
    <div className="title-bar">
      <div className="title-bar__title-area">
        <h1 className="title-bar__title-area__text">Domino Scheduler</h1>
        <p className="title-bar__title-area__text">arrange your day!</p>
      </div>
    </div>
  );
};

export default TitleBar;
