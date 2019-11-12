/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import Colors from '../';

describe('Colors', () => {
  it('should render correctly', () => {
    const tree1 = createRouterSnapshot(<Colors />);
    expect(tree1).toMatchSnapshot();
  });
});
