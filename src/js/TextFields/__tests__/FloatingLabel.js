/* eslint-env jest */
jest.unmock('../FloatingLabel');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import FloatingLabel from '../FloatingLabel';

describe('FloatingLabel', () => {
  it('returns null if there is no label', () => {
    let label = renderIntoDocument(<FloatingLabel htmlFor="test" />);
    let labelNode = findDOMNode(label);
    expect(labelNode).toBe(null);

    label = renderIntoDocument(<FloatingLabel label="Test" htmlFor="test" />);
    labelNode = findDOMNode(label);
    expect(labelNode).not.toBe(null);
  });

  it('merges styles and classnames', () => {
    const props = {
      htmlFor: 'test',
      label: 'Test',
      style: { display: 'block' },
      className: 'test-label',
    };

    const label = renderIntoDocument(<FloatingLabel {...props} />);
    const labelNode = findDOMNode(label);
    expect(labelNode.style.display).toEqual(props.style.display);
    expect(labelNode.className).toContain(props.className);
  });

  it('adds the active state only when active and there is no error', () => {
    const props = {
      htmlFor: 'test',
      label: 'Test',
      active: true,
      error: false,
    };

    let label = renderIntoDocument(<FloatingLabel {...props} />);
    let labelNode = findDOMNode(label);

    expect(labelNode.className).toContain('md-floating-label--active');

    props.error = true;
    label = renderIntoDocument(<FloatingLabel {...props} />);
    labelNode = findDOMNode(label);

    expect(labelNode.className).not.toContain('md-floating-label--active');
  });

  it('adds the error state only when there is an error and not disabled', () => {
    const props = {
      htmlFor: 'test',
      label: 'Test',
      error: false,
    };

    let label = renderIntoDocument(<FloatingLabel {...props} />);
    let labelNode = findDOMNode(label);

    expect(labelNode.className).not.toContain('md-floating-label--error');

    props.error = true;
    label = renderIntoDocument(<FloatingLabel {...props} />);
    labelNode = findDOMNode(label);

    expect(labelNode.className).toContain('md-floating-label--error');

    props.disabled = true;
    label = renderIntoDocument(<FloatingLabel {...props} />);
    labelNode = findDOMNode(label);

    expect(labelNode.className).not.toContain('md-floating-label--error');
  });

  it('adds the inactive state when the label is not floating and there is no custom size', () => {
    const props = {
      htmlFor: 'test',
      label: 'Test',
      floating: true,
    };

    let label = renderIntoDocument(<FloatingLabel {...props} />);
    let labelNode = findDOMNode(label);

    expect(labelNode.className).not.toContain('md-floating-label--inactive');

    props.customSize = 'title';
    label = renderIntoDocument(<FloatingLabel {...props} />);
    labelNode = findDOMNode(label);
    expect(labelNode.className).not.toContain('md-floating-label--inactive');

    props.floating = false;
    label = renderIntoDocument(<FloatingLabel {...props} />);
    labelNode = findDOMNode(label);

    expect(labelNode.className).toContain('md-floating-label--inactive');

    props.customSize = null;
    label = renderIntoDocument(<FloatingLabel {...props} />);
    labelNode = findDOMNode(label);

    expect(labelNode.className).toContain('md-floating-label--inactive');
  });

  it('adds the floating state when the floating prop is true', () => {
    const props = {
      htmlFor: 'test',
      label: 'Test',
      floating: false,
    };

    let label = renderIntoDocument(<FloatingLabel {...props} />);
    let labelNode = findDOMNode(label);

    expect(labelNode.className).not.toContain('md-floating-label--floating');

    props.floating = true;
    label = renderIntoDocument(<FloatingLabel {...props} />);
    labelNode = findDOMNode(label);

    expect(labelNode.className).toContain('md-floating-label--floating');
  });

  it('adds the icon-offset state when the iconOffset prop is true', () => {
    const props = {
      htmlFor: 'test',
      label: 'Test',
      iconOffset: false,
    };

    let label = renderIntoDocument(<FloatingLabel {...props} />);
    let labelNode = findDOMNode(label);

    expect(labelNode.className).not.toContain('md-floating-label--icon-offset');

    props.iconOffset = true;
    label = renderIntoDocument(<FloatingLabel {...props} />);
    labelNode = findDOMNode(label);

    expect(labelNode.className).toContain('md-floating-label--icon-offset');
  });

  it('addes a custom size state only when the custom size prop is true and it is not floating', () => {
    const props = {
      htmlFor: 'test',
      label: 'Test',
      floating: false,
      customSize: null,
    };

    let label = renderIntoDocument(<FloatingLabel {...props} />);
    let labelNode = findDOMNode(label);

    expect(labelNode.className).not.toContain('md-floating-label--title');
    expect(labelNode.className).not.toContain('md-floating-label--inactive-title');

    props.customSize = 'title';
    label = renderIntoDocument(<FloatingLabel {...props} />);
    labelNode = findDOMNode(label);

    expect(labelNode.className).toContain('md-floating-label--title');
    expect(labelNode.className).toContain('md-floating-label--inactive-title');

    props.floating = true;
    label = renderIntoDocument(<FloatingLabel {...props} />);
    labelNode = findDOMNode(label);

    expect(labelNode.className).toContain('md-floating-label--title');
    expect(labelNode.className).not.toContain('md-floating-label--inactive-title');
  });
});
