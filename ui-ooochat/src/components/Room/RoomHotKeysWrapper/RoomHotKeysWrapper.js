import React, { Dispatch, Node } from "react";
import HotKeysWrapper from "../../Common/HotKeysWrapper/HotKeysWrapper";

type Props = {
  positionDispatcher: Dispatch,
  children: Node,
};

const RoomHotKeysWrapper = (props: Props) => {
  const { positionDispatcher, children } = props;
  const keyMap = {
    MOVE_LEFT: ["a", "left"],
    MOVE_RIGHT: ["d", "right"],
    MOVE_UP: ["w", "up"],
    MOVE_DOWN: ["s", "down"],
  };
  const handlers = {
    // MOVE_LEFT: () => console.info("left"),
    // MOVE_RIGHT: () => console.info("right"),
    // MOVE_UP: () => console.info("up"),
    // MOVE_DOWN: () => console.info("down"),
    MOVE_LEFT: () => positionDispatcher({ type: "left" }),
    MOVE_RIGHT: () => positionDispatcher({ type: "right" }),
    MOVE_UP: () => positionDispatcher({ type: "up" }),
    MOVE_DOWN: () => positionDispatcher({ type: "down" }),
  };
  return (
    <HotKeysWrapper keyMap={keyMap} handlers={handlers}>
      {children}
    </HotKeysWrapper>
  );
};

export default RoomHotKeysWrapper;
