/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import MenuButton from '../MenuButton';
import Menu from '../Menu';
import Button from '../../Buttons/Button';

describe('MenuButton', () => {
  it('should render a Menu and a Button component', () => {
    const menuButton = mount(<MenuButton id="test" raised menuItems={['Hello']} label="Woop" />);
    expect(menuButton.find(Menu).length).toBe(1);
    expect(menuButton.find(Button).length).toBe(1);
  });

  it('should toggle the menu open when the button is clicked', () => {
    const menu = mount(<MenuButton id="test" raised label="Woop" menuItems={['Hello']} />);
    expect(menu.state('visible')).toBe(false);
    menu.find('button').simulate('click');
    expect(menu.state('visible')).toBe(true);
  });

  it('should call the onClick and onVisibilityChange props when the button is clicked', () => {
    const onClick = jest.fn();
    const onVisibilityChange = jest.fn();
    const props = {
      id: 'test',
      label: 'Woop',
      raised: true,
      menuItems: ['Hello'],
      onClick,
      onVisibilityChange,
    };

    const menu = mount(<MenuButton {...props} />);
    menu.find('button').simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
    expect(onVisibilityChange.mock.calls.length).toBe(1);
    expect(onVisibilityChange.mock.calls[0][0]).toBe(true);
  });

  it('should make the button\'s id to be `id-toggle` if the buttonId prop is not defined', () => {
    const props = { id: 'test', label: 'Woop', raised: true, menuItems: ['Woop'] };
    const menu = mount(<MenuButton {...props} />);
    expect(menu.find(Button).get(0).props.id).toBe('test-toggle');

    menu.setProps({ buttonId: 'some-amazing-button' });
    expect(menu.find(Button).get(0).props.id).toBe('some-amazing-button');
  });
});
