/* eslint-env jest */
jest.unmock('../ExpansionPanel');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import ExpansionPanel from '../ExpansionPanel';
import AccessibleFakeButton from '../../Helpers/AccessibleFakeButton';
import Collapse from '../../Helpers/Collapse';

describe('ExpansionPanel', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const expansionPanel = renderIntoDocument(
      <ExpansionPanel style={style} className={className} label="Test" />
    );

    const expansionPanelNode = findDOMNode(expansionPanel);
    expect(expansionPanelNode.style.display).toEqual(style.display);
    expect(expansionPanelNode.className).toContain(className);
  });

  it('adds any event listeners', () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onClick = jest.fn();
    const onKeyUp = jest.fn();
    const onKeyDown = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();
    const props = {
      onBlur,
      onFocus,
      onClick,
      onKeyUp,
      onKeyDown,
      onMouseDown,
      onMouseUp,
      onMouseOver,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      label: 'Test',
    };

    const panel = renderIntoDocument(<ExpansionPanel {...props} />);
    const panelNode = findDOMNode(panel);

    Simulate.focus(panelNode);
    expect(onFocus.mock.calls.length).toBe(1);

    Simulate.blur(panelNode);
    expect(onBlur.mock.calls.length).toBe(1);

    Simulate.click(panelNode);
    expect(onClick.mock.calls.length).toBe(1);

    Simulate.keyUp(panelNode);
    expect(onKeyUp.mock.calls.length).toBe(1);

    Simulate.keyDown(panelNode);
    expect(onKeyDown.mock.calls.length).toBe(1);

    Simulate.mouseDown(panelNode);
    expect(onMouseDown.mock.calls.length).toBe(1);

    Simulate.mouseUp(panelNode);
    expect(onMouseUp.mock.calls.length).toBe(1);

    Simulate.mouseOver(panelNode);
    expect(onMouseOver.mock.calls.length).toBe(1);

    Simulate.mouseLeave(panelNode);
    expect(onMouseLeave.mock.calls.length).toBe(1);

    Simulate.touchStart(panelNode);
    expect(onMouseDown.mock.calls.length).toBe(1);

    Simulate.touchEnd(panelNode);
    expect(onMouseDown.mock.calls.length).toBe(1);

    Simulate.touchCancel(panelNode);
    expect(onMouseDown.mock.calls.length).toBe(1);
  });

  it('renders the AccessibleFakeButton component as it\'s header', () => {
    const panel = renderIntoDocument(<ExpansionPanel label="Test" />);
    const buttons = scryRenderedComponentsWithType(panel, AccessibleFakeButton);

    expect(buttons.length).toBe(1);
  });

  it('renders the AccessibleFkaeButton with the correct style and className', () => {
    const props = {
      label: 'Test',
      className: 'test',
      style: { display: 'block' },
      headerStyle: { background: 'black' },
      headerClassName: 'header-test',
    };

    const panel = renderIntoDocument(<ExpansionPanel {...props} />);
    const btn = findRenderedComponentWithType(panel, AccessibleFakeButton);

    expect(btn.props.style).toEqual(props.headerStyle);
    expect(btn.props.className).toContain(props.headerClassName);
  });

  it('renders the AccessibleFkaeButton with the correct props', () => {
    const panel = renderIntoDocument(<ExpansionPanel label="Test" />);
    const btn = findRenderedComponentWithType(panel, AccessibleFakeButton);

    expect(btn.props.onClick).toBe(panel._handleClick);
    expect(btn.props.tabIndex).toBe(ExpansionPanel.defaultProps.tabIndex);
    expect(btn.props.children.length).toBe(2);
  });

  it('renders the Collapse component', () => {
    const panel = renderIntoDocument(<ExpansionPanel label="test" />);

    const collapses = scryRenderedComponentsWithType(panel, Collapse);
    expect(collapses.length).toBe(1);
  });

  it('updates the Collase component\'s collapsed prop', () => {
    const panel = renderIntoDocument(<ExpansionPanel label="test" />);

    let collapse = findRenderedComponentWithType(panel, Collapse);
    expect(collapse.props.collapsed).toBe(true);
    panel._handleClick();

    collapse = findRenderedComponentWithType(panel, Collapse);
    expect(collapse.props.collapsed).toBe(false);
  });

  it('calls the onExpandToggle prop when toggled with the next expanded state', () => {
    const props = { label: 'Test', onExpandToggle: jest.fn() };
    const panel = renderIntoDocument(<ExpansionPanel {...props} />);

    panel._handleClick();
    expect(props.onExpandToggle.mock.calls.length).toBe(1);
    expect(props.onExpandToggle.mock.calls[0][0]).toBe(true);

    panel._handleClick();
    expect(props.onExpandToggle.mock.calls.length).toBe(2);
    expect(props.onExpandToggle.mock.calls[1][0]).toBe(false);
  });

  it('calls the onSave prop when the save function is called', () => {
    const props = { label: 'Test', onSave: jest.fn() };
    const panel = renderIntoDocument(<ExpansionPanel {...props} />);

    const clickEvent = {};
    panel._handleSave(clickEvent);

    expect(props.onSave.mock.calls.length).toBe(1);
    expect(props.onSave.mock.calls[0][0]).toEqual(clickEvent);
  });

  it('automatically unexpands if the closeOnSave prop is true and the user saves', () => {
    const props = { label: 'Test', closeOnSave: true };
    const panel = renderIntoDocument(<ExpansionPanel {...props} />);
    panel._handleClick();

    expect(panel.state.expanded).toBe(true);

    panel._handleSave();

    jest.runAllTimers();
    expect(panel.state.expanded).toBe(false);
  });

  it('calls the onExpandToggle function when the user saves and closeOnSave is true', () => {
    const props = { label: 'Test', closeOnSave: true, onExpandToggle: jest.fn() };
    const panel = renderIntoDocument(<ExpansionPanel {...props} />);
    panel._handleClick();

    expect(props.onExpandToggle.mock.calls.length).toBe(1);
    expect(props.onExpandToggle.mock.calls[0][0]).toBe(true);

    panel._handleSave();

    jest.runAllTimers();
    expect(props.onExpandToggle.mock.calls.length).toBe(2);
    expect(props.onExpandToggle.mock.calls[1][0]).toBe(false);
  });

  it('automatically unexpands if the closeOnCancel prop is true and the user cancels', () => {
    const props = { label: 'Test', closeOnCancel: true };
    const panel = renderIntoDocument(<ExpansionPanel {...props} />);
    panel._handleClick();

    expect(panel.state.expanded).toBe(true);

    panel._handleCancel();

    jest.runAllTimers();
    expect(panel.state.expanded).toBe(false);
  });

  it('calls the onExpandToggle function when the user cancels and closeOnCancel is true', () => {
    const props = { label: 'Test', closeOnCancel: true, onExpandToggle: jest.fn() };
    const panel = renderIntoDocument(<ExpansionPanel {...props} />);
    panel._handleClick();

    expect(props.onExpandToggle.mock.calls.length).toBe(1);
    expect(props.onExpandToggle.mock.calls[0][0]).toBe(true);

    panel._handleCancel();

    jest.runAllTimers();
    expect(props.onExpandToggle.mock.calls.length).toBe(2);
    expect(props.onExpandToggle.mock.calls[1][0]).toBe(false);
  });

  it('allows for the panel to be expanded by default', () => {
    const props = { label: 'Test', defaultExpanded: true };
    const panel = renderIntoDocument(<ExpansionPanel {...props} />);
    expect(panel.state.expanded).toBe(true);
  });

  it('allows the panel to be fully controlled', () => {
    let props = { label: 'Test', expanded: false };
    const onExpandToggle = jest.fn(expanded => {
      props = Object.assign({}, props, { expanded });
    });
    props.onExpandToggle = onExpandToggle;

    const panel = renderIntoDocument(<ExpansionPanel {...props} />);
    expect(panel.state.expanded).toBeUndefined();
    panel._handleClick();

    expect(props.expanded).toBe(true);
    expect(panel.state.expanded).toBeUndefined();
  });
});
