/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import Showcases from '../';

describe('Showcases', () => {
  it('should render all the showcases', () => {
    const tree = createRouterSnapshot(<Showcases />);
    expect(tree).toMatchSnapshot();
  });
});
