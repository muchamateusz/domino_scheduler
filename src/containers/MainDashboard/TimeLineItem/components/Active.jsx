import React from "react";
import classNames from "classnames";
import { Draggable } from "react-beautiful-dnd";
import { getItemStyle } from "common/functions";
import { ITEM_TYPES } from "common/enums";

const Active = ({ item, index, ...props }) => {
  return (
    <Draggable
      draggableId={item.id}
      index={index}
      data-react-beautiful-dnd-drag-handle
    >
      {(provided, snapshot) => (
        <div
          className={classNames("main-dashboard__assignments-axis__item", {
            "main-dashboard__assignments-axis__item--ghost":
              item.type === ITEM_TYPES.GHOST
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
            item.type
          )}
        >
          <div className="main-dashboard__item-content">{item.content}</div>
        </div>
      )}
    </Draggable>
  );
};
export default Active;
