/* eslint-env jest */
import React from 'react';
import { renderRouterSnapshot } from 'utils/testing';

import Home from '../';

describe('Home', () => {
  it('should render correctly', () => {
    const tree = renderRouterSnapshot(<Home />);
    expect(tree).toMatchSnapshot();
  });
});
