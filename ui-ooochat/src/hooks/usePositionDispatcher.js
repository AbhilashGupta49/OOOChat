import { useReducer } from "react";

const positionReducer = (state: RoomMatrixWithFloor, action: any) => {
  console.info(state.row, state.column);
  switch (action.type) {
    case "left":
      if (state.column <= 0) {
        break;
      }
      return { ...state, column: state.column - 1 };
    case "right":
      if (state.column >= state.roomMatrix[0].length - 1) {
        break;
      }
      return { ...state, column: state.column + 1 };
    case "up":
      if (state.row <= 0) {
        break;
      }
      return { ...state, row: state.row - 1 };
    case "down":
      if (state.row >= state.roomMatrix.length - 1) {
        break;
      }
      return { ...state, row: state.row + 1 };
    default:
      return state;
  }
  return state;
};
const usePositionDispatcher = (startingPosition) => {
  const [position, positionDispatcher] = useReducer(
    positionReducer,
    startingPosition
  );
  return [position, positionDispatcher];
};

export default usePositionDispatcher;
