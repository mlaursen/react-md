/*eslint-env jest*/
jest.unmock('../Drawer');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import Drawer from '../Drawer';
import DrawerHeader from '../DrawerHeader';
import { List } from '../../Lists';

describe('Drawer', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const props = {
      style,
      className,
      navItems: [],
      isOpen: true,
      persistent: false,
      temporary: false,
      mini: false,
      drawerType: 'clipped',
      autoclose: true,
      closeDrawer: jest.fn(),
    };
    const drawer = renderIntoDocument(<Drawer {...props} />);

    const drawerNode = findDOMNode(drawer);
    expect(drawerNode.style.display).toBe(style.display);
    expect(drawerNode.className).toContain(className);
  });

  it('updates the className to include the drawerType and active classNames', () => {
    let props = {
      navItems: [],
      isOpen: true,
      persistent: false,
      temporary: false,
      mini: false,
      drawerType: 'clipped',
      autoclose: true,
      closeDrawer: jest.fn(),
    };
    let drawer = renderIntoDocument(<Drawer {...props} />);
    let drawerNode = findDOMNode(drawer);

    expect(drawerNode.className).toContain(props.drawerType);
    expect(drawerNode.className).not.toContain('active');

    // unopened mini drawer
    props = Object.assign({}, props, {
      drawerType: 'mini',
      mini: true,
      isOpen: false,
    });
    drawer = renderIntoDocument(<Drawer {...props} />);
    drawerNode = findDOMNode(drawer);

    expect(drawerNode.className).toContain(props.drawerType);
    expect(drawerNode.className).not.toContain('active');

    // opened mini drawer
    props = Object.assign({}, props, {
      drawerType: 'mini',
      mini: true,
      isOpen: true,
    });
    drawer = renderIntoDocument(<Drawer {...props} />);
    drawerNode = findDOMNode(drawer);

    expect(drawerNode.className).toContain(props.drawerType);
    expect(drawerNode.className).toContain('active');
  });

  it('renders the DrawerHeader component when not mini or open when mini', () => {
    let props = {
      navItems: [],
      isOpen: true,
      persistent: false,
      temporary: false,
      mini: false,
      drawerType: 'full-height',
      autoclose: true,
      closeDrawer: jest.fn(),
      title: 'Title',
      closeIconChildren: 'what',
      closeIconClassName: 'material-icons',
      children: 'Hello',
    };
    let drawer = renderIntoDocument(<Drawer {...props} />);
    let headers = scryRenderedComponentsWithType(drawer, DrawerHeader);
    expect(headers.length).toBe(1);
    expect(headers[0].props.title).toBe(props.title);
    expect(headers[0].props.closeDrawer).toBe(props.closeDrawer);
    expect(headers[0].props.closeIconChildren).toBe(props.closeIconChildren);
    expect(headers[0].props.closeIconClassName).toBe(props.closeIconClassName);
    expect(headers[0].props.persistent).toBe(props.persistent);
    expect(headers[0].props.children).toBe(props.children);

    // Closed mini drawer
    props = Object.assign({}, props, {
      drawerType: 'mini',
      mini: true,
      isOpen: false,
    });
    drawer = renderIntoDocument(<Drawer {...props} />);
    headers = scryRenderedComponentsWithType(drawer, DrawerHeader);
    expect(headers.length).toBe(0);

    // Opened mini drawer
    props = Object.assign({}, props, {
      isOpen: true,
    });
    drawer = renderIntoDocument(<Drawer {...props} />);
    headers = scryRenderedComponentsWithType(drawer, DrawerHeader);
    expect(headers.length).toBe(1);
  });

  it('renders a List component with an onClick to close the drawer when temporary and autoclose is true', () => {
    let props = {
      navItems: [],
      isOpen: true,
      persistent: false,
      temporary: true,
      mini: false,
      drawerType: 'temporary',
      autoclose: true,
      closeDrawer: jest.fn(),
    };

    let drawer = renderIntoDocument(<Drawer {...props} />);
    let list = findRenderedComponentWithType(drawer, List);
    expect(list.props.onClick).toBe(props.closeDrawer);

    props = Object.assign({}, props, { autoclose: false });

    drawer = renderIntoDocument(<Drawer {...props} />);
    list = findRenderedComponentWithType(drawer, List);
    expect(list.props.onClick).toBe(null);

    props = Object.assign({}, props, { temporary: false, drawerType: 'full-height' });

    drawer = renderIntoDocument(<Drawer {...props} />);
    list = findRenderedComponentWithType(drawer, List);
    expect(list.props.onClick).toBe(null);

    props = Object.assign({}, props, { autoclose: true });

    drawer = renderIntoDocument(<Drawer {...props} />);
    list = findRenderedComponentWithType(drawer, List);
    expect(list.props.onClick).toBe(null);
  });
});
