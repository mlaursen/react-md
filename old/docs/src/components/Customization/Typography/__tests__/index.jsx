/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import Typography from '../';

describe('Typography', () => {
  it('should render correctly', () => {
    const tree = createRouterSnapshot(<Typography />);
    expect(tree).toMatchSnapshot();
  });
});
