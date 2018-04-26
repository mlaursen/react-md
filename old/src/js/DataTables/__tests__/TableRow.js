/* eslint-env jest*/
import React from 'react';
import { mount } from 'enzyme';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithTag,
} from 'react-dom/test-utils';

import DataTable from '../DataTable';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableColumn from '../TableColumn';
import TableCheckbox from '../TableCheckbox';

describe('TableRow', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const table = renderIntoDocument(
      <DataTable baseId="test">
        <TableBody>
          <TableRow style={style} className={className}>
            <TableColumn>c</TableColumn>
            <TableColumn>c</TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    );

    const tableRowNode = findRenderedDOMComponentWithTag(table, 'tr');
    expect(tableRowNode.style.display).toBe(style.display);
    expect(tableRowNode.classList.contains(className)).toBe(true);
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
      <DataTable baseId="test">
        <TableBody>
          <TableRow
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
          >
            <TableColumn>c</TableColumn>
            <TableColumn>c</TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    );

    const trNode = scryRenderedDOMComponentsWithTag(table, 'tr')[0];
    Simulate.click(trNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(trNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(trNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(trNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(trNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(trNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(trNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(trNode);
    expect(onTouchCancel).toBeCalled();
  });

  it('injects a checkbox if it is not a plain table', () => {
    let table = renderIntoDocument(
      <DataTable plain>
        <TableBody>
          <TableRow>
            <TableColumn>A</TableColumn>
            <TableColumn>B</TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    );

    let checkboxes = scryRenderedComponentsWithType(table, TableCheckbox);
    expect(checkboxes.length).toBe(0);

    table = renderIntoDocument(
      <DataTable baseId="test">
        <TableBody>
          <TableRow>
            <TableColumn>A</TableColumn>
            <TableColumn>B</TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    );

    checkboxes = scryRenderedComponentsWithType(table, TableCheckbox);
    expect(checkboxes.length).toBe(1);
  });

  it('should update the last TableColumn to set the adjusted prop to false automatically', () => {
    const table = mount(
      <DataTable baseId="wowza">
        <TableBody>
          <TableRow>
            <TableColumn>1</TableColumn>
            <TableColumn>2</TableColumn>
            <TableColumn>3</TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    );

    const columns = table.find(TableColumn);
    expect(columns.get(0).props.adjusted).toBeUndefined();
    expect(columns.get(1).props.adjusted).toBeUndefined();
    expect(columns.get(2).props.adjusted).toBe(false);
  });

  describe('_handleCheckboxClick', () => {
    it('should call the onCheckboxClick prop with the correct arguments', () => {
      const onCheckboxClick = jest.fn();
      let table = renderIntoDocument(
        <DataTable plain>
          <TableBody>
            <TableRow onCheckboxClick={onCheckboxClick}>
              <TableColumn>A</TableColumn>
              <TableColumn>B</TableColumn>
            </TableRow>
          </TableBody>
        </DataTable>
      );

      const row = findRenderedComponentWithType(table, TableRow);
      const event = { target: { checked: true } };
      row._handleCheckboxClick(true, event);
      expect(onCheckboxClick.mock.calls.length).toBe(1);
      expect(onCheckboxClick.mock.calls[0][0]).toBe(0);
      expect(onCheckboxClick.mock.calls[0][1]).toBe(true);
      expect(onCheckboxClick.mock.calls[0][2]).toEqual(event);

      const onHeaderClick = jest.fn();
      table = renderIntoDocument(
        <DataTable plain>
          <TableHeader>
            <TableRow onCheckboxClick={onHeaderClick}>
              <TableColumn>H</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow onCheckboxClick={onCheckboxClick}>
              <TableColumn>A</TableColumn>
              <TableColumn>B</TableColumn>
            </TableRow>
          </TableBody>
        </DataTable>
      );

      const [header, body] = scryRenderedComponentsWithType(table, TableRow);
      header._handleCheckboxClick(true, event);
      expect(onHeaderClick.mock.calls.length).toBe(1);
      expect(onHeaderClick.mock.calls[0][0]).toBe(0);
      expect(onHeaderClick.mock.calls[0][1]).toBe(true);
      expect(onHeaderClick.mock.calls[0][2]).toEqual(event);

      body._handleCheckboxClick(true, event);
      expect(onCheckboxClick.mock.calls.length).toBe(2);
      expect(onCheckboxClick.mock.calls[1][0]).toBe(1);
      expect(onCheckboxClick.mock.calls[1][1]).toBe(true);
      expect(onCheckboxClick.mock.calls[1][2]).toEqual(event);
    });

    it('should update the table\'s state correctly', () => {
      const table = renderIntoDocument(
        <DataTable baseId="test">
          <TableHeader>
            <TableRow>
              <TableColumn>H1</TableColumn>
              <TableColumn>H2</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableColumn>A</TableColumn>
              <TableColumn>B</TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn>A</TableColumn>
              <TableColumn>B</TableColumn>
            </TableRow>
          </TableBody>
        </DataTable>
      );

      expect(table.state.selectedRows).toEqual([false, false]);
      const [header, row1] = scryRenderedComponentsWithType(table, TableRow);
      const event = { target: { checked: true } };
      header._handleCheckboxClick(true, event);

      expect(table.state.allSelected).toBe(true);
      expect(table.state.selectedRows).toEqual([true, true]);

      const event2 = { target: { checked: false } };
      row1._handleCheckboxClick(false, event2);
      expect(table.state.allSelected).toBe(false);
      expect(table.state.selectedRows).toEqual([false, true]);
    });
  });
});
