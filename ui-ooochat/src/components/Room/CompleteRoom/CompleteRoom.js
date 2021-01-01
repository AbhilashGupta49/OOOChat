import {
  Component,
  ReactNode,
  useReducer,
  ReducerAction,
  Reducer,
} from "react";
import { BuildingPosition } from "../../../models/Position";
import { RoomMatrixWithFloor } from "../../../models/Building";

const mockMatrix: number[][][] = [
  [
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  ],
];

type Props = {
  children: ReactNode,
};

const positionReducer: Reducer = (
  state: RoomMatrixWithFloor,
  action: ReducerAction
) => {
  switch (action.type) {
    case "left":
      if (state.column === 0) {
        break;
      }
      return { ...state, column: state.column - 1 };
    case "right":
      if (state.column === state.matrix[0].length - 1) {
        break;
      }
      return { ...state, column: state.column + 1 };
    case "up":
      if (state.row === 0) {
        break;
      }
      return { ...state, row: state.row - 1 };
    case "down":
      if (state.row === state.matrix.length - 1) {
        break;
      }
      return { ...state, row: state.row + 1 };
  }
  return state;
};

const getViewableRoomMatix = (
  roomMatrix: number[][],
  currentPosition: BuildingPosition,
  viewDistance: number
) => {
  // TODO: number of columns visible should be same
  // const startRow = Math.min(0, currentPosition.row - viewDistance);
  // const endRow = Math.max(
  //   roomMatrix.length - 1,
  //   currentPosition.row + viewDistance
  // );
  // const startColumn = Math.min(0, currentPosition.column - viewDistance);
  // const totalViewDistance = 2 * viewDistance + 1;
  // const numberOfColumns = Math.min(
  //   totalViewDistance,
  //   roomMatrix[0].length - 1 - currentPosition.column
  // );

  const viewableRoomMatrix = [];
  for (let row = startRow; row <= endRow; row++) {
    viewableRoomMatrix.push(
      roomMatrix[row].slice().splice(startColumn, numberOfColumns)
    );
  }
  return viewableRoomMatrix;
};

export const CompleteRoom = (props: Props): Component => {
  // TODO: change starting position according to seat and store it in context??
  const startFloor = 0;
  const startRow = 0;
  const startColumn = 0;
  const viewDistance = 3;

  const startingPosition: RoomMatrixWithFloor = {
    row: startRow,
    column: startColumn,
    floor: startFloor,
    roomMatrix: mockMatrix[startFloor],
  };
  const [currentPosition, positionDispatcher] = useReducer(
    positionReducer,
    startingPosition
  );

  const viewableMatrix = getViewableRoomMatix(
    mockMatrix[currentPosition.floor],
    currentPosition,
    viewDistance
  );
  // TODO: make matrix call websockets
  return props.children({
    viewableMatrix,
    positionDispatcher,
    currentPosition,
  });
};
