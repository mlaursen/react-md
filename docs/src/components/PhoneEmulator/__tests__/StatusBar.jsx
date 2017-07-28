/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import StatusBar from '../StatusBar';

describe('StatusBar', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<StatusBar />);
    expect(tree).toMatchSnapshot();
  });
});
