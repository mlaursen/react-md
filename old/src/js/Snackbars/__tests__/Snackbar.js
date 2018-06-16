/* eslint-env jest */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { mount } from 'enzyme';
import {
  renderIntoDocument,
} from 'react-dom/test-utils';

import Snackbar from '../Snackbar';
import Button from '../../Buttons/Button';

const PROPS = {
  leaveTimeout: 300,
  onDismiss: jest.fn(),
  toast: {
    text: 'hello, World',
  },
};

describe('Snackbar', () => {
  it('merges className and style', () => {
    const props = Object.assign({}, PROPS, {
      style: { background: 'black' },
      className: 'test',
    });

    const snackbar = renderIntoDocument(<Snackbar {...props} />);

    const snackbarNode = findDOMNode(snackbar);
    expect(snackbarNode.style.background).toBe(props.style.background);
    expect(snackbarNode.className).toContain(props.className);
  });

  it('renders as a p tag if there is no action', () => {
    const snackbar = renderIntoDocument(<Snackbar {...PROPS} />);
    const node = findDOMNode(snackbar);
    expect(node.tagName).toBe('P');
  });

  it('renders as a section tag if there is an action', () => {
    const props = Object.assign({}, PROPS, {
      toast: { text: 'hello', action: 'woop' },
    });
    const snackbar = renderIntoDocument(<Snackbar {...props} />);
    const node = findDOMNode(snackbar);
    expect(node.tagName).toBe('SECTION');
  });

  it('applies the md-snackbar className to the container', () => {
    let snackbar = renderIntoDocument(<Snackbar {...PROPS} />);
    let node = findDOMNode(snackbar);
    expect(node.className).toContain('md-snackbar');

    const props = Object.assign({}, PROPS, {
      toast: { text: 'hello', action: 'woop' },
    });
    snackbar = renderIntoDocument(<Snackbar {...props} />);
    node = findDOMNode(snackbar);
    expect(node.className).toContain('md-snackbar');
  });

  it('sets the role to be alert when there is no action', () => {
    const snackbar = renderIntoDocument(<Snackbar {...PROPS} />);
    const node = findDOMNode(snackbar);
    expect(node.getAttribute('role')).toBe('alert');
  });

  it('sets the role to be alertdialog when there is an action', () => {
    const props = Object.assign({}, PROPS, {
      toast: { text: 'hello', action: 'woop' },
    });
    const snackbar = renderIntoDocument(<Snackbar {...props} />);
    const node = findDOMNode(snackbar);
    expect(node.getAttribute('role')).toBe('alertdialog');
  });

  it('should correctly trigger the action\'s onClick function when clicked', () => {
    const onClick = jest.fn();
    const props = {
      ...PROPS,
      toast: {
        text: 'Hello',
        action: { onClick, children: 'Something' },
      },
    };

    const snackbar = mount(<Snackbar {...props} />);
    snackbar.find(Button).at(0).simulate('click');
    expect(onClick).toBeCalled();
    expect(props.onDismiss).toBeCalled();
  });
});
