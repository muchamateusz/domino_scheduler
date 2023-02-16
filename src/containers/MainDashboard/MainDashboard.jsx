import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TimeLineItem from "./TimeLineItem/TimeLineItem";
import {
  reorder,
  getItems,
  getListStyle,
  parseTimeFormat
} from "../../common/functions";
import { ITEM_TYPES } from "../../common/enums";

import "./MainDashboard.less";

class MainDashboard extends Component {
  state = {
    items: [],
    itemsAmount: 24
  };

  componentDidMount() {
    const items = getItems(this.state.itemsAmount);
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

  onClickHandler = item => e => {
    this.setState(prevState => {
      const newState = { ...prevState };
      if (newState.items[item.index].type === ITEM_TYPES.EDIT_MODE) {
        newState.items[item.index].type = ITEM_TYPES.ACTIVE;
        newState.items[item.index].content = item.text;
      } else {
        newState.items[item.index].type = ITEM_TYPES.EDIT_MODE;
      }
      return { ...newState };
    });
  };

  render() {
    return (
      <div className="main-dashboard">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="main-dashboard__toolbox" />
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <React.Fragment>
                <div className="main-dashboard__time-axis">
                  {[...Array(this.state.itemsAmount)].map((_, index) => {
                    return (
                      <div
                        className="main-dashboard__time-axis__item"
                        key={`${_}_${index}`}
                      >
                        {parseTimeFormat(index, this.state.itemsAmount)}
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
                    <TimeLineItem
                      key={item.id}
                      item={item}
                      index={index}
                      onClickHandler={this.onClickHandler}
                    />
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
              />
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
export default MainDashboard;
