import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TablePagination from 'react-md/lib/DataTables/TablePagination';

import { FOOD_DATA_URL } from 'constants/application';
import { fetchCreator } from 'actions/fetch';
import Loader from './Loader';

@connect(({ entities: { foodInspections } }) => ({ foodInspections }), { fetchCreator })
export default class PaginationExample extends PureComponent {
  static propTypes = {
    fetchCreator: PropTypes.func.isRequired,
    foodInspections: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
      meta: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        fieldName: PropTypes.string.isRequired,
        numeric: PropTypes.bool.isRequired,
        description: PropTypes.string,
      })).isRequired,
      inspections: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { inspections: [], rows: 0 };

    this._load = this._load.bind(this);
    this._handlePagination = this._handlePagination.bind(this);
  }

  componentWillMount() {
    const { inspections } = this.props.foodInspections;
    const rows = inspections.length;
    if (rows) {
      this.setState({ inspections: inspections.slice(0, 10), rows });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { inspections } = nextProps.foodInspections;
    if (this.props.foodInspections.inspections !== inspections && inspections.length) {
      this.setState({
        inspections: inspections.slice(0, 10),
        rows: inspections.length,
      });
    }
  }

  _load() {
    this.props.fetchCreator(FOOD_DATA_URL, 'inspections', ['entities']);
  }

  _handlePagination(start, rowsPerPage) {
    this.setState({ inspections: this.props.foodInspections.inspections.slice(start, start + rowsPerPage) });
  }

  render() {
    const { fetching, meta } = this.props.foodInspections;
    const { rows } = this.state;
    const headers = meta.map(({ id, name, description, numeric }) => (
      <TableColumn key={id} numeric={numeric} tooltipLabel={description}>
        {name}
      </TableColumn>
    ));

    const inspections = this.state.inspections.map((datum, i) => (
      <TableRow key={i}>
        {meta.map(({ id, fieldName, numeric }) => (
          <TableColumn key={id} numeric={numeric}>
            {datum[fieldName]}
          </TableColumn>
        ))}
      </TableRow>
    ));

    return (
      <Loader fetching={fetching} loaded={!!inspections.length} onLoad={this._load}>
        <DataTable className="pagination-table" baseId="pagination">
          <TableHeader>
            <TableRow>
              {headers}
            </TableRow>
          </TableHeader>
          <TableBody>
            {inspections}
          </TableBody>
          <TablePagination onPagination={this._handlePagination} rows={rows} />
        </DataTable>
      </Loader>
    );
  }
}
