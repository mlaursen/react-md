/* eslint-env jest*/
/* eslint-disable react/no-multi-comp,max-len */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-dom/test-utils';

import DataTable from '../DataTable';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableColumn from '../TableColumn';

class Body extends React.Component {
  render() {
    return (
      <tbody>
        <tr>
          <td />
        </tr>
      </tbody>
    );
  }
}

describe('DataTable', () => {
  it('should wrap the table in a responsive container by default', () => {
    const wrapper = shallow(<DataTable baseId="test"><Body /></DataTable>);
    expect(wrapper.hasClass('md-data-table--responsive')).toBe(true);

    wrapper.setProps({ responsive: true });
    expect(wrapper.hasClass('md-data-table--responsive')).toBe(true);

    wrapper.setProps({ responsive: false });
    expect(wrapper.hasClass('md-data-table--responsive')).toBe(false);
  });

  it('should merge style and className correctly based on the responsive prop', () => {
    const props = {
      baseId: 'test-table',
      style: { background: 'red' },
      className: 'test-1',
      tableStyle: { background: 'orange' },
      tableClassName: 'test-2',
      responsive: true,
    };

    const wrapper = shallow(<DataTable {...props}><Body /></DataTable>);
    let table = wrapper.find('table');
    expect(wrapper.hasClass(props.className)).toBe(true);
    expect(table.hasClass(props.tableClassName)).toBe(true);

    wrapper.setProps({ responsive: false });
    table = wrapper.find('table');
    expect(table.hasClass(props.className)).toBe(true);
    expect(wrapper.hasClass(props.className)).toBe(true);
  });

  it('adds any event listeners', () => {
    const onClick = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();

    const table = renderIntoDocument(
      <DataTable
        baseId="woop"
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      >
        <tbody><tr><td>c</td></tr></tbody>
      </DataTable>
    );

    const tableNode = findRenderedDOMComponentWithTag(table, 'table');
    Simulate.click(tableNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(tableNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(tableNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(tableNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(tableNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(tableNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(tableNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(tableNode);
    expect(onTouchCancel).toBeCalled();
  });

  it('wraps the table in a responsive container when the responsive prop is true', () => {
    const props = {
      baseId: 'woop',
      responsive: true,
      children: <tbody><tr><td>C</td></tr></tbody>,
    };
    let table = renderIntoDocument(<DataTable {...props} />);
    let tableNode = findDOMNode(table);
    expect(tableNode.className).toContain('md-data-table--responsive');
    expect(tableNode.nodeName).toBe('DIV');

    props.responsive = false;
    table = renderIntoDocument(<DataTable {...props} />);
    tableNode = findDOMNode(table);
    expect(tableNode.className).toContain('md-data-table');
    expect(tableNode.nodeName).toBe('TABLE');
  });

  describe('_toggleSelectedRow', () => {
    it('should correctly toggle all rows when the row is 0 and a header exists', () => {
      const table = renderIntoDocument(
        <DataTable baseId="woop">
          <thead>
            <tr>
              <th>Wow!</th>
            </tr>
          </thead>
          <TableBody>
            <TableRow>
              <TableColumn>Wow!</TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn>No Way!</TableColumn>
            </TableRow>
          </TableBody>
        </DataTable>
      );

      table._toggleSelectedRow(0, true, { target: { checked: true } });
      expect(table.state.selectedRows).toEqual([true, true]);
    });

    it('should only toggle a single row when the row is 0 and a header does not exist', () => {
      const table = renderIntoDocument(
        <DataTable baseId="woop">
          <TableBody>
            <TableRow>
              <TableColumn>No Way!</TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn>What a save!</TableColumn>
            </TableRow>
          </TableBody>
        </DataTable>
      );

      table._toggleSelectedRow(0, false, { target: { checked: true } });
      expect(table.state.selectedRows).toEqual([true, false]);
    });

    it('should call the onRowToggle prop with the correct arguments', () => {
      const onRowToggle = jest.fn();
      let table = renderIntoDocument(
        <DataTable baseId="woop" onRowToggle={onRowToggle}>
          <thead>
            <tr>
              <th>Wow!</th>
            </tr>
          </thead>
          <TableBody>
            <TableRow>
              <TableColumn>No Way!</TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn>What a save!</TableColumn>
            </TableRow>
          </TableBody>
        </DataTable>
      );

      const event = { target: { checked: true } };
      table._toggleSelectedRow(0, true, event);
      expect(onRowToggle.mock.calls.length).toBe(1);
      expect(onRowToggle.mock.calls[0][0]).toBe(0);
      expect(onRowToggle.mock.calls[0][1]).toBe(true);
      expect(onRowToggle.mock.calls[0][2]).toBe(2);
      expect(onRowToggle.mock.calls[0][3]).toEqual(event);

      table = renderIntoDocument(
        <DataTable baseId="woop" onRowToggle={onRowToggle}>
          <tbody>
            <tr>
              <td>No way!</td>
            </tr>
            <tr>
              <td>What a save!</td>
            </tr>
          </tbody>
        </DataTable>
      );

      table._toggleSelectedRow(0, false, event);
      expect(onRowToggle.mock.calls.length).toBe(2);
      expect(onRowToggle.mock.calls[1][0]).toBe(0);
      expect(onRowToggle.mock.calls[1][1]).toBe(true);
      expect(onRowToggle.mock.calls[1][2]).toBe(1);
      expect(onRowToggle.mock.calls[1][3]).toEqual(event);
    });
  });

  it('should correctly initialize the checkbox state', () => {
    const table = mount(
      <DataTable baseId="test">
        <TableHeader>
          <TableRow>
            <TableColumn />
            <TableColumn />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableColumn />
            <TableColumn />
          </TableRow>
          <TableRow>
            <TableColumn />
            <TableColumn />
          </TableRow>
        </TableBody>
      </DataTable>
    );

    expect(table.state('selectedRows')).toEqual([false, false]);
  });

  it('should correctly update the checkbox state when new rows are added', () => {
    class Test extends React.Component {
      state = { rowCount: 2 };
      render() {
        const rows = [...new Array(this.state.rowCount)].map((_, i) => (
          <TableRow key={i}>
            <TableColumn />
            <TableColumn />
          </TableRow>
        ));

        return (
          <DataTable baseId="test">
            <TableHeader>
              <TableRow>
                <TableColumn />
                <TableColumn />
              </TableRow>
            </TableHeader>
            <TableBody>{rows}</TableBody>
          </DataTable>
        );
      }
    }

    const findTableState = (table) => table.find(DataTable).instance().state;
    const table = mount(<Test />);
    let state = findTableState(table);
    let expected = [false, false];
    expect(state.selectedRows).toEqual(expected);

    table.find(DataTable).instance().setState({ selectedRows: [false, true] });
    expected = [false, true];
    state = findTableState(table);
    expect(state.selectedRows).toEqual(expected);

    table.setState({ rowCount: 8 });
    state = findTableState(table);
    expected = [false, true, false, false, false, false, false, false];
    expect(state.selectedRows).toEqual(expected);
  });

  it('should correctly update the checkbox state when rows are removed', () => {
    class Test extends React.Component {
      state = { rows: ['row-1', 'row-2', 'row-3', 'row-4', 'row-5', 'row-6'] };
      render() {
        const rows = this.state.rows.map((key) => (
          <TableRow key={key}>
            <TableColumn />
            <TableColumn />
          </TableRow>
        ));

        return (
          <DataTable baseId="test">
            <TableHeader>
              <TableRow>
                <TableColumn />
                <TableColumn />
              </TableRow>
            </TableHeader>
            <TableBody>{rows}</TableBody>
          </DataTable>
        );
      }
    }
    const findTableState = (table) => table.find(DataTable).instance().state;
    const table = mount(<Test />);
    let state = findTableState(table);
    let expected = [false, false, false, false, false, false];
    expect(state.selectedRows).toEqual(expected);

    // Check row 3, 5, and 6
    expected = [false, false, true, false, true, true];
    table.find(DataTable).instance().setState({ selectedRows: expected });
    state = findTableState(table);
    expect(state.selectedRows).toEqual(expected);


    // Remove the "checked" rows
    table.setState({ rows: ['row-1', 'row-2', 'row-4'] });
    state = findTableState(table);
    expected = [false, false, false];
    expect(state.selectedRows).toEqual(expected);
  });

  it('should add additional wrappers when either the fixedHeader or fixedFooter prop has been enabled.', () => {
    const table = shallow(
      <DataTable baseId="woop" fixedHeader>
        <tbody><tr><td>woop</td></tr></tbody>
      </DataTable>
    );

    expect(table.hasClass('md-data-table--responsive')).toBe(true);
    expect(table.hasClass('md-data-table--fixed')).toBe(true);

    expect(table.find('.md-data-table__fixed-wrapper').length).toBe(1);
    expect(table.find('.md-data-table__scroll-wrapper').length).toBe(1);
  });

  it('should add the divider borders to the scroll wrapper when enabled', () => {
    const table = shallow(
      <DataTable baseId="woop" fixedHeader fixedFooter>
        <tbody><tr><td>woop</td></tr></tbody>
      </DataTable>
    );

    expect(table.find('.md-divider-border').length).toBe(1);
    expect(table.find('.md-divider-border--top').length).toBe(1);
    expect(table.find('.md-divider-border--bottom').length).toBe(1);

    table.setProps({ fixedFooter: false });
    expect(table.find('.md-divider-border').length).toBe(1);
    expect(table.find('.md-divider-border--top').length).toBe(1);
    expect(table.find('.md-divider-border--bottom').length).toBe(0);

    table.setProps({ fixedHeader: false, fixedFooter: true });
    expect(table.find('.md-divider-border').length).toBe(1);
    expect(table.find('.md-divider-border--top').length).toBe(0);
    expect(table.find('.md-divider-border--bottom').length).toBe(1);

    table.setProps({ fixedHeader: false, fixedFooter: false });
    expect(table.find('.md-divider-border').length).toBe(0);
    expect(table.find('.md-divider-border--top').length).toBe(0);
    expect(table.find('.md-divider-border--bottom').length).toBe(0);
  });

  it('should not apply the divider class names when the fixedDividers prop is set to false', () => {
    const table = shallow(
      <DataTable baseId="woop" fixedHeader fixedFooter fixedDividers={false}>
        <tbody><tr><td>woop</td></tr></tbody>
      </DataTable>
    );
    expect(table.find('.md-divider-border').length).toBe(0);
    expect(table.find('.md-divider-border--top').length).toBe(0);
    expect(table.find('.md-divider-border--bottom').length).toBe(0);
  });

  it('should not apply the divider classNames when the fixedDividers prop is set to false for either header or footer', () => {
    const table = shallow(
      <DataTable baseId="woop" fixedHeader fixedFooter fixedDividers={{ header: true, footer: false }}>
        <tbody><tr><td>woop</td></tr></tbody>
      </DataTable>
    );
    expect(table.find('.md-divider-border').length).toBe(1);
    expect(table.find('.md-divider-border--top').length).toBe(1);
    expect(table.find('.md-divider-border--bottom').length).toBe(0);

    table.setProps({ fixedDividers: { header: false, footer: true } });
    expect(table.find('.md-divider-border').length).toBe(1);
    expect(table.find('.md-divider-border--top').length).toBe(0);
    expect(table.find('.md-divider-border--bottom').length).toBe(1);

    table.setProps({ fixedDividers: { header: undefined, footer: true } });
    expect(table.find('.md-divider-border').length).toBe(1);
    expect(table.find('.md-divider-border--top').length).toBe(1);
    expect(table.find('.md-divider-border--bottom').length).toBe(1);

    table.setProps({ fixedDividers: { header: true, footer: undefined } });
    expect(table.find('.md-divider-border').length).toBe(1);
    expect(table.find('.md-divider-border--top').length).toBe(1);
    expect(table.find('.md-divider-border--bottom').length).toBe(1);
  });

  it('should apply the fixedWidth to the main responsive wrapper', () => {
    const table = mount(
      <DataTable baseId="woop" fixedHeader fixedFooter fixedWidth={300}>
        <tbody><tr><td>woop</td></tr></tbody>
      </DataTable>
    );

    expect(table.getDOMNode().style.width).toBe('300px');
  });

  it('should apply the fixedHeight prop to the scroll container and correctly subtract the header and footer if enabled', () => {
    const headerHeight = 50;
    const footerHeight = 40;
    const table = mount(
      <DataTable baseId="woop" fixedHeader fixedFooter fixedHeight={500} headerHeight={headerHeight} footerHeight={footerHeight}>
        <tbody><tr><td>woop</td></tr></tbody>
      </DataTable>
    );

    const getHeight = (t) => t.find('.md-data-table__scroll-wrapper').instance().style.height;

    let height = getHeight(table);
    expect(height).toBe('410px');

    table.setProps({ fixedFooter: false });
    height = getHeight(table);
    expect(height).toBe('450px');

    table.setProps({ fixedFooter: true, fixedHeader: false });
    height = getHeight(table);
    expect(height).toBe('460px');
  });
});
