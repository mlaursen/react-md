/* eslint-env jest*/
/* eslint-disable react/prop-types,react/prefer-stateless-function */
import React from 'react';
import { mount } from 'enzyme';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} from 'react-dom/test-utils';

import DataTable from '../DataTable';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import TableFooter from '../TableFooter';
import TableRow from '../TableRow';
import TableColumn from '../TableColumn';

// need valid table nesting
class Table extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            {this.props.children}
            <TableColumn>dummy</TableColumn>
          </tr>
        </tbody>
      </table>
    );
  }
}

describe('TableColumn', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const table = renderIntoDocument(
      <Table>
        <TableColumn style={style} className={className}>A</TableColumn>
      </Table>
    );

    const tableColumnNode = scryRenderedDOMComponentsWithTag(table, 'td')[0];
    expect(tableColumnNode.style.display).toBe(style.display);
    expect(tableColumnNode.classList.contains(className)).toBe(true);
  });

  it('applies the correct event listeners', () => {
    const onClick = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();

    const table = renderIntoDocument(
      <Table>
        <TableColumn
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchCancel}
        >
          c
        </TableColumn>
      </Table>
    );

    const tableColumnNode = scryRenderedDOMComponentsWithTag(table, 'td')[0];
    Simulate.click(tableColumnNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(tableColumnNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(tableColumnNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(tableColumnNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(tableColumnNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(tableColumnNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(tableColumnNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(tableColumnNode);
    expect(onTouchCancel).toBeCalled();
  });

  it('renders as a th tag if the header props is true', () => {
    const table = renderIntoDocument(
      <Table>
        <TableColumn header>A</TableColumn>
      </Table>
    );

    const ths = scryRenderedDOMComponentsWithTag(table, 'th');
    expect(ths.length).toBe(1);
  });

  it('should apply the correct class names', () => {
    let table = mount(
      <table>
        <thead>
          <tr>
            <TableColumn header>Woop</TableColumn>
          </tr>
        </thead>
      </table>
    );

    let column = table.find(TableColumn).find('th');
    expect(column.hasClass('md-table-column')).toBe(true);
    expect(column.hasClass('md-table-column--header')).toBe(true);
    expect(column.hasClass('md-table-column--data')).toBe(false);
    expect(column.hasClass('md-table-column--plain')).toBe(false);
    expect(column.hasClass('md-table-column--adjusted')).toBe(true);
    expect(column.hasClass('md-table-column--grow')).toBe(false);
    expect(column.hasClass('md-table-column--sortable')).toBe(false);
    expect(column.hasClass('md-table-column--relative')).toBe(false);
    expect(column.hasClass('md-table-column--select-field')).toBe(false);
    expect(column.hasClass('md-text')).toBe(false);
    expect(column.hasClass('md-text--secondary')).toBe(true);
    expect(column.hasClass('md-text-left')).toBe(true);
    expect(column.hasClass('md-text-right')).toBe(false);

    table = mount(
      <table>
        <tbody>
          <tr>
            <TableColumn>Woop</TableColumn>
          </tr>
        </tbody>
      </table>
    );
    column = table.find(TableColumn).find('td');

    expect(column.hasClass('md-table-column--header')).toBe(false);
    expect(column.hasClass('md-table-column--data')).toBe(true);
    expect(column.hasClass('md-text')).toBe(true);
    expect(column.hasClass('md-text--secondary')).toBe(false);

    table = mount(
      <table>
        <tbody>
          <tr>
            <TableColumn grow tooltipLabel="Woop" numeric>3</TableColumn>
          </tr>
        </tbody>
      </table>
    );
    column = table.find(TableColumn).find('td');

    expect(column.hasClass('md-table-column--adjusted')).toBe(false);
    expect(column.hasClass('md-table-column--grow')).toBe(true);
    expect(column.hasClass('md-table-column--relative')).toBe(true);
    expect(column.hasClass('md-text-left')).toBe(false);
    expect(column.hasClass('md-text-right')).toBe(true);

    table = mount(
      <table>
        <tbody>
          <tr>
            <TableColumn plain>Hello, World</TableColumn>
          </tr>
        </tbody>
      </table>
    );
    column = table.find(TableColumn).find('td');
    expect(column.hasClass('md-table-column--header')).toBe(false);
    expect(column.hasClass('md-table-column--data')).toBe(false);
    expect(column.hasClass('md-table-column--plain')).toBe(true);

    table = mount(
      <table>
        <tbody>
          <tr>
            <TableColumn sorted>Hello, World</TableColumn>
          </tr>
        </tbody>
      </table>
    );
    column = table.find(TableColumn).find('td');
    expect(column.hasClass('md-table-column--sortable')).toBe(true);
  });

  it('should apply the correct aria-sort when sortable', () => {
    let table = mount(
      <table>
        <thead>
          <tr>
            <TableColumn>Hello, World</TableColumn>
          </tr>
        </thead>
      </table>
    );
    expect(table.find('td').at(0).props()['aria-sort']).toBeUndefined();

    table = mount(
      <table>
        <thead>
          <tr>
            <TableColumn sorted>Hello, World</TableColumn>
          </tr>
        </thead>
      </table>
    );
    expect(table.find('td').at(0).props()['aria-sort']).toBe('ascending');

    table = mount(
      <table>
        <thead>
          <tr>
            <TableColumn sorted={false}>Hello, World</TableColumn>
          </tr>
        </thead>
      </table>
    );
    expect(table.find('td').at(0).props()['aria-sort']).toBe('descending');
  });

  it('should correctly apply the col scope when header prop is enabled', () => {
    let table = mount(
      <table>
        <thead>
          <tr>
            <TableColumn header>Hello, World</TableColumn>
          </tr>
        </thead>
      </table>
    );
    expect(table.find('th').at(0).props().scope).toBe('col');

    table = mount(
      <table>
        <tbody>
          <tr>
            <TableColumn>Hello, World</TableColumn>
          </tr>
        </tbody>
      </table>
    );
    expect(table.find('td').at(0).props().scope).toBeUndefined();
  });

  it('should update the classname when the DataTable is fixed only for the header or footer', () => {
    const table = mount(
      <DataTable baseId="woop" fixedHeader fixedFooter>
        <TableHeader>
          <TableRow>
            <TableColumn id="head" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableColumn id="body" />
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableColumn id="foot" />
          </TableRow>
        </TableFooter>
      </DataTable>
    );

    const columns = table.find(TableColumn);
    expect(columns.length).toBe(3);
    expect(columns.at(0).find('th').hasClass('md-table-column--fixed')).toBe(true);
    expect(columns.at(1).find('td').hasClass('md-table-column--fixed')).toBe(false);
    expect(columns.at(2).find('td').hasClass('md-table-column--fixed')).toBe(true);
  });

  it('should create 2 additional divs for fixed columns', () => {
    const table = mount(
      <DataTable baseId="woop" fixedHeader fixedFooter>
        <TableHeader>
          <TableRow>
            <TableColumn id="head" />
          </TableRow>
        </TableHeader>
      </DataTable>
    );

    const col = table.find(TableColumn);
    expect(col.find('.md-table-column__fixed').length).toBe(1);
    expect(col.find('.md-table-column__fixed--header').length).toBe(1);
    expect(col.find('.md-table-column__fixed--flex').length).toBe(1);
  });
});
