import React, { Component } from "react";
import styled from "styled-components";
import { CompleteRoom } from "./components/Room/CompleteRoom/CompleteRoom";
import { ViewableRoom } from "./components/Room/ViewableRoom/ViewableRoom";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const App = (): Component => {
  return (
    <AppContainer>
      {/* <OptionsMenu/> */}
      <CompleteRoom>
        {({ viewableMatrix, positionDispatcher, currentPosition }) => (
          <ViewableRoom
            viewableMatrix={viewableMatrix}
            positionDispatcher={positionDispatcher}
            currentPosition={currentPosition}
          />
        )}
      </CompleteRoom>
      {/* <ChatRoom/> */}
    </AppContainer>
  );
};

export default App;
