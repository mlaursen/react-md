/* eslint-env jest*/
/* eslint-disable max-len */
jest.unmock('../TextField');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import TextField from '../TextField';
import FloatingLabel from '../FloatingLabel';
import TextDivider from '../TextDivider';
import TextFieldMessage from '../TextFieldMessage';
import FontIcon from '../../FontIcons/FontIcon';

describe('TextField', () => {
  it('applies style and className to the container and inputStyle and inputClassName to the input field', () => {
    const style = { display: 'block' };
    const className = 'container';
    const inputStyle = { display: 'inline-block' };
    const inputClassName = 'input';

    let textField = renderIntoDocument(
      <TextField
        label="A"
        style={style}
        className={className}
        inputStyle={inputStyle}
        inputClassName={inputClassName}
      />
    );

    let containerNode = findDOMNode(textField);
    let textFieldNode = findRenderedDOMComponentWithTag(textField, 'input');
    expect(containerNode.classList.contains(className)).toBe(true);
    expect(containerNode.style.display).toBe(style.display);

    expect(textFieldNode.classList.contains(inputClassName)).toBe(true);
    expect(textFieldNode.style.display).toBe(inputStyle.display);

    textField = renderIntoDocument(
      <TextField
        rows={2}
        label="A"
        style={style}
        className={className}
        inputStyle={inputStyle}
        inputClassName={inputClassName}
      />
    );

    containerNode = findDOMNode(textField);
    textFieldNode = findRenderedDOMComponentWithTag(textField, 'textarea');
    expect(containerNode.classList.contains(className)).toBe(true);
    expect(containerNode.style.display).toBe(style.display);

    expect(textFieldNode.classList.contains(inputClassName)).toBe(true);
    expect(textFieldNode.style.display).toBe(inputStyle.display);
  });

  it('passes all input related event listeners to the input tag or text area', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onKeyUp = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyPress = jest.fn();
    const onChange = jest.fn();
    const onInput = jest.fn();
    const onInvalid = jest.fn();
    const onSelect = jest.fn();

    const textField = renderIntoDocument(
      <TextField
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onChange={onChange}
        onInput={onInput}
        onInvalid={onInvalid}
        onSelect={onSelect}
      />
    );

    const textFieldNode = findRenderedDOMComponentWithTag(textField, 'input');

    Simulate.focus(textFieldNode);
    expect(onFocus).toBeCalled();

    Simulate.blur(textFieldNode);
    expect(onBlur).toBeCalled();

    Simulate.keyUp(textFieldNode);
    expect(onKeyUp).toBeCalled();

    Simulate.keyDown(textFieldNode);
    expect(onKeyDown).toBeCalled();

    Simulate.keyPress(textFieldNode);
    expect(onKeyPress).toBeCalled();

    Simulate.change(textFieldNode);
    expect(onChange).toBeCalled();

    Simulate.invalid(textFieldNode);
    expect(onInvalid).toBeCalled();

    Simulate.input(textFieldNode);
    expect(onInput).toBeCalled();

    Simulate.select(textFieldNode);
    expect(onSelect).toBeCalled();
  });

  it('sends the updated value and the change event on change', () => {
    const onChange = jest.fn();
    const textField = renderIntoDocument(<TextField onChange={onChange} />);
    const textFieldNode = findRenderedDOMComponentWithTag(textField, 'input');

    Simulate.change(textFieldNode, { type: 'change' });
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe('');
    expect(onChange.mock.calls[0][1].type).toBe('change');
  });

  it('toggles the active className on focus', () => {
    const textField = renderIntoDocument(
      <TextField
        icon={<FontIcon>phone</FontIcon>}
        type="tel"
        label="Test"
      />
    );

    const input = findRenderedDOMComponentWithTag(textField, 'input');
    const icon = findRenderedComponentWithType(textField, FontIcon);
    const divider = findRenderedComponentWithType(textField, TextDivider);
    const label = findRenderedComponentWithType(textField, FloatingLabel);

    expect(input.className).not.toContain('active');
    expect(icon.props.className).not.toContain('active');
    expect(divider.props.active).toBe(false);
    expect(label.props.active).toBe(false);

    Simulate.focus(input);
    expect(input.className).toContain('active');
    expect(icon.props.className).toContain('active');
    expect(divider.props.active).toBe(true);
    expect(label.props.active).toBe(true);
  });

  it('uses the placeholder prop as the placeholder and falls back to the label prop.', () => {
    let textField = renderIntoDocument(
      <TextField
        label="Test"
        floatingLabel={false}
      />
    );

    let input = findRenderedDOMComponentWithTag(textField, 'input');
    const floatingLabels = scryRenderedComponentsWithType(textField, FloatingLabel);
    expect(floatingLabels.length).toBe(0);

    expect(input.getAttribute('placeholder')).toBe('Test');

    textField = renderIntoDocument(
      <TextField
        label="Test"
        placeholder="Placeholder"
        floatingLabel={false}
      />
    );

    input = findRenderedDOMComponentWithTag(textField, 'input');
    expect(input.getAttribute('placeholder')).toBe('Placeholder');
  });

  it('displays both a placeholder and a label when floatingLabel is true and the text field has a value or focus', () => {
    let props = {
      label: 'Label',
      placeholder: 'Placeholder',
      floatingLabel: true,
    };

    const textField = renderIntoDocument(<TextField {...props} />);
    let label = findRenderedComponentWithType(textField, FloatingLabel);
    let input = findRenderedDOMComponentWithTag(textField, 'input');
    expect(label.props.label).toBe(props.label);
    expect(input.getAttribute('placeholder')).toBe(null);

    Simulate.focus(input);
    expect(input.getAttribute('placeholder')).toBe(props.placeholder);

    props = Object.assign({}, props, { value: 'Abcd' });
    label = findRenderedComponentWithType(textField, FloatingLabel);
    input = findRenderedDOMComponentWithTag(textField, 'input');
    expect(label.props.label).toBe(props.label);
    expect(input.getAttribute('placeholder')).toBe(props.placeholder);
  });

  it('renders the FloatingLabel component with correct props', () => {
    let props = { label: 'Hello' };
    let textField = renderIntoDocument(<TextField {...props} />);

    let labels = scryRenderedComponentsWithType(textField, FloatingLabel);
    expect(labels.length).toBe(1);

    expect(labels[0].props.label).toBe(props.label);
    expect(labels[0].props.active).toBe(false);
    expect(labels[0].props.error).toBe(false);
    expect(labels[0].props.required).toBeUndefined();
    expect(labels[0].props.value).toBe('');

    Simulate.focus(findRenderedDOMComponentWithTag(textField, 'input'));

    expect(labels[0].props.active).toBe(true);

    props = Object.assign({}, props, { floatingLabel: false });
    textField = renderIntoDocument(<TextField {...props} />);
    labels = scryRenderedComponentsWithType(textField, FloatingLabel);
    expect(labels.length).toBe(0);
  });

  it('renders the TextDivider component when it is not displayed as a block', () => {
    let textField = renderIntoDocument(<TextField block={false} />);

    let dividers = scryRenderedComponentsWithType(textField, TextDivider);
    expect(dividers.length).toBe(1);
    expect(dividers[0].props.icon).toBe(false);
    expect(dividers[0].props.active).toBe(false);
    expect(dividers[0].props.lineDirection).toBe(TextField.defaultProps.lineDirection);

    Simulate.focus(findRenderedDOMComponentWithTag(textField, 'input'));

    expect(dividers[0].props.active).toBe(true);

    textField = renderIntoDocument(<TextField block />);

    dividers = scryRenderedComponentsWithType(textField, TextDivider);
    expect(dividers.length).toBe(0);
  });

  it('renders an optional icon component with additional stateful classNames', () => {
    let props = {
      icon: <FontIcon>wht</FontIcon>,
      floatingLabel: true,
    };

    let textField = renderIntoDocument(<TextField {...props} />);
    let icon = findRenderedComponentWithType(textField, FontIcon);
    expect(icon.props.className).toContain('md-text-field-icon');
    expect(icon.props.className).toContain('with-floating-label');

    Simulate.focus(findRenderedDOMComponentWithTag(textField, 'input'));
    expect(icon.props.className).toContain('active');

    textField.setState({ value: 'something' });
    expect(icon.props.className).toContain('normal');

    props = Object.assign({}, props, { errorText: 'Some error', floatingLabel: false });
    textField = renderIntoDocument(<TextField {...props} />);
    icon = findRenderedComponentWithType(textField, FontIcon);
    expect(icon.props.className).toContain('error');
    expect(icon.props.className).not.toContain('with-floating-label');
  });

  it('renders an optional right icon with additional classNames', () => {
    let props = {
      rightIcon: <FontIcon>wht</FontIcon>,
      floatingLabel: true,
    };

    let textField = renderIntoDocument(<TextField {...props} />);
    let icon = findRenderedComponentWithType(textField, FontIcon);
    expect(icon.props.className).toContain('md-text-field-ind');
    expect(icon.props.className).not.toContain('single-line');

    props = Object.assign({}, props, { floatingLabel: false });
    textField = renderIntoDocument(<TextField {...props} />);
    icon = findRenderedComponentWithType(textField, FontIcon);
    expect(icon.props.className).toContain('md-text-field-ind');
    expect(icon.props.className).toContain('single-line');
  });

  it('renders the TextFieldMessage component if there is a maxLength prop, an errorText prop, or helpText prop', () => {
    let props = {
      label: 'What',
    };

    let textField = renderIntoDocument(<TextField {...props} />);
    let messages = scryRenderedComponentsWithType(textField, TextFieldMessage);
    expect(messages.length).toBe(0);

    props = Object.assign({}, props, { errorText: 'Some error' });
    textField = renderIntoDocument(<TextField {...props} />);
    messages = scryRenderedComponentsWithType(textField, TextFieldMessage);
    expect(messages.length).toBe(1);

    props = Object.assign({}, props, { errorText: null, helpText: 'What' });
    textField = renderIntoDocument(<TextField {...props} />);
    messages = scryRenderedComponentsWithType(textField, TextFieldMessage);
    expect(messages.length).toBe(1);

    props = Object.assign({}, props, { helpText: null, maxLength: 30 });
    textField = renderIntoDocument(<TextField {...props} />);
    messages = scryRenderedComponentsWithType(textField, TextFieldMessage);
    expect(messages.length).toBe(1);
  });

  it('renders the TextFieldMessage component with the correct props for an error message', () => {
    const props = {
      label: 'Label',
      errorText: 'Some error',
      helpOnFocus: false,
    };

    const textField = renderIntoDocument(<TextField {...props} />);
    const message = findRenderedComponentWithType(textField, TextFieldMessage);
    expect(message.props.value).toBe('');
    expect(message.props.error).toBe(true);
    expect(message.props.helpOnFocus).toBe(false);
    expect(message.props.active).toBe(false);
    expect(message.props.message).toBe(props.errorText);
    expect(message.props.maxLength).toBeUndefined();
  });

  it('renders the TextFieldMessage component with the correct props for a help message', () => {
    const props = {
      label: 'Label',
      helpText: 'Some help',
      helpOnFocus: false,
    };

    const textField = renderIntoDocument(<TextField {...props} />);
    const message = findRenderedComponentWithType(textField, TextFieldMessage);
    expect(message.props.value).toBe('');
    expect(message.props.error).toBe(false);
    expect(message.props.helpOnFocus).toBe(false);
    expect(message.props.active).toBe(false);
    expect(message.props.message).toBe(props.helpText);
    expect(message.props.maxLength).toBeUndefined();
  });

  it('renders the TextFieldMessage component with the correct props for a counter message', () => {
    const props = {
      label: 'Label',
      maxLength: 30,
      helpOnFocus: false,
    };

    const textField = renderIntoDocument(<TextField {...props} />);
    const message = findRenderedComponentWithType(textField, TextFieldMessage);
    expect(message.props.value).toBe('');
    expect(message.props.error).toBe(false);
    expect(message.props.helpOnFocus).toBe(false);
    expect(message.props.active).toBe(false);
    expect(message.props.message).toBeUndefined();
    expect(message.props.maxLength).toBe(props.maxLength);
  });

  it('if both an error and help text are given, the error message will be displayed', () => {
    const props = {
      label: 'Label',
      helpText: 'Something to help',
      errorText: 'Oh noooop',
      helpOnFocus: false,
    };

    const textField = renderIntoDocument(<TextField {...props} />);
    const message = findRenderedComponentWithType(textField, TextFieldMessage);
    expect(message.props.value).toBe('');
    expect(message.props.error).toBe(true);
    expect(message.props.helpOnFocus).toBe(false);
    expect(message.props.active).toBe(false);
    expect(message.props.message).toBe(props.errorText);
    expect(message.props.maxLength).toBeUndefined();
  });

  it('renders a password btn when the type is password', () => {
    let textField = renderIntoDocument(<TextField type="password" />);
    let btns = scryRenderedDOMComponentsWithClass(textField, 'md-password-btn');
    expect(btns.length).toBe(1);

    textField = renderIntoDocument(<TextField type="text" />);
    btns = scryRenderedDOMComponentsWithClass(textField, 'md-password-btn');
    expect(btns.length).toBe(0);
  });

  it('toggles the password\'s visible when the password button is clicked by switching the type to text', () => {
    const textField = renderIntoDocument(<TextField type="password" />);
    const btn = findRenderedDOMComponentWithClass(textField, 'md-password-btn');
    const input = findRenderedDOMComponentWithTag(textField, 'input');

    expect(input.getAttribute('type')).toBe('password');
    expect(btn.className).not.toContain('active');

    Simulate.click(btn);
    expect(input.getAttribute('type')).toBe('text');
    expect(btn.className).toContain('active');
  });
});
