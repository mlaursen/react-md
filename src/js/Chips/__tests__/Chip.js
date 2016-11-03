/* eslint-env jest */
jest.unmock('../Chip');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import Chip from '../Chip';
import FontIcon from '../../FontIcons/FontIcon';
import Avatar from '../../Avatars/Avatar';

describe('Chip', () => {
  it('merges style and className', () => {
    const props = {
      label: 'a',
      style: { background: 'black' },
      className: 'test',
    };

    const chip = renderIntoDocument(<Chip {...props} />);
    const chipNode = findDOMNode(chip);
    expect(chipNode.style.background).toBe(props.style.background);
    expect(chipNode.className).toContain(props.className);
  });

  it('allows the onClick, onMouseOver, and onMouseLeave props to still be called', () => {
    const onClick = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();

    const props = {
      label: 'a',
      onClick,
      onMouseOver,
      onMouseLeave,
    };

    const chip = renderIntoDocument(<Chip {...props} />);
    const chipNode = findDOMNode(chip);

    Simulate.click(chipNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(chipNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(chipNode);
    expect(onMouseLeave).toBeCalled();
  });

  it('does not render a FontIcon if the removable prop is not true', () => {
    const props = { label: 'a' };
    const chip = renderIntoDocument(<Chip {...props} />);
    const icons = scryRenderedComponentsWithType(chip, FontIcon);
    expect(icons.length).toBe(0);
  });

  it('renders a FontIcon if the removable prop is true', () => {
    const props = { label: 'a', removable: true };
    const chip = renderIntoDocument(<Chip {...props} />);
    const icons = scryRenderedComponentsWithType(chip, FontIcon);
    expect(icons.length).toBe(1);
  });

  it('renders a FontIcon with the correct props', () => {
    const props = {
      label: 'a',
      children: 'menu',
      iconClassName: 'test',
      removable: true,
    };
    const chip = renderIntoDocument(<Chip {...props} />);
    const icon = findRenderedComponentWithType(chip, FontIcon);

    expect(icon.props.iconClassName).toBe(props.iconClassName);
    expect(icon.props.children).toBe(props.children);
  });

  it('renders the avatar prop', () => {
    const props = {
      label: 'a',
      avatar: <Avatar>A</Avatar>,
    };

    const chip = renderIntoDocument(<Chip {...props} />);
    const avatars = scryRenderedComponentsWithType(chip, Avatar);
    expect(avatars.length).toBe(1);
  });
});
