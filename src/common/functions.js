import { ITEM_TYPES } from "./enums";

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const getItems = count =>
  Array.from({ length: count }, (_, index) => index).map(index => ({
    id: `item-${index}`,
    type: ITEM_TYPES.ACTIVE,
    content: `item ${index}`
  }));

export const getItemStyle = (
  isDragging,
  draggableStyle,
  type,
  color = null
) => {
  // debugger;
  const bgColor = color !== null ? color : "transparent";
  let bgImage;
  if (color !== null && color !== "rgba(0, 0, 0, 0)") {
    bgImage = "none";
  } else {
    bgImage =
      type !== ITEM_TYPES.GHOST
        ? isDragging
          ? "linear-gradient(to left, #18b153, #0f7fa1)"
          : "linear-gradient(to right, #18b153, #0f7fa1)"
        : "none";
  }
  return {
    backgroundImage: bgImage,
    backgroundColor: bgColor,
    ...draggableStyle
  };
};

export const getListStyle = isDraggingOver => ({
  border: isDraggingOver ? "1px dashed grey" : "none"
});

export const parseTimeFormat = (value, maxValue) => {
  let newActualValue, newPreviousValue;
  !value ? (newPreviousValue = maxValue) : (newPreviousValue = value - 1);

  newPreviousValue < 10
    ? (newPreviousValue = "0" + newPreviousValue)
    : (newPreviousValue = "" + newPreviousValue);

  value < 10 ? (newActualValue = "0" + value) : (newActualValue = "" + value);

  return `${newPreviousValue}:00 - ${newActualValue}:00`;
};
