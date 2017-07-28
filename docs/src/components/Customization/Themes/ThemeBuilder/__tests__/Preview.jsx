/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import Preview from '../Preview';

describe('Preivew', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<Preview />);
    expect(tree).toMatchSnapshot();
  });
});
