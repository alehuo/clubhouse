import React from "react";
import { ProgressBar } from "react-bootstrap";
import styled from "styled-components";

const LoadingScreenWrapper = styled.div`
  margin: 40px;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const LoadingScreen = () => (
  <LoadingScreenWrapper>
    <h3>Loading...</h3>
    <ProgressBar active now={100} />
  </LoadingScreenWrapper>
);

export { LoadingScreen };
