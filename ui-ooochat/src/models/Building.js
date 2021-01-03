import { BuildingPosition, RoomPosition } from "./Position";

export type BuildingMatrix = BuildingPosition & {
  matrix: number[][][],
};

export type RoomMatrix = RoomPosition & {
  matrix: number[][],
};

export type RoomMatrixWithFloor = RoomMatrix & {
  floor: number,
};
