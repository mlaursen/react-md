/*eslint-env jest*/
jest.unmock('../TextFieldMessage');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import TextFieldMessage from '../TextFieldMessage';

describe('TextFieldMessage', () => {
  it('merges the className', () => {
    const message = renderIntoDocument(
      <TextFieldMessage
        className="test-class-name"
        error={false}
        active={false}
        value=""
      />
    );

    const className = findDOMNode(message).className;
    expect(className).toContain('md-text-field-message');
    expect(className).toContain('test-class-name');
  });

  it('renders a count when the maxLength prop is given', () => {
    let props = {
      maxLength: 30,
      error: false,
      active: false,
      value: '',
    };

    let message = renderIntoDocument(<TextFieldMessage {...props} />);
    let counters = scryRenderedDOMComponentsWithClass(message, 'md-text-field-counter');
    expect(counters.length).toBe(1);

    props = Object.assign({}, props, { maxLength: null });
    message = renderIntoDocument(<TextFieldMessage {...props} />);
    counters = scryRenderedDOMComponentsWithClass(message, 'md-text-field-counter');
    expect(counters.length).toBe(0);
  });

  it('updates the counter based on the value\'s length', () => {
    let props = {
      maxLength: 30,
      error: false,
      active: false,
      value: '',
    };

    let message = renderIntoDocument(<TextFieldMessage {...props} />);
    let counter = findRenderedDOMComponentWithClass(message, 'md-text-field-counter');
    expect(counter.textContent).toBe('0 / 30');

    props = Object.assign({}, props, { value: 'Wow! I can\'t believe this is a value.' });

    message = renderIntoDocument(<TextFieldMessage {...props} />);
    counter = findRenderedDOMComponentWithClass(message, 'md-text-field-counter');
    expect(counter.textContent).toBe(props.value.length + ' / 30');
  });

  it('renders a message', () => {
    const props = {
      error: false,
      active: false,
      value: '',
      message: 'Lorem Ipsum',
    };

    const message = renderIntoDocument(<TextFieldMessage {...props} />);
    const messageNode = findDOMNode(message);
    expect(messageNode.textContent).toBe(props.message);
  });

  it('can render a message only on focus', () => {
    let props = {
      error: false,
      active: false,
      value: '',
      message: 'Lorem Ipsum',
      helpOnFocus: true,
    };

    let message = renderIntoDocument(<TextFieldMessage {...props} />);
    let messageNode = findDOMNode(message);

    expect(messageNode.textContent).toBe('');


    props = Object.assign({}, props, { active: true });
    message = renderIntoDocument(<TextFieldMessage {...props} />);
    messageNode = findDOMNode(message);

    expect(messageNode.textContent).toBe(props.message);
  });

  it('can render help text and a counter', () => {
    const props = {
      error: false,
      active: false,
      value: '',
      message: 'Lorem Ipsum',
      maxLength: 30,
    };

    const message = renderIntoDocument(<TextFieldMessage {...props} />);
    const nodes = findDOMNode(message).childNodes;
    expect(nodes.length).toBe(2);
    expect(nodes[0].textContent).toBe(props.message);

    expect(nodes[1].textContent).toBe('0 / 30');
  });
});
