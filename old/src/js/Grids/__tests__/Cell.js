/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Cell from '../Cell';

describe('Cell', () => {
  describe('getClassName', () => {
    it('should default to just md-cell if there are no options provided', () => {
      const expected = 'md-cell';
      expect(Cell.getClassName()).toBe(expected);
      expect(Cell.getClassName(undefined)).toBe(expected);
      expect(Cell.getClassName({})).toBe(expected);
    });
  });

  it('should render correctly without any props', () => {
    global.expectSnapshot(<Cell />);
    global.expectSnapshot(<Cell><span /></Cell>);
  });

  it('should render correctly based on different props', () => {
    global.expectSnapshot(<Cell align="top" />);
    global.expectSnapshot(<Cell position="center" />);
    global.expectSnapshot(<Cell size={4} />);
    global.expectSnapshot(<Cell order={4} />);
    global.expectSnapshot(<Cell offset={4} />);
    global.expectSnapshot(<Cell phoneSize={4} />);
    global.expectSnapshot(<Cell phoneOrder={4} />);
    global.expectSnapshot(<Cell phoneOffset={4} />);
    global.expectSnapshot(<Cell phoneHidden />);
    global.expectSnapshot(<Cell tabletSize={4} />);
    global.expectSnapshot(<Cell tabletOrder={4} />);
    global.expectSnapshot(<Cell tabletOffset={4} />);
    global.expectSnapshot(<Cell tabletHidden />);
    global.expectSnapshot(<Cell desktopSize={4} />);
    global.expectSnapshot(<Cell desktopOrder={4} />);
    global.expectSnapshot(<Cell desktopOffset={4} />);
    global.expectSnapshot(<Cell desktopHidden />);
    global.expectSnapshot(<Cell size={3} className="a-custom-class-name" />);
  });

  it('should render correctly after a prop change', () => {
    const cell = shallow(<Cell />);
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ align: 'top' });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ align: 'middle' });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ align: 'bottom' });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ align: 'stretch' });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ align: null, position: 'center' });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ position: 'right' });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ position: null, size: 5 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ size: null, order: 3 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ order: null, offset: 1 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ offset: null, phoneSize: 1 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ phoneSize: null, phoneOffset: 1 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ phoneOffset: null, phoneOrder: 2 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ phoneOrder: null, phoneHidden: true });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ phoneHidden: false, tabletSize: 1 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ tabletSize: null, tabletOffset: 1 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ tabletOffset: null, tabletOrder: 2 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ tabletOrder: null, tabletHidden: true });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ tabletHidden: false, desktopSize: 1 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ desktopSize: null, desktopOffset: 1 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ desktopOffset: null, desktopOrder: 2 });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ desktopOrder: null, desktopHidden: true });
    expect(cell.render()).toMatchSnapshot();

    cell.setProps({ desktopHidden: false, className: 'woop-woop' });
    expect(cell.render()).toMatchSnapshot();
  });

  it('should correctly provide the style and className props in the children callback function', () => {
    const children = jest.fn((props) => <div {...props} />);
    const cell = mount(<Cell>{children}</Cell>);

    expect(cell.render()).toMatchSnapshot();
    expect(children).toBeCalledWith({ style: undefined, className: 'md-cell' });

    const style = { width: 500, background: 'red' };
    cell.setProps({ style, className: 'boop' });
    expect(cell.render()).toMatchSnapshot();
    expect(children).toBeCalledWith({ style, className: 'md-cell boop' });
  });
});
