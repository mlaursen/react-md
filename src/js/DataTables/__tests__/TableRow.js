/*eslint-env jest*/
jest.unmock('../DataTable');
jest.unmock('../TableBody');
jest.unmock('../TableRow');
jest.unmock('../TableColumn');
jest.unmock('../../Tooltips');
jest.unmock('../../Tooltips/injectTooltip');
jest.unmock('../../FontIcons');
jest.unmock('../../FontIcons/FontIcon');

import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import DataTable from '../DataTable';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableColumn from '../TableColumn';
import TableCheckbox from '../TableCheckbox';

describe('TableRow', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const table = renderIntoDocument(
      <DataTable>
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
    const onClick = jest.genMockFunction();
    const onMouseDown = jest.genMockFunction();
    const onMouseUp = jest.genMockFunction();
    const onMouseOver = jest.genMockFunction();
    const onMouseLeave = jest.genMockFunction();
    const onTouchStart = jest.genMockFunction();
    const onTouchEnd = jest.genMockFunction();
    const onTouchCancel = jest.genMockFunction();

    const table = renderIntoDocument(
      <DataTable>
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
      <DataTable plain={true}>
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
      <DataTable>
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
});
