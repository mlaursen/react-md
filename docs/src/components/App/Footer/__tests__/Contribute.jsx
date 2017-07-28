/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';
import Contribute from '../Contribute';

describe('Contribute', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<Contribute />);
    expect(tree).toMatchSnapshot();
  });
});
