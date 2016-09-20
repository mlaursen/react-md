/* eslint-env jest */
jest.unmock('../SelectField');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import SelectField from '../SelectField';
import Menu from '../../Menus/Menu';
import Paper from '../../Papers';

const PROPS = { id: 'test' };
describe('SelectField', () => {
  it('merges className and style', () => {
    const props = Object.assign({}, PROPS, {
      menuStyle: { background: 'orange' },
      menuClassName: 'woop-woop',
      defaultOpen: true,
    });

    const field = renderIntoDocument(<SelectField {...props} />);
    const menu = findRenderedComponentWithType(field, Menu);
    expect(menu.props.style).toBe(props.menuStyle);
    expect(menu.props.className).toContain(props.menuClassName);
  });

  it('renders the Menu component as the Paper component', () => {
    const field = renderIntoDocument(<SelectField {...PROPS} />);
    const menu = findRenderedComponentWithType(field, Menu);
    expect(menu.props.component).toBe(Paper);
  });

  it('sets the zDepth to 2 only when it is below and open', () => {
    const props = Object.assign({}, PROPS);
    let field = renderIntoDocument(<SelectField {...props} />);
    let menu = findRenderedComponentWithType(field, Menu);
    expect(menu.props.zDepth).toBe(0);

    field.setState({ isOpen: true });
    menu = findRenderedComponentWithType(field, Menu);
    expect(menu.props.zDepth).toBe(0);

    props.position = SelectField.Positions.BELOW;
    field = renderIntoDocument(<SelectField {...props} />);
    menu = findRenderedComponentWithType(field, Menu);
    expect(menu.props.zDepth).toBe(0);

    field.setState({ isOpen: true });
    menu = findRenderedComponentWithType(field, Menu);
    expect(menu.props.zDepth).toBe(2);
  });

  it('calls the onMenuToggleProp with the next opens tate when _toggleMenu is called', () => {
    const props = Object.assign({}, PROPS, { onMenuToggle: jest.fn() });
    const field = renderIntoDocument(<SelectField {...props} />);

    expect(props.onMenuToggle.mock.calls.length).toBe(0);
    const event = { target: { value: '' } };
    field._toggleMenu(event);
    expect(props.onMenuToggle.mock.calls.length).toBe(1);
    expect(props.onMenuToggle.mock.calls[0][0]).toBe(true);
    expect(props.onMenuToggle.mock.calls[0][1]).toEqual(event);

    field._toggleMenu(event);
    expect(props.onMenuToggle.mock.calls.length).toBe(2);
    expect(props.onMenuToggle.mock.calls[1][0]).toBe(false);
    expect(props.onMenuToggle.mock.calls[1][1]).toEqual(event);
  });
});
