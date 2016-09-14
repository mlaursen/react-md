/* eslint-env jest*/
jest.unmock('../Radio');

import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import Radio from '../Radio';
import SelectionControl from '../SelectionControl';

describe('Radio', () => {
  it('renders the SelectionControl component with the correct props', () => {
    const props = {
      id: 'test',
      name: 'test',
      value: 'what',
      label: 'Test',
      checked: false,
    };

    const radio = renderIntoDocument(<Radio {...props} />);
    const control = findRenderedComponentWithType(radio, SelectionControl);
    expect(control.props.id).toBe(props.id);
    expect(control.props.name).toBe(props.name);
    expect(control.props.value).toBe(props.value);
    expect(control.props.type).toBe('radio');
    expect(control.props.__superSecreteProp).toBe(true);
  });
});
