/* eslint-env jest*/
jest.unmock('../FloatingLabel');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import FloatingLabel from '../FloatingLabel';

describe('FloatingLabel', () => {
  it('automatically updates the label to include a \'*\' when required', () => {
    let props = {
      active: false,
      error: false,
      label: 'Hello World',
      required: true,
    };

    let label = renderIntoDocument(<FloatingLabel {...props} />);
    let labelNode = findDOMNode(label);

    expect(labelNode.textContent).toBe('Hello World *');

    props = Object.assign({}, props, { label: 'Hello World *' });
    label = renderIntoDocument(<FloatingLabel {...props} />);
    labelNode = findDOMNode(label);
    expect(labelNode.textContent).toBe('Hello World *');
  });

  it('adds the statefull classNames to the label', () => {
    let props = {
      active: false,
      error: false,
      label: 'Hello World',
      value: '',
    };
    let label = renderIntoDocument(<FloatingLabel {...props} />);
    let className = findDOMNode(label).className;

    expect(className).toContain('md-floating-label');
    expect(className).not.toContain('error');
    expect(className).not.toContain('focus');
    expect(className).not.toContain('active');

    props = Object.assign({}, props, { active: true });
    label = renderIntoDocument(<FloatingLabel {...props} />);
    className = findDOMNode(label).className;

    expect(className).toContain('md-floating-label');
    expect(className).not.toContain('error');
    expect(className).toContain('focus');
    expect(className).toContain('active');

    props = Object.assign({}, props, { error: true });
    label = renderIntoDocument(<FloatingLabel {...props} />);
    className = findDOMNode(label).className;

    expect(className).toContain('md-floating-label');
    expect(className).toContain('error');
    expect(className).toContain('focus');
    expect(className).toContain('active');

    props = Object.assign({}, props, { active: false, value: 'Hello!', error: false });
    label = renderIntoDocument(<FloatingLabel {...props} />);
    className = findDOMNode(label).className;

    expect(className).toContain('md-floating-label');
    expect(className).not.toContain('error');
    expect(className).not.toContain('focus');
    expect(className).toContain('active');
  });
});
