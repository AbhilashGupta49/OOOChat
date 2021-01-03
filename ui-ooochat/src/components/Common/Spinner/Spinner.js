import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner-border {
    width: ${(props) => props.dimension}rem;
    height: ${(props) => props.dimension}rem;
  }
`;

type Props = {
  dimension: number,
};

const Spinner = (props: Props) => {
  const { dimension } = props;
  return (
    <SpinnerWrapper dimension={dimension || 2}>
      <BootstrapSpinner animation="border" variant="primary" />
    </SpinnerWrapper>
  );
};

export default Spinner;
