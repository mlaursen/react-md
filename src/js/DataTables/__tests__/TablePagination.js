/* eslint-env jest */
/* eslint-disable react/prop-types,max-len */
jest.unmock('../TablePagination');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import TablePagination from '../TablePagination';

class Table extends React.Component {
  static childContextTypes = {
    baseId: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
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
      expect(onPagination.mock.calls[0][0]).toBe(120);
      expect(onPagination.mock.calls[0][1]).toBe(30);
      expect(onPagination.mock.calls[0][2]).toBe(props.defaultPage);
    });

    it('should call the onPagination prop with the correct values when controlled', () => {
      const onPagination = jest.fn();
      const props = { rows: 10000, onPagination, page: 20, rowsPerPage: 10 };
      const table = renderIntoDocument(<Table><TablePagination {...props} /></Table>);
      const pagination = findRenderedComponentWithType(table, TablePagination);

      pagination._setRowsPerPage(50);
      expect(onPagination.mock.calls[0][0]).toBe(950);
      expect(onPagination.mock.calls[0][1]).toBe(50);
      expect(onPagination.mock.calls[0][2]).toBe(20);
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
  });
});
