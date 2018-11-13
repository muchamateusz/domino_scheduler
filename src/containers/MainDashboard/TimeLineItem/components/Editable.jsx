import React, { useState } from "react";
import classNames from "classnames";
import { ITEM_TYPES } from "common/enums";

const Editable = ({ item, index, ...props }) => {
  const [text, setText] = useState(item.content);
  const handleInputChange = event => {
    setText(event.target.value);
  };
  return (
    <div
      key={item.id}
      className={classNames("main-dashboard__assignments-axis__item", {
        "main-dashboard__assignments-axis__item--ghost":
          item.type === ITEM_TYPES.GHOST
      })}
    >
      <div className="main-dashboard__item-content">
        <input type="text" value={text} onChange={handleInputChange} />
        <button
          type="button"
          onClick={props.onClickHandler({ ...item, index, text })}
        >
          OK
        </button>
      </div>
    </div>
  );
};
export default Editable;
