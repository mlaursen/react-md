/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import FloatingLabel from '../FloatingLabel';

describe('FloatingLabel', () => {
  it('should return null when no label prop is defined', () => {
    const label = shallow(<FloatingLabel />);
    expect(label.type()).toBe(null);

    label.setProps({ label: 'Some label' });
    expect(label.type()).not.toBe(null);
  });

  it('should render correctly based on the props', () => {
    const label = shallow(<FloatingLabel />);
    expect(label.render()).toMatchSnapshot();

    label.setProps({ label: 'Some label', htmlFor: 'test-field' });
    expect(label.render()).toMatchSnapshot();

    // Checking states
    label.setProps({ floating: true });
    expect(label.render()).toMatchSnapshot();

    label.setProps({ active: true });
    expect(label.render()).toMatchSnapshot();

    label.setProps({ error: true });
    expect(label.render()).toMatchSnapshot();

    label.setProps({ floating: false });
    expect(label.render()).toMatchSnapshot();

    // Adding custom sizes
    label.setProps({ customSize: 'custom-size', floating: false, active: false, error: false });
    expect(label.render()).toMatchSnapshot();

    // Checking states again
    label.setProps({ floating: true });
    expect(label.render()).toMatchSnapshot();

    label.setProps({ active: true });
    expect(label.render()).toMatchSnapshot();

    label.setProps({ error: true });
    expect(label.render()).toMatchSnapshot();

    label.setProps({ customSize: null, iconOffset: true });
    expect(label.render()).toMatchSnapshot();
  });
});
