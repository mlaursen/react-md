/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import Preview from '../Preview';

describe('Preivew', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Preview />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
