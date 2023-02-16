import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { getItemStyle } from "../../../../common/functions";
import classNames from "classnames";
import { ITEM_TYPES } from "../../../../common/enums";

const Ghost = ({ item, index, ...props }) => {
  return (
    <Draggable
      draggableId={item.id}
      index={index}
      data-react-beautiful-dnd-drag-handle
    >
      {(provided, snapshot) => (
        <div
          key={item.id}
          className={classNames("main-dashboard__assignments-axis__item", {
            "main-dashboard__assignments-axis__item--ghost":
              item.type === ITEM_TYPES.GHOST
          })}
          onClick={props.onClickHandler({ ...item, index })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
            item.type
          )}
        >
          <div
            className="main-dashboard__item-content"
            title={item.content.length > 25 ? item.content : null}
          >
            {item.content}
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default Ghost;
