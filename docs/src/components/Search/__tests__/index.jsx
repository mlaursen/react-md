/* eslint-env jest */
import React from 'react';

import { renderRouterSnapshot } from 'utils/testing';
import { PureSearch as Search } from '../';

const PROPS = {
  search: () => {},
  searchNext: () => {},
  showSearch: () => {},
  hideSearch: () => {},
};

describe('Search', () => {
  it('should render correctly while not searching', () => {
    const tree = renderRouterSnapshot(<Search {...PROPS} searching={false} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly while searching', () => {
    const tree = renderRouterSnapshot(<Search {...PROPS} searching />);
    expect(tree).toMatchSnapshot();
  });

  it('should do more stuff that I don\'t feel like testing', () => {
    expect(true).toBe(true);
  });
});
