/*eslint-env jest*/
jest.unmock('../TextField');
jest.unmock('../FloatingLabel');
jest.unmock('../TextDivider');
jest.unmock('../TextFieldMessage');
jest.unmock('../../FontIcons/FontIcon');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import TextField from '../TextField';
import FontIcon from '../../FontIcons/FontIcon';

describe('TextField', () => {
  it('applies style and className to the container and inputStyle and inputClassName to the input field', () => {
    const style = { display: 'block' };
    const className = "container";
    const inputStyle = { display: 'inline-block' };
    const inputClassName = "input";

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
    const onFocus = jest.genMockFunction();
    const onBlur = jest.genMockFunction();
    const onKeyUp = jest.genMockFunction();
    const onKeyDown = jest.genMockFunction();
    const onKeyPress = jest.genMockFunction();
    const onChange = jest.genMockFunction();
    const onInput = jest.genMockFunction();
    const onInvalid = jest.genMockFunction();
    const onSelect = jest.genMockFunction();

    let textField = renderIntoDocument(
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

    let textFieldNode = findRenderedDOMComponentWithTag(textField, 'input');

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
    const onChange = jest.genMockFunction();
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

    let icon = findRenderedDOMComponentWithClass(textField, 'md-icon');
    let input = findRenderedDOMComponentWithTag(textField, 'input');
    let divider = findRenderedDOMComponentWithClass(textField, 'md-text-divider');
    let label = findRenderedDOMComponentWithClass(textField, 'md-floating-label');

    expect(icon.classList.contains('active')).toBe(false);
    expect(input.classList.contains('active')).toBe(false);
    expect(divider.classList.contains('active')).toBe(false);
    expect(label.classList.contains('active')).toBe(false);

    Simulate.focus(input);
    expect(icon.classList.contains('active')).toBe(true);
    expect(input.classList.contains('active')).toBe(true);
    expect(divider.classList.contains('active')).toBe(true);
    expect(label.classList.contains('active')).toBe(true);
  });

  it('uses the placeholder prop as the placeholder and falls back to the label prop.', () => {
    let textField = renderIntoDocument(
      <TextField
        label="Test"
        floatingLabel={false}
      />
    );

    let input = findRenderedDOMComponentWithTag(textField, 'input');
    const floatingLabels = scryRenderedDOMComponentsWithClass(textField, 'md-floating-label');
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

  it('allows both a placeholder and a label when floatingLabel is true', () => {
    const textField = renderIntoDocument(
      <TextField
        label="Label"
        placeholder="Placeholder"
        floatingLabel={true}
      />
    );

    const input = findRenderedDOMComponentWithTag(textField, 'input');
    const label = findRenderedDOMComponentWithClass(textField, 'md-floating-label');
    expect(input.getAttribute('placeholder')).toBe('Placeholder');
    expect(label.textContent).toBe('Label');
  });

  it('adds a counter if the maxLength prop is set to a number', () => {
    let textField = renderIntoDocument(
      <TextField
        label="Test"
        maxLength={120}
      />
    );

    let message = findRenderedDOMComponentWithClass(textField, 'md-text-field-message');
    expect(message.classList.contains('count-only')).toBe(true);
    expect(message.textContent).toBe('0 / 120');

    textField = renderIntoDocument(
      <TextField
        label="Test"
        maxLength={120}
        value="Something something"
      />
    );

    message = findRenderedDOMComponentWithClass(textField, 'md-text-field-message');
    expect(message.textContent).toBe('19 / 120');

    const charString130 = Array.apply(null, new Array(131)).join('A');
    expect(charString130.length).toBe(130);
    textField = renderIntoDocument(
      <TextField
        label="Test"
        value={charString130}
        maxLength={120}
      />
    );

    message = findRenderedDOMComponentWithClass(textField, 'md-text-field-message');
    expect(message.textContent).toBe('130 / 120');
  });

  it('allows for a help text to be displayed with the text field', () => {
    const textField = renderIntoDocument(
      <TextField
        label="Test"
        helpText="Some amazing help text"
      />
    );

    const message = findRenderedDOMComponentWithClass(textField, 'md-text-field-message');
    expect(message.textContent).toBe('Some amazing help text');
  });

  it('allows for help text and maxLength in the message', () => {
    const textField = renderIntoDocument(
      <TextField
        label="Test"
        helpText="Some amazing help text"
        maxLength={120}
      />
    );

    const message = findRenderedDOMComponentWithClass(textField, 'md-text-field-message');
    expect(message.textContent).toBe('Some amazing help text0 / 120');
    expect(message.classList.contains('count-only')).toBe(false);
  });
});
