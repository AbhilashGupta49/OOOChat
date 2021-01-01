import React, { Component, Dispatch, useEffect, useRef } from "react";
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
  positionDispatcher: Dispatch,
  currentPosition: RoomMatrixWithFloor,
};

export const ViewableRoom = (props: Props): Component => {
  const { viewableRoomMatrix, positionDispatcher, currentPosition } = props;
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    fitCanvasToContainer(canvas);
    paintViewableRoom(canvas, viewableRoomMatrix, currentPosition);
  }, []);
  return (
    <RoomContainer>
      <Canvas ref={canvasRef} />
    </RoomContainer>
  );
};
