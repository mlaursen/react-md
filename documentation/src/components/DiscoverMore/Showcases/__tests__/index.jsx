/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import Showcases from '../';

describe('Showcases', () => {
  it('should render all the showcases', () => {
    const tree = renderer.create(<Showcases />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
