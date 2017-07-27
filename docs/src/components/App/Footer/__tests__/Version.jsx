/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Version from '../Version';

describe('Version', () => {
  it('should render with the version prop', () => {
    const tree = renderer.create(<Version version="v1.1.0" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
