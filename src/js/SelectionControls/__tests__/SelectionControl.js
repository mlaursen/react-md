/* eslint-env jest */
jest.unmock('../SelectionControl');
jest.unmock('../../utils/StringUtils/capitalizeFirst'); // required to test FontIcon generation

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import SelectionControl from '../SelectionControl';
import SwitchTrack from '../SwitchTrack';
import AccessibleFakeInkedButton from '../../Helpers/AccessibleFakeInkedButton';

const PROPS = { label: 'Label', id: 'woop', name: 'test', type: 'checkbox' };

describe('SelectionControl', () => {
  it('merges className and style', () => {
    const props = Object.assign({}, PROPS, {
      style: { background: 'black' },
      className: 'test',
    });

    const selectionControl = renderIntoDocument(<SelectionControl {...props} />);

    const selectionControlNode = findDOMNode(selectionControl);
    expect(selectionControlNode.style.background).toBe(props.style.background);
    expect(selectionControlNode.className).toContain(props.className);
  });

  it('renders a label with the label prop', () => {
    const control = renderIntoDocument(<SelectionControl {...PROPS} />);
    const label = findRenderedDOMComponentWithTag(control, 'label');

    expect(label.innerHTML).toBe(PROPS.label);
    expect(label.getAttribute('for')).toBe(PROPS.id);
  });

  it('adds the stateful class names to the label', () => {
    const props = Object.assign({}, PROPS);
    let control = renderIntoDocument(<SelectionControl {...props} />);
    let className = findRenderedDOMComponentWithTag(control, 'label').className;

    expect(className).toContain('md-selection-control-label');
    expect(className).toContain('md-text');
    expect(className).not.toContain('md-text--disabled');
    expect(className).toContain('md-pointer--hover');

    props.disabled = true;
    control = renderIntoDocument(<SelectionControl {...props} />);
    className = findRenderedDOMComponentWithTag(control, 'label').className;

    expect(className).toContain('md-selection-control-label');
    expect(className).not.toContain('md-text ');
    expect(className).toContain('md-text--disabled');
    expect(className).not.toContain('md-pointer--hover');
  });

  it('renders an input tag with the correct props', () => {
    const props = Object.assign({}, PROPS, { value: 'HELLO' });
    const control = renderIntoDocument(<SelectionControl {...props} />);
    const input = findRenderedDOMComponentWithTag(control, 'input');

    expect(input.id).toBe(props.id);
    expect(input.type).toBe(props.type);
    expect(input.name).toBe(props.name);
    expect(input.checked).toBe(false);
    expect(input.className).toBe('md-selection-control-input');
    expect(input.getAttribute('aria-hidden')).toBe('true');
    expect(input.value).toBe(props.value);
  });

  it('renders the input tag with a type of checkbox when the selection control type is switch', () => {
    const props = Object.assign({}, PROPS, { type: 'switch' });
    const control = renderIntoDocument(<SelectionControl {...props} />);
    const input = findRenderedDOMComponentWithTag(control, 'input');

    expect(input.type).toBe('checkbox');
  });

  it('renders the label after the input by default', () => {
    const control = renderIntoDocument(<SelectionControl {...PROPS} />);
    const childNodes = Array.prototype.slice.call(findDOMNode(control).childNodes);
    const label = findRenderedDOMComponentWithTag(control, 'label');
    const input = findRenderedDOMComponentWithTag(control, 'input');

    expect(childNodes.indexOf(label)).not.toBeLessThan(childNodes.indexOf(input));
  });

  it('renders the label before the input if the labelBefore prop is true', () => {
    const props = Object.assign({}, PROPS, { labelBefore: true });
    const control = renderIntoDocument(<SelectionControl {...props} />);
    const childNodes = Array.prototype.slice.call(findDOMNode(control).childNodes);
    const label = findRenderedDOMComponentWithTag(control, 'label');
    const input = findRenderedDOMComponentWithTag(control, 'input');

    expect(childNodes.indexOf(label)).toBeLessThan(childNodes.indexOf(input));
  });

  it('renders an AccessibleFakeInkedButton when the type is radio or checkbox', () => {
    const props = Object.assign({}, PROPS);
    let control = renderIntoDocument(<SelectionControl {...props} />);
    let btns = scryRenderedComponentsWithType(control, AccessibleFakeInkedButton);
    expect(btns.length).toBe(1);

    props.type = 'radio';
    control = renderIntoDocument(<SelectionControl {...props} />);
    btns = scryRenderedComponentsWithType(control, AccessibleFakeInkedButton);
    expect(btns.length).toBe(1);

    props.type = 'switch';
    control = renderIntoDocument(<SelectionControl {...props} />);
    btns = scryRenderedComponentsWithType(control, AccessibleFakeInkedButton);
    expect(btns.length).toBe(0);
  });

  it('renders a SwitchTrack when the type is switch only', () => {
    const props = Object.assign({}, PROPS);
    let control = renderIntoDocument(<SelectionControl {...props} />);
    let tracks = scryRenderedComponentsWithType(control, SwitchTrack);
    expect(tracks.length).toBe(0);

    props.type = 'radio';
    control = renderIntoDocument(<SelectionControl {...props} />);
    tracks = scryRenderedComponentsWithType(control, SwitchTrack);
    expect(tracks.length).toBe(0);

    props.type = 'switch';
    control = renderIntoDocument(<SelectionControl {...props} />);
    tracks = scryRenderedComponentsWithType(control, SwitchTrack);
    expect(tracks.length).toBe(1);
  });

  it('passes mouse and touch events to the container', () => {
    const onMouseOver = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onClick = jest.fn();
    const onDoubleClick = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchMove = jest.fn();
    const onTouchCancel = jest.fn();
    const onTouchEnd = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const props = Object.assign({}, PROPS, {
      onMouseOver,
      onMouseDown,
      onMouseUp,
      onClick,
      onDoubleClick,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchCancel,
      onTouchEnd,
      onFocus,
      onBlur,
    });

    const control = renderIntoDocument(<SelectionControl {...props} />);
    const node = findDOMNode(control);

    Simulate.mouseOver(node);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseDown(node);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(node);
    expect(onMouseUp).toBeCalled();

    Simulate.click(node);
    expect(onClick).toBeCalled();

    Simulate.doubleClick(node);
    expect(onDoubleClick).toBeCalled();

    Simulate.mouseLeave(node);
    expect(onMouseLeave).toBeCalled();

    Simulate.touchStart(node);
    expect(onTouchStart).toBeCalled();

    Simulate.touchMove(node);
    expect(onTouchMove).toBeCalled();

    Simulate.touchCancel(node);
    expect(onTouchCancel).toBeCalled();

    Simulate.touchEnd(node);
    expect(onTouchEnd).toBeCalled();

    Simulate.focus(node);
    expect(onFocus).not.toBeCalled();

    Simulate.blur(node);
    expect(onBlur).not.toBeCalled();
  });

  it('passes focus events to the AccessibleFakeInkedButton for checkboxes and radios', () => {
    const props = Object.assign({}, PROPS, { onFocus: jest.fn(), onBlur: jest.fn() });
    const control = renderIntoDocument(<SelectionControl {...props} />);
    const btn = findRenderedComponentWithType(control, AccessibleFakeInkedButton);
    expect(btn.props.onFocus).toBe(props.onFocus);
    expect(btn.props.onBlur).toBe(props.onBlur);
  });

  it('passes focus events to the SwitchTrack for switches', () => {
    const props = Object.assign({}, PROPS, { type: 'switch', onFocus: jest.fn(), onBlur: jest.fn() });
    const control = renderIntoDocument(<SelectionControl {...props} />);
    const track = findRenderedComponentWithType(control, SwitchTrack);
    expect(track.props.onFocus).toBe(props.onFocus);
    expect(track.props.onBlur).toBe(props.onBlur);
  });

  it('renders the AccessibleFakeInkedButton with the role and aria-checked accessibility props correctly', () => {
    const props = Object.assign({}, PROPS, { checked: true });
    let control = renderIntoDocument(<SelectionControl {...props} />);
    let btn = findRenderedComponentWithType(control, AccessibleFakeInkedButton);
    expect(btn.props.role).toBe('checkbox');
    expect(btn.props['aria-checked']).toBe(true);

    props.type = 'radio';
    control = renderIntoDocument(<SelectionControl {...props} />);
    btn = findRenderedComponentWithType(control, AccessibleFakeInkedButton);
    expect(btn.props.role).toBe('radio');
    expect(btn.props['aria-checked']).toBe(true);

    props.checked = false;
    control = renderIntoDocument(<SelectionControl {...props} />);
    btn = findRenderedComponentWithType(control, AccessibleFakeInkedButton);
    expect(btn.props.role).toBe('radio');
    expect(btn.props['aria-checked']).toBe(false);
  });

  it('renders the AccessibleFakeInkedButton with the correct stateful class names', () => {
    const props = Object.assign({}, PROPS);
    let control = renderIntoDocument(<SelectionControl {...props} />);
    let btn = findRenderedComponentWithType(control, AccessibleFakeInkedButton);

    expect(btn.props.className).toContain('md-btn');
    expect(btn.props.className).toContain('md-btn--icon');
    expect(btn.props.className).not.toContain('md-text--disabled');
    expect(btn.props.className).not.toContain('md-text--theme-secondary ');
    expect(btn.props.className).toContain('md-text--secondary');

    props.checked = true;
    control = renderIntoDocument(<SelectionControl {...props} />);
    btn = findRenderedComponentWithType(control, AccessibleFakeInkedButton);

    expect(btn.props.className).toContain('md-btn');
    expect(btn.props.className).toContain('md-btn--icon');
    expect(btn.props.className).not.toContain('md-text--disabled');
    expect(btn.props.className).toContain('md-text--theme-secondary');
    expect(btn.props.className).not.toContain('md-text--secondary');

    props.disabled = true;
    control = renderIntoDocument(<SelectionControl {...props} />);
    btn = findRenderedComponentWithType(control, AccessibleFakeInkedButton);

    expect(btn.props.className).toContain('md-btn');
    expect(btn.props.className).toContain('md-btn--icon');
    expect(btn.props.className).toContain('md-text--disabled');
    expect(btn.props.className).not.toContain('md-text--theme-secondary');
    expect(btn.props.className).not.toContain('md-text--secondary');
  });

  it('renders the correct checkbox FontIcon for the AccessibleFakeInkedButton children', () => {
    const props = Object.assign({}, PROPS, {
      checked: false,
      checkedCheckboxIconChildren: 'wat',
      checkedCheckboxIconClassName: 'my-fake-font-lib',
      uncheckedCheckboxIconChildren: 'something',
      uncheckedCheckboxIconClassName: 'my-other-fake-font-lib',
    });

    let control = renderIntoDocument(<SelectionControl {...props} />);
    let btn = findRenderedComponentWithType(control, AccessibleFakeInkedButton);
    let iconProps = btn.props.children.props;
    expect(iconProps.children).toBe(props.uncheckedCheckboxIconChildren);
    expect(iconProps.iconClassName).toBe(props.uncheckedCheckboxIconClassName);

    props.checked = true;
    control = renderIntoDocument(<SelectionControl {...props} />);
    btn = findRenderedComponentWithType(control, AccessibleFakeInkedButton);
    iconProps = btn.props.children.props;
    expect(iconProps.children).toBe(props.checkedCheckboxIconChildren);
    expect(iconProps.iconClassName).toBe(props.checkedCheckboxIconClassName);
  });

  it('renders the correct radio FontIcon for the AccessibleFakeInkedButton children', () => {
    const props = Object.assign({}, PROPS, {
      checked: false,
      type: 'radio',
      checkedRadioIconChildren: 'wat',
      checkedRadioIconClassName: 'my-fake-font-lib',
      uncheckedRadioIconChildren: 'something',
      uncheckedRadioIconClassName: 'my-other-fake-font-lib',
    });

    let control = renderIntoDocument(<SelectionControl {...props} />);
    let btn = findRenderedComponentWithType(control, AccessibleFakeInkedButton);
    let iconProps = btn.props.children.props;
    expect(iconProps.children).toBe(props.uncheckedRadioIconChildren);
    expect(iconProps.iconClassName).toBe(props.uncheckedRadioIconClassName);

    props.checked = true;
    control = renderIntoDocument(<SelectionControl {...props} />);
    btn = findRenderedComponentWithType(control, AccessibleFakeInkedButton);
    iconProps = btn.props.children.props;
    expect(iconProps.children).toBe(props.checkedRadioIconChildren);
    expect(iconProps.iconClassName).toBe(props.checkedRadioIconClassName);
  });

  it('calls the onChange prop with the next checked state for checkboxes and switches', () => {
    const props = Object.assign({}, PROPS, { onChange: jest.fn(), value: 'value', checked: false });
    let control = renderIntoDocument(<SelectionControl {...props} />);

    const changeEvent = { target: { value: props.value, checked: props.checked } };
    control._handleChange(changeEvent);
    expect(props.onChange).toBeCalled();

    expect(props.onChange.mock.calls[0][0]).toBe(!props.checked);
    expect(props.onChange.mock.calls[0][1]).toEqual(changeEvent);

    props.type = 'switch';
    control = renderIntoDocument(<SelectionControl {...props} />);
    control._handleChange(changeEvent);

    expect(props.onChange.mock.calls[1][0]).toBe(!props.checked);
    expect(props.onChange.mock.calls[1][1]).toEqual(changeEvent);
  });

  it('calls the onChange prop with the radio\'s value', () => {
    const props = Object.assign({}, PROPS, {
      onChange: jest.fn(),
      value: 'value',
      checked: false,
      type: 'radio',
    });
    const control = renderIntoDocument(<SelectionControl {...props} />);

    const changeEvent = { target: { value: props.value, checked: props.checked } };
    control._handleChange(changeEvent);
    expect(props.onChange).toBeCalled();

    expect(props.onChange.mock.calls[0][0]).toBe(props.value);
    expect(props.onChange.mock.calls[0][1]).toEqual(changeEvent);
  });
});
