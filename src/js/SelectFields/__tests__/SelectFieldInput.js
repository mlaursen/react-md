/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { shallow } from 'enzyme';

import SelectFieldInput from '../SelectFieldInput';
import FontIcon from '../../FontIcons/FontIcon';

jest.useFakeTimers();

const PROPS = {
  id: 'test-field',
  name: 'something-select',
  value: 3,
  dropdownIcon: <FontIcon>arrow_drop_down</FontIcon>,
};

describe('SelectFieldInput', () => {
  it('should render correctly', () => {
    const field = shallow(<SelectFieldInput {...PROPS} />);
    expect(field.render()).toMatchSnapshot();

    field.setProps({ style: { height: 150 }, className: 'test-name' });
    expect(field.render()).toMatchSnapshot();

    field.setProps({ activeLabel: 'Something' });
    expect(field.render()).toMatchSnapshot();

    field.setProps({ placeholder: 'Nothing' });
    expect(field.render()).toMatchSnapshot();

    field.setProps({ disabled: true });
    expect(field.render()).toMatchSnapshot();

    field.setProps({ below: true });
    expect(field.render()).toMatchSnapshot();

    field.setProps({ disabled: false });
    expect(field.render()).toMatchSnapshot();
  });
});
