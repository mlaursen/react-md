/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
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

  describe('_getItemPart', () => {
    it('should return the item if it is a number or string', () => {
      const field = shallow(<SelectField id="test" />).instance();
      expect(field._getItemPart('apple', 'label', 'value', false)).toBe('apple');
      expect(field._getItemPart('apple', 'label', 'value', true)).toBe('apple');
      expect(field._getItemPart('', 'label', 'value', false)).toBe('');
      expect(field._getItemPart('', 'label', 'value', true)).toBe('');
      expect(field._getItemPart(-100, 'label', 'value', false)).toBe(-100);
      expect(field._getItemPart(-100, 'label', 'value', true)).toBe(-100);
      expect(field._getItemPart(3, 'label', 'value', false)).toBe(3);
      expect(field._getItemPart(3, 'label', 'value', true)).toBe(3);
      expect(field._getItemPart(0, 'label', 'value', false)).toBe(0);
      expect(field._getItemPart(0, 'label', 'value', true)).toBe(0);
    });

    it('should return the item value if it exists and fallback to the item label', () => {
      const field = shallow(<SelectField id="test" />).instance();

      expect(field._getItemPart({ label: 'Hello', value: 'a' }, 'label', 'value', false)).toBe('a');
      expect(field._getItemPart({ label: 'Hello', value: 'a' }, 'label', 'value', true)).toBe('Hello');

      expect(field._getItemPart({ label: 'Hello', value: '' }, 'label', 'value', false)).toBe('');
      expect(field._getItemPart({ label: 'Hello', value: '' }, 'label', 'value', true)).toBe('Hello');

      expect(field._getItemPart({ label: 'Hello', value: 0 }, 'label', 'value', false)).toBe(0);
      expect(field._getItemPart({ label: 'Hello', value: 0 }, 'label', 'value', true)).toBe('Hello');

      expect(field._getItemPart({ label: '', value: 'a' }, 'label', 'value', false)).toBe('a');
      expect(field._getItemPart({ label: '', value: 'a' }, 'label', 'value', true)).toBe('');

      expect(field._getItemPart({ label: 0, value: 'a' }, 'label', 'value', false)).toBe('a');
      expect(field._getItemPart({ label: 0, value: 'a' }, 'label', 'value', true)).toBe(0);
    });
  });

  describe('_getActiveItemLabel', () => {
    it('it should return the item if it is a number or a string and equals the current value', () => {
      const field = shallow(<SelectField id="test" />).instance();

      expect(field._getActiveItemLabel('3', '', 'label', 'value')).toBe('');
      expect(field._getActiveItemLabel('3', 'monkey', 'label', 'value')).toBe('');
      expect(field._getActiveItemLabel('monkey', 'monkey', 'label', 'value')).toBe('monkey');
      expect(field._getActiveItemLabel('3', '3', 'label', 'value')).toBe('3');
      expect(field._getActiveItemLabel(3, 3, 'label', 'value')).toBe(3);
      expect(field._getActiveItemLabel(0, 0, 'label', 'value')).toBe(0);
    });

    it('should return the item\'s label if it is an object and it\'s value equals the current value', () => {
      const field = shallow(<SelectField id="test" />).instance();
      expect(field._getActiveItemLabel({ label: 'No Way', value: 3 }, '', 'label', 'value')).toBe('');
      expect(field._getActiveItemLabel({ label: 'No Way', value: 3 }, '3', 'label', 'value')).toBe('No Way');
      expect(field._getActiveItemLabel({ label: 'No Way', value: '3' }, '3', 'label', 'value')).toBe('No Way');
      expect(field._getActiveItemLabel({ label: 'No Way' }, '3', 'label', 'value')).toBe('');
      expect(field._getActiveItemLabel({ label: 'No Way', value: 0 }, '', 'label', 'value')).toBe('');
      expect(field._getActiveItemLabel({ label: 'No Way', value: '0' }, '', 'label', 'value')).toBe('');
      expect(field._getActiveItemLabel({ label: 'No Way', value: '' }, '', 'label', 'value')).toBe('No Way');
    });
  });
});
