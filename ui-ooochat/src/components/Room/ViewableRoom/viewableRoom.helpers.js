/* eslint-disable no-param-reassign */
import { RoomMatrixWithFloor } from "../../../models/Building";
import roomMappings from "../../../utils/constants/RoomMappings";

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

const paintRoomPoint = (
  ctx: CanvasRenderingContext2D,
  value: string,
  { xPosition, yPosition, scaleHeight, scaleWidth }
) => {
  // TODO: add text for other users
  if (value === roomMappings.WALL) {
    ctx.fillRect(
      xPosition - scaleWidth / 2,
      yPosition - scaleHeight / 2,
      Math.ceil(scaleWidth),
      Math.ceil(scaleHeight)
    );
  } else if (value === roomMappings.PATH) {
    console.info("empty");
  } else if (value.includes("seat:")) {
    ctx.fillText(
      `${value.split(":")[1]}'s Seat`,
      xPosition,
      yPosition - scaleHeight / 2 + 10
    );
    ctx.rect(
      xPosition - scaleWidth / 2,
      yPosition - scaleHeight / 2,
      Math.ceil(scaleWidth),
      Math.ceil(scaleHeight)
    );
  }
};
export const paintViewableRoom = (
  canvas: HTMLCanvasElement,
  viewableRoomMatrix: numstringber[][],
  position: RoomMatrixWithFloor
): void => {
  const { scaleHeight, scaleWidth } = getCanvasScale(
    canvas,
    viewableRoomMatrix[0].length,
    viewableRoomMatrix.length
  );
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

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

  // const widthRatio = screen.width / (screen.height + screen.width);
  // console.info(widthRatio);

  for (let row = 0; row < viewableRoomMatrix.length; row += 1) {
    for (let column = 0; column < viewableRoomMatrix[row].length; column += 1) {
      const xPosition = (column + 1) * scaleWidth;
      const yPosition = (row + 1) * scaleHeight;
      if (
        row === viewableRoomRowPosition &&
        column === viewableRoomColumnPosition
      ) {
        ctx.fillText("Abhilash", xPosition, yPosition);
      } else {
        paintRoomPoint(ctx, viewableRoomMatrix[row][column], {
          xPosition,
          yPosition,
          scaleHeight,
          scaleWidth,
        });
      }
    }
  }
  ctx.stroke();
};
