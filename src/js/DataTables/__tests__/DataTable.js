/* eslint-env jest*/
/* eslint-disable react/no-multi-comp */
jest.unmock('../DataTable');
jest.unmock('../TableHeader');
jest.unmock('../TableBody');
jest.unmock('../TableRow');
jest.unmock('../TableColumn');
jest.unmock('../TableCheckbox');
jest.unmock('../findTable');

import React from 'react';
import { mount } from 'enzyme';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import DataTable from '../DataTable';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableColumn from '../TableColumn';

describe('DataTable', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const table = renderIntoDocument(
      <DataTable style={style} className={className} baseId="woop"><tbody><tr><td>c</td></tr></tbody></DataTable>
    );

    const tableNode = findRenderedDOMComponentWithTag(table, 'table');
    expect(tableNode.style.display).toBe(style.display);
    expect(tableNode.className).toContain(className);
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
    expect(tableNode.className).toBe('md-data-table--responsive');
    expect(tableNode.nodeName).toBe('DIV');

    props.responsive = false;
    table = renderIntoDocument(<DataTable {...props} />);
    tableNode = findDOMNode(table);
    expect(tableNode.className).toBe('md-data-table');
    expect(tableNode.nodeName).toBe('TABLE');
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

    const findTableState = (table) => table.find(DataTable).get(0).state;
    const table = mount(<Test />);
    let state = findTableState(table);
    let expected = [false, false];
    expect(state.selectedRows).toEqual(expected);

    table.find(DataTable).get(0).setState({ selectedRows: [false, true] });
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
    const findTableState = (table) => table.find(DataTable).get(0).state;
    const table = mount(<Test />);
    let state = findTableState(table);
    let expected = [false, false, false, false, false, false];
    expect(state.selectedRows).toEqual(expected);

    // Check row 3, 5, and 6
    expected = [false, false, true, false, true, true];
    table.find(DataTable).get(0).setState({ selectedRows: expected });
    state = findTableState(table);
    expect(state.selectedRows).toEqual(expected);


    // Remove the "checked" rows
    table.setState({ rows: ['row-1', 'row-2', 'row-4'] });
    state = findTableState(table);
    expected = [false, false, false];
    expect(state.selectedRows).toEqual(expected);
  });
});
