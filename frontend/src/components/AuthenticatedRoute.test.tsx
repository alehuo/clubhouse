import { shallow } from 'enzyme';
import React from 'react';
import { AuthenticatedRoute } from './AuthenticatedRoute';

it('AuthenticatedRoute matches snapshot (not authenticated)', () => {
    const cmpnt = shallow(<AuthenticatedRoute isAuthenticated={false} component={() => <div>Hello</div>} />);
    expect(cmpnt).toMatchSnapshot();
});

it('AuthenticatedRoute matches snapshot (authenticated)', () => {
    const cmpnt = shallow(<AuthenticatedRoute isAuthenticated={true} component={() => <div>Hello</div>} />);
    expect(cmpnt).toMatchSnapshot();
});
