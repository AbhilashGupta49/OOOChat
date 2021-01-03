import React, { Component, useReducer } from "react";
import { BuildingPosition } from "../../../models/Position";
import { RoomMatrixWithFloor } from "../../../models/Building";
import ViewableRoom from "../ViewableRoom/ViewableRoom";
import RoomHotKeysWrapper from "../RoomHotKeysWrapper/RoomHotKeysWrapper";

const mockMatrix: number[][][] = [
  [
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  ],
];

// TODO: fetch from config
export const VIEW_DISTANCE = 3;

const positionReducer = (state: RoomMatrixWithFloor, action: any) => {
  console.info(state.row, state.column);
  switch (action.type) {
    case "left":
      if (state.column <= 0) {
        break;
      }
      return { ...state, column: state.column - 1 };
    case "right":
      if (state.column >= state.matrix[0].length - 1) {
        break;
      }
      return { ...state, column: state.column + 1 };
    case "up":
      if (state.row <= 0) {
        break;
      }
      return { ...state, row: state.row - 1 };
    case "down":
      if (state.row >= state.matrix.length - 1) {
        break;
      }
      return { ...state, row: state.row + 1 };
    default:
      return state;
  }
  return state;
};

const getViewableRoomMatix = (
  roomMatrix: number[][],
  currentPosition: BuildingPosition,
  viewDistance: number
) => {
  // TODO: number of columns visible should be same
  let startRow = currentPosition.row - viewDistance;
  let endRow = currentPosition.row + viewDistance;
  let startColumn = currentPosition.column - viewDistance;
  const endColumn = currentPosition.column + viewDistance;
  if (startRow < 0) {
    endRow -= startRow;
    startRow = 0;
  } else if (endRow >= roomMatrix.length) {
    startRow += roomMatrix.length - endRow - 1;
    endRow = roomMatrix.length - 1;
  }
  if (startColumn < 0) {
    startColumn = 0;
  } else if (endColumn >= roomMatrix[0].length) {
    startColumn += roomMatrix[0].length - endColumn - 1;
  }
  const viewableRoomMatrix = [];
  for (let row = startRow; row <= endRow; row += 1) {
    viewableRoomMatrix.push(
      roomMatrix[row].slice().splice(startColumn, 2 * VIEW_DISTANCE + 1)
    );
  }
  return viewableRoomMatrix;
};

const CompleteRoom = (): Component => {
  // TODO: change starting position according to seat and store it in context??
  const startFloor = 0;
  const startRow = 4;
  const startColumn = 3;

  const startingPosition: RoomMatrixWithFloor = {
    row: startRow,
    column: startColumn,
    floor: startFloor,
    matrix: mockMatrix[startFloor],
  };
  const [position, positionDispatcher] = useReducer(
    positionReducer,
    startingPosition
  );

  const viewableRoomMatrix = getViewableRoomMatix(
    mockMatrix[position.floor],
    position,
    VIEW_DISTANCE
  );

  // TODO: make matrix call websockets

  return (
    <RoomHotKeysWrapper positionDispatcher={positionDispatcher}>
      <ViewableRoom
        viewableRoomMatrix={viewableRoomMatrix}
        position={position}
      />
    </RoomHotKeysWrapper>
  );
};

export default CompleteRoom;
