/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import MenuButton from '../MenuButton';
import DropdownMenu from '../DropdownMenu';
import Button from '../../Buttons/Button';

describe('MenuButton', () => {
  it('should render a DropdownMenu and a Button component', () => {
    const menuButton = mount(<MenuButton id="test" raised menuItems={['Hello']}>Woop</MenuButton>);
    expect(menuButton.find(DropdownMenu).length).toBe(1);
    expect(menuButton.find(Button).length).toBe(1);
  });

  it('should call the onClick and onVisibilityChange props when the button is clicked', () => {
    const onClick = jest.fn();
    const onVisibilityChange = jest.fn();
    const props = {
      id: 'test',
      raised: true,
      menuItems: ['Hello'],
      onClick,
      onVisibilityChange,
    };

    const menu = mount(<MenuButton {...props}>Woop</MenuButton>);
    menu.find('button').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
    expect(onVisibilityChange.mock.calls.length).toBe(1);
    expect(onVisibilityChange.mock.calls[0][0]).toBe(true);
  });

  it('should make the button\'s id to be `id-toggle` if the buttonId prop is not defined', () => {
    const props = { id: 'test', raised: true, menuItems: ['Woop'] };
    const menu = mount(<MenuButton {...props}>Woop</MenuButton>);
    expect(menu.find(Button).get(0).props.id).toBe('test-toggle');

    menu.setProps({ buttonId: 'some-amazing-button' });
    expect(menu.find(Button).get(0).props.id).toBe('some-amazing-button');
  });
});
