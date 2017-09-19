/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';

import { SPACE, TAB, ENTER } from '../../constants/keyCodes';
import Menu from '../Menu';
import List from '../../Lists/List';
import ListItem from '../../Lists/ListItem';
import Layover from '../../Helpers/Layover';

jest.useFakeTimers();

describe('Menu', () => {
  it('should add the md-menu-container className', () => {
    const menu = shallow(<Menu id="test" visible onClose={jest.fn()} />);
    expect(menu.hasClass('md-menu-container')).toBe(true);
  });

  it('should render a Layover component', () => {
    const menu = shallow(<Menu id="test" visible onClose={jest.fn()} />);
    expect(menu.find(Layover).length).toBe(1);
  });


  it('should correctly merge style and className into the layover component', () => {
    const props = {
      id: 'test',
      visible: false,
      onClose: jest.fn(),
      style: { background: 'white' },
      className: 'some-amazing-test__layover',
    };

    const menu = shallow(<Menu {...props} />);
    expect(menu.hasClass(props.className)).toBe(true);
    expect(menu.find(Layover).get(0).props.style).toEqual(props.style);
  });

  it('should pass the aria- attributes to the layover', () => {
    const props = {
      id: 'test-menu',
      listId: 'test-list',
      visible: false,
      onClose: jest.fn(),
      toggle: <div />,
    };

    const menu = shallow(<Menu {...props}><div /></Menu>);
    let layover = menu.find(Layover).get(0);
    expect(layover.props['aria-haspopup']).toBe(true);
    expect(layover.props['aria-expanded']).toBe(false);
    expect(layover.props['aria-owns']).toBe(props.listId);

    menu.setProps({ visible: true });
    layover = menu.find(Layover).get(0);
    expect(layover.props['aria-haspopup']).toBe(true);
    expect(layover.props['aria-expanded']).toBe(true);
    expect(layover.props['aria-owns']).toBe(props.listId);
  });

  it('should render a List when visible', () => {
    const menu = shallow(<Menu id="test" visible onClose={jest.fn()} />);
    expect(menu.find(List).length).toBe(1);
  });

  it('should set the list\'s id to be id suffixed with -list if it is not provided', () => {
    const menu = shallow(<Menu id="test" visible onClose={jest.fn()} />);
    let list = menu.find(List).get(0);
    expect(list.props.id).toBe('test-list');

    menu.setProps({ listId: 'some-amazing-options-list' });
    list = menu.find(List).get(0);
    expect(list.props.id).toBe('some-amazing-options-list');
  });

  it('should apply the md-list--menu classname to the list', () => {
    const menu = shallow(<Menu id="test" visible onClose={jest.fn()} />);
    const list = menu.find(List).get(0);
    expect(list.props.className).toContain('md-list--menu');
  });

  it('should add the menu-restricted state to the list when enabled', () => {
    const menu = shallow(<Menu id="test" visible onClose={jest.fn()} listHeightRestricted />);
    let list = menu.find(List).get(0);
    expect(list.props.className).toContain('md-list--menu-restricted');

    menu.setProps({ listHeightRestricted: false });
    list = menu.find(List).get(0);
    expect(list.props.className).not.toContain('md-list--menu-restricted');
  });

  it('should apply the paper class names if the listZDepth is a number greater than 0', () => {
    const menu = shallow(<Menu id="test" visible onClose={jest.fn()} listZDepth={2} />);
    let list = menu.find(List).get(0);
    expect(list.props.className).toContain('md-paper');
    expect(list.props.className).toContain('md-paper--2');

    menu.setProps({ listZDepth: 5 });
    list = menu.find(List).get(0);
    expect(list.props.className).toContain('md-paper');
    expect(list.props.className).toContain('md-paper--5');

    menu.setProps({ listZDepth: 0 });
    list = menu.find(List).get(0);
    expect(list.props.className).not.toContain('md-paper');
    expect(list.props.className).not.toContain('md-paper--0');
  });

  it('should apply the correct props to the list', () => {
    const listProps = {
      'aria-label': 'Test Label',
    };
    const props = {
      id: 'test',
      visible: true,
      onClose: jest.fn(),
      listInline: false,
      listProps,
      toggle: <button />,
      children: <div />,
    };

    const menu = mount(<Menu {...props} />);
    let list = menu.find(List).get(0);
    expect(list.props['aria-label']).toBe(listProps['aria-label']);
    expect(list.props.inline).toBe(false);

    menu.setProps({ listInline: true });
    list = menu.find(List).get(0);
    expect(list.props['aria-label']).toBe(listProps['aria-label']);
    expect(list.props.inline).toBe(true);
  });

  it('should set the context listLevel to zero if it doesn\'t exist', () => {
    const props = { id: 'test', visible: false, onClose: jest.fn() };
    let menu = shallow(<Menu {...props} />, { context: { listLevel: undefined } });

    expect(menu.instance().getChildContext().listLevel).toBe(0);

    menu = shallow(<Menu {...props} />, { context: { listLevel: 3 } });
    expect(menu.instance().getChildContext().listLevel).toBe(3);
  });

  it('should create a child context type of cascadingId related to the current listLevel', () => {
    const props = { id: 'test', visible: false, onClose: jest.fn() };
    let menu = shallow(<Menu {...props} />, { context: {} });
    expect(menu.instance().getChildContext().cascadingId).toBe('test-level-1');

    menu = shallow(<Menu {...props} />, { context: { listLevel: 3 } });
    expect(menu.instance().getChildContext().cascadingId).toBe('test-level-4');
  });

  it('should create a cascadingMenu context type if it does not exist in the context', () => {
    const props = { id: 'test', visible: false, onClose: jest.fn(), cascading: true };
    let menu = shallow(<Menu {...props} />, { context: {} });
    expect(menu.instance().getChildContext().cascadingMenu).toBe(true);

    menu.setProps({ cascading: undefined });
    expect(menu.instance().getChildContext().cascadingMenu).toBeUndefined();

    menu.setProps({ cascading: false });
    expect(menu.instance().getChildContext().cascadingMenu).toBe(false);

    menu = shallow(<Menu {...props} />, { context: { cascadingMenu: true } });
    expect(menu.instance().getChildContext().cascadingMenu).toBe(true);

    menu.setProps({ cascading: undefined });
    expect(menu.instance().getChildContext().cascadingMenu).toBe(true);

    menu.setProps({ cascading: false });
    expect(menu.instance().getChildContext().cascadingMenu).toBe(false);
  });

  it('should create a cascadingZDepth context key preferring an existing context\'s value', () => {
    const props = { id: 'test', visible: false, onClose: jest.fn(), cascadingZDepth: 3 };
    let menu = shallow(<Menu {...props} />, { context: {} });
    expect(menu.instance().getChildContext().cascadingZDepth).toBe(3);

    menu = shallow(<Menu {...props} />, { context: { cascadingZDepth: 5 } });
    expect(menu.instance().getChildContext().cascadingZDepth).toBe(5);
  });

  it('should create the cascadingAnchor context key from the prop\'s value', () => {
    const cascadingAnchor = {
      x: Menu.HorizontalAnchors.LEFT,
      y: Menu.VerticalAnchors.BOTTOM,
    };
    const props = { id: 'test', visible: false, onClose: jest.fn(), cascading: true };
    const menu = shallow(<Menu {...props} />, { context: {} });
    expect(menu.instance().getChildContext().cascadingAnchor).toEqual(Menu.defaultProps.cascadingAnchor);

    menu.setProps({ cascadingAnchor });
    expect(menu.instance().getChildContext().cascadingAnchor).toEqual(cascadingAnchor);
  });

  it('should create a cascadingFixedTo context key that is equal the the pro fixedTo', () => {
    const props = { id: 'test', visible: false, onClose: jest.fn(), fixedTo: window };
    let menu = shallow(<Menu {...props} />, { context: {} });
    expect(menu.instance().getChildContext().cascadingFixedTo).toEqual(window);

    menu = shallow(<Menu {...props} />, { context: { cascadingFixedTo: { x: window } } });
    expect(menu.instance().getChildContext().cascadingFixedTo).toEqual(window);
  });

  it('should close the menu when the target\'s class name contains md-list-item', () => {
    const onClose = jest.fn();
    const toggle = <div id="toggle" />;
    const props = { id: 'test', visible: true, onClose, toggle };
    const menu = mount(<Menu {...props}><ListItem primaryText="Something" /></Menu>);
    menu.find('#toggle').simulate('click');
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(0);
    const item = menu.find(ListItem);

    item.simulate('click');
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('should not close the menu if the list item has nested children', () => {
    const onClose = jest.fn();
    const toggle = <div id="toggle" />;
    const props = { id: 'test', visible: true, onClose, toggle };
    const menu = mount(
      <Menu {...props}>
        <ListItem primaryText="Something" nestedItems={[<ListItem key="1" primaryText="A" />]} />
      </Menu>
    );
    menu.find('#toggle').simulate('click');
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(0);
    const item = menu.find(ListItem);

    item.simulate('click');
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(0);
  });

  it('should close the menu when the enter key is pressed and the target\'s class anme contains md-list-item', () => {
    const onClose = jest.fn();
    const toggle = <div id="toggle" />;
    const props = { id: 'test', visible: true, onClose, toggle };
    const menu = mount(<Menu {...props}><ListItem primaryText="Something" /></Menu>);
    const event = { which: ENTER, keyCode: ENTER };
    menu.find('#toggle').simulate('keyDown', event);
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(0);
    const item = menu.find(ListItem);

    item.simulate('keyDown', event);
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(1);
  });
  it('should call the onClose function when a ListItem is clicked', () => {
    const onClose = jest.fn();
    const menu = mount(
      <Menu visible id="test" onClose={onClose}>
        <ListItem primaryText="My Test" />
        <ListItem primaryText="Another" />
      </Menu>
    );

    const items = menu.find(ListItem);
    expect(items.length).toBe(2);
    items.at(0).simulate('click');

    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('should call the onClose function when a ListItem is pressed with the enter or space keys', () => {
    const onClose = jest.fn();
    const menu = mount(
      <Menu id="test" visible onClose={onClose}>
        <ListItem primaryText="My Test" />
        <ListItem primaryText="My Test 2" />
      </Menu>
    );

    const item = menu.find(ListItem).at(0);
    item.simulate('keyDown', { which: TAB, keyCode: TAB });
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(0);

    item.simulate('keyDown', { which: ENTER, keyCode: ENTER });
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(1);

    item.simulate('keyDown', { which: SPACE, keyCode: SPACE });
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(2);
  });

  it('should not call the onClose function if a ListItem has nested children', () => {
    const onClose = jest.fn();
    const menu = mount(
      <Menu id="test" visible onClose={onClose}>
        <ListItem primaryText="My Test" nestedItems={[<ListItem key="1" primaryText="Nested" />]} />
        <ListItem primaryText="My Test 2" />
      </Menu>
    );

    const item = menu.find(ListItem).at(0);
    item.simulate('click');
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(0);
  });

  it('should not call the onClose function when a ListItem is disabled', () => {
    const onClose = jest.fn();
    const menu = mount(
      <Menu id="test" visible onClose={onClose}>
        <ListItem primaryText="My Test" disabled />
        <ListItem primaryText="My Test 2" />
      </Menu>
    );

    const item = menu.find(ListItem).at(0);
    expect(item.props().disabled).toBe(true);
    const event = {
      target: {
        // get attr isn't defined in tests, so mock it just like browser does
        getAttribute(attr) {
          if (attr === 'disabled') {
            return '';
          }

          return null;
        },
      },
    };
    item.simulate('click', event);
    jest.runAllTimers();
    expect(onClose.mock.calls.length).toBe(0);
  });
});
