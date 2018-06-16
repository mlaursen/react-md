/* eslint-env jest */
import React from 'react';
import { renderReduxRouterSnapshot } from 'utils/testing';

import ThemeBuilder from '../';

describe('ThemeBuilder', () => {
  it('should render correctly', () => {
    const tree = renderReduxRouterSnapshot(<ThemeBuilder />);
    expect(tree).toMatchSnapshot();
  });
});
