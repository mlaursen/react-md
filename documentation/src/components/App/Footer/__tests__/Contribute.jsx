/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Contribute from '../Contribute';

describe('Contribute', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Contribute />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
