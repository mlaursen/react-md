/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';
import Version from '../Version';

describe('Version', () => {
  it('should render with the version prop', () => {
    const tree = createSnapshot(<Version version="v1.1.0" />);
    expect(tree).toMatchSnapshot();
  });
});
