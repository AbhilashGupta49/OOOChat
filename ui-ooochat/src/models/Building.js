import { BuildingPosition, RoomPosition } from "./Position";

export type BuildingMatrix = BuildingPosition & {
  buildingMatrix: string[][][],
};

export type RoomMatrix = RoomPosition & {
  roomMatrix: string[][],
};

export type RoomMatrixWithFloor = RoomMatrix & {
  floor: number,
};
