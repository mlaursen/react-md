/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import GridList from '../GridList';

describe('GridList', () => {
  describe('getClassNames', () => {
    it('should default to just md-grid if there are no options provided', () => {
      const expected = { className: 'md-grid', cellClassName: 'md-cell' };
      expect(GridList.getClassNames()).toEqual(expected);
      expect(GridList.getClassNames(undefined)).toEqual(expected);
      expect(GridList.getClassNames({})).toEqual(expected);
    });
  });

  it('should render correctly without any props', () => {
    global.expectSnapshot(<GridList />);
    global.expectSnapshot(<GridList><span /></GridList>);
  });

  it('should render correctly with the different props applied', () => {
    global.expectSnapshot(<GridList stacked />);
    global.expectSnapshot(<GridList stacked noSpacing />);
    global.expectSnapshot(<GridList stacked noSpacing container="look-at-me" />);
    global.expectSnapshot(<GridList gutter={48} spacing={16} />);
  });

  it('should correctly update after props change', () => {
    const grid = shallow(<GridList><div /></GridList>);
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

    grid.setProps({ align: 'top' });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ align: 'middle' });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ align: 'bottom' });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ align: 'stretch' });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ align: null, position: 'center' });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ position: 'right' });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ position: null, size: 5 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ size: null, order: 3 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ order: null, offset: 1 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ offset: null, phoneSize: 1 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ phoneSize: null, phoneOffset: 1 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ phoneOffset: null, phoneOrder: 2 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ phoneOrder: null, phoneHidden: true });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ phoneHidden: false, tabletSize: 1 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ tabletSize: null, tabletOffset: 1 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ tabletOffset: null, tabletOrder: 2 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ tabletOrder: null, tabletHidden: true });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ tabletHidden: false, desktopSize: 1 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ desktopSize: null, desktopOffset: 1 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ desktopOffset: null, desktopOrder: 2 });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ desktopOrder: null, desktopHidden: true });
    expect(grid.render()).toMatchSnapshot();

    grid.setProps({ desktopHidden: false, className: 'woop-woop' });
    expect(grid.render()).toMatchSnapshot();
  });

  it('should correctly provide the style and className props in the children callback function', () => {
    const children = jest.fn(({ style, className, cellStyle, cellClassName }) => (
      <div style={style} className={className}>
        <div style={cellStyle} className={cellClassName} />
      </div>
    ));
    const grid = mount(<GridList>{children}</GridList>);

    expect(grid.render()).toMatchSnapshot();
    expect(children).toBeCalledWith({
      style: undefined,
      className: 'md-grid',
      cellStyle: undefined,
      cellClassName: 'md-cell',
    });

    const style = { width: 500, background: 'red' };
    const cellStyle = { background: 'blue', height: 50 };
    grid.setProps({ style, className: 'boop', cellStyle, cellClassName: 'cell-boop' });
    expect(grid.render()).toMatchSnapshot();
    expect(children).toBeCalledWith({
      style,
      className: 'md-grid boop',
      cellStyle,
      cellClassName: 'md-cell cell-boop',
    });
  });
});
