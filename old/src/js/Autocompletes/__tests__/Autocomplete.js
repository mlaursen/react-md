/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { renderIntoDocument } from 'react-dom/test-utils';

import { TAB, ENTER, SPACE } from '../../constants/keyCodes';
import Autocomplete from '../Autocomplete';
import Menu from '../../Menus/Menu';
import TextField from '../../TextFields/TextField';
import List from '../../Lists/List';
import ListItem from '../../Lists/ListItem';

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
    const autocomplete = shallow(<Autocomplete id="test" data={DATA} value="the s" onChange={jest.fn()} filter={null} />);
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
    expect(autocomplete.state('matches')).toEqual([]);

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

  it('should select the current list item when the enter key is pressed when the menu is open', () => {
    const autocomplete = mount(<Autocomplete id="test" data={DATA} defaultValue="o" />);
    autocomplete.setState({ visible: true, matchIndex: 1 });

    const items = autocomplete.find(ListItem);
    items.at(1).simulate('keyDown', { which: ENTER, keyCode: ENTER });
    expect(autocomplete.state('value')).toBe(DATA[1]);
    expect(autocomplete.state('visible')).toBe(false);
  });


  it('should select the current list item when the enter key is pressed when the menu is open', () => {
    const autocomplete = mount(<Autocomplete id="test" data={DATA} defaultValue="o" />);
    autocomplete.setState({ visible: true, matchIndex: 1 });

    const items = autocomplete.find(ListItem);
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

  it('should update the matches if the value or data props change', () => {
    const data = ['Hello', 'World', 'Something', 'Else'];
    const autocomplete = shallow(<Autocomplete id="autocomplete" data={data} />);
    expect(autocomplete.state('matches')).toEqual([]);

    autocomplete.setProps({ value: 'hel', onChange: jest.fn() });
    expect(autocomplete.state('matches')).toEqual(['Hello']);

    autocomplete.setProps({ data: ['Helium', 'Horrible'] });
    expect(autocomplete.state('matches')).toEqual(['Helium']);
  });

  it('should update the visible state when a filter function has been provided and the value has changed', () => {
    const props = { id: 'test', data: ['Hello', 'World'], defaultValue: 'h' };
    const autocomplete = mount(<Autocomplete {...props} />);
    const input = autocomplete.find('input');
    expect(input.length).toBe(1);

    input.simulate('focus');
    expect(autocomplete.state('visible')).toBe(true);

    input.simulate('change', { target: { value: 'he' } });
    expect(autocomplete.state('visible')).toBe(true);

    input.simulate('change', { target: { value: '' } });
    expect(autocomplete.state('visible')).toBe(false);

    input.simulate('change', { target: { value: 'h' } });
    expect(autocomplete.state('visible')).toBe(true);

    input.simulate('change', { target: { value: 'b' } });
    expect(autocomplete.state('visible')).toBe(false);
  });

  it('should not change the visible state when a filter function has not been provided', () => {
    const data = ['Hello', 'World'];
    const props = { id: 'test-2', data, filter: null, defaultValue: 'h' };
    const autocomplete = mount(<Autocomplete {...props} />);

    expect(autocomplete.state('matches')).toBe(data);
    expect(autocomplete.state('visible')).toBe(false);
    const input = autocomplete.find('input');
    expect(input.length).toBe(1);

    input.simulate('focus');
    expect(autocomplete.state('visible')).toBe(true);

    input.simulate('change', { target: { value: 'b' } });
    expect(autocomplete.state('visible')).toBe(true);
  });

  it('should allow for ajax autocompletion flows', () => {
    let data = [];
    const onAutocomplete = jest.fn();
    const autocomplete = mount(
      <Autocomplete
        id="ajax-example"
        data={data}
        label="Ajax"
        filter={null}
        onChange={jest.fn()}
        clearOnAutocomplete
        onAutocomplete={onAutocomplete}
      />
    );

    autocomplete.find('input').simulate('focus');
    expect(autocomplete.state('focus')).toBe(true);

    autocomplete.find('input').simulate('change', { value: 'a' });
    expect(autocomplete.state('matches')).toBe(data);
    expect(autocomplete.state('visible')).toBe(false);

    data = ['Apples', 'Bananas', 'Oranges', 'Avacados'];
    autocomplete.setProps({ data }); // return from ajax call
    expect(autocomplete.state('matches')).toBe(data);
    expect(autocomplete.state('visible')).toBe(true);

    autocomplete.find(ListItem).at(1).simulate('click');
    expect(onAutocomplete).toBeCalled();
    expect(autocomplete.state('focus')).toBe(true);
    expect(autocomplete.state('visible')).toBe(false);
    expect(autocomplete.state('matches')).toBe(data);
    expect(autocomplete.state('value')).toBe('');

    data = [];
    autocomplete.setProps({ data });
    expect(autocomplete.state('matches')).toBe(data);
    expect(autocomplete.state('focus')).toBe(true);

    autocomplete.find('input').simulate('change', { value: 'b' });
    expect(autocomplete.state('matches')).toBe(data);
    expect(autocomplete.state('visible')).toBe(false);

    data = ['Bapples', 'Bananas', 'Boranges', 'Bavacados'];
    autocomplete.setProps({ data });
    expect(autocomplete.state('matches')).toBe(data);
    expect(autocomplete.state('visible')).toBe(true);
  });

  it('should be renderable inside of a ListItem', () => {
    const autocomplete = <Autocomplete id="inside-list" data={[]} />;

    let error = false;
    try {
      const list = mount(
        <List>
          <ListItem primaryText={autocomplete} />
        </List>
      );
      list.find(Autocomplete).simulate('click');
    } catch (e) {
      error = true;
    }

    expect(error).toBe(false);
  });
});
