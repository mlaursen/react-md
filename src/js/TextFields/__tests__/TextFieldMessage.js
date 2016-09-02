/* eslint-env jest */
jest.unmock('../TextFieldMessage');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import TextFieldMessage from '../TextFieldMessage';
import Message from '../Message';

describe('TextFieldMessage', () => {
  it('returns null if there is no helpText, errorText, or maxLength', () => {
    let message = renderIntoDocument(<TextFieldMessage currentLength={0} />);
    let messageNode = findDOMNode(message);

    expect(messageNode).toBe(null);

    let props = { helpText: 'something', currentLength: 0 };
    message = renderIntoDocument(<TextFieldMessage {...props} />);
    messageNode = findDOMNode(message);
    expect(messageNode).not.toBe(null);

    props = { errorText: 'Something', currentLength: 0 };
    message = renderIntoDocument(<TextFieldMessage {...props} />);
    messageNode = findDOMNode(message);
    expect(messageNode).not.toBe(null);

    props = { maxLength: 20, currentLength: 0 };
    message = renderIntoDocument(<TextFieldMessage {...props} />);
    messageNode = findDOMNode(message);
    expect(messageNode).not.toBe(null);
  });

  it('renders two Message components', () => {
    const props = { maxLength: 20, currentLength: 20 };
    const message = renderIntoDocument(<TextFieldMessage {...props} />);
    const messages = scryRenderedComponentsWithType(message, Message);

    expect(messages.length).toBe(2);
  });

  it('renders the first Message component with the either the helpText or errorText', () => {
    let props = { helpText: 'Help!', currentLength: 0 };
    let message = renderIntoDocument(<TextFieldMessage {...props} />);
    let [m] = scryRenderedComponentsWithType(message, Message);
    expect(m.props.children).toBe(props.helpText);

    props = { errorText: 'Error!', currentLength: 0 };
    message = renderIntoDocument(<TextFieldMessage {...props} />);
    m = scryRenderedComponentsWithType(message, Message)[0];
    expect(m.props.children).toBe(props.errorText);
  });

  it('renders the first Message component with the errorText instead of the helpText if the error prop is true', () => {
    const props = { helpText: 'Help!', errorText: 'Error!', error: false, currentLength: 0 };
    let message = renderIntoDocument(<TextFieldMessage {...props} />);
    let [m] = scryRenderedComponentsWithType(message, Message);
    expect(m.props.children).toBe(props.helpText);

    props.error = true;
    message = renderIntoDocument(<TextFieldMessage {...props} />);
    m = scryRenderedComponentsWithType(message, Message)[0];
    expect(m.props.children).toBe(props.errorText);
  });

  it('renders the second Message component with null if there is no maxLength', () => {
    const props = { currentLength: 0, helpText: 'Help!' };
    let message = renderIntoDocument(<TextFieldMessage {...props} />);
    let counter = scryRenderedComponentsWithType(message, Message)[1];
    expect(counter.props.children).toBe(null);

    props.maxLength = 20;
    message = renderIntoDocument(<TextFieldMessage {...props} />);
    counter = scryRenderedComponentsWithType(message, Message)[1];
    expect(counter.props.children).toBe(`${props.currentLength} / ${props.maxLength}`);
  });

  it('renders the second Message component with the --counter state', () => {
    const props = { currentLength: 0, helpText: 'Help!' };
    const message = renderIntoDocument(<TextFieldMessage {...props} />);
    const counter = scryRenderedComponentsWithType(message, Message)[1];
    expect(counter.props.className).toBe('md-text-field-message--counter');
  });
});
