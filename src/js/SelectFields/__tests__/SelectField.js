/* eslint-env jest*/
/* eslint-disable max-len */
jest.unmock('../SelectField');
jest.unmock('../SelectFieldControl');
jest.unmock('../../Menus');
jest.unmock('../../Menus/Menu');
jest.unmock('../../TextFields');
jest.unmock('../../TextFields/TextField');
jest.unmock('../../TextFields/TextDivider');
jest.unmock('../../TextFields/FloatingLabel');
jest.unmock('../../Lists');
jest.unmock('../../Lists/List');
jest.unmock('../../Lists/ListItem');
jest.unmock('../../Lists/ListTile');
jest.unmock('../../Lists/ListItemText');
jest.unmock('../../constants/keyCodes');
jest.unmock('../../utils');

import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import SelectField from '../SelectField';
import { UP, DOWN, NINE, KEYPAD_ZERO } from '../../constants/keyCodes';

describe('SelectField', () => {
  it('applies style and className appropriately', () => {
    const className = 'test';
    const listClassName = 'list-test';
    const menuClassName = 'menu-test';
    const select = renderIntoDocument(
      <SelectField
        initiallyOpen
        className={className}
        listClassName={listClassName}
        menuClassName={menuClassName}
        menuItems={['A', 'B']}
      />
    );

    const textField = findRenderedDOMComponentWithTag(select, 'input');
    expect(textField.classList.contains(className)).toBe(true);

    const menu = findRenderedDOMComponentWithClass(select, 'md-menu-container');
    expect(menu.classList.contains(menuClassName)).toBe(true);

    const list = findRenderedDOMComponentWithClass(select, 'md-list');
    expect(list.classList.contains(listClassName)).toBe(true);
  });

  it('appies the text field event listeners correctly', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onKeyUp = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyPress = jest.fn();
    const onChange = jest.fn();
    const onInput = jest.fn();
    const onInvalid = jest.fn();
    const onSelect = jest.fn();

    const select = renderIntoDocument(
      <SelectField
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

    const textFieldNode = findRenderedDOMComponentWithTag(select, 'input');

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

  it('opens the menu when the text field is clicked', () => {
    const select = renderIntoDocument(<SelectField menuItems={[1, 2]} />);
    // Need to mock the calc function since it crashes on querySelector
    select.calcMenuPosition = jest.fn();

    expect(select.state.open).toBe(false);
    Simulate.click(findRenderedDOMComponentWithTag(select, 'input'));
    expect(select.state.open).toBe(true);
  });

  it('allows for a defaultValue on an uncontrolled component', () => {
    const items = [1, 2, 3];
    const defaultValue = items[0];
    const select = renderIntoDocument(<SelectField menuItems={items} defaultValue={defaultValue} />);

    const value = findRenderedDOMComponentWithTag(select, 'input').value;
    expect(value).toBe(String(defaultValue));
  });

  it('selects the next or first item in the list if the down arrow is pressed', () => {
    const items = ['A', 'B', 'C'];
    const select = renderIntoDocument(
      <SelectField menuItems={items} />
    );

    const input = selectField => findRenderedDOMComponentWithTag(selectField, 'input');
    let value = input(select).value;
    expect(value).toBe('');

    Simulate.keyDown(input(select), { which: DOWN, keyCode: DOWN });
    value = input(select).value;
    expect(value).toBe(items[0]);

    Simulate.keyDown(input(select), { which: DOWN, keyCode: DOWN });
    value = input(select).value;
    expect(value).toBe(items[1]);
  });

  it('does not select a new item if the down arrow is pressed when the last item is selected', () => {
    const items = ['A', 'B', 'C'];
    const expected = items[2];
    const select = renderIntoDocument(
      <SelectField menuItems={items} label="Test" defaultValue={expected} />
    );

    const input = selectField => findRenderedDOMComponentWithTag(selectField, 'input');
    let value = input(select).value;
    expect(value).toBe(expected);

    Simulate.keyDown(input(select), { which: DOWN, keyCode: DOWN });
    value = input(select).value;
    expect(value).toBe(expected);
  });

  it('does nothing if the up arrow is pressed and no items are selected', () => {
    const items = [1, 2, 3];
    const select = renderIntoDocument(<SelectField menuItems={items} />);

    const input = selectField => findRenderedDOMComponentWithTag(selectField, 'input');
    let value = input(select).value;

    expect(value).toBe('');

    Simulate.keyDown(input(select), { which: UP, keyCode: UP });
    value = input(select).value;

    expect(value).toBe('');
  });

  it('does not select a new item if the up arrow is pressed when the first item is selected', () => {
    const items = [1, 2, 3];
    const select = renderIntoDocument(<SelectField menuItems={items} defaultValue={1} />);

    const input = selectField => findRenderedDOMComponentWithTag(selectField, 'input');
    let value = input(select).value;

    expect(value).toBe('1');

    Simulate.keyDown(input(select), { which: UP, keyCode: UP });
    value = input(select).value;

    expect(value).toBe('1');
  });

  it('selects the previous item if the up arrow is pressed and the first item is not currently selected', () => {
    const items = [1, 2, 3];
    const select = renderIntoDocument(<SelectField menuItems={items} defaultValue={3} />);

    const input = selectField => findRenderedDOMComponentWithTag(selectField, 'input');
    let value = input(select).value;

    expect(value).toBe('3');

    Simulate.keyDown(input(select), { which: UP, keyCode: UP });
    value = input(select).value;

    expect(value).toBe('2');
  });

  it('can select an item by pressing a letter that is equal to the starting letter of an item while the menu is closed', () => {
    const items = ['A', 'B', 'C'];
    const select = renderIntoDocument(<SelectField menuItems={items} />);

    const input = selectField => findRenderedDOMComponentWithTag(selectField, 'input');
    let value = input(select).value;
    expect(value).toBe('');

    const letter = 'A'.charCodeAt(0);
    Simulate.keyDown(input(select), { which: letter, keyCode: letter });

    value = input(select).value;
    expect(value).toBe(items[0]);
  });

  it('will keep selecting items with the same letter that was pressed and loop to the start', () => {
    const items = ['Item 1', 'Item 2'];
    const select = renderIntoDocument(<SelectField menuItems={items} />);

    const input = selectField => findRenderedDOMComponentWithTag(selectField, 'input');
    let value = input(select).value;
    expect(value).toBe('');

    const i = 'I'.charCodeAt(0);
    Simulate.keyDown(input(select), { which: i, keyCode: i });
    value = input(select).value;
    expect(value).toBe(items[0]);

    Simulate.keyDown(input(select), { which: i, keyCode: i });
    value = input(select).value;
    expect(value).toBe(items[1]);

    Simulate.keyDown(input(select), { which: i, keyCode: i });
    value = input(select).value;
    expect(value).toBe(items[0]);
  });

  it('can select an item by pressing a keypad number that is equal to the start of one of the menu items', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const select = renderIntoDocument(<SelectField menuItems={items} />);

    const input = selectField => findRenderedDOMComponentWithTag(selectField, 'input');
    let value = input(select).value;
    expect(value).toBe('');

    const eight = KEYPAD_ZERO + 8;
    Simulate.keyDown(input(select), { which: eight, keyCode: eight });
    value = input(select).value;
    expect(value).toBe('8');
  });

  it('will keep selecting an item starting the the same number that was pressed when the menuItems are numbers', () => {
    const items = [9, 99];
    const select = renderIntoDocument(<SelectField menuItems={items} />);

    const input = selectField => findRenderedDOMComponentWithTag(selectField, 'input');
    let value = input(select).value;
    expect(value).toBe('');

    Simulate.keyDown(input(select), { which: NINE, keyCode: NINE });
    value = input(select).value;
    expect(value).toBe('9');

    Simulate.keyDown(input(select), { which: NINE, keyCode: NINE });
    value = input(select).value;
    expect(value).toBe('99');

    Simulate.keyDown(input(select), { which: NINE, keyCode: NINE });
    value = input(select).value;
    expect(value).toBe('9');
  });

  it('will disable click and keydown events if disabled', () => {
    const onClick = jest.fn();
    const onKeyDown = jest.fn();
    const select = renderIntoDocument(<SelectField disabled menuItems={[1]} />);
    select.handleContainerClick = onClick;
    select.handleKeyDown = onKeyDown;

    expect(onClick.mock.calls.length).toBe(0);
    expect(onKeyDown.mock.calls.length).toBe(0);

    Simulate.click(findRenderedDOMComponentWithTag(select, 'input'));
    expect(onClick.mock.calls.length).toBe(0);

    Simulate.keyDown(findRenderedDOMComponentWithTag(select, 'input'), { which: 95, keyCode: 95 });
    expect(onKeyDown.mock.calls.length).toBe(0);
  });
});
