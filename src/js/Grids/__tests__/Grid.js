/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Grid from '../Grid';

describe('Grid', () => {
  describe('getClassName', () => {
    it('should default to just md-grid if there are no options provided', () => {
      const expected = 'md-grid';
      expect(Grid.getClassName()).toBe(expected);
      expect(Grid.getClassName(undefined)).toBe(expected);
      expect(Grid.getClassName({})).toBe(expected);
    });
  });

  it('should render correctly without any props', () => {
    global.expectSnapshot(<Grid />);
    global.expectSnapshot(<Grid><span /></Grid>);
  });

  it('should render correctly with the different props applied', () => {
    global.expectSnapshot(<Grid stacked />);
    global.expectSnapshot(<Grid stacked noSpacing />);
    global.expectSnapshot(<Grid stacked noSpacing container="look-at-me" />);
    global.expectSnapshot(<Grid gutter={48} spacing={16} />);
  });

  it('should correctly update after props change', () => {
    const grid = shallow(<Grid />);
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ stacked: true });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ stacked: false, className: 'test' });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ className: null, container: 'look-at-me' });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ container: null, noSpacing: true });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ noSpacing: false, gutter: 16, spacing: 16 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ gutter: null, spacing: null });
    expect(grid.render()).toMatchSnapshot();
  });

  it('should correctly provide the style and className props in the children callback function', () => {
    const children = jest.fn((props) => <div {...props} />);
    const grid = mount(<Grid>{children}</Grid>);

    expect(grid.render()).toMatchSnapshot();
    expect(children).toBeCalledWith({ style: undefined, className: 'md-grid' });

    const style = { width: 500, background: 'red' };
    grid.setProps({ style, className: 'boop' });
    expect(grid.render()).toMatchSnapshot();
    expect(children).toBeCalledWith({ style, className: 'md-grid boop' });
  });
});
