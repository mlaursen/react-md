/* eslint-env jest */
jest.unmock('../Message');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import Message from '../Message';

describe('Message', () => {
  it('renders null if there are no children', () => {
    let message = renderIntoDocument(<Message />);
    let messageNode = findDOMNode(message);
    expect(messageNode).toBe(null);

    message = renderIntoDocument(<Message>woop</Message>);
    messageNode = findDOMNode(message);
    expect(messageNode).not.toBe(null);
  });

  it('sets the aria-hidden prop based on the active prop', () => {
    const props = { active: false, children: 'woop' };
    let message = renderIntoDocument(<Message {...props} />);
    let messageNode = findDOMNode(message);
    expect(messageNode.getAttribute('aria-hidden')).toBe('true');

    props.active = true;
    message = renderIntoDocument(<Message {...props} />);
    messageNode = findDOMNode(message);
    expect(messageNode.getAttribute('aria-hidden')).toBe('false');
  });

  it('adds the --active state when active and the --inactive state when not active', () => {
    const props = { active: false, children: 'woop' };
    let message = renderIntoDocument(<Message {...props} />);
    let messageNode = findDOMNode(message);
    expect(messageNode.className).not.toContain('md-text-field-message--active');
    expect(messageNode.className).toContain('md-text-field-message--inactive');

    props.active = true;
    message = renderIntoDocument(<Message {...props} />);
    messageNode = findDOMNode(message);
    expect(messageNode.className).toContain('md-text-field-message--active');
    expect(messageNode.className).not.toContain('md-text-field-message--inactive');
  });

  it('adds an optional className', () => {
    const props = { className: 'woop', children: 'woop' };
    const message = renderIntoDocument(<Message {...props} />);
    const messageNode = findDOMNode(message);

    expect(messageNode.className).toContain(props.className);
  });
});
