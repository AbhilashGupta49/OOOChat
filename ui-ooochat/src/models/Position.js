export type BuildingPosition = RoomPosition & {
  floor: number,
};

export type RoomPosition = {
  row: number,
  column: number,
};
