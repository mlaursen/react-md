/* eslint-env jest */
import React from 'react';
import { render } from 'enzyme';

import SeparateIcons from '../SeparateIcons';

describe('SeparateIcons', () => {
  it('should render correctly', () => {
    const tree = render(<SeparateIcons />);
    expect(tree).toMatchSnapshot();
  });
});
