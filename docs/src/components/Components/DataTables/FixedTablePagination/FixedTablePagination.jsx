/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TablePagination,
} from 'react-md';

import './_styles.scss';

function isMediaChange(props, nextProps) {
  return props.mobile !== nextProps.mobile
    || props.tablet !== nextProps.tablet
    || props.desktop !== nextProps.desktop;
}

export default class FixedTablePagination extends PureComponent {
  static propTypes = {
    /**
     * A simple API call to fetch the columns for the "large" dataset. I keep it in redux
     * for some SSR benefits and caching for later, but you can interpret it as..
     *
     * fetch('/api/air-quality/columns')
     *   .then(response => response.json())
     *   .then((columns) => {
     *      this.setState({ columns });
     *   });
     *
     * This is a lazy-fetch approach. If the columns exist in the store, don't fetch again.
     */
    fetchColumns: PropTypes.func.isRequired,

    /**
     * A simple API call to fetch the data with a start and limit from the "large" dataset. Same
     * reasons as above for keeping it in redux, but you can interpret it as:
     *
     * fetch(`/api/air-quality/data?start=${start}&limit=${limit}`)
     *   .then(response => response.json())
     *   .then(({ meta, data }) => {
     *     this.setState({ meta, data });
     *   });
     *
     * This is a lazy-fetch approach. If all the rows between the start index and the start + limit,
     * do not fetch the data.
     */
    fetchData: PropTypes.func.isRequired,

    /**
     * A list of column headers that are retrieved from the server.
     */
    columns: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      index: PropTypes.number.isRequired,
    })).isRequired,

    /**
     * Some meta information about the last dataset that was fetched from the
     * "data" endpoint.
     */
    meta: PropTypes.shape({
      start: PropTypes.number.isRequired,
      limit: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      next: PropTypes.string,
      previous: PropTypes.string,
    }),

    /**
     * This is really a full set of data that has been retrieved from the backend. It
     * will be a growing list when new results are fetched.
     */
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

    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
    desktop: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super();

    this.state = {
      page: 1,
      start: 0,
      limit: 10,
      slicedData: props.data.length ? props.data.slice(0, 10) : props.data,
      fixedHeight: null,
    };
  }

  componentDidMount() {
    this.calcHeight();
    this.props.fetchColumns();
    this.props.fetchData(this.state.start, this.state.limit);
  }

  componentWillReceiveProps(nextProps) {
    // After a successful fetch of the next dataset, create the new spliced data with the start and limit
    const { data } = nextProps;
    if (this.props.data !== data) {
      const { start, limit } = this.state;
      this.setState({ slicedData: data.slice(start, start + limit) });
    }

    if (isMediaChange(this.props, nextProps)) {
      this.calcHeight();
    }
  }

  handlePagination = (start, rowsPerPage, page) => {
    // attempt to lazily-fetch the next results
    this.props.fetchData(start, rowsPerPage);

    // Check if all the data already exists. If it does, go ahead and set the spliced data
    const sliced = this.props.data.slice(start, start + rowsPerPage).filter(d => !!d);
    this.setState({
      start,
      page,
      limit: rowsPerPage,
      slicedData: sliced.length === rowsPerPage ? sliced : this.state.slicedData,
    });
  };

  calcHeight = () => {
    const dialog = document.getElementById('demo-dialog');
    const toolbar = document.getElementById('demo-title');
    const fixedHeight = dialog.offsetHeight - toolbar.offsetHeight;

    this.setState({ fixedHeight });
  };

  render() {
    const { slicedData, limit, page, fixedHeight } = this.state;
    const { columns, meta: { total }, desktop } = this.props;
    return (
      <DataTable
        baseId="air-quality-data"
        className="data-tables__fixed-table"
        fixedHeader
        fixedFooter
        fixedHeight={fixedHeight}
      >
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
          {slicedData.map((airQuality, i) => (
            <TableRow key={i}>
              {Object.keys(airQuality).map((key, i) => (
                <TableColumn key={key} numeric={columns[i].numeric}>{airQuality[key]}</TableColumn>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          rowsPerPageLabel={!desktop ? 'Rows' : 'Rows per page'}
          page={page}
          rows={total}
          rowsPerPage={limit}
          onPagination={this.handlePagination}
        />
      </DataTable>
    );
  }
}
