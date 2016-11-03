/* eslint-env jest */
jest.unmock('../PasswordButton');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import PasswordButton from '../PasswordButton';
import FontIcon from '../../FontIcons/FontIcon';

describe('PasswordButton', () => {
  it('uses the onClick prop', () => {
    const onClick = jest.fn();
    const props = { active: false, passwordVisible: false, onClick };
    const btn = renderIntoDocument(<PasswordButton {...props} />);
    const btnNode = findDOMNode(btn);

    Simulate.click(btnNode);
    expect(onClick).toBeCalled();
  });

  it('addes the active state when the active prop is true', () => {
    const props = { active: false };
    let btn = renderIntoDocument(<PasswordButton {...props} />);
    let btnNode = findDOMNode(btn);
    expect(btnNode.className).not.toContain('--active');

    props.active = true;
    btn = renderIntoDocument(<PasswordButton {...props} />);
    btnNode = findDOMNode(btn);
    expect(btnNode.className).toContain('--active');
  });

  it('adds the invisible state wen the assword is not visible and active', () => {
    const props = { active: false, passwordVisible: false };
    let btn = renderIntoDocument(<PasswordButton {...props} />);
    let btnNode = findDOMNode(btn);
    expect(btnNode.className).not.toContain('--invisible');

    props.active = true;
    btn = renderIntoDocument(<PasswordButton {...props} />);
    btnNode = findDOMNode(btn);
    expect(btnNode.className).toContain('--invisible');

    props.passwordVisible = true;
    btn = renderIntoDocument(<PasswordButton {...props} />);
    btnNode = findDOMNode(btn);
    expect(btnNode.className).not.toContain('--invisible');
  });

  it('renders a FontIcon component with the iconClassName and iconChildren props', () => {
    const props = { iconClassName: 'material-icons', iconChildren: 'red_eye' };
    const btn = renderIntoDocument(<PasswordButton {...props} />);
    const icon = findRenderedComponentWithType(btn, FontIcon);
    expect(icon.props.iconClassName).toBe(props.iconClassName);
    expect(icon.props.children).toBe(props.iconChildren);
  });
});
