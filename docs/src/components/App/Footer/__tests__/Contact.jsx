/* eslint-env jest */
import React from 'react';
import { render } from 'enzyme';
import Contact from '../Contact';

describe('Contact', () => {
  it('should render correctly', () => {
    const tree = render(<Contact />);
    expect(tree).toMatchSnapshot();
  });
});
