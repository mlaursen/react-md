/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';

import TextFieldMessage from '../TextFieldMessage';

describe('TextFieldMessage', () => {
  it('should return null if there is no helpText, errorText or maxLength props', () => {
    const message = shallow(<TextFieldMessage currentLength={0} />);
    expect(message.type()).toBe(null);

    message.setProps({ errorText: 'Some error' });
    expect(message.type()).not.toBe(null);

    message.setProps({ helpText: 'Some help', errorText: null });
    expect(message.type()).not.toBe(null);

    message.setProps({ maxLength: 20, helpText: null });
    expect(message.type()).not.toBe(null);
  });

  it('should set the isMessageVisible state appropriately', () => {
    const message = shallow(<TextFieldMessage errorText="Error" helpText="Help" />);
    expect(message.state('isMessageVisible')).toBe(true);

    message.setProps({ helpOnFocus: true });
    expect(message.state('isMessageVisible')).toBe(false);

    message.setProps({ error: true });
    expect(message.state('isMessageVisible')).toBe(true);
  });

  it('should render correctly based on the props', () => {
    const message = mount(<TextFieldMessage currentLength={0} />);
    expect(message.render()).toMatchSnapshot();

    message.setProps({ maxLength: 20 });
    expect(message.render()).toMatchSnapshot();

    message.setProps({ currentLength: 2 });
    expect(message.render()).toMatchSnapshot();

    message.setProps({ helpText: 'Some help text' });
    expect(message.render()).toMatchSnapshot();

    message.setProps({ helpOnFocus: true });
    expect(message.render()).toMatchSnapshot();

    message.setProps({ active: true });
    expect(message.render()).toMatchSnapshot();

    message.setProps({ errorText: 'Some error text', helpOnFocus: false });
    expect(message.render()).toMatchSnapshot();

    message.setProps({ active: false });
    expect(message.render()).toMatchSnapshot();

    message.setProps({ error: true });
    expect(message.render()).toMatchSnapshot();

    message.setProps({ leftIcon: true, error: false, errorText: null });
    expect(message.render()).toMatchSnapshot();

    message.setProps({ rightIcon: true });
    expect(message.render()).toMatchSnapshot();

    message.setProps({ letIcon: false, rightIcon: false, block: true });
    expect(message.render()).toMatchSnapshot();
  });
});
