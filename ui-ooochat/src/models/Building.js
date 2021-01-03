import { BuildingPosition, RoomPosition } from "./Position";

export type BuildingMatrix = BuildingPosition & {
  buildingMatrix: number[][][],
};

export type RoomMatrix = RoomPosition & {
  roomMatrix: number[][],
};

export type RoomMatrixWithFloor = RoomMatrix & {
  floor: number,
};
