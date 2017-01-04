/* eslint-env jest */
jest.unmock('../Autocomplete');

import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import { TAB } from '../../constants/keyCodes';
import Autocomplete from '../Autocomplete';
import TextField from '../../TextFields/TextField';
import Menu from '../../Menus/Menu';

class Test extends React.Component {
  render() {
    return <div />;
  }
}

describe('Autocomplete', () => {
  it('merges className and style', () => {
    const props = {
      style: { display: 'block' },
      className: 'test',
      textFieldStyle: { background: 'red' },
      textFieldClassName: 'woop-woop',
      data: [],
    };

    const autocomplete = renderIntoDocument(<Autocomplete {...props} />);
    const field = findRenderedComponentWithType(autocomplete, TextField);
    const menu = findRenderedComponentWithType(autocomplete, Menu);

    expect(field.props.style).toEqual(props.textFieldStyle);
    expect(field.props.className).toContain(props.textFieldClassName);

    expect(menu.props.style).toEqual(props.style);
    expect(menu.props.className).toContain(props.className);
  });

  it('passes the new value and the change event to the onChangeProp', () => {
    const props = { data: [], onChange: jest.fn() };
    const autocomplete = renderIntoDocument(<Autocomplete {...props} />);
    const field = findRenderedDOMComponentWithTag(autocomplete, 'input');
    Simulate.change(field, { target: { value: 'hello' } });
    expect(props.onChange).toBeCalled();
    expect(props.onChange.mock.calls[0][0]).toBe('hello');
    expect(props.onChange.mock.calls[0][1]).toBeDefined();
  });

  it('can be controlled', () => {
    const props = {
      data: [],
      filter: null,
      value: 'hello',
      onChange: jest.fn(),
    };

    const autocomplete = renderIntoDocument(<Autocomplete {...props} />);
    const field = findRenderedDOMComponentWithTag(autocomplete, 'input');
    expect(field.value).toBe(props.value);

    Simulate.change(field, { target: { value: 'hello2' } });
    expect(props.onChange.mock.calls.length).toBe(1);
    expect(props.onChange.mock.calls[0][0]).toBe('hello2');
  });

  it('allows for a custom filter function', () => {
    const props = {
      data: ['a', 'b', 'c'],
      filter: jest.fn((data, value) => data.filter(d => d === value)),
    };

    const autocomplete = renderIntoDocument(<Autocomplete {...props} />);
    const textField = findRenderedDOMComponentWithTag(autocomplete, 'input');

    Simulate.change(textField, { target: { value: 'c' } });
    expect(props.filter.mock.calls.length).toBe(1);
    expect(props.filter.mock.calls[0][0]).toEqual(props.data);
    expect(props.filter.mock.calls[0][1]).toBe('c');
    expect(props.filter.mock.calls[0][2]).toBe(Autocomplete.defaultProps.dataLabel);
  });

  it('opens the menu on focus if there are any matches', () => {
    const props = {
      data: ['a', 'b', 'c'],
      defaultValue: 'a',
    };

    const autocomplete = renderIntoDocument(<Autocomplete {...props} />);
    const textField = findRenderedDOMComponentWithTag(autocomplete, 'input');

    expect(autocomplete.state.isOpen).toBe(false);
    Simulate.focus(textField);
    expect(autocomplete.state.isOpen).toBe(true);
  });

  it('updates the text field\'s value on autocomplete', () => {
    const props = {
      data: ['Apple', 'Banana', 'Orange'],
    };

    const autocomplete = renderIntoDocument(<Autocomplete {...props} />);
    const textField = findRenderedDOMComponentWithTag(autocomplete, 'input');

    Simulate.change(textField, { target: { value: 'ap' } });
    expect(autocomplete.state.value).toBe('ap');

    autocomplete._handleItemClick(0);
    expect(autocomplete.state.value).toBe('Apple');
  });

  it('autocompletes the inline suggestion on tab', () => {
    const props = { data: ['Apple', 'Banana', 'Orange'], inline: true };
    const autocomplete = renderIntoDocument(<Autocomplete {...props} />);
    const textField = findRenderedDOMComponentWithTag(autocomplete, 'input');

    Simulate.change(textField, { target: { value: 'or' } });
    expect(textField.value).toBe('or');

    Simulate.keyDown(textField, { which: TAB, keyCode: TAB });
    expect(textField.value).toBe('Orange');
  });

  it('calls the optional onMenuOpen prop when the menu opens', () => {
    const props = { data: [], onMenuOpen: jest.fn() };
    const autocomplete = renderIntoDocument(<Autocomplete {...props} />);

    autocomplete.setState({ isOpen: true });
    expect(props.onMenuOpen.mock.calls.length).toBe(1);
  });

  it('calls the optional onMenuClose prop when the menu closes', () => {
    const props = { data: [], onMenuClose: jest.fn() };
    const autocomplete = renderIntoDocument(<Autocomplete {...props} />);

    autocomplete.setState({ isOpen: true });
    expect(props.onMenuClose.mock.calls.length).toBe(0);

    autocomplete.setState({ isOpen: false });
    expect(props.onMenuClose.mock.calls.length).toBe(1);
  });

  describe('caseInsensitiveFilter', () => {
    it('includes any items that match a single letter', () => {
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(filter(haystack, 'a')).toEqual(haystack);
      expect(filter(haystack, 'e')).toEqual(['Apple', 'Orange']);
    });

    it('includes any items that match a single letter ignoring case', () => {
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(filter(haystack, 'A')).toEqual(haystack);
      expect(filter(haystack, 'E')).toEqual(['Apple', 'Orange']);
    });

    it('only includes items that match letters in order', () => {
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(filter(haystack, 'an')).toEqual(['Banana', 'Orange']);
      expect(filter(haystack, 'ana')).toEqual(['Banana']);
    });

    it('allows the items to be a list of numbers', () => {
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = [1, 11, 111];

      expect(filter(haystack, '1')).toEqual(haystack);
      expect(filter(haystack, '2')).toEqual([]);
    });

    it('allows the items to be a list of objects', () => {
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Orange' }];

      expect(filter(haystack, 'apple', 'name')).toEqual([{ name: 'Apple' }]);
    });

    it('allows the item to be a mixed list of string, number, object, and react element', () => {
      const test = <Test />;
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = [{ name: 'Apple' }, 'Banana', 3, test];

      expect(filter(haystack, 'e', 'name')).toEqual([{ name: 'Apple' }, test]);
      expect(filter(haystack, '3', 'name')).toEqual([3, test]);
    });

    it('filters out empty, null, and undefined', () => {
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = [
        undefined,
        '',
        null,
        0,
        100,
        { name: undefined },
        { name: '' },
        { name: null },
      ];

      expect(filter(haystack, '0')).toEqual([0, 100]);
    });
  });

  describe('fuzzyFilter', () => {
    it('includes items that contain the letter', () => {
      const filter = Autocomplete.fuzzyFilter;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(filter(haystack, 'a')).toEqual(haystack);
      expect(filter(haystack, 'z')).toEqual([]);
    });

    it('includes items that contain all the letters', () => {
      const filter = Autocomplete.fuzzyFilter;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(filter(haystack, 'ae')).toEqual(['Apple', 'Orange']);
    });

    it('allows the items to be a list of numbers', () => {
      const filter = Autocomplete.fuzzyFilter;
      const haystack = [1, 315, 814325, 82];

      expect(filter(haystack, '1')).toEqual([1, 315, 814325]);
      expect(filter(haystack, '15')).toEqual([315, 814325]);
    });

    it('allows the items to be a list of objects', () => {
      const filter = Autocomplete.fuzzyFilter;
      const haystack = [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Orange' }];

      expect(filter(haystack, 'ae', 'name')).toEqual([{ name: 'Apple' }, { name: 'Orange' }]);
    });

    it('allows the items to be a mixed list of string, number, object, and react element', () => {
      const test = <Test />;
      const filter = Autocomplete.fuzzyFilter;
      const haystack = [{ name: 'Apple' }, 'Banana', 3, test];

      expect(filter(haystack, 'e', 'name')).toEqual([{ name: 'Apple' }, test]);
      expect(filter(haystack, '3', 'name')).toEqual([3, test]);
    });

    it('filters out empty, null, and undefined', () => {
      const filter = Autocomplete.fuzzyFilter;
      const haystack = [
        undefined,
        '',
        null,
        0,
        100,
        { name: undefined },
        { name: '' },
        { name: null },
      ];

      expect(filter(haystack, '0', 'name')).toEqual([0, 100]);
    });

    it('should allow a any characters that are used in regex', () => {
      const filter = Autocomplete.fuzzyFilter;
      const haystack = [
        'Ap^p[]e',
        '$What',
        '(Now!)',
        'Who?',
        'Through-Stuff.',
        'What\'s \\ That?',
        'Pipe | Pipe',
        'You **',
      ];

      expect(filter(haystack, '[')).toEqual(['Ap^p[]e']);
      expect(filter(haystack, ']')).toEqual(['Ap^p[]e']);
      expect(filter(haystack, '^')).toEqual(['Ap^p[]e']);
      expect(filter(haystack, '$')).toEqual(['$What']);
      expect(filter(haystack, '(')).toEqual(['(Now!)']);
      expect(filter(haystack, ')')).toEqual(['(Now!)']);
      expect(filter(haystack, '?')).toEqual(['Who?', 'What\'s \\ That?']);
      expect(filter(haystack, '-')).toEqual(['Through-Stuff.']);
      expect(filter(haystack, '.')).toEqual(['Through-Stuff.']);
      expect(filter(haystack, '\\')).toEqual(['What\'s \\ That?']);
      expect(filter(haystack, '|')).toEqual(['Pipe | Pipe']);
      expect(filter(haystack, '*')).toEqual(['You **']);

      expect(filter(haystack, '(?!What)')).toEqual([]);
      expect(filter(haystack, '(Now!)')).toEqual(['(Now!)']);
    });
  });

  describe('findIgnoreCase', () => {
    it('returns the empty string if no word starts with the given letter', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(find(haystack, 'e')).toBe('');
    });

    it('returns the empty string if no words starts with the given letters', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(find(haystack, 'ab')).toBe('');
      expect(find(haystack, 'appb')).toBe('');
    });

    it('finds the first match of a word beginning with the given letter ignoring case', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(find(haystack, 'a')).toEqual('Apple');
      expect(find(haystack, 'B')).toEqual('Banana');
    });

    it('find the first match of a word beginning with the given letters ignoring case', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(find(haystack, 'ap')).toEqual('Apple');
      expect(find(haystack, 'Bana')).toEqual('Banana');
    });

    it('allows the items to be a list of number', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = [1, 2, 3, 4];

      expect(find(haystack, '1')).toEqual('1');
    });

    it('allows the items to be a list of object', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Orange' }];

      expect(find(haystack, 'ap', 'name')).toBe('Apple');
    });

    it('allows the items to be a mixed list of string, number, object, and react element', () => {
      const test = <Test />;
      const find = Autocomplete.findIgnoreCase;
      const haystack = [{ name: 'Apple' }, 'Banana', 3, test];

      expect(find(haystack, 'a', 'name')).toEqual('Apple');
      expect(find(haystack, '3', 'name')).toBe('3');
    });
  });
});
