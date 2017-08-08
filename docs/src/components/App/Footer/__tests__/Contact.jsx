/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';
import Contact from '../Contact';

describe('Contact', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<Contact />);
    expect(tree).toMatchSnapshot();
  });
});
