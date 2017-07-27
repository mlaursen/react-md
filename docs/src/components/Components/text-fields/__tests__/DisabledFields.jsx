/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import DisabledFields from '../DisabledFields';

describe('DisabledFields', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<DisabledFields />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
