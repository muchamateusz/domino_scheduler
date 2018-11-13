import React from "react";
import classNames from "classnames";
import { ITEM_TYPES } from "common/enums";

const Ghost = ({ item, index, ...props }) => {
  return (
    <div
      key={item.id}
      className={classNames("main-dashboard__assignments-axis__item", {
        "main-dashboard__assignments-axis__item--ghost":
          item.type === ITEM_TYPES.GHOST
      })}
      onClick={props.onClickHandler({ ...item, index })}
    >
      <div className="main-dashboard__item-content">{item.content}</div>
    </div>
  );
};
export default Ghost;
