/* eslint-env jest*/
jest.unmock('../DrawerHeader');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import DrawerHeader from '../DrawerHeader';
import { IconButton } from '../../Buttons';

describe('DrawerHeader', () => {
  it('allows for a className to be passed it', () => {
    const props = {
      title: 'test',
      className: 'test',
      closeDrawer: jest.fn(),
      persistent: false,
      temporary: false,
    };

    const header = renderIntoDocument(<DrawerHeader {...props} />);
    const headerNode = findDOMNode(header);
    expect(headerNode.className).toContain(props.className);
  });

  it('renders a title when the title prop is defined.', () => {
    const props = {
      closeDrawer: jest.fn(),
      title: 'Hello, World!',
      persistent: false,
      temporary: false,
    };

    const header = renderIntoDocument(<DrawerHeader {...props} />);
    const headerNode = findDOMNode(header);
    expect(headerNode.textContent).toBe(props.title);
  });

  it('renders a close button when persistent', () => {
    const props = {
      closeDrawer: jest.fn(),
      closeIconChildren: 'close',
      persistent: true,
      temporary: false,
    };

    const header = renderIntoDocument(<DrawerHeader {...props} />);
    const btns = scryRenderedComponentsWithType(header, IconButton);
    expect(btns.length).toBe(1);
    expect(btns[0].props.children).toBe(props.closeIconChildren);
    expect(btns[0].props.onClick).toBe(props.closeDrawer);
  });
});
