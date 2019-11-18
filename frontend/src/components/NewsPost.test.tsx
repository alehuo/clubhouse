import { shallow } from 'enzyme';
import React from 'react';
import NewsPost from './NewsPost';

it('NewsPost matches snapshot', () => {
    const cmpnt = shallow(
        <NewsPost
            author={1}
            message="Hello World!"
            title="Test title"
            onDelete={() => null}
            onEdit={() => null}
            hasEditDeletePermissions={false}
            date="2019-12-30 12:00:00"
        />,
    );
    expect(cmpnt).toMatchSnapshot();
});

it('NewsPost matches snapshot (has permissions)', () => {
    const cmpnt = shallow(
        <NewsPost
            author={1}
            message="Hello World!"
            title="Test title"
            onDelete={() => null}
            onEdit={() => null}
            hasEditDeletePermissions={true}
            date="2019-12-30 13:00:00"
        />,
    );
    expect(cmpnt).toMatchSnapshot();
});
