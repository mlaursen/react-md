/* eslint-env jest */
jest.unmock('../NavigationDrawer');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import NavigationDrawer from '../NavigationDrawer';
import Toolbar from '../../Toolbars/Toolbar';
import Drawer from '../../Drawers/Drawer';
import CSSTransitionGroup from 'react-addons-css-transition-group';

// Not sure what to _really_ test here.
describe('NavigationDrawer', () => {
  it('passes styles and classnames correctly', () => {
    const props = {
      style: { background: 'black' },
      className: 'woop-woop',
      toolbarStyle: { background: 'red' },
      toolbarClassName: 'thats-the-sound',
      drawerStyle: { background: 'blue' },
      drawerClassName: 'of-the-police',
      contentStyle: { background: 'orange' },
      contentClassName: 'testing',
    };

    const navigation = renderIntoDocument(<NavigationDrawer {...props} />);
    const navigationNode = findDOMNode(navigation);
    const toolbar = findRenderedComponentWithType(navigation, Toolbar);
    const drawer = findRenderedComponentWithType(navigation, Drawer);
    const content = findRenderedComponentWithType(navigation, CSSTransitionGroup);

    expect(navigationNode.style.background).toBe(props.style.background);
    expect(navigationNode.className).toContain(props.className);

    expect(toolbar.props.style).toEqual(props.toolbarStyle);
    expect(toolbar.props.className).toContain(props.toolbarClassName);

    expect(drawer.props.style).toEqual(props.drawerStyle);
    expect(drawer.props.className).toContain(props.drawerClassName);

    expect(content.props.style).toEqual(props.contentStyle);
    expect(content.props.className).toContain(props.contentClassName);
  });
});
