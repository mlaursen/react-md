/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import CountersAndText from '../CountersAndText';

describe('CountersAndText', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<CountersAndText />);
    expect(tree).toMatchSnapshot();
  });
});
