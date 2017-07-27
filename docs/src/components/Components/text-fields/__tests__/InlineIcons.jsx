/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import InlineIcons from '../InlineIcons';

describe('InlineIcons', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<InlineIcons />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
