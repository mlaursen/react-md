/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';

import PasswordButton from '../PasswordButton';
import FontIcon from '../../FontIcons/FontIcon';
import { TAB, SPACE } from '../../constants/keyCodes';

describe('PasswordButton', () => {
  it('should render correctly', () => {
    const button = mount(<PasswordButton icon={<FontIcon>remove_red_eye</FontIcon>} />);
    expect(button.render()).toMatchSnapshot();

    button.setProps({ active: true });
    expect(button.render()).toMatchSnapshot();

    button.setProps({ passwordVisible: true });
    expect(button.render()).toMatchSnapshot();

    button.setProps({ passwordVisible: false, floating: true });
    expect(button.render()).toMatchSnapshot();

    button.setProps({ floating: false, block: true });
    expect(button.render()).toMatchSnapshot();
  });

  it('should update the keyboardFocus state when the TAB key is pressed', () => {
    const button = shallow(<PasswordButton />);
    expect(button.state('keyboardFocus')).toBe(false);

    button.simulate('keyUp', { which: SPACE, keyCode: SPACE });
    expect(button.state('keyboardFocus')).toBe(false);

    button.simulate('keyUp', { which: TAB, keyCode: TAB });
    expect(button.state('keyboardFocus')).toBe(true);
  });

  it('should remove the keyboardFocus state when the button is blurred', () => {
    const button = shallow(<PasswordButton />);
    button.simulate('keyUp', { which: TAB, keyCode: TAB });
    expect(button.state('keyboardFocus')).toBe(true);

    button.simulate('blur');
    expect(button.state('keyboardFocus')).toBe(false);
  });
});
