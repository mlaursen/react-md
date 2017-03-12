/* eslint-env jest */
import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import SelectField from '../SelectField';
import Menu from '../../Menus/Menu';

const PROPS = { id: 'test' };
describe('SelectField', () => {
  it('merges className and style', () => {
    const props = Object.assign({}, PROPS, {
      id: 'woop',
      style: { background: 'orange' },
      className: 'woop-woop',
    });

    const field = renderIntoDocument(<SelectField {...props} />);
    const menu = findRenderedComponentWithType(field, Menu);
    expect(menu.props.style).toBe(props.style);
    expect(menu.props.className).toContain(props.className);
  });

  it('can get the value with a ref', () => {
    let _field = null;
    const ref = f => { _field = f; };
    let field = renderIntoDocument(<SelectField {...PROPS} ref={ref} />);
    expect(_field).not.toBe(null);
    expect(_field.value).toBe('');
    expect(field.value).toBe('');

    field.setState({ value: 'hello' });
    expect(_field.value).toBe('hello');
    expect(field.value).toBe('hello');

    _field = null;
    field = renderIntoDocument(<SelectField {...PROPS} value="testing" ref={ref} onChange={jest.fn()} />);
    expect(_field).not.toBe(null);
    expect(_field.value).toBe('testing');
    expect(field.value).toBe('testing');
  });
});
