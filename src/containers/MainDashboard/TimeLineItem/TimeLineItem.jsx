import React from "react";
import { ITEM_TYPES } from "common/enums";
import Ghost from "./components/Ghost";
import Active from "./components/Active";
import Editable from "./components/Editable";

import './TimeLineItem.less';

const TimeLineItem = props => {
  const render = () => {
    switch (props.item.type) {
      case ITEM_TYPES.ACTIVE:
        return <Active {...props} />;
      case ITEM_TYPES.GHOST:
        return <Ghost {...props} />;
      case ITEM_TYPES.EDIT_MODE:
        return <Editable {...props} />;
      default:
        break;
    }
  };
  return render();
};

export default TimeLineItem;
