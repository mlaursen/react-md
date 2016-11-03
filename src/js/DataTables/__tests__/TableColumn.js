/* eslint-env jest*/
/* eslint-disable react/prop-types,react/prefer-stateless-function */
jest.unmock('../TableColumn');

import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

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
});
