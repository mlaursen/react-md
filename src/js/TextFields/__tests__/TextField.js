/* eslint-env jest */
jest.unmock('../TextField');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import TextField from '../TextField';
import InputField from '../InputField';
import Divider from '../../Dividers';
import PasswordButton from '../PasswordButton';
import FloatingLabel from '../FloatingLabel';
import FontIcon from '../../FontIcons';

describe('TextField', () => {
  it('merges style and classNames correctly', () => {
    const props = {
      id: 'test',
      style: { width: '100%' },
      className: 'test',
      inputStyle: { width: 256 },
      inputClassName: 'wow',
      placeholder: 'Test',
    };

    const field = renderIntoDocument(<TextField {...props} />);
    const fieldNode = findDOMNode(field);
    const inputField = findRenderedComponentWithType(field, InputField);

    expect(fieldNode.style.width).toBe(props.style.width);
    expect(fieldNode.className).toContain(props.className);
    expect(inputField.props.style).toEqual(props.inputStyle);
    expect(inputField.props.className).toBe(props.inputClassName);
  });

  it('renders a divider component when the block prop is false', () => {
    const props = { id: 'test', placeholder: 'test' };
    let field = renderIntoDocument(<TextField {...props} />);
    let dividers = scryRenderedComponentsWithType(field, Divider);

    expect(dividers.length).toBe(1);

    props.block = true;
    field = renderIntoDocument(<TextField {...props} />);
    dividers = scryRenderedComponentsWithType(field, Divider);

    expect(dividers.length).toBe(0);
  });

  it('updates the Divider\'s, className with the correct className and states', () => {
    const props = {
      id: 'test',
      placeholder: 'test',
      lineDirection: 'center',
    };

    const field = renderIntoDocument(<TextField {...props} />);
    let className = findRenderedComponentWithType(field, Divider).props.className;

    expect(className).toContain('md-divider--text-field');
    expect(className).toContain(`md-divider--expand-from-${props.lineDirection}`);
    expect(className).not.toContain('md-divider--text-field-expanded');
    expect(className).not.toContain('md-divider--text-field-active');
    expect(className).not.toContain('md-divider--text-field-error');

    field.setState({ active: true });
    className = findRenderedComponentWithType(field, Divider).props.className;

    expect(className).toContain('md-divider--text-field');
    expect(className).toContain(`md-divider--expand-from-${props.lineDirection}`);
    expect(className).toContain('md-divider--text-field-expanded');
    expect(className).toContain('md-divider--text-field-active');
    expect(className).not.toContain('md-divider--text-field-error');

    field.setState({ error: true });
    className = findRenderedComponentWithType(field, Divider).props.className;

    expect(className).toContain('md-divider--text-field');
    expect(className).toContain(`md-divider--expand-from-${props.lineDirection}`);
    expect(className).toContain('md-divider--text-field-expanded');
    expect(className).not.toContain('md-divider--text-field-active');
    expect(className).toContain('md-divider--text-field-error');

    field.setState({ active: false });
    className = findRenderedComponentWithType(field, Divider).props.className;

    expect(className).toContain('md-divider--text-field');
    expect(className).toContain(`md-divider--expand-from-${props.lineDirection}`);
    expect(className).not.toContain('md-divider--text-field-expanded');
    expect(className).not.toContain('md-divider--text-field-active');
    expect(className).toContain('md-divider--text-field-error');
  });

  it('passes all event listeners to the InputField component', () => {
    const onClick = jest.fn();
    const onInput = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();
    const onKeyUp = jest.fn();

    const props = {
      onClick,
      onInput,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      onKeyUp,
    };

    const field = renderIntoDocument(<TextField {...props} />);
    const fieldNode = findRenderedComponentWithType(field, InputField);
    expect(fieldNode.props.onClick).toBe(props.onClick);
    expect(fieldNode.props.onInput).toBe(props.onInput);
    expect(fieldNode.props.onMouseDown).toBe(props.onMouseDown);
    expect(fieldNode.props.onMouseUp).toBe(props.onMouseUp);
    expect(fieldNode.props.onTouchStart).toBe(props.onTouchStart);
    expect(fieldNode.props.onTouchEnd).toBe(props.onTouchEnd);
    expect(fieldNode.props.onTouchCancel).toBe(props.onTouchCancel);
    expect(fieldNode.props.onKeyUp).toBe(props.onKeyUp);
  });

  it('adds the PasswordButton component when the type is password', () => {
    let props = { id: 'test', placeholder: 'text' };
    let field = renderIntoDocument(<TextField {...props} />);
    let passwords = scryRenderedComponentsWithType(field, PasswordButton);
    expect(passwords.length).toBe(0);

    props = { id: 'test', placeholder: 'password', type: 'password' };
    field = renderIntoDocument(<TextField {...props} />);
    passwords = scryRenderedComponentsWithType(field, PasswordButton);
    expect(passwords.length).toBe(1);
  });

  it('renders the PasswordButton with the correct props', () => {
    const props = { id: 'password', placeholder: 'password', type: 'password' };
    const field = renderIntoDocument(<TextField {...props} />);
    const password = findRenderedComponentWithType(field, PasswordButton);

    expect(password.props.onClick).toBe(field._togglePasswordField);
    expect(password.props.active).toBe(field.state.active);
    expect(password.props.passwordVisible).toBe(field.state.passwordVisible);
    expect(password.props.iconChildren).toBe(TextField.defaultProps.passwordIconChildren);
    expect(password.props.iconClassName).toBe(TextField.defaultProps.passwordIconClassName);
  });

  it('renders the FloatingLabel component with the correct props', () => {
    const props = { label: 'Test', id: 'test' };
    let field = renderIntoDocument(<TextField {...props} />);
    let label = findRenderedComponentWithType(field, FloatingLabel);

    expect(label.props.label).toBe(props.label);
    expect(label.props.htmlFor).toBe(props.id);
    expect(label.props.active).toBe(field.state.active);
    expect(label.props.error).toBe(field.state.error);
    expect(label.props.floating).toBe(field.state.floating);
    expect(label.props.disabled).toBe(props.disabled);
    expect(label.props.customSize).toBe(props.customSize);
    expect(label.props.iconOffset).toBe(false);

    props.customSize = 'title';
    props.leftIcon = <FontIcon />;
    field = renderIntoDocument(<TextField {...props} />);
    label = findRenderedComponentWithType(field, FloatingLabel);

    expect(label.props.label).toBe(props.label);
    expect(label.props.htmlFor).toBe(props.id);
    expect(label.props.active).toBe(field.state.active);
    expect(label.props.error).toBe(field.state.error);
    expect(label.props.floating).toBe(field.state.floating);
    expect(label.props.disabled).toBe(props.disabled);
    expect(label.props.customSize).toBe(props.customSize);
    expect(label.props.iconOffset).toBe(true);
  });

  // Super important test
  it('does some stuff that seems hard to automatically test', () => {
    expect(true).toBe(true);
  });
});
