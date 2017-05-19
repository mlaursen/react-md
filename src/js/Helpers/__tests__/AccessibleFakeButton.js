/* eslint-env jest */
jest.unmock('../AccessibleFakeButton');
jest.unmock('../../utils/EventUtils/handleKeyboardAccessibility');

import React from 'react';
import { shallow, mount } from 'enzyme';

import AccessibleFakeButton from '../AccessibleFakeButton';
import { TAB, SPACE, ENTER } from '../../constants/keyCodes';

describe('AccessibleFakeButton', () => {
  it('should apply the correct classNames', () => {
    const fake = shallow(<AccessibleFakeButton />);
    expect(fake.hasClass('md-fake-btn')).toBe(true);
    expect(fake.hasClass('md-pointer--hover')).toBe(true);
  });

  it('should apply the tabbed class name when the button gains focus from tabbing', () => {
    const tabbedClassName = 'class-name-on-tab';
    const fake = shallow(<AccessibleFakeButton tabbedClassName={tabbedClassName} />);
    expect(fake.hasClass(tabbedClassName)).toBe(false);

    fake.simulate('keyUp', { which: TAB, keyCode: TAB });
    expect(fake.hasClass(tabbedClassName)).toBe(true);
  });

  it('should toggle the pressed state when clicked', () => {
    const fake = mount(<AccessibleFakeButton />);
    expect(fake.state('pressed')).toBe(false);

    fake.simulate('click');
    expect(fake.state('pressed')).toBe(true);

    fake.simulate('click');
    expect(fake.state('pressed')).toBe(false);
  });

  it('should set the tabFocused state to true on key up and the key was TAB', () => {
    const fake = shallow(<AccessibleFakeButton />);
    expect(fake.state('tabFocused')).toBe(false);

    fake.simulate('keyUp', { which: SPACE, keyCode: SPACE });
    expect(fake.state('tabFocused')).toBe(false);

    fake.simulate('keyUp', { which: TAB, keyCode: TAB });
    expect(fake.state('tabFocused')).toBe(true);
  });

  it('should trigger the click event when the enter or space key is pressed', () => {
    const onClick = jest.fn();
    const fake = mount(<AccessibleFakeButton onClick={onClick} />);

    fake.simulate('keyDown', { which: ENTER, keyCode: ENTER });
    expect(onClick.mock.calls.length).toBe(1);

    fake.simulate('keyDown', { which: SPACE, keyCode: SPACE });
    expect(onClick.mock.calls.length).toBe(2);
  });

  it('should call the onTabFocus prop onKeyUp and the key was TAB', () => {
    const onTabFocus = jest.fn();
    const fake = mount(<AccessibleFakeButton onTabFocus={onTabFocus} />);

    fake.simulate('keyUp', { which: SPACE, keyCode: SPACE });
    expect(onTabFocus.mock.calls.length).toBe(0);

    fake.simulate('keyUp', { which: TAB, keyCode: TAB });
    expect(onTabFocus.mock.calls.length).toBe(1);
  });

  it('should not trigger the click event when disabled', () => {
    const onClick = jest.fn();
    const fake = shallow(<AccessibleFakeButton onClick={onClick} disabled />);

    fake.simulate('click');
    expect(onClick.mock.calls.length).toBe(0);
  });
});
