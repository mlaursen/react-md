/* eslint-env jest*/
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
});
