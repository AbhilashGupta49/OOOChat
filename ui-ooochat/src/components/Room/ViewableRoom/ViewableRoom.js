import React, { Component, useEffect, useRef } from "react";
import styled from "styled-components";
import { paintViewableRoom, fitCanvasToContainer } from "./canvasHelper";
import { RoomMatrixWithFloor } from "../../../models/Building";

const RoomContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Canvas = styled.canvas`
  background-color: #eee;
`;

type Props = {
  viewableRoomMatrix: number[][],
  position: RoomMatrixWithFloor,
};

const ViewableRoom = (props: Props): Component => {
  const { viewableRoomMatrix, position } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    if (canvas) {
      canvas.focus();
      fitCanvasToContainer(canvas);
      paintViewableRoom(canvas, viewableRoomMatrix, position);
    }
  });

  return (
    <RoomContainer>
      <Canvas tabIndex="0" ref={canvasRef} />
    </RoomContainer>
  );
};

export default ViewableRoom;
