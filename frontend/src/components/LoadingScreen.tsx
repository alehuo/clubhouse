import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const LoadingScreenWrapper = styled.div`
    margin: 40px;
    width: 200px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const LoadingScreen = () => (
    <LoadingScreenWrapper>
        <Spinner animation="grow" variant="success" role="status" />
        <Spinner animation="grow" variant="danger" role="status" />
        <Spinner animation="grow" variant="warning" role="status" />
        <Spinner animation="grow" variant="info" role="status" />
    </LoadingScreenWrapper>
);

export { LoadingScreen, LoadingScreenWrapper };
