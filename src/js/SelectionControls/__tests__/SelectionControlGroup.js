/* eslint-env jest */
/* eslint-disable max-len */
jest.unmock('../SelectionControlGroup');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import SelectionControlGroup from '../SelectionControlGroup';
import SelectionControl from '../SelectionControl';

const PROPS = {
  id: 'test',
  name: 'test',
  controls: [{ value: 'eyyy', label: 'eyyy' }],
  type: 'checkbox',
};

const PROPS_2 = Object.assign({}, PROPS, {
  controls: PROPS.controls.concat([{ value: 'something', label: 'Something' }]),
});

describe('SelectionControlGroup', () => {
  it('merges className and style', () => {
    const props = Object.assign({}, PROPS, {
      style: { background: 'black' },
      className: 'test',
    });

    const selectionControlGroup = renderIntoDocument(<SelectionControlGroup {...props} />);

    const selectionControlGroupNode = findDOMNode(selectionControlGroup);
    expect(selectionControlGroupNode.style.background).toBe(props.style.background);
    expect(selectionControlGroupNode.className).toContain(props.className);
  });

  it('renders as a fieldset by default', () => {
    const group = renderIntoDocument(<SelectionControlGroup {...PROPS} />);
    const fieldsets = scryRenderedDOMComponentsWithTag(group, 'fieldset');
    expect(fieldsets.length).toBe(1);
  });

  it('renders as the value of the component prop', () => {
    const props = Object.assign({}, PROPS, { component: 'div' });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const divs = scryRenderedDOMComponentsWithTag(group, 'div');
    expect(divs.length).toBe(1);
  });

  it('renders the label prop in a legend by default', () => {
    const props = Object.assign({}, PROPS, { label: 'Test' });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const legends = scryRenderedDOMComponentsWithTag(group, 'legend');
    expect(legends.length).toBe(1);
    expect(legends[0].innerHTML).toBe(props.label);
  });

  it('renders the label prop in the value of the labelComponent prop', () => {
    const props = Object.assign({}, PROPS, { label: 'Test', labelComponent: 'label' });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const labels = scryRenderedDOMComponentsWithTag(group, 'label');
    expect(labels.length).toBe(1);
    expect(labels[0].innerHTML).toBe(props.label);
  });

  it('renders a list of SelectionControl equal to the length pf the controls prop', () => {
    const group = renderIntoDocument(<SelectionControlGroup {...PROPS} />);
    const controls = scryRenderedComponentsWithType(group, SelectionControl);
    expect(controls.length).toBe(PROPS.controls.length);
  });

  it('sets the SelectionControl type from the type prop', () => {
    const props = Object.assign({}, PROPS_2, { type: 'checkbox' });
    let group = renderIntoDocument(<SelectionControlGroup {...props} />);
    let [f, s] = scryRenderedComponentsWithType(group, SelectionControl);

    expect(f.props.type).toBe('checkbox');
    expect(s.props.type).toBe('checkbox');

    props.type = 'radio';
    group = renderIntoDocument(<SelectionControlGroup {...props} />);
    [f, s] = scryRenderedComponentsWithType(group, SelectionControl);

    expect(f.props.type).toBe('radio');
    expect(s.props.type).toBe('radio');
  });

  it('merges style and className for each control with the controlStyle and controlClassName props', () => {
    const props = Object.assign({}, PROPS_2, {
      controls: PROPS_2.controls.map(({ value, label }, i) => ({
        value,
        label,
        style: { left: i },
        className: `test-control-${i}`,
      })),
      controlStyle: { background: 'red' },
      controlClassName: 'test-control-woop',
    });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);

    expect(f.props.style).toEqual({ left: 0, background: 'red' });
    expect(f.props.className).toContain('test-control-0');
    expect(f.props.className).toContain('test-control-woop');
    expect(s.props.style).toEqual({ left: 1, background: 'red' });
    expect(s.props.className).toContain('test-control-1');
    expect(s.props.className).toContain('test-control-woop');
  });

  it('sets the id prop as a prefix for each SelectionControl', () => {
    const group = renderIntoDocument(<SelectionControlGroup {...PROPS_2} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);

    expect(f.props.id.startsWith(PROPS_2.id)).toBe(true);
    expect(s.props.id.startsWith(PROPS_2.id)).toBe(true);
  });

  it('does not set the id for controls that already have an id', () => {
    const props = Object.assign({}, PROPS_2, {
      controls: PROPS_2.controls.map(({ value, label }) => ({
        label,
        value,
        id: label,
      })),
    });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);

    expect(f.props.id).toBe(f.props.label);
    expect(f.props.id.startsWith(props.id)).toBe(false);
    expect(s.props.id).toBe(s.props.label);
    expect(s.props.id.startsWith(props.id)).toBe(false);
  });

  it('sets an array version of the name prop for each SelectionControl when the type is checkbox', () => {
    const group = renderIntoDocument(<SelectionControlGroup {...PROPS_2} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);

    expect(f.props.name).toBe(`${PROPS_2.name}[]`);
    expect(s.props.name).toBe(`${PROPS_2.name}[]`);
  });

  it('does not set the name for controls that already have an name', () => {
    const props = Object.assign({}, PROPS_2, {
      controls: PROPS_2.controls.map(({ value, label }) => ({
        label,
        value,
        name: 'someAmazingGroupOfStuff',
      })),
    });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);

    expect(f.props.name).toBe('someAmazingGroupOfStuff');
    expect(f.props.name.startsWith(props.name)).toBe(false);
    expect(s.props.name).toBe('someAmazingGroupOfStuff');
    expect(s.props.name.startsWith(props.name)).toBe(false);
  });

  it('sets the name prop for each SelectionControl whent he type is radio', () => {
    const props = Object.assign({}, PROPS_2, { type: 'radio' });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);

    expect(f.props.name).toBe(props.name);
    expect(s.props.name).toBe(props.name);
  });

  it('checks the checkbox that has the same value as the defaultValue prop', () => {
    const props = Object.assign({}, PROPS_2, { defaultValue: ' ' });
    let group = renderIntoDocument(<SelectionControlGroup {...props} />);
    let [f, s] = scryRenderedComponentsWithType(group, SelectionControl);
    expect(f.props.checked).toBe(false);
    expect(s.props.checked).toBe(false);

    props.defaultValue = props.controls[0].value;
    group = renderIntoDocument(<SelectionControlGroup {...props} />);
    [f, s] = scryRenderedComponentsWithType(group, SelectionControl);
    expect(f.props.checked).toBe(true);
    expect(s.props.checked).toBe(false);
  });

  it('checks the checkbox that has the same value as the value prop', () => {
    const props = Object.assign({}, PROPS_2, { value: ' ' });
    let group = renderIntoDocument(<SelectionControlGroup {...props} />);
    let [f, s] = scryRenderedComponentsWithType(group, SelectionControl);
    expect(f.props.checked).toBe(false);
    expect(s.props.checked).toBe(false);

    props.value = props.controls[0].value;
    group = renderIntoDocument(<SelectionControlGroup {...props} />);
    [f, s] = scryRenderedComponentsWithType(group, SelectionControl);
    expect(f.props.checked).toBe(true);
    expect(s.props.checked).toBe(false);
  });

  it('expects a comma-delimited defaultValue prop when multiple checkboxes are checked by default', () => {
    const props = Object.assign({}, PROPS_2, { defaultValue: 'eyyy,something' });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);
    expect(f.props.checked).toBe(true);
    expect(s.props.checked).toBe(true);
  });

  it('does not matter what order the comma-delimited defaultValue prop when multiple checkboxes are checked by default is', () => {
    const props = Object.assign({}, PROPS_2, { defaultValue: 'something,eyyy' });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);
    expect(f.props.checked).toBe(true);
    expect(s.props.checked).toBe(true);
  });

  it('expects a comma-delimited value prop when multiple checkboxes are checked by default', () => {
    const props = Object.assign({}, PROPS_2, { value: 'eyyy,something' });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);
    expect(f.props.checked).toBe(true);
    expect(s.props.checked).toBe(true);
  });

  it('does not matter what order the comma-delimited value prop when multiple checkboxes are checked by default is', () => {
    const props = Object.assign({}, PROPS_2, { value: 'something,eyyy' });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);
    expect(f.props.checked).toBe(true);
    expect(s.props.checked).toBe(true);
  });

  it('checks the first radio button when the defaultValue and value props are not defined', () => {
    const props = Object.assign({}, PROPS_2, { type: 'radio' });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);
    expect(f.props.checked).toBe(true);
    expect(s.props.checked).toBe(false);
  });

  it('checkes the radio button that matches the defaultValue', () => {
    const props = Object.assign({}, PROPS_2, { type: 'radio', defaultValue: 'something' });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);
    expect(f.props.checked).toBe(false);
    expect(s.props.checked).toBe(true);
  });

  it('checkes the radio button that matches the value', () => {
    const props = Object.assign({}, PROPS_2, { type: 'radio', value: 'something' });
    const group = renderIntoDocument(<SelectionControlGroup {...props} />);
    const [f, s] = scryRenderedComponentsWithType(group, SelectionControl);
    expect(f.props.checked).toBe(false);
    expect(s.props.checked).toBe(true);
  });

  it('calls the onChange prop with the comma-delimited list of checked values when the type is checkbox', () => {
    const onChange = jest.fn();
    const props = Object.assign({}, PROPS_2, { onChange });
    let group = renderIntoDocument(<SelectionControlGroup {...props} />);
    group._handleChange({ target: { checked: false } });
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe('');

    props.value = 'eyy';
    group = renderIntoDocument(<SelectionControlGroup {...props} />);
    // uncheck it
    group._handleChange({ target: { checked: false, value: 'eyy' } });
    expect(onChange.mock.calls.length).toBe(2);
    expect(onChange.mock.calls[1][0]).toBe('');

    // check something
    group._handleChange({ target: { checked: true, value: 'something' } });
    expect(onChange.mock.calls.length).toBe(3);
    expect(onChange.mock.calls[2][0]).toBe('eyy,something');
  });
});
