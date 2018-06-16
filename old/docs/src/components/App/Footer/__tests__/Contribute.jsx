/* eslint-env jest */
import React from 'react';
import { render } from 'enzyme';
import Contribute from '../Contribute';

describe('Contribute', () => {
  it('should render correctly', () => {
    const tree = render(<Contribute />);
    expect(tree).toMatchSnapshot();
  });
});
