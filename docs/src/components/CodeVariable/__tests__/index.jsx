/* eslint-env jest */
import React from 'react';
import { createSnapshot } from 'utils/testing';

import CodeVariable from '../';

describe('CodeVariable', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<CodeVariable>$md-primary-color: #90f293;</CodeVariable>);
    expect(tree).toMatchSnapshot();
  });
});
