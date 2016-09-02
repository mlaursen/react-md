/* eslint-env jest */
jest.unmock('../InputField');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import InputField from '../InputField';
import TextArea from '../TextArea';

describe('InputField', () => {
  it('renders an input tag when the rows prop is undefined', () => {
    const props = {};
    let field = renderIntoDocument(<InputField {...props} />);
    let inputs = scryRenderedDOMComponentsWithTag(field, 'input');
    let areas = scryRenderedComponentsWithType(field, TextArea);

    expect(inputs.length).toBe(1);
    expect(areas.length).toBe(0);

    props.rows = 2;
    field = renderIntoDocument(<InputField {...props} />);
    inputs = scryRenderedDOMComponentsWithTag(field, 'input');
    areas = scryRenderedComponentsWithType(field, TextArea);

    expect(inputs.length).toBe(0);
    expect(areas.length).toBe(1);
  });

  it('passes event listeners to the input tag', () => {
    const onClick = jest.fn();
    const onChange = jest.fn();
    const onInput = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();

    const props = {
      onClick,
      onChange,
      onInput,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      onKeyDown,
      onKeyUp,
    };

    const field = renderIntoDocument(<InputField {...props} />);
    const fieldNode = findDOMNode(field);
    Simulate.click(fieldNode);
    expect(onClick).toBeCalled();

    Simulate.change(fieldNode);
    expect(onChange).toBeCalled();

    Simulate.input(fieldNode);
    expect(onInput).toBeCalled();

    Simulate.mouseDown(fieldNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(fieldNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(fieldNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(fieldNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(fieldNode);
    expect(onTouchCancel).toBeCalled();

    Simulate.keyDown(fieldNode);
    expect(onKeyDown).toBeCalled();

    Simulate.keyUp(fieldNode);
    expect(onKeyUp).toBeCalled();
  });

  it('passes event listeners to the TextArea component', () => {
    const onClick = jest.fn();
    const onChange = jest.fn();
    const onInput = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();

    const props = {
      rows: 2,
      onClick,
      onChange,
      onInput,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      onKeyDown,
      onKeyUp,
    };

    const field = renderIntoDocument(<InputField {...props} />);
    const fieldNode = findRenderedComponentWithType(field, TextArea);
    expect(fieldNode.props.onClick).toBe(props.onClick);
    expect(fieldNode.props.onChange).toBe(props.onChange);
    expect(fieldNode.props.onInput).toBe(props.onInput);
    expect(fieldNode.props.onMouseDown).toBe(props.onMouseDown);
    expect(fieldNode.props.onMouseUp).toBe(props.onMouseUp);
    expect(fieldNode.props.onTouchStart).toBe(props.onTouchStart);
    expect(fieldNode.props.onTouchEnd).toBe(props.onTouchEnd);
    expect(fieldNode.props.onTouchCancel).toBe(props.onTouchCancel);
    expect(fieldNode.props.onKeyDown).toBe(props.onKeyDown);
    expect(fieldNode.props.onKeyUp).toBe(props.onKeyUp);
  });

  it('applies the customSize state when the customSize prop is defined', () => {
    const customSize = 'title';
    const props = {};
    let field = renderIntoDocument(<InputField {...props} />);
    let className = findDOMNode(field).className;

    expect(className).not.toContain(`--${customSize}`);

    props.customSize = customSize;
    field = renderIntoDocument(<InputField {...props} />);
    className = findDOMNode(field).className;

    expect(className).toContain(`--${customSize}`);

    props.rows = 2;
    field = renderIntoDocument(<InputField {...props} />);
    className = findRenderedComponentWithType(field, TextArea).props.className;

    expect(className).toContain(`--${customSize}`);

    props.customSize = null;
    field = renderIntoDocument(<InputField {...props} />);
    className = findRenderedComponentWithType(field, TextArea).props.className;

    expect(className).not.toContain(`--${customSize}`);
  });

  it('adds the margin states correctly to input fields', () => {
    const props = { block: false };
    let field = renderIntoDocument(<InputField {...props} />);
    let className = findDOMNode(field).className;

    expect(className).toContain('--margin');
    expect(className).not.toContain('--floating-margin');

    props.block = true;
    field = renderIntoDocument(<InputField {...props} />);
    className = findDOMNode(field).className;

    expect(className).not.toContain('--margin');
    expect(className).not.toContain('--floating-margin');

    props.label = 'Hello';
    field = renderIntoDocument(<InputField {...props} />);
    className = findDOMNode(field).className;

    expect(className).not.toContain('--margin');
    expect(className).not.toContain('--floating-margin');

    props.block = false;
    field = renderIntoDocument(<InputField {...props} />);
    className = findDOMNode(field).className;

    expect(className).not.toContain('--margin');
    expect(className).toContain('--floating-margin');
  });

  it('never adds the margin states multiline text fields', () => {
    const props = { rows: 2, block: false };
    let field = renderIntoDocument(<InputField {...props} />);
    let className = findRenderedComponentWithType(field, TextArea).props.className;

    expect(className).not.toContain('--margin');
    expect(className).not.toContain('--floating-margin');

    props.block = true;
    field = renderIntoDocument(<InputField {...props} />);
    className = findRenderedComponentWithType(field, TextArea).props.className;

    expect(className).not.toContain('--margin');
    expect(className).not.toContain('--floating-margin');

    props.label = 'Hello';
    field = renderIntoDocument(<InputField {...props} />);
    className = findRenderedComponentWithType(field, TextArea).props.className;

    expect(className).not.toContain('--margin');
    expect(className).not.toContain('--floating-margin');

    props.block = false;
    field = renderIntoDocument(<InputField {...props} />);
    className = findRenderedComponentWithType(field, TextArea).props.className;

    expect(className).not.toContain('--margin');
    expect(className).not.toContain('--floating-margin');
  });
});
