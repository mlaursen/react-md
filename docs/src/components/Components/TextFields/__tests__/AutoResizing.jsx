/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import AutoResizing from '../AutoResizing';

describe('AutoResizing', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<AutoResizing />);
    expect(tree).toMatchSnapshot();
  });
});
