import React from 'react';
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
        Loading...
    </LoadingScreenWrapper>
);

export { LoadingScreen, LoadingScreenWrapper };
