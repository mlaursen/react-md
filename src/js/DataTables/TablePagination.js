import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import getField from '../utils/getField';
import ResizeObserver from '../Helpers/ResizeObserver';
import SelectField from '../SelectFields/SelectField';
import Button from '../Buttons/Button';
import findTable from './findTable';

/**
 * The `TablePagination` component is used to generate the table footer that helps
 * pagination through a large dataset by limiting the number of rows per page.
 * The pagination will always be placed persistently at the bottom of the table
 * so that when a user scrolls to the right, they will always be able to use the
 * pagination.
 */
export default class TablePagination extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the `tfoot` tag.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the `tfoot` tag.
     */
    className: PropTypes.string,

    /**
     * A function to call when a user clicks the increment or decrement pagination
     * icon button. This function will be given the new start index and the number
     * or rows per page as well as the current page.
     *
     * ```js
     * onPagination(newStart, rowsPerPage, currentPage);
     * ```
     */
    onPagination: PropTypes.func.isRequired,

    /**
     * The current value for the select field holding the number of rows per page.
     */
    rowsPerPage: PropTypes.number,

    /**
     * The current page for the pagination. This will make the comonent controlled, so the only way to get pagination
     * is making sure you are updating this prop after the `onPagination` callback is called.
     *
     * Pages start from 1 instead of 0.
     */
    page: PropTypes.number,

    /**
     * The default page to start from for the pagination. Pages start from 1 instead of 0.
     */
    defaultPage: PropTypes.number.isRequired,

    /**
     * The default number of rows per page to display. This will be the value for the
     * `SelectField`.
     */
    defaultRowsPerPage: PropTypes.number.isRequired,

    /**
     * The label to use for the rows per page `SelectField`.
     */
    rowsPerPageLabel: PropTypes.node.isRequired,

    /**
     * A list of numbers for the amount of rows per page to display at a time.
     * This will be rendered into the `SelectField`.
     */
    rowsPerPageItems: PropTypes.arrayOf(PropTypes.number).isRequired,

    /**
     * The total number of rows that can be displayed. This is the unfiltered/non-subset
     * number of rows. This is used to help calculate the increment/decrement values to
     * display and determine if the user can increment/decrement again.
     */
    rows: PropTypes.number.isRequired,

    /**
     * Any children used to display the increment icon button.
     */
    incrementIconChildren: PropTypes.node,

    /**
     * An icon className used to display the increment icon button.
     */
    incrementIconClassName: PropTypes.string,

    /**
     * Any children used to display the decrement icon button.
     */
    decrementIconChildren: PropTypes.node,

    /**
     * An icon className used to display the decrement icon button.
     */
    decrementIconClassName: PropTypes.string,
  };

  static contextTypes = {
    baseId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  }

  static defaultProps = {
    defaultPage: 1,
    defaultRowsPerPage: 10,
    rowsPerPageLabel: 'Rows per page:',
    rowsPerPageItems: [10, 20, 30, 40, 50, 100],
    incrementIconChildren: 'keyboard_arrow_right',
    decrementIconChildren: 'keyboard_arrow_left',
  };

  constructor(props, context) {
    super(props, context);

    const controlledPage = typeof props.page !== 'undefined';
    const controlledRowsPerPage = typeof props.rowsPerPage !== 'undefined';
    const rowsPerPage = controlledRowsPerPage ? props.rowsPerPage : props.defaultRowsPerPage;
    const page = controlledPage ? props.page : props.defaultPage;
    this.state = {
      start: (page - 1) * rowsPerPage,
      controlsMarginLeft: 0,
    };

    if (!controlledPage) {
      this.state.page = page;
    }

    if (!controlledRowsPerPage) {
      this.state.rowsPerPage = props.defaultRowsPerPage;
    }

    this._setControls = this._setControls.bind(this);
    this._position = this._position.bind(this);
    this._increment = this._increment.bind(this);
    this._decrement = this._decrement.bind(this);
    this._setRowsPerPage = this._setRowsPerPage.bind(this);

    this._table = null;
    this._ticking = false;
  }

  componentWillReceiveProps(nextProps) {
    const { rowsPerPage, page } = this.props;
    if (page !== nextProps.page || rowsPerPage !== nextProps.rowsPerPage) {
      const rpp = getField(nextProps, this.state, 'rowsPerPage');
      const p = getField(nextProps, this.state, 'page');

      this.setState({ start: (p - 1) * rpp });
    }
  }

  _setControls(controls) {
    this._controls = controls;
    this._table = findTable(controls);
  }

  _position() {
    if (this._table) {
      this.setState({
        controlsMarginLeft: Math.max(0, this._table.offsetWidth - this._controls.offsetWidth),
      });
    }
  }

  _throttledPosition = () => {
    if (!this._ticking) {
      requestAnimationFrame(() => {
        this._ticking = false;
        this._position();
      });
    }

    this._ticking = true;
  };

  _increment() {
    const { rows, onPagination } = this.props;
    const { start } = this.state;
    const rowsPerPage = getField(this.props, this.state, 'rowsPerPage');
    const page = getField(this.props, this.state, 'page');

    // Only correct multiple of rows per page
    const max = rows - (rows % rowsPerPage);

    const newStart = Math.min(start + rowsPerPage, max);
    const nextPage = page + 1;

    onPagination(newStart, rowsPerPage, nextPage);
    if (typeof this.props.page === 'undefined') {
      this.setState({ start: newStart, page: nextPage });
    }
  }

  _decrement() {
    const { start } = this.state;
    const page = getField(this.props, this.state, 'page');
    const rowsPerPage = getField(this.props, this.state, 'rowsPerPage');
    const newStart = Math.max(0, start - rowsPerPage);
    const nextPage = page - 1;

    this.props.onPagination(newStart, rowsPerPage, nextPage);
    if (typeof this.props.page === 'undefined') {
      this.setState({ start: newStart, page: nextPage });
    }
  }

  _setRowsPerPage(rowsPerPage) {
    const page = 1;
    const newStart = 0;
    this.props.onPagination(newStart, rowsPerPage, page);
    let nextState;
    if (typeof this.props.rowsPerPage === 'undefined') {
      nextState = { rowsPerPage };
    }

    if (typeof this.props.page === 'undefined') {
      nextState = nextState || {};
      nextState.start = newStart;
    }

    if (nextState) {
      this.setState(nextState);
    }
  }

  render() {
    const { controlsMarginLeft, start } = this.state;
    const {
      className,
      rows,
      rowsPerPageLabel,
      rowsPerPageItems,
      incrementIconChildren,
      incrementIconClassName,
      decrementIconChildren,
      decrementIconClassName,
      ...props
    } = this.props;
    delete props.onPagination;
    delete props.rowsPerPage;
    delete props.defaultPage;
    delete props.defaultRowsPerPage;
    delete props.page;

    const rowsPerPage = getField(this.props, this.state, 'rowsPerPage');

    const pagination = `${start + 1}-${Math.min(rows, start + rowsPerPage)} of ${rows}`;
    return (
      <tfoot {...props} className={cn('md-table-footer', className)}>
        <ResizeObserver watchWidth component="tr" onResize={this._throttledPosition} />
        <ResizeObserver watchWidth component="tr" target={this._table} onResize={this._throttledPosition} />
        <tr>
          {/* colspan 100% so footer columns do not align with body and header */}
          <td colSpan="100%">
            <div
              ref={this._setControls}
              className="md-table-pagination md-table-pagination--controls md-text"
              style={{ marginLeft: controlsMarginLeft }}
            >
              {rowsPerPageLabel}
              <SelectField
                id={`${this.context.baseId}-pagination`}
                menuItems={rowsPerPageItems}
                position={SelectField.Positions.BELOW}
                inputClassName="md-select-field--pagination"
                value={rowsPerPage}
                onChange={this._setRowsPerPage}
              />
              <span className="md-table-pagination--label">{pagination}</span>
              <Button
                icon
                onClick={this._decrement}
                disabled={start === 0}
                iconClassName={decrementIconClassName}
              >
                {decrementIconChildren}
              </Button>
              <Button
                icon
                onClick={this._increment}
                disabled={start + rowsPerPage >= rows}
                iconClassName={incrementIconClassName}
              >
                {incrementIconChildren}
              </Button>
            </div>
            {/*
              * Since the footer controls is positioned absolutely for a persistent footer,
              * we have a mask to correctly set the height of the footer.
              */}
            <div className="md-table-pagination" />
          </td>
        </tr>
      </tfoot>
    );
  }
}
