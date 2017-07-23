/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import PlaceholderOnly from '../PlaceholderOnly';

describe('PlaceholderOnly', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<PlaceholderOnly />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
