import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  reorder,
  getItems,
  getListStyle,
  getItemStyle
} from "common/functions";

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
    // DOROBIC OBSLUGE USUWANIA ZADAN
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    this.setState({ items });
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
                        {`${index}:00`}
                      </div>
                    );
                  })}
                </div>
                <div
                  className="main-dashboard__assignments-axis"
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      data-react-beautiful-dnd-drag-handle
                    >
                      {(provided, snapshot) => (
                        <div
                          className="main-dashboard__assignments-axis__item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div className="main-dashboard__item-content">
                            {item.content}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
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
                Trash
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
