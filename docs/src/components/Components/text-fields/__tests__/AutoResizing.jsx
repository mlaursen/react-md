/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import AutoResizing from '../AutoResizing';

describe('AutoResizing', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<AutoResizing />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
