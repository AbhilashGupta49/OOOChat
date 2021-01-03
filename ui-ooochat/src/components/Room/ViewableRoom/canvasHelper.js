/* eslint-disable no-param-reassign */
import { RoomMatrixWithFloor } from "../../../models/Building";

export const fitCanvasToContainer = (canvas: HTMLCanvasElement): void => {
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

const getCanvasScale = (
  canvas: HTMLCanvasElement,
  xPoints: number,
  yPoints: number
) => {
  const sizeWidth = canvas.clientWidth;
  const sizeHeight = canvas.clientHeight;
  return {
    scaleWidth: sizeWidth / (xPoints + 1),
    scaleHeight: sizeHeight / (yPoints + 1),
  };
};

const getViewableRoomPosition = (
  position: number,
  viewDistance: number,
  originalMatrixLength: number
) => {
  let relativePosition = viewDistance;
  if (position + viewDistance >= originalMatrixLength) {
    relativePosition = 2 * viewDistance + 1 + (position - originalMatrixLength);
  } else if (position - viewDistance <= 0) {
    relativePosition = position;
  }
  return relativePosition;
};

export const paintViewableRoom = (
  canvas: HTMLCanvasElement,
  viewableRoomMatrix: number[][],
  position: RoomMatrixWithFloor
): void => {
  const { scaleHeight, scaleWidth } = getCanvasScale(
    canvas,
    viewableRoomMatrix[0].length,
    viewableRoomMatrix.length
  );
  const ctx = canvas.getContext("2d");
  const viewDistance = Math.floor(viewableRoomMatrix.length / 2);
  const viewableRoomRowPosition = getViewableRoomPosition(
    position.row,
    viewDistance,
    position.roomMatrix.length
  );

  const viewableRoomColumnPosition = getViewableRoomPosition(
    position.column,
    viewDistance,
    position.roomMatrix.length
  );

  for (let row = 0; row < viewableRoomMatrix.length; row += 1) {
    for (let col = 0; col < viewableRoomMatrix[row].length; col += 1) {
      const xPosition = (col + 1) * scaleWidth;
      const yPosition = (row + 1) * scaleHeight;
      if (
        row === viewableRoomRowPosition &&
        col === viewableRoomColumnPosition
      ) {
        ctx.fillText("Me", xPosition, yPosition);
      } else {
        ctx.fillText(viewableRoomMatrix[row][col], xPosition, yPosition);
      }
      ctx.stroke();
    }
  }
};
