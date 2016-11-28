import React, { PureComponent, PropTypes } from 'react';
import loremIpsum from 'lorem-ipsum';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TablePagination from 'react-md/lib/DataTables/TablePagination';

const LOREM_ROWS = [...new Array(1000)].map((_, i) => (
  <TableRow key={i}>
    {[...new Array(3)].map((_, j) => <TableColumn key={j}>{loremIpsum()}</TableColumn>)}
  </TableRow>
));

export default class ControlledPagination extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    const page = 3;
    const rowsPerPage = 30;
    const start = rowsPerPage * (page - 1);

    this.state = {
      page,
      rowsPerPage,
      rows: LOREM_ROWS.slice(start, start + rowsPerPage),
    };
  }

  _handlePagination = (start, rowsPerPage, page) => {
    this.setState({
      rows: LOREM_ROWS.slice(start, start + rowsPerPage),
      page,
      rowsPerPage,
    });
  };

  render() {
    const { rows, page, rowsPerPage } = this.state;

    return (
      <DataTable baseId="lorem-table">
        <TableHeader>
          <TableRow>
            <TableColumn>Column 1</TableColumn>
            <TableColumn>Column 2</TableColumn>
            <TableColumn>Column 3</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
        <TablePagination
          onPagination={this._handlePagination}
          rows={LOREM_ROWS.length}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </DataTable>
    );
  }
}
