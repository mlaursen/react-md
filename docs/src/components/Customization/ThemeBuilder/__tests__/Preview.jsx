/* eslint-env jest */
import React from 'react';
import { mount, render } from 'enzyme';

import Preview from '../Preview';

describe('Preview', () => {
  it('should render correctly', () => {
    const tree = render(<Preview />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly after the drawer has become visible', () => {
    const preview = mount(<Preview />);
    expect(preview.state('visible')).toBe(false);

    preview.find('#theme-builder-preview-drawer-toggle').simulate('click');
    expect(preview.state('visible')).toBe(true);
    jest.runAllTimers();
    expect(preview.render()).toMatchSnapshot();
  });
});
