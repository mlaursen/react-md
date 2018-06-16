/* eslint-env jest */
/* eslint-disable react/prop-types,max-len,react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-dom/test-utils';
import { mount } from 'enzyme';

import TablePagination from '../TablePagination';

class Table extends React.Component {
  static childContextTypes = {
    baseId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  }

  getChildContext() {
    return { baseId: 'testing' };
  }

  render() {
    return <table>{this.props.children}</table>;
  }
}

describe('TablePagination', () => {
  it('should not define a page state if the page prop is defined', () => {
    const props = { onPagination: jest.fn(), page: 1, rows: 30 };
    const table = mount(<Table><TablePagination {...props} /></Table>);
    const pagination = table.find(TablePagination).instance();
    expect(pagination.state.page).toBeUndefined();
  });

  it('should set the page state to the defaultPage prop', () => {
    const props = { onPagination: jest.fn(), defaultPage: 1, rows: 30 };
    const table = mount(<Table><TablePagination {...props} /></Table>);
    const pagination = table.find(TablePagination).instance();
    expect(pagination.state.page).toBe(props.defaultPage);
  });

  it('should not define a rowsPerPage state if the rowsPerPage prop is defined', () => {
    const props = { onPagination: jest.fn(), rowsPerPage: 10, rows: 30 };
    const table = mount(<Table><TablePagination {...props} /></Table>);
    const pagination = table.find(TablePagination).instance();
    expect(pagination.state.rowsPerPage).toBeUndefined();
  });

  it('should set the rowsPerPage state to the defaultRowsPerPage prop', () => {
    const props = { onPagination: jest.fn(), defaultRowsPerPage: 10, rows: 30 };
    const table = mount(<Table><TablePagination {...props} /></Table>);
    const pagination = table.find(TablePagination).instance();
    expect(pagination.state.rowsPerPage).toBe(props.defaultRowsPerPage);
  });

  describe('setRowsPerPage', () => {
    it('should call the onPagination prop with the correct values when uncontrolled', () => {
      const onPagination = jest.fn();
      const props = { rows: 1000, onPagination };
      const table = renderIntoDocument(<Table><TablePagination {...props} /></Table>);
      const pagination = findRenderedComponentWithType(table, TablePagination);

      pagination._setRowsPerPage(30);
      expect(onPagination.mock.calls.length).toBe(1);
      expect(onPagination.mock.calls[0][0]).toBe(0);
      expect(onPagination.mock.calls[0][1]).toBe(30);
      expect(onPagination.mock.calls[0][2]).toBe(TablePagination.defaultProps.defaultPage);
    });

    it('should call the onPagination prop with the correct values uncontrolled and different default props', () => {
      const onPagination = jest.fn();
      const props = { rows: 1000, onPagination, defaultPage: 5 };
      const table = renderIntoDocument(<Table><TablePagination {...props} /></Table>);
      const pagination = findRenderedComponentWithType(table, TablePagination);

      pagination._setRowsPerPage(30);
      expect(onPagination.mock.calls[0][0]).toBe(0);
      expect(onPagination.mock.calls[0][1]).toBe(30);
      expect(onPagination.mock.calls[0][2]).toBe(1);
    });

    it('should call the onPagination prop with the correct values when controlled', () => {
      const onPagination = jest.fn();
      const props = { rows: 10000, onPagination, page: 20, rowsPerPage: 10 };
      const table = renderIntoDocument(<Table><TablePagination {...props} /></Table>);
      const pagination = findRenderedComponentWithType(table, TablePagination);

      pagination._setRowsPerPage(50);
      expect(onPagination.mock.calls[0][0]).toBe(0);
      expect(onPagination.mock.calls[0][1]).toBe(50);
      expect(onPagination.mock.calls[0][2]).toBe(1);
    });

    it('should not update the start state if the page prop is defined', () => {
      const props = {
        rows: 1000,
        onPagination: jest.fn(),
        page: 2,
      };

      const table = mount(<Table><TablePagination {...props} /></Table>);
      const pagination = table.find(TablePagination).instance();
      expect(pagination.state.start).toBe(10);

      pagination._setRowsPerPage(30);
      expect(pagination.state.start).toBe(10);
    });
  });

  describe('increment', () => {
    it('should call the onPagination prop with the correct values when uncontrolled', () => {
      const onPagination = jest.fn();
      const props = { rows: 1000, onPagination };
      const table = renderIntoDocument(<Table><TablePagination {...props} /></Table>);
      const pagination = findRenderedComponentWithType(table, TablePagination);

      pagination._increment();
      expect(onPagination.mock.calls.length).toBe(1);
      expect(onPagination.mock.calls[0][0]).toBe(10);
      expect(onPagination.mock.calls[0][1]).toBe(TablePagination.defaultProps.defaultRowsPerPage);
      expect(onPagination.mock.calls[0][2]).toBe(2);
    });

    it('should call the onPagination prop with the correct values when uncontrolled with different default props', () => {
      const onPagination = jest.fn();
      const props = { rows: 1000, onPagination, defaultPage: 5, defaultRowsPerPage: 30 };
      const table = renderIntoDocument(<Table><TablePagination {...props} /></Table>);
      const pagination = findRenderedComponentWithType(table, TablePagination);

      pagination._increment();
      expect(onPagination.mock.calls.length).toBe(1);
      expect(onPagination.mock.calls[0][0]).toBe(150);
      expect(onPagination.mock.calls[0][1]).toBe(props.defaultRowsPerPage);
      expect(onPagination.mock.calls[0][2]).toBe(6);
    });

    it('should call the onPagination prop with the correct values when controlled', () => {
      const onPagination = jest.fn();
      const props = { rows: 1000, onPagination, page: 5, rowsPerPage: 30 };
      const table = renderIntoDocument(<Table><TablePagination {...props} /></Table>);
      const pagination = findRenderedComponentWithType(table, TablePagination);

      pagination._increment();
      expect(onPagination.mock.calls.length).toBe(1);
      expect(onPagination.mock.calls[0][0]).toBe(150);
      expect(onPagination.mock.calls[0][1]).toBe(props.rowsPerPage);
      expect(onPagination.mock.calls[0][2]).toBe(6);
    });

    it('should not update the start state if the page prop is defined', () => {
      const props = {
        rows: 1000,
        onPagination: jest.fn(),
        page: 2,
      };

      const table = mount(<Table><TablePagination {...props} /></Table>);
      const pagination = table.find(TablePagination).instance();
      expect(pagination.state.start).toBe(10);

      pagination._increment();
      expect(pagination.state.start).toBe(10);
    });
  });

  describe('decrement', () => {
    it('should call the onPagination prop with the correct values when uncontrolled', () => {
      const onPagination = jest.fn();
      const props = { rows: 1000, onPagination, defaultPage: 2 };
      const table = renderIntoDocument(<Table><TablePagination {...props} /></Table>);
      const pagination = findRenderedComponentWithType(table, TablePagination);

      pagination._decrement();
      expect(onPagination.mock.calls.length).toBe(1);
      expect(onPagination.mock.calls[0][0]).toBe(0);
      expect(onPagination.mock.calls[0][1]).toBe(TablePagination.defaultProps.defaultRowsPerPage);
      expect(onPagination.mock.calls[0][2]).toBe(1);
    });

    it('should call the onPagination prop with the correct values when uncontrolled with different default props', () => {
      const onPagination = jest.fn();
      const props = { rows: 1000, onPagination, defaultPage: 5, defaultRowsPerPage: 30 };
      const table = renderIntoDocument(<Table><TablePagination {...props} /></Table>);
      const pagination = findRenderedComponentWithType(table, TablePagination);

      pagination._decrement();
      expect(onPagination.mock.calls.length).toBe(1);
      expect(onPagination.mock.calls[0][0]).toBe(90);
      expect(onPagination.mock.calls[0][1]).toBe(props.defaultRowsPerPage);
      expect(onPagination.mock.calls[0][2]).toBe(4);
    });

    it('should call the onPagination prop with the correct values when controlled', () => {
      const onPagination = jest.fn();
      const props = { rows: 1000, onPagination, page: 5, rowsPerPage: 30 };
      const table = renderIntoDocument(<Table><TablePagination {...props} /></Table>);
      const pagination = findRenderedComponentWithType(table, TablePagination);

      pagination._decrement();
      expect(onPagination.mock.calls.length).toBe(1);
      expect(onPagination.mock.calls[0][0]).toBe(90);
      expect(onPagination.mock.calls[0][1]).toBe(props.rowsPerPage);
      expect(onPagination.mock.calls[0][2]).toBe(4);
    });

    it('should not update the start state if the page prop is defined', () => {
      const props = {
        rows: 1000,
        onPagination: jest.fn(),
        page: 2,
      };

      const table = mount(<Table><TablePagination {...props} /></Table>);
      const pagination = table.find(TablePagination).instance();
      expect(pagination.state.start).toBe(10);

      pagination._decrement();
      expect(pagination.state.start).toBe(10);
    });
  });

  it('should update the start state if the page or rowsPerPage prop changes', () => {
    const onPagination = jest.fn();
    const rowsPerPageItems = [1, 2, 3];

    class TestTable extends React.Component {
      state = {
        page: 3,
        rowsPerPage: 1,
      };

      render() {
        return (
          <Table>
            <TablePagination
              onPagination={onPagination}
              page={this.state.page}
              rows={1000}
              rowsPerPage={this.state.rowsPerPage}
              rowsPerPageItems={rowsPerPageItems}
            />
          </Table>
        );
      }
    }

    const test = mount(<TestTable />);
    let pagination = test.find(TablePagination).instance();
    expect(pagination.state.start).toBe(2);

    test.setState({ page: 1 });
    pagination = test.find(TablePagination).instance();
    expect(pagination.state.start).toBe(0);
  });
});
