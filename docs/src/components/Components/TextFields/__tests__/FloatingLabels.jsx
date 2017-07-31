/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import FloatingLabels from '../FloatingLabels';

describe('FloatingLabels', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<FloatingLabels />);
    expect(tree).toMatchSnapshot();
  });
});
