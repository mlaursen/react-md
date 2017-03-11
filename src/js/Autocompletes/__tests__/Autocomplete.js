/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { renderIntoDocument } from 'react-addons-test-utils';

import { TAB, DOWN, UP, ENTER, SPACE } from '../../constants/keyCodes';
import Autocomplete from '../Autocomplete';
import Menu from '../../Menus/Menu';
import TextField from '../../TextFields/TextField';

class Test extends React.Component {
  render() {
    return <div />;
  }
}

const DATA = [
  'Woop woop',
  'That\'s the sound',
  'of the Police',
];

describe('Autocomplete', () => {
  it('should render a Menu component when not inline', () => {
    const autocomplete = shallow(<Autocomplete id="test" data={[]} />);
    expect(autocomplete.find(Menu).length).toBe(1);

    autocomplete.setProps({ inline: true });
    expect(autocomplete.find(Menu).length).toBe(0);
  });

  it('should render a TextField component', () => {
    const autocomplete = mount(<Autocomplete id="test" data={[]} />);
    expect(autocomplete.find(TextField).length).toBe(1);
  });

  it('should call the onMenuOpen and onMenuClose props when the visibility changes', () => {
    const onMenuOpen = jest.fn();
    const onMenuClose = jest.fn();
    const autocomplete = shallow(
      <Autocomplete id="test" data={[]} onMenuOpen={onMenuOpen} onMenuClose={onMenuClose} />
    );

    expect(onMenuOpen.mock.calls.length).toBe(0);
    expect(onMenuClose.mock.calls.length).toBe(0);

    autocomplete.setState({ visible: true });
    expect(onMenuOpen.mock.calls.length).toBe(1);
    expect(onMenuClose.mock.calls.length).toBe(0);

    autocomplete.setState({ visible: false });
    expect(onMenuOpen.mock.calls.length).toBe(1);
    expect(onMenuClose.mock.calls.length).toBe(1);
  });

  it('should attempt to find new matches when the data prop changes', () => {
    const autocomplete = shallow(<Autocomplete id="test" data={[]} defaultValue="hello" />);
    expect(autocomplete.state('matches')).toEqual([]);

    autocomplete.setProps({ data: ['hello, world!', 'no way!'] });
    expect(autocomplete.state('matches')).toEqual(['hello, world!']);
  });

  it('should attempt to find new matches when the value prop changes', () => {
    const autocomplete = shallow(<Autocomplete id="test" data={DATA} defaultValue="the s" onChange={jest.fn()} />);
    expect(autocomplete.state('matches')).toEqual([DATA[1]]);

    autocomplete.setProps({ value: 'the ' });
    expect(autocomplete.state('matches')).toEqual([DATA[1], DATA[2]]);
  });

  it('should not filter any data when the filter prop is null and the data prop or value prop change', () => {
    const autocomplete = shallow(<Autocomplete id="test" data={DATA} defaultValue="the s" onChange={jest.fn()} filter={null} />);
    expect(autocomplete.state('matches')).toEqual(DATA);

    autocomplete.setProps({ value: 'the ' });
    expect(autocomplete.state('matches')).toEqual(DATA);

    const [, ...nextData] = DATA;
    autocomplete.setProps({ data: nextData });
    expect(autocomplete.state('matches')).toEqual(nextData);
  });

  it('should set the autocomplete\'s menu visibility to true when the text field has focus and the value or data changes and there are resulting matches', () => {
    const autocomplete = shallow(<Autocomplete id="test" value="" data={DATA} onChange={jest.fn()} />);
    expect(autocomplete.state('visible')).toBe(false);

    autocomplete.setState({ focus: true });
    expect(autocomplete.state('visible')).toBe(false);

    autocomplete.setProps({ value: 'Woop' });
    expect(autocomplete.state('visible')).toBe(true);
  });

  it('should call the onChange prop with the current value and the change event', () => {
    const onChange = jest.fn();
    const autocomplete = shallow(<Autocomplete id="test" data={[]} onChange={onChange} />);

    const event = { target: { value: 'wa' } };
    autocomplete.instance()._handleChange(event.target.value, event);
    expect(onChange).toBeCalledWith(event.target.value, event);
  });

  it('should find new matches when the value has changed in the text field', () => {
    const autocomplete = shallow(<Autocomplete id="test" data={DATA} />);
    expect(autocomplete.state('matches')).toEqual(DATA);

    const event = { target: { value: 'wo' } };
    autocomplete.instance()._handleChange(event.target.value, event);

    const [expected] = DATA;
    expect(autocomplete.state('matches')).toEqual([expected]);
  });

  it('should change the menu\'s visibility based on if there are any matches after the text field\'s value changes', () => {
    const autocomplete = shallow(<Autocomplete id="test" data={DATA} />);
    expect(autocomplete.state('visible')).toEqual(false);

    autocomplete.instance()._handleChange('wo');
    expect(autocomplete.state('visible')).toEqual(true);

    autocomplete.instance()._handleChange('');
    expect(autocomplete.state('visible')).toEqual(false);
  });

  it('should find a suggestion instead of matches when the autocomplete is inline on text field value change', () => {
    // need to do mount because of query selector stuff
    const autocomplete = mount(<Autocomplete id="test" data={DATA} inline />);
    autocomplete.instance()._handleChange('wo');

    expect(autocomplete.state('suggestion')).toBe('op woop');
  });

  it('should call the onFocus prop when the text field is focused', () => {
    const onFocus = jest.fn();
    const autocomplete = mount(<Autocomplete id="test" data={[]} onFocus={onFocus} />);
    const field = autocomplete.find('input');
    expect(field.length).toBe(1);

    field.simulate('focus');
    expect(onFocus.mock.calls.length).toBe(1);
  });

  it('should set the focus state to true on focus', () => {
    const autocomplete = mount(<Autocomplete id="test" data={[]} />);
    const field = autocomplete.find('input');
    expect(field.length).toBe(1);

    field.simulate('focus');
    expect(autocomplete.state('focus')).toBe(true);
  });

  it('should set the focus state to false when the text field is blurred and there are no matches', () => {
    const autocomplete = mount(<Autocomplete id="test" data={[]} />);
    const field = autocomplete.find('input');
    expect(field.length).toBe(1);

    field.simulate('focus');
    expect(autocomplete.state('matches')).toEqual([]);
    expect(autocomplete.state('focus')).toBe(true);

    field.simulate('blur');
    expect(autocomplete.state('focus')).toBe(false);
  });

  it('should not set the focus state to false when the text field is blurred and there are matches', () => {
    const data = ['Hello'];
    const autocomplete = mount(<Autocomplete id="test" data={data} defaultValue="h" />);
    const field = autocomplete.find('input');
    expect(field.length).toBe(1);

    field.simulate('focus');
    expect(autocomplete.state('matches')).toEqual(data);
    expect(autocomplete.state('focus')).toBe(true);

    field.simulate('blur');
    expect(autocomplete.state('focus')).toBe(true);
  });

  it('should call the onKeyDown prop when the onKeyDown event is fired on the text field', () => {
    const onKeyDown = jest.fn();
    const autocomplete = mount(<Autocomplete id="test" data={[]} onKeyDown={onKeyDown} />);
    const field = autocomplete.find('input');

    field.simulate('keyDown');
    expect(onKeyDown.mock.calls.length).toBe(1);
  });

  it('should attempt to find an inline suggestion on text field focus if there is a value', () => {
    const data = ['Hello'];
    const autocomplete = mount(<Autocomplete id="test" data={data} defaultValue="he" inline />);
    expect(autocomplete.state('suggestion')).toBe('');

    const field = autocomplete.find('input');
    field.simulate('focus');
    expect(autocomplete.state('suggestion')).toBe('llo');

    autocomplete.setState({ suggestion: '', value: '' });
    field.simulate('focus');
    expect(autocomplete.state('suggestion')).toBe('');
  });

  it('should reset the suggestion when an inline autocomplete is tabbed', () => {
    const data = ['Hello'];
    const autocomplete = mount(<Autocomplete id="test" data={data} defaultValue="he" inline />);
    expect(autocomplete.state('suggestion')).toBe('');

    const field = autocomplete.find('input');
    field.simulate('focus');
    expect(autocomplete.state('suggestion')).toBe('llo');
    field.simulate('keyDown', { which: TAB, keyCode: TAB });
    expect(autocomplete.state('suggestion')).toBe('');
  });

  it('should be able to get the value with the ref', () => {
    let _field = null;
    const props = { id: 'test', ref: f => { _field = f; }, data: [], onChange: jest.fn() };
    let autocomplete = renderIntoDocument(<Autocomplete {...props} />);
    expect(_field).not.toBe(null);
    expect(_field.value).toBe('');
    expect(autocomplete.value).toBe('');

    autocomplete.setState({ value: 'testing' });
    expect(_field.value).toBe('testing');
    expect(autocomplete.value).toBe('testing');

    _field = null;
    props.value = 'woop';
    autocomplete = renderIntoDocument(<Autocomplete {...props} />);
    expect(_field).not.toBe(null);
    expect(_field.value).toBe('woop');
    expect(autocomplete.value).toBe('woop');
  });

  it('should call the onBlur prop when the menu is tabbed', () => {
    const onBlur = jest.fn();
    const autocomplete = mount(<Autocomplete id="test" data={[]} onBlur={onBlur} />);
    const menu = autocomplete.find(Menu);
    expect(menu.length).toBe(1);

    menu.simulate('keyDown', { which: TAB, keyCode: TAB });
    expect(onBlur.mock.calls.length).toBe(1);
  });

  it('should manually focus a list item when the menu is open and the users presses the down arrow key', () => {
    const autocomplete = mount(<Autocomplete id="test" data={DATA} defaultValue="o" />);
    autocomplete.setState({ visible: true });
    expect(autocomplete.state('matchIndex')).toBe(-1);

    const menu = autocomplete.find(Menu);
    expect(menu.length).toBe(1);
    menu.simulate('keyDown', { which: DOWN, keyCode: DOWN });

    expect(autocomplete.state('matchIndex')).toBe(0);
    const items = autocomplete.find('.md-list-tile');
    expect(items.length).toBe(3);
    expect(document.activeElement).toEqual(items.get(0));
  });

  it('should manually focus the previous list item when the menu is open and the user presses the up arrow key', () => {
    const autocomplete = mount(<Autocomplete id="test" data={DATA} defaultValue="o" />);
    autocomplete.setState({ visible: true, matchIndex: 2 });

    const menu = autocomplete.find(Menu);
    menu.simulate('keyDown', { which: UP, keyCode: UP });

    expect(autocomplete.state('matchIndex')).toBe(1);
    const items = autocomplete.find('.md-list-tile');
    expect(items.length).toBe(3);
    expect(document.activeElement).toEqual(items.get(1));
  });

  it('should select the current list item when the enter key is pressed when the menu is open', () => {
    const autocomplete = mount(<Autocomplete id="test" data={DATA} defaultValue="o" />);
    autocomplete.setState({ visible: true, matchIndex: 1 });

    const items = autocomplete.find('.md-list-tile');
    items.at(1).simulate('keyDown', { which: ENTER, keyCode: ENTER });
    expect(autocomplete.state('value')).toBe(DATA[1]);
    expect(autocomplete.state('visible')).toBe(false);
  });


  it('should select the current list item when the enter key is pressed when the menu is open', () => {
    const autocomplete = mount(<Autocomplete id="test" data={DATA} defaultValue="o" />);
    autocomplete.setState({ visible: true, matchIndex: 1 });

    const items = autocomplete.find('.md-list-tile');
    items.at(1).simulate('keyDown', { which: SPACE, keyCode: SPACE });
    expect(autocomplete.state('value')).toBe(DATA[1]);
    expect(autocomplete.state('visible')).toBe(false);
  });

  it('should open the menu when the mousedown event is triggered on the text field only when it is not inline, there are matches, and there is a value in the text field', () => {
    const autocomplete = mount(<Autocomplete id="test" data={DATA} />);
    autocomplete.setState({ value: 'o', matches: DATA });
    expect(autocomplete.state('visible')).toBe(false);

    const input = autocomplete.find('input');
    input.simulate('mouseDown');
    expect(autocomplete.state('visible')).toBe(true);

    autocomplete.setState({ visible: false, value: '' });
    input.simulate('mouseDown');
    expect(autocomplete.state('visible')).toBe(false);

    autocomplete.setState({ value: 'o', matches: [] });
    input.simulate('mouseDown');
    expect(autocomplete.state('visible')).toBe(false);

    autocomplete.setState({ matches: DATA });
    autocomplete.setProps({ inline: true });
    input.simulate('mouseDown');
    expect(autocomplete.state('visible')).toBe(false);
  });

  it('should call the onMouseDown prop when the text field triggers the mouse down event', () => {
    const onMouseDown = jest.fn();
    const autocomplete = mount(<Autocomplete id="test" data={DATA} onMouseDown={onMouseDown} />);
    const input = autocomplete.find('input');
    input.simulate('mouseDown');
    expect(onMouseDown.mock.calls.length).toBe(1);
  });

  it('should autocomplete an inline suggestion when the suggestion is touched', () => {
    const autocomplete = mount(<Autocomplete id="test" data={DATA} inline defaultValue="wo" />);
    const field = autocomplete.find('input');
    field.simulate('focus');
    expect(autocomplete.state('suggestion')).toBe('op woop');
    expect(autocomplete.state('focus')).toBe(true);

    const suggestion = autocomplete.find('.md-autocomplete-suggestion');
    suggestion.simulate('touchStart');
    expect(autocomplete.state('suggestion')).toBe('');
    expect(autocomplete.state('value')).toBe(DATA[0]);
  });

  describe('caseInsensitiveFilter', () => {
    it('should include any items that match a single letter', () => {
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(filter(haystack, 'a')).toEqual(haystack);
      expect(filter(haystack, 'e')).toEqual(['Apple', 'Orange']);
    });

    it('should include any items that match a single letter ignoring case', () => {
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(filter(haystack, 'A')).toEqual(haystack);
      expect(filter(haystack, 'E')).toEqual(['Apple', 'Orange']);
    });

    it('should only include items that match letters in order', () => {
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(filter(haystack, 'an')).toEqual(['Banana', 'Orange']);
      expect(filter(haystack, 'ana')).toEqual(['Banana']);
    });

    it('should allow the items to be a list of numbers', () => {
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = [1, 11, 111];

      expect(filter(haystack, '1')).toEqual(haystack);
      expect(filter(haystack, '2')).toEqual([]);
    });

    it('should allow the items to be a list of objects', () => {
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Orange' }];

      expect(filter(haystack, 'apple', 'name')).toEqual([{ name: 'Apple' }]);
    });

    it('should allow the item to be a mixed list of string, number, object, and react element', () => {
      const test = <Test />;
      const filter = Autocomplete.caseInsensitiveFilter;
      const haystack = [{ name: 'Apple' }, 'Banana', 3, test];

      expect(filter(haystack, 'e', 'name')).toEqual([{ name: 'Apple' }, test]);
      expect(filter(haystack, '3', 'name')).toEqual([3, test]);
    });

    it('should filter out empty, null, and undefined', () => {
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
    it('should include items that contain the letter', () => {
      const filter = Autocomplete.fuzzyFilter;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(filter(haystack, 'a')).toEqual(haystack);
      expect(filter(haystack, 'z')).toEqual([]);
    });

    it('should include items that contain all the letters', () => {
      const filter = Autocomplete.fuzzyFilter;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(filter(haystack, 'ae')).toEqual(['Apple', 'Orange']);
    });

    it('should allow the items to be a list of numbers', () => {
      const filter = Autocomplete.fuzzyFilter;
      const haystack = [1, 315, 814325, 82];

      expect(filter(haystack, '1')).toEqual([1, 315, 814325]);
      expect(filter(haystack, '15')).toEqual([315, 814325]);
    });

    it('should allow the items to be a list of objects', () => {
      const filter = Autocomplete.fuzzyFilter;
      const haystack = [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Orange' }];

      expect(filter(haystack, 'ae', 'name')).toEqual([{ name: 'Apple' }, { name: 'Orange' }]);
    });

    it('should allow the items to be a mixed list of string, number, object, and react element', () => {
      const test = <Test />;
      const filter = Autocomplete.fuzzyFilter;
      const haystack = [{ name: 'Apple' }, 'Banana', 3, test];

      expect(filter(haystack, 'e', 'name')).toEqual([{ name: 'Apple' }, test]);
      expect(filter(haystack, '3', 'name')).toEqual([3, test]);
    });

    it('should filter out empty, null, and undefined', () => {
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

    it('should allow any characters that are used in regex', () => {
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
    it('should return the empty string if no word starts with the given letter', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(find(haystack, 'e')).toBe('');
    });

    it('should return the empty string if no words starts with the given letters', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(find(haystack, 'ab')).toBe('');
      expect(find(haystack, 'appb')).toBe('');
    });

    it('should find the first match of a word beginning with the given letter ignoring case', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(find(haystack, 'a')).toEqual('Apple');
      expect(find(haystack, 'B')).toEqual('Banana');
    });

    it('should find the first match of a word beginning with the given letters ignoring case', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = ['Apple', 'Banana', 'Orange'];

      expect(find(haystack, 'ap')).toEqual('Apple');
      expect(find(haystack, 'Bana')).toEqual('Banana');
    });

    it('should allow the items to be a list of number', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = [1, 2, 3, 4];

      expect(find(haystack, '1')).toEqual('1');
    });

    it('should allow the items to be a list of object', () => {
      const find = Autocomplete.findIgnoreCase;
      const haystack = [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Orange' }];

      expect(find(haystack, 'ap', 'name')).toBe('Apple');
    });

    it('should allow the items to be a mixed list of string, number, object, and react element', () => {
      const test = <Test />;
      const find = Autocomplete.findIgnoreCase;
      const haystack = [{ name: 'Apple' }, 'Banana', 3, test];

      expect(find(haystack, 'a', 'name')).toEqual('Apple');
      expect(find(haystack, '3', 'name')).toBe('3');
    });
  });
});
