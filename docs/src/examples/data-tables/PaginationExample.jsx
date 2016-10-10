import React, { PureComponent } from 'react';

import { FOOD_DATA_URL } from 'constants';
import { DataTable, TableBody, TableRow, TableColumn, TableHeader, TablePagination } from 'react-md/lib/DataTables';
import PaginationLoader from './PaginationLoader';

export default class PaginationExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      columns: [],
      data: [],
      start: 0,
      rowsPerPage: 10,
    };

    this._load = this._load.bind(this);
    this._handlePagination = this._handlePagination.bind(this);
  }

  _load() {
    fetch(FOOD_DATA_URL)
      .then(response => response.json())
      .then(json => {
        const { columns } = json.meta.view;
        const nonMetaCols = columns.filter(c => c.dataTypeName !== 'meta_data');
        const colDiff = columns.length - nonMetaCols.length;
        const data = json.data.map(d => {
          const formatted = {};
          nonMetaCols.forEach(({ fieldName }, i) => {
            formatted[fieldName] = d[i + colDiff];
          });

          return formatted;
        });

        nonMetaCols.sort((a, b) => a.position - b.position);
        data.sort((a, b) => a.inspection_id - b.inspection_id);

        this.setState({ columns: nonMetaCols, data, fetching: false });
      })
      .catch(error => {
        console.log('error:', error);
        this.setState({ fetching: false, error });
      });

    this.setState({ fetching: true });
  }

  _handlePagination(start, rowsPerPage) {
    this.setState({ start, rowsPerPage });
  }

  _formattedColumn(value, dataTypeName, subColumnTypes) {
    if (subColumnTypes) {
      return value.map((v, i) => `${subColumnTypes[i]}: ${v}`).join(', ');
    }

    return value;
  }

  render() {
    const { fetching, columns, data, start, rowsPerPage } = this.state;
    const headers = columns.map(({ name, fieldName, dataTypeName, description }) => (
      <TableColumn
        key={fieldName}
        numeric={dataTypeName === 'number'}
        tooltipLabel={description}
      >
        {name}
      </TableColumn>
    ));

    const rows = data.slice(start, start + rowsPerPage).map((datum, i) => (
      <TableRow key={i}>
        {columns.map(({ dataTypeName, fieldName, subColumnTypes }) => (
          <TableColumn key={fieldName} numeric={dataTypeName === 'number'}>
            {this._formattedColumn(datum[fieldName], dataTypeName, subColumnTypes)}
          </TableColumn>
      ))}
      </TableRow>
    ));

    return (
      <PaginationLoader fetching={fetching} loaded={!!data.length} onLoad={this._load}>
        <DataTable className="pagination-table" baseId="pagination">
          <TableHeader>
            <TableRow>
              {headers}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows}
          </TableBody>
          <TablePagination onPagination={this._handlePagination} rows={data.length} />
        </DataTable>
      </PaginationLoader>
    );
  }
}
