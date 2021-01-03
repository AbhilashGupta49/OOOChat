import { useReducer } from "react";
import { RoomMatrixWithFloor } from "../models/Building";
import roomMappings from "../utils/constants/RoomMappings";

const positionReducer = (state: RoomMatrixWithFloor, action: any) => {
  switch (action.type) {
    case "left":
      if (
        state.column <= 0 ||
        state.roomMatrix[state.row][state.column - 1] === roomMappings.WALL
      ) {
        break;
      }
      return { ...state, column: state.column - 1 };
    case "right":
      if (
        state.column >= state.roomMatrix[0].length - 1 ||
        state.roomMatrix[state.row][state.column + 1] === roomMappings.WALL
      ) {
        break;
      }
      return { ...state, column: state.column + 1 };
    case "up":
      if (
        state.row <= 0 ||
        state.roomMatrix[state.row - 1][state.column] === roomMappings.WALL
      ) {
        break;
      }
      return { ...state, row: state.row - 1 };
    case "down":
      if (
        state.row >= state.roomMatrix.length - 1 ||
        state.roomMatrix[state.row + 1][state.column] === roomMappings.WALL
      ) {
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
