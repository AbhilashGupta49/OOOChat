import { BuildingPosition, RoomPosition } from "./Position";

export type BuildingMatrix = {
  buildingPosition: BuildingPosition,
  matrix: number[][][],
};

export type RoomMatrix = {
  roomPosition: RoomPosition,
  matrix: number[][],
};

export type RoomMatrixWithFloor = RoomMatrix & {
  floor: number,
};
