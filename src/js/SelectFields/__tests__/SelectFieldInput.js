/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { shallow, mount } from 'enzyme';

import SelectFieldInput from '../SelectFieldInput';
import TextFieldDivider from '../../TextFields/TextFieldDivider';
import AccessibleFakeInkedButton from '../../Helpers/AccessibleFakeInkedButton';
import IconSeparator from '../../Helpers/IconSeparator';

jest.useFakeTimers();

describe('SelectFieldInput', () => {
  it('should render an AccessibleFakeInkedButton', () => {
    const input = shallow(<SelectFieldInput value={3} />);
    expect(input.find(AccessibleFakeInkedButton).length).toBe(1);
  });

  it('should apply the correct class names', () => {
    const props = {
      value: 3,
      activeLabel: 'Something',
      disabled: false,
      placeholder: 'Nothing',
    };

    const input = shallow(<SelectFieldInput {...props} />);
    expect(input.hasClass('md-select-field')).toBe(true);
    expect(input.hasClass('md-text')).toBe(true);
    expect(input.hasClass('md-text--secondary')).toBe(false);
    expect(input.hasClass('md-text--disabled')).toBe(false);

    input.setProps({ disabled: true });
    expect(input.hasClass('md-select-field')).toBe(true);
    expect(input.hasClass('md-text')).toBe(false);
    expect(input.hasClass('md-text--secondary')).toBe(false);
    expect(input.hasClass('md-text--disabled')).toBe(true);

    input.setProps({ disabled: false, activeLabel: 0 });
    expect(input.hasClass('md-select-field')).toBe(true);
    expect(input.hasClass('md-text')).toBe(true);
    expect(input.hasClass('md-text--secondary')).toBe(false);
    expect(input.hasClass('md-text--disabled')).toBe(false);

    input.setProps({ activeLabel: '' });
    expect(input.hasClass('md-select-field')).toBe(true);
    expect(input.hasClass('md-text')).toBe(false);
    expect(input.hasClass('md-text--secondary')).toBe(true);
    expect(input.hasClass('md-text--disabled')).toBe(false);

    input.setProps({ placeholder: '' });
    expect(input.hasClass('md-select-field')).toBe(true);
    expect(input.hasClass('md-text')).toBe(false);
    expect(input.hasClass('md-text--secondary')).toBe(false);
    expect(input.hasClass('md-text--disabled')).toBe(false);
  });

  it('should render a hidden input with the correct attributes', () => {
    const props = { id: 'test-select-field', value: 'alpha', name: 'select-tests', required: true, disabled: false };
    const input = mount(<SelectFieldInput {...props} />);
    let expected = <input type="hidden" id={props.id} name={props.name} value={props.value} required disabled={false} />;
    expect(input.containsMatchingElement(expected)).toBe(true);

    input.setProps({ disabled: true, required: false });
    expected = <input type="hidden" id={props.id} name={props.name} value={props.value} required={false} disabled />;
    expect(input.containsMatchingElement(expected)).toBe(true);
  });

  it('should render the TextFieldDivider component if the not positioned below and not in a toolbar', () => {
    const props = { value: '', toolbar: false, below: false };
    const input = mount(<SelectFieldInput {...props} />);
    expect(input.find(TextFieldDivider).length).toBe(1);

    input.setProps({ toolbar: true });
    expect(input.find(TextFieldDivider).length).toBe(0);

    input.setProps({ toolbar: false, below: true });
    expect(input.find(TextFieldDivider).length).toBe(0);
  });

  it('should render the IconSeparator component with the correct class names', () => {
    const input = mount(<SelectFieldInput value="a" below label="Test" toolbar />);
    let separator = input.find(IconSeparator).get(0);
    expect(separator.props.className).toContain('md-text-field');
    expect(separator.props.className).not.toContain('md-text-field--margin');
    expect(separator.props.className).toContain('md-text-field--floating-margin');
    expect(separator.props.className).not.toContain('md-text-field--toolbar');
    expect(separator.props.className).not.toContain('md-select-field--text-field');
    expect(separator.props.className).toContain('md-select-field--btn');

    input.setProps({ label: null });
    separator = input.find(IconSeparator).get(0);
    expect(separator.props.className).toContain('md-text-field');
    expect(separator.props.className).not.toContain('md-text-field--margin');
    expect(separator.props.className).not.toContain('md-text-field--floating-margin');
    expect(separator.props.className).not.toContain('md-text-field--toolbar');
    expect(separator.props.className).not.toContain('md-select-field--text-field');
    expect(separator.props.className).toContain('md-select-field--btn');

    input.setProps({ toolbar: false });
    separator = input.find(IconSeparator).get(0);
    expect(separator.props.className).toContain('md-text-field');
    expect(separator.props.className).not.toContain('md-text-field--margin');
    expect(separator.props.className).not.toContain('md-text-field--floating-margin');
    expect(separator.props.className).not.toContain('md-text-field--toolbar');
    expect(separator.props.className).not.toContain('md-select-field--text-field');
    expect(separator.props.className).toContain('md-select-field--btn');

    input.setProps({ below: false });
    separator = input.find(IconSeparator).get(0);
    expect(separator.props.className).toContain('md-text-field');
    expect(separator.props.className).toContain('md-text-field--margin');
    expect(separator.props.className).not.toContain('md-text-field--floating-margin');
    expect(separator.props.className).not.toContain('md-text-field--toolbar');
    expect(separator.props.className).toContain('md-select-field--text-field');
    expect(separator.props.className).not.toContain('md-select-field--btn');

    input.setProps({ toolbar: true });
    separator = input.find(IconSeparator).get(0);
    expect(separator.props.className).toContain('md-text-field');
    expect(separator.props.className).toContain('md-text-field--margin');
    expect(separator.props.className).not.toContain('md-text-field--floating-margin');
    expect(separator.props.className).toContain('md-text-field--toolbar');
    expect(separator.props.className).toContain('md-select-field--text-field');
    expect(separator.props.className).not.toContain('md-select-field--btn');
  });

  it('should apply the transition name when a new value occurs for the input', () => {
    const props = {
      transitionName: 'test-drop',
      transitionTime: 200,
      value: 'a',
    };

    const input = mount(<SelectFieldInput {...props} />);
    let separator = input.find(IconSeparator).get(0);
    expect(separator.props.labelClassName).toBe(null);

    input.setProps({ value: 'b' });
    separator = input.find(IconSeparator).get(0);
    expect(separator.props.labelClassName).toBe(`${props.transitionName}-enter`);

    jest.runOnlyPendingTimers();
    separator = input.find(IconSeparator).get(0);
    expect(separator.props.labelClassName).toBe(`${props.transitionName}-enter ${props.transitionName}-enter-active`);

    jest.runOnlyPendingTimers();
    separator = input.find(IconSeparator).get(0);
    expect(separator.props.labelClassName).toBe(null);
  });
});
