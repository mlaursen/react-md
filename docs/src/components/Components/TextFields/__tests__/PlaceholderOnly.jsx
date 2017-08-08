/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import PlaceholderOnly from '../PlaceholderOnly';

describe('PlaceholderOnly', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<PlaceholderOnly />);
    expect(tree).toMatchSnapshot();
  });
});
