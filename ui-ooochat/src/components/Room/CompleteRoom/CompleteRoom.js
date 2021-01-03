import React, { Component } from "react";
import getViewableRoomMatix from "./getViewableRoomMatrix";
import ViewableRoom from "../ViewableRoom/ViewableRoom";
import RoomHotKeysWrapper from "../RoomHotKeysWrapper/RoomHotKeysWrapper";
import Spinner from "../../Common/Spinner/Spinner";
import usePositionDispatcher from "../../../hooks/usePositionDispatcher";
import { RoomMatrixWithFloor } from "../../../models/Building";

const mockMatrix: string[][][] = [
  [
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, "seat:Abhilash", 1, 0, 0, 1, 1, 0, 1],
    [0, 0, 1, 1, "users:[Another]", 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
  ],
];

const CompleteRoom = (): Component => {
  // TODO: change starting position according to seat and store it in context??
  const startFloor = 0;
  const startRow = 6;
  const startColumn = 4;
  const viewDistance = 3;

  const startingPosition: RoomMatrixWithFloor = {
    row: startRow,
    column: startColumn,
    floor: startFloor,
    roomMatrix: mockMatrix[startFloor],
  };

  const [position, positionDispatcher] = usePositionDispatcher(
    startingPosition
  );

  const viewableRoomMatrix = getViewableRoomMatix(
    mockMatrix[position.floor],
    position,
    viewDistance
  );

  // TODO: make matrix call websockets
  if (!viewableRoomMatrix) {
    return <Spinner dimension={7} />;
  }
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
