/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import Message from '../Message';

describe('Message', () => {
  it('should render as null when there are no children', () => {
    const message = shallow(<Message />);
    expect(message.type()).toBe(null);

    message.setProps({ children: <span>Hello, wolrd!</span> });
    expect(message.type()).not.toBe(null);
  });

  it('should render correctly', () => {
    const message = shallow(<Message />);
    expect(message.render()).toMatchSnapshot();

    message.setProps({ active: false, children: <span>Hello, World!</span> });
    expect(message.render()).toMatchSnapshot();

    message.setProps({ active: true });
    expect(message.render()).toMatchSnapshot();
  });
});
