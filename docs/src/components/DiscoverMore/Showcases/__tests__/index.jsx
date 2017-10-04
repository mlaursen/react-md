/* eslint-env jest */
import React from 'react';
import { renderRouterSnapshot } from 'utils/testing';

import Showcases from '../';

describe('Showcases', () => {
  it('should render all the showcases', () => {
    const tree = renderRouterSnapshot(<Showcases />);
    expect(tree).toMatchSnapshot();
  });
});
