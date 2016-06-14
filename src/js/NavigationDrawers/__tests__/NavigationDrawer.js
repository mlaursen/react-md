/*eslint-env jest*/
jest.unmock('../NavigationDrawer');

import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import NavigationDrawer from '../NavigationDrawer';
import Drawer from '../Drawer';
import DrawerToolbar from '../DrawerToolbar';
import Overlay from '../../Transitions/Overlay';


describe('NavigationDrawer', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const navigationDrawer = renderIntoDocument(
      <NavigationDrawer style={style} className={className} navItems={[]} />
    );

    const navigationDrawerNode = findDOMNode(navigationDrawer);
    expect(navigationDrawerNode.style.display).toBe(style.display);
    expect(navigationDrawerNode.classList.contains(className)).toBe(true);
  });

  it('renders the drawer component when open or mini with the correct props', () => {
    const props = {
      navItems: [{ primaryText: 'Hello' }],
      drawerStyle: { background: 'black' },
      drawerClassName: 'some-amazing-class-name',
      drawerTitle: 'Some Amazing Title',
      drawerChildren: <div>Some Stuff</div>,
    };

    let nav = renderIntoDocument(<NavigationDrawer {...props} />);
    // since there is no window object for media queries
    nav.setState({
      mobile: false,
      tablet: false,
      desktop: true,
      drawerType: 'full-height',
    });

    let drawers = scryRenderedComponentsWithType(nav, Drawer);
    expect(drawers.length).toBe(1);
    expect(drawers[0].props.style).toEqual(props.drawerStyle);
    expect(drawers[0].props.className).toContain(props.drawerClassName);
    expect(drawers[0].props.autoclose).toBe(NavigationDrawer.defaultProps.autoclose);
    expect(drawers[0].props.title).toBe(props.drawerTitle);
    expect(drawers[0].props.closeDrawer).toBe(nav.closeDrawer);
    expect(drawers[0].props.closeIconChildren).toBe(NavigationDrawer.defaultProps.closeIconChildren);
    expect(drawers[0].props.closeIconClassName).toBe(NavigationDrawer.defaultProps.closeIconClassName);
    expect(drawers[0].props.temporary).toBe(false);
    expect(drawers[0].props.persistent).toBe(false);
    expect(drawers[0].props.mini).toBe(false);
    expect(drawers[0].props.drawerType).toBe(NavigationDrawer.defaultProps.desktopDrawerType);
    expect(drawers[0].props.children).toBe(props.drawerChildren);
    expect(drawers[0].props.isOpen).toBe(true);
    expect(drawers[0].props.navItems).toBe(props.navItems);

    nav.closeDrawer();
    drawers = scryRenderedComponentsWithType(nav, Drawer);
    expect(drawers.length).toBe(0);

    nav.setState({ drawerType: NavigationDrawer.DrawerType.TEMPORARY_MINI });
    drawers = scryRenderedComponentsWithType(nav, Drawer);
    expect(drawers.length).toBe(1);
    expect(drawers[0].props.temporary).toBe(true);
    expect(drawers[0].props.mini).toBe(true);
    expect(drawers[0].props.drawerType).toBe(NavigationDrawer.DrawerType.TEMPORARY_MINI);
  });

  it('renders the content as a css transition group with relevant props', () => {
    const props = {
      navItems: [],
      contentStyle: { border: '1px solid black' },
      contentClassName: 'some-amazing-content',
    };

    const nav = renderIntoDocument(<NavigationDrawer {...props} />);
    const css = scryRenderedComponentsWithType(nav, CSSTransitionGroup);
    expect(css.length).toBe(2);

    const content = css[1];

    expect(content.props.style).toEqual(props.contentStyle);
    expect(content.props.className).toContain(props.contentClassName);
    expect(content.props.transitionName).toBe(NavigationDrawer.defaultProps.contentTransitionName);
    expect(content.props.transitionEnterTimeout).toBe(NavigationDrawer.defaultProps.contentTransitionEnterTimeout);
    expect(content.props.transitionLeaveTimeout).toBe(NavigationDrawer.defaultProps.contentTransitionLeaveTimeout);
  });

  it('renders a drawer toolbar with the correct props', () => {
    const props = {
      navItems: [],
      toolbarStyle: { border: '1px solid blue' },
      toolbarClassName: 'some-amazing-toolbar',
      toolbarTitle: 'My Amazing Toolbar',
      toolbarChildren: <div>Wow, So Amaze</div>,
    };

    const nav = renderIntoDocument(<NavigationDrawer {...props} />);
    const toolbar = findRenderedComponentWithType(nav, DrawerToolbar);
    expect(toolbar.props.isOpen).toBe(nav.state.isOpen);
    expect(toolbar.props.drawerType).toBe(nav.state.drawerType);
    expect(toolbar.props.style).toEqual(props.toolbarStyle);
    expect(toolbar.props.className).toContain(props.toolbarClassName);
    expect(toolbar.props.temporary).toBeDefined();
    expect(toolbar.props.persistent).toBeDefined();
    expect(toolbar.props.title).toBe(props.toolbarTitle);
    expect(toolbar.props.children).toBe(props.toolbarChildren);
    expect(toolbar.props.openDrawer).toBe(nav.openDrawer);
    expect(toolbar.props.menuIconChildren).toBe(NavigationDrawer.defaultProps.menuIconChildren);
    expect(toolbar.props.menuIconClassName).toBe(NavigationDrawer.defaultProps.menuIconClassName);
  });

  it('renders an overlay for temporary drawers', () => {
    const nav = renderIntoDocument(<NavigationDrawer navItems={[]} />);
    nav.setState({ mobile: false, tablet: false, desktop: true, drawerType: NavigationDrawer.defaultProps.FULL_HEIGHT });

    let overlays = scryRenderedComponentsWithType(nav, Overlay);
    expect(overlays.length).toBe(0);

    nav.setState({ drawerType: NavigationDrawer.DrawerType.TEMPORARY });
    overlays = scryRenderedComponentsWithType(nav, Overlay);
    expect(overlays.length).toBe(1);
    expect(overlays[0].props.isOpen).toBe(nav.state.isOpen);
    expect(overlays[0].props.onClick).toBe(nav.closeDrawer);

    nav.setState({ drawerType: NavigationDrawer.DrawerType.TEMPORARY_MINI });
    overlays = scryRenderedComponentsWithType(nav, Overlay);
    expect(overlays.length).toBe(1);
  });
});
