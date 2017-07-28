/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { createSnapshot } from 'utils/testing';

import Preview from '../Preview';

describe('Preivew', () => {
  it('should render correctly', () => {
    const tree = createSnapshot(<Preview />);
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
