import React, { Component } from "react";
import styled from "styled-components";
import CompleteRoom from "./components/Room/CompleteRoom/CompleteRoom";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const App = (): Component => (
  <AppContainer>
    {/* <OptionsMenu/> */}
    <CompleteRoom />
    {/* <ChatRoom/> */}
  </AppContainer>
);

export default App;
