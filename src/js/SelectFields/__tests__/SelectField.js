/* eslint-env jest */
/* eslint-disable max-len, react/no-multi-comp */
jest.unmock('../SelectField');

import React from 'react';
import { shallow, mount } from 'enzyme';
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

  it('should update the activeLabel if the prop value changes', () => {
    const field = shallow(<SelectField id="test" menuItems={['1', '2', '3']} value="" />);
    expect(field.state('activeLabel')).toBe('');

    field.setProps({ value: '2' });
    expect(field.state('activeLabel')).toBe('2');
  });

  it('should update the activeLabel if the menuItems prop changes', () => {
    const menuItems = ['Hello', 'World!', 'Yes', 'No'];
    const field = shallow(<SelectField id="test" menuItems={menuItems} value="Missing" />);
    expect(field.state('activeLabel')).toBe('');

    field.setProps({ menuItems: [...menuItems, 'Missing'] });
    expect(field.state('activeLabel')).toBe('Missing');
  });

  it('should still have the correct label if the menuItems are defined as a list in the render and the parent component rerenders', () => {
    let renderCount = 0;
    class Test extends React.Component {
      render() {
        renderCount += 1;

        return (
          <div>
            <SelectField id="test" menuItems={['1', '2', '3']} defaultValue="2" />
          </div>
        );
      }
    }

    const test = mount(<Test />);
    expect(renderCount).toBe(1);
    expect(test.find(SelectField).get(0).state.activeLabel).toBe('2');
    test.update();
    expect(renderCount).toBe(2);
    expect(test.find(SelectField).get(0).state.activeLabel).toBe('2');
  });

  it('should still have the correct label if the menuItems of objects are defined as a list in the render and the parent component rerenders', () => {
    let renderCount = 0;
    class Test extends React.Component {
      render() {
        renderCount += 1;

        return (
          <div>
            <SelectField
              id="test"
              menuItems={[{ label: 'Hello', value: 0 }, { label: 'World', value: 1 }, { label: 'Omega', value: 2 }]}
              defaultValue={1}
            />
          </div>
        );
      }
    }

    const test = mount(<Test />);
    expect(renderCount).toBe(1);
    expect(test.find(SelectField).get(0).state.activeLabel).toBe('World');
    test.update();
    expect(renderCount).toBe(2);
    expect(test.find(SelectField).get(0).state.activeLabel).toBe('World');
  });
});
