/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { shallow, mount } from 'enzyme';

import SelectFieldToggle from '../SelectFieldToggle';
import SelectFieldInput from '../SelectFieldInput';
import FloatingLabel from '../../TextFields/FloatingLabel';
import TextFieldMessage from '../../TextFields/TextFieldMessage';
import addSuffix from '../../utils/StringUtils/addSuffix';
import FontIcon from '../../FontIcons/FontIcon';

jest.mock('../../utils/StringUtils/addSuffix');

const PROPS = {
  id: 'test-select',
  name: 'test-select-field',
  value: 'test',
  label: 'Label',
  placeholder: 'Placeholder',
  dropdownIcon: <FontIcon>arrow_drop_down</FontIcon>,
};

describe('SelectFieldToggle', () => {
  beforeEach(() => {
    addSuffix.mockClear();
  });

  it('should call the addSuffix function when required', () => {
    const toggle = shallow(<SelectFieldToggle {...PROPS} placeholder={null} required />);
    expect(addSuffix.mock.calls.length).toBe(1);
    expect(addSuffix).toBeCalledWith('Label', '*');

    toggle.setProps({ required: false });
    expect(addSuffix.mock.calls.length).toBe(1);
  });

  it('should call the addSuffix function when required on the placeholder only if the label does not exist', () => {
    const toggle = shallow(<SelectFieldToggle {...PROPS} required />);
    expect(addSuffix).toBeCalledWith(PROPS.label, '*');

    toggle.setProps({ label: undefined });
    expect(addSuffix).toBeCalledWith(PROPS.placeholder, '*');
  });

  it('should render the FloatingLabel component', () => {
    const toggle = shallow(<SelectFieldToggle value="test" />);
    expect(toggle.find(FloatingLabel).length).toBe(1);
  });

  it('should set the active state for the floating label if either the active or visible prop are true', () => {
    const toggle = shallow(<SelectFieldToggle value="a" active visible />);
    let label = toggle.find(FloatingLabel).get(0);
    expect(label.props.active).toBe(true);

    toggle.setProps({ active: false });
    label = toggle.find(FloatingLabel).get(0);
    expect(label.props.active).toBe(true);

    toggle.setProps({ visible: false });
    label = toggle.find(FloatingLabel).get(0);
    expect(label.props.active).toBe(false);
  });

  it('should set the floating prop on the floating label to true if the active label exists, equals 0, or the active or visible props are true', () => {
    const toggle = mount(<SelectFieldToggle {...PROPS} activeLabel="Apple" visible={false} active={false} />);
    let label = toggle.find(FloatingLabel).get(0);
    expect(label.props.floating).toBe(true);

    toggle.setProps({ activeLabel: 0 });
    label = toggle.find(FloatingLabel).get(0);
    expect(label.props.floating).toBe(true);

    toggle.setProps({ activeLabel: '' });
    label = toggle.find(FloatingLabel).get(0);
    expect(label.props.floating).toBe(false);

    toggle.setProps({ active: true, visible: true });
    label = toggle.find(FloatingLabel).get(0);
    expect(label.props.floating).toBe(true);

    toggle.setProps({ active: false });
    label = toggle.find(FloatingLabel).get(0);
    expect(label.props.floating).toBe(true);

    toggle.setProps({ visible: false });
    label = toggle.find(FloatingLabel).get(0);
    expect(label.props.floating).toBe(false);
  });

  it('should render the SelectFieldInput component', () => {
    const toggle = shallow(<SelectFieldToggle value="a" />);
    expect(toggle.find(SelectFieldInput).length).toBe(1);
  });

  it('should render the TextFieldMessage component', () => {
    const toggle = shallow(<SelectFieldToggle value="a" />);
    expect(toggle.find(TextFieldMessage).length).toBe(1);
  });

  it('should set the active state for the TextFieldMessage when visible or active', () => {
    const toggle = mount(<SelectFieldToggle {...PROPS} visible active />);
    let message = toggle.find(TextFieldMessage).get(0);
    expect(message.props.active).toBe(true);

    toggle.setProps({ active: false });
    message = toggle.find(TextFieldMessage).get(0);
    expect(message.props.active).toBe(true);

    toggle.setProps({ visible: false });
    message = toggle.find(TextFieldMessage).get(0);
    expect(message.props.active).toBe(false);
  });
});
