/* eslint-env jest */
jest.unmock('../TextArea');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import TextArea from '../TextArea';

describe('TextArea', () => {
  it('renders two textareas', () => {
    const area = renderIntoDocument(<TextArea rows={2} />);
    const areas = scryRenderedDOMComponentsWithTag(area, 'textarea');

    expect(areas.length).toBe(2);
  });

  it('passes all the event listeners to the non-masked textarea', () => {
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

    const area = renderIntoDocument(<TextArea {...props} />);
    const [mask, field] = scryRenderedDOMComponentsWithTag(area, 'textarea');

    Simulate.click(mask);
    expect(onClick).not.toBeCalled();

    Simulate.change(mask);
    expect(onChange).not.toBeCalled();

    Simulate.input(mask);
    expect(onInput).not.toBeCalled();

    Simulate.mouseDown(mask);
    expect(onMouseDown).not.toBeCalled();

    Simulate.mouseUp(mask);
    expect(onMouseUp).not.toBeCalled();

    Simulate.touchStart(mask);
    expect(onTouchStart).not.toBeCalled();

    Simulate.touchEnd(mask);
    expect(onTouchEnd).not.toBeCalled();

    Simulate.touchCancel(mask);
    expect(onTouchCancel).not.toBeCalled();

    Simulate.keyDown(mask);
    expect(onKeyDown).not.toBeCalled();

    Simulate.keyUp(mask);
    expect(onKeyUp).not.toBeCalled();


    Simulate.click(field);
    expect(onClick).toBeCalled();

    Simulate.change(field);
    expect(onChange).toBeCalled();

    Simulate.input(field);
    expect(onInput).toBeCalled();

    Simulate.mouseDown(field);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(field);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(field);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(field);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(field);
    expect(onTouchCancel).toBeCalled();

    Simulate.keyDown(field);
    expect(onKeyDown).toBeCalled();

    Simulate.keyUp(field);
    expect(onKeyUp).toBeCalled();
  });

  it('passes the value, defaultValue, className, style, and row props to both textareas', () => {
    const props = {
      style: { width: '100%' },
      className: 'test-text-field',
      defaultValue: 'Hello, World!',
      rows: 2,
    };

    let area = renderIntoDocument(<TextArea {...props} />);
    let [mask, field] = scryRenderedDOMComponentsWithTag(area, 'textarea');

    expect(mask.style.width).toBe(props.style.width);
    expect(field.style.width).toBe(props.style.width);

    expect(mask.className).toContain(props.className);
    expect(field.className).toContain(props.className);

    expect(mask.value).toBe(props.defaultValue);
    expect(field.value).toBe(props.defaultValue);

    expect(mask.rows).toBe(props.rows);
    expect(field.rows).toBe(props.rows);

    delete props.defaultValue;
    props.value = 'There is some boogie boogie.';
    props.onChange = jest.fn();
    area = renderIntoDocument(<TextArea {...props} />);
    [mask, field] = scryRenderedDOMComponentsWithTag(area, 'textarea');

    expect(mask.value).toBe(props.value);
    expect(field.value).toBe(props.value);
  });

  it('sets the height only for the non-masked text field from the state', () => {
    const props = { rows: 2 };
    const area = renderIntoDocument(<TextArea {...props} />);
    let [mask, field] = scryRenderedDOMComponentsWithTag(area, 'textarea');

    expect(mask.style.height).toBe('');
    expect(field.style.height).toBe('');

    area.setState({ height: 41 });
    [mask, field] = scryRenderedDOMComponentsWithTag(area, 'textarea');

    expect(mask.style.height).toBe('');
    expect(field.style.height).toBe('41px');
  });

  it('merges all styles on the non-masked textarea and overrides height', () => {
    const props = {
      style: { width: '100%', height: 220 },
      rows: 2,
    };

    const area = renderIntoDocument(<TextArea {...props} />);
    let field = scryRenderedDOMComponentsWithTag(area, 'textarea')[1];
    expect(field.style.width).toBe(props.style.width);
    expect(field.style.height).toBe('');

    area.setState({ height: 41 });
    field = scryRenderedDOMComponentsWithTag(area, 'textarea')[1];

    expect(field.style.width).toBe(props.style.width);
    expect(field.style.height).toBe('41px');
  });

  it('applies the height + 5px to the container', () => {
    const props = { rows: 2 };
    const area = renderIntoDocument(<TextArea {...props} />);
    area.setState({ height: 41 });

    const areaNode = findDOMNode(area);
    expect(areaNode.style.height).toBe('46px');
  });
});
