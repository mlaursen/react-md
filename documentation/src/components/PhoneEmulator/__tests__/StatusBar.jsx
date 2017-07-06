/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import StatusBar from '../StatusBar';

describe('StatusBar', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<StatusBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
