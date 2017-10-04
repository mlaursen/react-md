/* eslint-env jest */
import React from 'react';
import { render } from 'enzyme';

import InlineIcons from '../InlineIcons';

describe('InlineIcons', () => {
  it('should render correctly', () => {
    const tree = render(<InlineIcons />);
    expect(tree).toMatchSnapshot();
  });
});
