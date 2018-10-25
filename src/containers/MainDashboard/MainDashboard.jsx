import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import classNames from "classnames";

import {
  reorder,
  getItems,
  getListStyle,
  getItemStyle,
  parseTimeFormat
} from "common/functions";
import { ITEM_TYPES } from "common/enums";

import "./MainDashboard.less";

class MainDashboard extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    const items = getItems(24);
    this.setState({ items });
  }

  onDragEnd = result => {
    if (!result.destination) {
      return;
    } else if (result.destination.droppableId === "erase") {
      this.setState(prevState => {
        const newState = { ...prevState };
        newState.items[result.source.index].type = ITEM_TYPES.GHOST;
        return { ...newState };
      });
      return;
    } else {
      const items = reorder(
        this.state.items,
        result.source.index,
        result.destination.index
      );

      this.setState({ items });
    }
  };

  onClickHandler = event => {
    console.log("event :", event);
    debugger;
  };

  render() {
    return (
      <div className="main-dashboard">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="main-dashboard__toolbox">Toolbox</div>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <React.Fragment>
                <div className="main-dashboard__time-axis">
                  {[...Array(24)].map((_, index) => {
                    return (
                      <div
                        className="main-dashboard__time-axis__item"
                        key={`${_}_${index}`}
                      >
                        {parseTimeFormat(index)}
                      </div>
                    );
                  })}
                </div>
                <div
                  className="main-dashboard__assignments-axis"
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => {
                    const renderedElement =
                      item.type === ITEM_TYPES.ACTIVE ? (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                          data-react-beautiful-dnd-drag-handle
                        >
                          {(provided, snapshot) => (
                            <div
                              className={classNames(
                                "main-dashboard__assignments-axis__item",
                                {
                                  "main-dashboard__assignments-axis__item--ghost":
                                    item.type === ITEM_TYPES.GHOST
                                }
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                item.type
                              )}
                            >
                              <div className="main-dashboard__item-content">
                                {item.content}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ) : (
                        <div
                          className={classNames(
                            "main-dashboard__assignments-axis__item",
                            {
                              "main-dashboard__assignments-axis__item--ghost":
                                item.type === ITEM_TYPES.GHOST
                            }
                          )}
                          onClick={this.onClickHandler}
                        >
                          <div className="main-dashboard__item-content">
                            {item.content}
                          </div>
                        </div>
                      );
                    return renderedElement;
                  })}
                </div>
              </React.Fragment>
            )}
          </Droppable>
          <Droppable droppableId="erase">
            {(provided, snapshot) => (
              <div
                className="main-dashboard__trash"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                Trash Can
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
export default MainDashboard;
