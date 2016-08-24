/* eslint-env jest*/
jest.unmock('../DrawerToolbar');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import DrawerToolbar from '../DrawerToolbar';
import { IconButton } from '../../Buttons';

describe('DrawerToolbar', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    let props = {
      style,
      className,
      drawerType: 'clipped',
      isOpen: true,
      temporary: false,
      persistent: false,
      openDrawer: jest.fn(),
    };
    let drawerToolbar = renderIntoDocument(<DrawerToolbar {...props} />);

    let drawerToolbarNode = findDOMNode(drawerToolbar);
    expect(drawerToolbarNode.style.display).toBe(style.display);
    expect(drawerToolbarNode.className).toContain(className);
    expect(drawerToolbarNode.className).toContain(props.drawerType);
    expect(drawerToolbarNode.className).toContain('active');

    props = Object.assign({}, props, { isOpen: false });
    drawerToolbar = renderIntoDocument(<DrawerToolbar {...props} />);

    drawerToolbarNode = findDOMNode(drawerToolbar);
    expect(drawerToolbarNode.style.display).toBe(style.display);
    expect(drawerToolbarNode.className).toContain(className);
    expect(drawerToolbarNode.className).toContain(props.drawerType);
    expect(drawerToolbarNode.className).not.toContain('active');

    props = Object.assign({}, props, { true: false, drawerType: 'temporary', temporary: true });
    drawerToolbar = renderIntoDocument(<DrawerToolbar {...props} />);

    drawerToolbarNode = findDOMNode(drawerToolbar);
    expect(drawerToolbarNode.style.display).toBe(style.display);
    expect(drawerToolbarNode.className).toContain(className);
    expect(drawerToolbarNode.className).toContain(props.drawerType);
    expect(drawerToolbarNode.className).not.toContain('active');
  });

  it('renders a menu icon button if it is temporary or not open and persistent', () => {
    let props = {
      drawerType: 'clipped',
      isOpen: true,
      temporary: false,
      persistent: false,
      openDrawer: jest.fn(),
    };
    let toolbar = renderIntoDocument(<DrawerToolbar {...props} />);
    let btns = scryRenderedComponentsWithType(toolbar, IconButton);

    expect(btns.length).toBe(0);

    // Temporary drawer
    props = Object.assign({}, props, {
      drawerType: 'temporary',
      temporary: true,
    });
    toolbar = renderIntoDocument(<DrawerToolbar {...props} />);
    btns = scryRenderedComponentsWithType(toolbar, IconButton);

    expect(btns.length).toBe(1);

    // Closed persistent drawer
    props = Object.assign({}, props, {
      drawerType: 'persistent',
      temporary: false,
      persistent: true,
      isOpen: false,
    });
    toolbar = renderIntoDocument(<DrawerToolbar {...props} />);
    btns = scryRenderedComponentsWithType(toolbar, IconButton);

    expect(btns.length).toBe(1);

    // Open persistent drawer
    props = Object.assign({}, props, {
      isOpen: true,
    });
    toolbar = renderIntoDocument(<DrawerToolbar {...props} />);
    btns = scryRenderedComponentsWithType(toolbar, IconButton);

    expect(btns.length).toBe(0);
  });

  it('renders a title if given', () => {
    const props = {
      drawerType: 'clipped',
      isOpen: true,
      temporary: false,
      persistent: false,
      openDrawer: jest.fn(),
      title: 'Eyyyy',
    };

    const toolbar = renderIntoDocument(<DrawerToolbar {...props} />);
    const toolbarNode = findDOMNode(toolbar);
    expect(toolbarNode.textContent).toBe(props.title);
  });

  it('renders any additional children after the menu button and title', () => {
    const props = {
      drawerType: 'temporary',
      isOpen: true,
      temporary: true,
      persistent: false,
      openDrawer: jest.fn(),
      title: 'Eyyyy',
      children: <div className="test">Wow</div>,
    };

    const toolbar = renderIntoDocument(<DrawerToolbar {...props} />);
    const toolbarNode = findDOMNode(toolbar);
    expect(toolbarNode.childNodes.length).toBe(3);
    // Not sure how to test that first is icon button
    expect(toolbarNode.childNodes[1].textContent).toBe(props.title);
    expect(toolbarNode.childNodes[2]).toBe(findRenderedDOMComponentWithClass(toolbar, 'test'));
  });
});
