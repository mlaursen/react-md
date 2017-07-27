/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import FloatingLabels from '../FloatingLabels';

describe('FloatingLabels', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<FloatingLabels />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
