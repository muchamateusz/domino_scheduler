import React, { useState } from "react";
import classNames from "classnames";
import { Draggable } from "react-beautiful-dnd";
import { getItemStyle } from "common/functions";
import { ITEM_TYPES } from "common/enums";
import { SketchPicker } from "react-color";

const Active = ({ item, index, ...props }) => {
  const [color, setColor] = useState("rgba(0, 0, 0, 0)");
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const showColorPicker = event => {
    event.preventDefault();
    setColorPickerVisible(true);
  };
  const handleChange = (color, event) => {
    setColor(color.hex);
    setColorPickerVisible(false);
  };
  return (
    <Draggable
      draggableId={item.id}
      index={index}
      data-react-beautiful-dnd-drag-handle
    >
      {(provided, snapshot) => (
        <React.Fragment>
          <div
            onContextMenu={showColorPicker}
            onClick={props.onClickHandler({ ...item, index })}
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
              item.type,
              color
            )}
          >
            <div
              className="main-dashboard__item-content"
              title={item.content.length > 25 ? item.content : null}
            >
              {item.content}
            </div>
          </div>
          {colorPickerVisible ? (
            <SketchPicker
              color={color}
              onChangeComplete={handleChange}
            />
          ) : null}
        </React.Fragment>
      )}
    </Draggable>
  );
};
export default Active;
