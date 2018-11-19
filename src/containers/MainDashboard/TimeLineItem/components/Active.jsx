import React, { Component } from "react";
import classNames from "classnames";
import { Draggable } from "react-beautiful-dnd";
import { getItemStyle } from "common/functions";
import { ITEM_TYPES } from "common/enums";
import { TwitterPicker } from "react-color";

class Active extends Component {
  state = {
    color: "rgba(0, 0, 0, 0)",
    colorPickerVisible: false
  };
  showColorPicker = event => {
    event.preventDefault();
    this.setState({ colorPickerVisible: true });
  };
  handleChange = color => {
    this.setState({ color: color.hex });
    this.setState({ colorPickerVisible: false });
  };
  render() {
    return (
      <Draggable
        draggableId={this.props.item.id}
        index={this.props.index}
        data-react-beautiful-dnd-drag-handle
      >
        {(provided, snapshot) => (
          <React.Fragment>
            <div
              onContextMenu={this.showColorPicker}
              onClick={this.props.onClickHandler({
                ...this.props.item,
                index: this.props.index
              })}
              className={classNames("main-dashboard__assignments-axis__item", {
                "main-dashboard__assignments-axis__item--ghost":
                  this.props.item.type === ITEM_TYPES.GHOST
              })}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
                this.props.item.type,
                this.state.color
              )}
            >
              <div
                className="main-dashboard__item-content"
                title={
                  this.props.item.content.length > 25
                    ? this.props.item.content
                    : null
                }
              >
                {this.props.item.content}
              </div>
            </div>
            {this.state.colorPickerVisible ? (
              <TwitterPicker
                width={200}
                color={this.state.color}
                onChangeComplete={this.handleChange}
              />
            ) : null}
          </React.Fragment>
        )}
      </Draggable>
    );
  }
}
export default Active;
