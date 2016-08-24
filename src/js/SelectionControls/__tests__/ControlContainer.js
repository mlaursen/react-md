/* eslint-env jest*/
jest.unmock('../ControlContainer');
jest.unmock('../InkedControl');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import ControlContainer from '../ControlContainer';

describe('ControlContainer', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const controlContainer = renderIntoDocument(
      <ControlContainer
        style={style}
        className={className}
        type="checkbox"
        checkedIcon="check"
        uncheckedIcon="unchecked"
        labelBefore={false}
        defaultChecked={false}
      />
    );

    const controlContainerNode = findDOMNode(controlContainer);
    expect(controlContainerNode.style.display).toBe(style.display);
    expect(controlContainerNode.classList.contains(className)).toBe(true);
  });

  it('renders an input of radio or checkbox', () => {
    let controlContainer = renderIntoDocument(
      <ControlContainer
        type="checkbox"
        checkedIcon="check"
        uncheckedIcon="unchecked"
        labelBefore={false}
        defaultChecked={false}
      />
    );

    let input = findRenderedDOMComponentWithTag(controlContainer, 'input');
    expect(input.getAttribute('type')).toBe('checkbox');

    controlContainer = renderIntoDocument(
      <ControlContainer
        type="radio"
        checkedIcon="check"
        uncheckedIcon="unchecked"
        labelBefore={false}
        defaultChecked={false}
      />
    );

    input = findRenderedDOMComponentWithTag(controlContainer, 'input');
    expect(input.getAttribute('type')).toBe('radio');
  });

  it('changes the icon when clicked', () => {
    const props = {
      type: 'checkbox',
      checkedIcon: 'checked',
      uncheckedIcon: 'unchecked',
      labelBefore: false,
      defaultChecked: false,
    };

    const control = renderIntoDocument(<ControlContainer {...props} />);

    let content = findDOMNode(control).textContent;
    expect(content).toBe(props.uncheckedIcon);

    const input = findRenderedDOMComponentWithTag(control, 'input');
    Simulate.change(input, { target: { checked: true } });

    content = findDOMNode(control).textContent;
    expect(content).toBe(props.checkedIcon);
  });

  it('calls the onChange prop with the next checked state and the event for checkboxes', () => {
    const onChange = jest.fn();
    const props = {
      type: 'checkbox',
      checkedIcon: 'checked',
      uncheckedIcon: 'unchecked',
      labelBefore: false,
      defaultChecked: false,
      value: 'test',
      onChange,
    };

    const control = renderIntoDocument(<ControlContainer {...props} />);

    const input = findRenderedDOMComponentWithTag(control, 'input');
    Simulate.change(input, { target: { checked: true } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe(true);
    expect(onChange.mock.calls[0][1]).toBeDefined();
  });

  it('calls the onChange prop with the radio value and the event for radios', () => {
    const onChange = jest.fn();
    const props = {
      type: 'radio',
      checkedIcon: 'checked',
      uncheckedIcon: 'unchecked',
      labelBefore: false,
      defaultChecked: false,
      value: 'test',
      onChange,
    };

    const control = renderIntoDocument(<ControlContainer {...props} />);

    const input = findRenderedDOMComponentWithTag(control, 'input');
    Simulate.change(input, { target: { checked: true } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe(props.value);
    expect(onChange.mock.calls[0][1]).toBeDefined();
  });

  it('can be a controlled component', () => {
    let props = {
      type: 'checkbox',
      checkedIcon: 'checked',
      uncheckedIcon: 'unchecked',
      labelBefore: false,
      defaultChecked: false,
      checked: false,
      value: 'test',
    };

    const onChange = jest.fn((checked) => {
      props = Object.assign({}, props, { checked });
    });

    let control = renderIntoDocument(<ControlContainer {...props} onChange={onChange} />);

    let input = findRenderedDOMComponentWithTag(control, 'input');
    Simulate.change(input, { target: { checked: true } });

    control = renderIntoDocument(<ControlContainer {...props} onChange={onChange} />);
    input = findRenderedDOMComponentWithTag(control, 'input');
    expect(input.checked).toBe(true);
    expect(onChange.mock.calls.length).toBe(1);

    Simulate.change(input, { target: { checked: false } });

    control = renderIntoDocument(<ControlContainer {...props} onChange={onChange} />);
    input = findRenderedDOMComponentWithTag(control, 'input');
    expect(input.checked).toBe(false);
    expect(onChange.mock.calls.length).toBe(2);
  });
});
