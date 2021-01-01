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
  ): {number, number} => {
    const sizeWidth = canvas.clientWidth;
    const sizeHeight = canvas.clientHeight;
    return {
      scaleWidth: sizeWidth / (xPoints + 1),
      scaleHeight: sizeHeight / (yPoints + 1),
    };
  };
  
  export const paintViewableRoom = (
    canvas: HTMLCanvasElement,
    matrix: number[][],
    currentPosition: RoomMatrixWithFloor
  ): void => {
    const { scaleHeight, scaleWidth } = getCanvasScale(
      canvas,
      matrix[0].length,
      matrix.length
    );
    console.info(scaleHeight, scaleWidth);
    const ctx = canvas.getContext("2d");
  
    for (let row in matrix) {
      for (let col in matrix[row]) {
        const xPosition = (parseInt(currentPosition.roomPosition.row) + 1) * scaleWidth;
        const yPosition = (parseInt(currentPosition.roomPosition.column) + 1) * scaleHeight;
        if (matrix[row][col] === 2) {
          ctx.fillText("Me", xPosition, yPosition);
        } else {
          ctx.rect(xPosition, yPosition, 5, 5);
        }
        ctx.stroke();
      }
    }
  };