/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import NavigationDrawer from '../NavigationDrawer';
import Toolbar from '../../Toolbars/Toolbar';
import Drawer from '../../Drawers/Drawer';
import Dialog from '../../Dialogs/Dialog';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Portal from '../../Helpers/Portal';

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

  it('should inherit the dialog\'s renderNode context', () => {
    const dialog = renderIntoDocument(<Dialog id="test" aria-label="Test"><NavigationDrawer /></Dialog>);
    const drawer = findRenderedComponentWithType(dialog, NavigationDrawer);
    expect(drawer.context.renderNode).toBe(dialog.getChildContext().renderNode);
  });

  it('should not render in the Portal component by default', () => {
    const drawer = mount(<NavigationDrawer />);
    expect(drawer.find(Portal).length).toBe(0);
  });

  it('should render in the Portal component if the portal prop is enabled', () => {
    const drawer = mount(<NavigationDrawer portal />);
    expect(drawer.find(Portal).length).toBe(1);
  });
});
