/* eslint-env jest */
import React from 'react';
import { mount, render } from 'enzyme';
import { Button } from 'react-md';

import Preview from '../Preview';

describe('Preview', () => {
  it('should render correctly', () => {
    const tree = render(<Preview />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly after the drawer has become visible', () => {
    const preview = mount(<Preview />);
    expect(preview.state('visible')).toBe(false);

    preview.find(Button).at(0).simulate('click');
    expect(preview.state('visible')).toBe(true);
    jest.runAllTimers();
    expect(preview.render()).toMatchSnapshot();
  });
});
