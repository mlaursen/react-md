/*eslint-env jest*/
jest.unmock('../DataTable');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import DataTable from '../DataTable';

describe('DataTable', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    // added c to make required children prop happy
    const table = renderIntoDocument(
      <DataTable style={style} className={className}>c</DataTable>
    );

    const tableNode = findRenderedDOMComponentWithTag(table, 'table');
    expect(tableNode.style.display).toBe(style.display);
    expect(tableNode.classList.contains(className)).toBe(true);
  });

  it('adds any event listeners', () => {
    const onClick = jest.genMockFunction();
    const onMouseDown = jest.genMockFunction();
    const onMouseUp = jest.genMockFunction();
    const onMouseOver = jest.genMockFunction();
    const onMouseLeave = jest.genMockFunction();
    const onTouchStart = jest.genMockFunction();
    const onTouchEnd = jest.genMockFunction();
    const onTouchCancel = jest.genMockFunction();

    const table = renderIntoDocument(
      <DataTable
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        children="c"
      />
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
    let table = renderIntoDocument(<DataTable>c</DataTable>);
    let tableNode = findDOMNode(table);
    expect(tableNode.className).toBe('md-data-table-container');
    expect(tableNode.nodeName).toBe('DIV');

    table = renderIntoDocument(<DataTable responsive={false}>c</DataTable>);
    tableNode = findDOMNode(table);
    expect(tableNode.className).toBe('md-data-table');
    expect(tableNode.nodeName).toBe('TABLE');
  });
});
