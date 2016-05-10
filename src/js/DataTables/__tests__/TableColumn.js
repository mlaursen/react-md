/*eslint-env jest*/
/*eslint-disable react/prop-types*/
jest.unmock('../DataTable');
jest.unmock('../TableBody');
jest.unmock('../TableRow');
jest.unmock('../TableColumn');
jest.unmock('../../Tooltips');
jest.unmock('../../Tooltips/injectTooltip');
jest.unmock('../../FontIcons');
jest.unmock('../../FontIcons/FontIcon');

import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import DataTable from '../DataTable';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableColumn from '../TableColumn';
import FontIcon from '../../FontIcons/FontIcon';

// need valid table nesting
class Table extends React.Component {
  render() {
    return (
      <DataTable>
        <TableBody>
          <TableRow>
            {this.props.children}
            <td>dummy</td>
          </TableRow>
        </TableBody>
      </DataTable>
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
    const onClick = jest.genMockFunction();
    const onMouseDown = jest.genMockFunction();
    const onMouseUp = jest.genMockFunction();
    const onMouseOver = jest.genMockFunction();
    const onMouseLeave = jest.genMockFunction();
    const onTouchStart = jest.genMockFunction();
    const onTouchEnd = jest.genMockFunction();
    const onTouchCancel = jest.genMockFunction();

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
          children="c"
        />
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
        <TableColumn header={true}>A</TableColumn>
      </Table>
    );

    const ths = scryRenderedDOMComponentsWithTag(table, 'th');
    expect(ths.length).toBe(1);
  });

  it('injects a sorting icon if it sorted prop is defined as a boolean', () => {
    const table = renderIntoDocument(
      <Table>
        <TableColumn sorted={true}>c</TableColumn>
      </Table>
    );

    const icons = scryRenderedComponentsWithType(table, FontIcon);
    expect(icons.length).toBe(1);

    const icon = findDOMNode(icons[0]);
    expect(icon.classList.contains('material-icons')).toBe(true);
    expect(icon.textContent).toBe('arrow_upward');
  });

  it('adds a the flipped className to the sort icon when the sorted prop is false', () => {
    let table = renderIntoDocument(
      <Table>
        <TableColumn sorted={false}>c</TableColumn>
      </Table>
    );

    let icons = scryRenderedComponentsWithType(table, FontIcon);
    expect(icons.length).toBe(1);

    let icon = findDOMNode(icons[0]);
    expect(icon.classList.contains('flipped')).toBe(true);

    table = renderIntoDocument(
      <Table>
        <TableColumn sorted={true}>c</TableColumn>
      </Table>
    );

    icons = scryRenderedComponentsWithType(table, FontIcon);
    expect(icons.length).toBe(1);

    icon = findDOMNode(icons[0]);
    expect(icon.classList.contains('flipped')).toBe(false);
  });
});
