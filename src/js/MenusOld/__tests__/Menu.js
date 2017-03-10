/* eslint-env jest */
jest.unmock('../Menu');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import Menu from '../Menu';
import List from '../../Lists/List';

describe('Menu', () => {
  it('merges className and style', () => {
    const props = {
      style: { background: 'black' },
      className: 'test',
      listStyle: { background: 'orange' },
      listClassName: 'wowww',
      isOpen: true,
      onClose: jest.fn(),
    };

    const menu = renderIntoDocument(<Menu {...props} />);
    const menuNode = findDOMNode(menu);
    const list = findRenderedComponentWithType(menu, List);
    expect(menuNode.style.background).toBe(props.style.background);
    expect(menuNode.className).toContain(props.className);
    expect(list.props.style).toEqual(props.listStyle);
    expect(list.props.className).toContain(props.listClassName);
  });
});
