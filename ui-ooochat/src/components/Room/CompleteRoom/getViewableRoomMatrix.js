import { BuildingPosition } from "../../../models/Position";

const getViewableRoomMatix = (
  roomMatrix: number[][],
  currentPosition: BuildingPosition,
  viewDistance: number
) => {
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
      roomMatrix[row].slice().splice(startColumn, 2 * viewDistance + 1)
    );
  }
  return viewableRoomMatrix;
};

export default getViewableRoomMatix;
