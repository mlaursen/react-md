/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import InlineIcons from '../InlineIcons';

describe('InlineIcons', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<InlineIcons />);
    expect(tree).toMatchSnapshot();
  });
});
