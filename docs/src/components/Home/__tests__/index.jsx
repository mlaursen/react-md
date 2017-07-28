/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import Home from '../';

describe('Home', () => {
  it('should render correctly', () => {
    const tree = createRouterSnapshot(<Home />);
    expect(tree).toMatchSnapshot();
  });
});
