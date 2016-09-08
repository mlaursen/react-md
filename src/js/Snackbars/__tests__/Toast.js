/* eslint-env jest*/
jest.unmock('../Toast');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import Toast from '../Toast';
import Button from '../../Buttons';

describe('Toast', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const t = { text: 'Toast', action: 'Ok' };
    const dismiss = jest.fn();
    const toast = renderIntoDocument(
      <Toast style={style} className={className} toast={t} dismiss={dismiss} />
    );

    const toastNode = findDOMNode(toast);
    expect(toastNode.style.display).toBe(style.display);
    expect(toastNode.classList.contains(className)).toBe(true);
  });

  it('renders the text in the toast', () => {
    const dismiss = jest.fn();
    const toast = renderIntoDocument(
      <Toast toast={{ text: 'Toast' }} dismiss={dismiss} />
    );

    const toastNode = findDOMNode(toast);
    expect(toastNode.textContent).toBe('Toast');
  });

  it('automatically dismisses a toast that has an action of a string', () => {
    const dismiss = jest.fn();
    const t = {
      text: 'Toast',
      action: 'Ok',
    };

    const toast = renderIntoDocument(
      <Toast toast={t} dismiss={dismiss} />
    );

    const btn = findRenderedComponentWithType(toast, Button);
    expect(btn.props.onClick).toBe(dismiss);
    expect(btn.props.label).toBe('Ok');

    Simulate.click(findDOMNode(btn));
    expect(dismiss.mock.calls.length).toBe(1);
  });
});
