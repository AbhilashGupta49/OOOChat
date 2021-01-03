export type RoomPosition = {
  row: number,
  column: number,
};

export type BuildingPosition = RoomPosition & {
  floor: number,
};
