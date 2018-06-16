/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-dom/test-utils';

import Badge from '../Badge';

describe('Badge', () => {
  it('should merge style and className', () => {
    const props = {
      badgeId: 'test',
      style: { display: 'block' },
      className: 'test',
      badgeContent: 0,
    };

    const badge = renderIntoDocument(<Badge {...props}>a</Badge>);
    const badgeNode = findDOMNode(badge);
    expect(badgeNode.style.display).toBe(props.style.display);
    expect(badgeNode.className).toContain(props.className);
  });

  it('should render the children as the first child', () => {
    const badge = renderIntoDocument(<Badge badgeId="test" badgeContent={0}><p>Hello</p></Badge>);
    const badgeNode = findDOMNode(badge);
    expect(badgeNode.childNodes[0].textContent).toBe('Hello');
  });

  it('should clone the aria-describedby attribute if there is only a single element as a child', () => {
    const badge = renderIntoDocument(<Badge badgeId="test" badgeContent={1}><p>Hello</p></Badge>);
    const p = findRenderedDOMComponentWithTag(badge, 'p');
    expect(p.getAttribute('aria-describedby')).toBe('test');
  });

  it('should add the aria-describedby attribute to the container if there is a single child and it is not an element', () => {
    const badge = renderIntoDocument(<Badge badgeId="test" badgeContent={1}>Hello</Badge>);
    const badgeNode = findDOMNode(badge);
    expect(badgeNode.getAttribute('aria-describedby')).toBe('test');
  });

  it('should render a badge element with the badge content', () => {
    const badge = renderIntoDocument(<Badge badgeId="test" badgeContent={1}>a</Badge>);
    const b = findRenderedDOMComponentWithTag(badge, 'span');
    expect(b).toBeDefined();
    expect(b.textContent).toBe('1');
  });

  it('should merge style and className on the badge itself', () => {
    const props = {
      badgeId: 'test',
      badgeStyle: { background: 'red' },
      badgeClassName: 'some-amazing-test',
      badgeContent: 32,
    };
    const badge = renderIntoDocument(<Badge {...props}>Hello</Badge>);
    const b = findRenderedDOMComponentWithTag(badge, 'span');
    expect(b.style.background).toBe(props.badgeStyle.background);
    expect(b.className).toContain(props.badgeClassName);
  });

  it('should not render the badge when the badgeContent is 0 ad invisibleOnZero is enabled', () => {
    const props = {
      badgeId: 'test',
      badgeContent: 0,
      invisibleOnZero: true,
    };
    let badge = renderIntoDocument(<Badge {...props}>Hello</Badge>);
    let badgeNode = findDOMNode(badge);
    expect(badgeNode.textContent).toBe('Hello');

    props.badgeContent = '0';
    badge = renderIntoDocument(<Badge {...props}>Hello</Badge>);
    badgeNode = findDOMNode(badge);
    expect(badgeNode.textContent).toBe('Hello');
  });
});
