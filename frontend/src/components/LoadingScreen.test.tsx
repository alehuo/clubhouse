import { shallow } from 'enzyme';
import React from 'react';
import { LoadingScreen, LoadingScreenWrapper } from './LoadingScreen';

it('LoadingScreen matches snapshot', () => {
    const cmpnt = shallow(<LoadingScreen />);
    expect(cmpnt).toMatchSnapshot();
});

it('LoadingScreenWrapper matches snapshot', () => {
    const cmpnt = shallow(<LoadingScreenWrapper />);
    expect(cmpnt).toMatchSnapshot();
});
