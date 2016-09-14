/* eslint-env jest*/
jest.unmock('../Switch');

import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import Switch from '../Switch';
import SelectionControl from '../SelectionControl';

describe('Switch', () => {
  it('renders the SelectionControl component with the correct props', () => {
    const props = {
      id: 'test',
      name: 'test',
      value: 'what',
      label: 'Test',
    };

    const switchEl = renderIntoDocument(<Switch {...props} />);
    const control = findRenderedComponentWithType(switchEl, SelectionControl);
    expect(control.props.id).toBe(props.id);
    expect(control.props.name).toBe(props.name);
    expect(control.props.value).toBe(props.value);
    expect(control.props.type).toBe('switch');
    expect(control.props.__superSecreteProp).toBe(true);
  });
});
