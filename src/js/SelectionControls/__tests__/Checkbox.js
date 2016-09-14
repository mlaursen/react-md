/* eslint-env jest*/
jest.unmock('../Checkbox');

import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import Checkbox from '../Checkbox';
import SelectionControl from '../SelectionControl';

describe('Checkbox', () => {
  it('renders the SelectionControl component with the correct props', () => {
    const props = {
      id: 'test',
      name: 'test',
      value: 'what',
      label: 'Test',
    };

    const checkbox = renderIntoDocument(<Checkbox {...props} />);
    const control = findRenderedComponentWithType(checkbox, SelectionControl);
    expect(control.props.id).toBe(props.id);
    expect(control.props.name).toBe(props.name);
    expect(control.props.value).toBe(props.value);
    expect(control.props.type).toBe('checkbox');
    expect(control.props.__superSecreteProp).toBe(true);
  });
});
