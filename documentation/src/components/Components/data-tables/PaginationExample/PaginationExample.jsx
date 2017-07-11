import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TablePagination from 'react-md/lib/DataTables/TablePagination';

export default class PaginationExample extends PureComponent {
  static propTypes = {
    fetchColumns: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    fetchNextData: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      index: PropTypes.number.isRequired,
    })).isRequired,
    meta: PropTypes.shape({
      start: PropTypes.number.isRequired,
      limit: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      next: PropTypes.string,
      previous: PropTypes.string,
    }),
    data: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.number.isRequired,
      measureId: PropTypes.number.isRequired,
      measureName: PropTypes.string.isRequired,
      measureType: PropTypes.string.isRequired,
      stratificationLevel: PropTypes.string.isRequired,
      stateFips: PropTypes.string.isRequired,
      stateName: PropTypes.string.isRequired,
      countyFips: PropTypes.string.isRequired,
      countyName: PropTypes.string.isRequired,
      reportYear: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      unitName: PropTypes.string.isRequired,
      dataOrigin: PropTypes.string.isRequired,
      monitorOnly: PropTypes.number.isRequired,
    })).isRequired,
  };

  constructor(props) {
    super();

    this.state = {
      page: 1,
      start: 0,
      limit: 10,
      slicedData: props.data.length ? props.data.slice(0, 10) : props.data,
    };
  }

  componentDidMount() {
    this.props.fetchColumns();
    this.props.fetchData(0, this.state.limit);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (this.props.data !== data) {
      const { start, limit } = this.state;
      this.setState({ slicedData: data.slice(start, start + limit) });
    }
  }

  handlePagination = (start, rowsPerPage, page) => {
    this.props.fetchData(start, rowsPerPage);
    this.setState({ start, page, limit: rowsPerPage });
  };

  render() {
    const { slicedData, limit, page } = this.state;
    const { columns, meta: { total } } = this.props;
    return (
      <DataTable baseId="data-gov-air-quality" plain>
        <TableHeader>
          <TableRow>
            {columns.map(({ id, name, description, numeric }) => (
              <TableColumn key={id} numeric={numeric} tooltipLabel={description}>
                {name}
              </TableColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {slicedData.map(datum => (
            <TableRow key={datum.index}>
              {Object.keys(datum).map(key => <TableColumn key={key}>{datum[key]}</TableColumn>)}
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          page={page}
          rows={total}
          rowsPerPage={limit}
          onPagination={this.handlePagination}
        />
      </DataTable>
    );
  }
}
