/* eslint-env jest*/
jest.unmock('../ListItemControl');
jest.unmock('../ListItemText');
jest.unmock('../../SelectionControls/Checkbox');
jest.unmock('../../SelectionControls/ControlContainer');
jest.unmock('../../SelectionControls/InkedControl');
jest.unmock('../../SelectionControls/Switch');
jest.unmock('../../constants/keyCodes');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  isElementOfType,
  findRenderedComponentWithType,
  renderIntoDocument,
  Simulate,
} from 'react-addons-test-utils';

import ListItemControl from '../ListItemControl';
import ListItemText from '../ListItemText';
import Checkbox from '../../SelectionControls/Checkbox';

describe('ListItemControl', () => {
  it('injects the primary text into the primary action label', () => {
    const checkbox = <Checkbox />;
    const lic = renderIntoDocument(
      <ListItemControl
        primaryText="Test"
        primaryAction={checkbox}
      />
    );

    const updatedCheckbox = findRenderedComponentWithType(lic, Checkbox);
    expect(isElementOfType(updatedCheckbox.props.label, ListItemText)).toBe(true);
  });

  it('injects the primary and secondary text into the primary action label', () => {
    const checkbox = <Checkbox />;
    const lic = renderIntoDocument(
      <ListItemControl
        primaryText="Test"
        primaryAction={checkbox}
        secondaryText="Secondary Test"
      />
    );

    const updatedCheckbox = findRenderedComponentWithType(lic, Checkbox);
    const label = updatedCheckbox.props.label;
    expect(isElementOfType(label, ListItemText)).toBe(true);
    expect(label.props.primaryText).toBe('Test');
    expect(label.props.secondaryText).toBe('Secondary Test');
  });

  it('passes the remaining props to the primary list item', () => {
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();

    const lic = renderIntoDocument(
      <ListItemControl
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        primaryText="Test"
        primaryAction={<Checkbox />}
      />
    );

    const licNode = findDOMNode(lic);

    Simulate.click(licNode);
    expect(onClick).toBeCalled();

    Simulate.focus(licNode);
    expect(onFocus).toBeCalled();

    Simulate.blur(licNode);
    expect(onBlur).toBeCalled();

    Simulate.mouseOver(licNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(licNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(licNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(licNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(licNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(licNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(licNode);
    expect(onTouchCancel).toBeCalled();
  });

  it('allows for a secondary action instead of a primary action', () => {
    const lic = renderIntoDocument(
      <ListItemControl
        primaryText="Secondary Action Test"
        secondaryAction={<Checkbox />}
      />
    );

    const checkbox = findRenderedComponentWithType(lic, Checkbox);
    const checkboxNode = findDOMNode(checkbox).querySelector('input');
    expect(checkbox.props.labelBefore).toBe(true);
    expect(isElementOfType(checkbox.props.label, ListItemText)).toBe(true);

    Simulate.change(checkboxNode, false, {});
    expect(checkboxNode.checked).toBe(true);
  });

  it('allows for any additional props in the action to remain', () => {
    const onChange = jest.fn();
    const lic = renderIntoDocument(
      <ListItemControl
        primaryText="Test"
        primaryAction={
          <Checkbox checked={false} onChange={onChange} />
        }
      />
    );

    const checkbox = findRenderedComponentWithType(lic, Checkbox);
    expect(checkbox.props.checked).toBe(false);
    expect(checkbox.props.onChange).toBe(onChange);

    Simulate.change(findDOMNode(checkbox).querySelector('input'), {});
    expect(onChange).toBeCalled();
  });
});
