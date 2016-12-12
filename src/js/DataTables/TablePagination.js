import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import getField from '../utils/getField';
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
     */
    page: PropTypes.number,

    /**
     * The page number to start from. This should be a number starting from 1.
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

    this.state = {
      start: Math.max(0, (props.defaultPage - 1)) * props.defaultRowsPerPage,
      rowsPerPage: props.defaultRowsPerPage,
      controlsMarginLeft: 0,
    };

    this._setControls = this._setControls.bind(this);
    this._position = this._position.bind(this);
    this._increment = this._increment.bind(this);
    this._decrement = this._decrement.bind(this);
    this._setRowsPerPage = this._setRowsPerPage.bind(this);
  }

  componentDidMount() {
    this._position();
    window.addEventListener('resize', this._position);
  }

  componentDidUpdate(prevProps, prevState) {
    const { rows } = this.props;
    const { start, rowsPerPage } = this.state;
    if (rows !== prevProps.rows
      || start !== prevState.start
      || rowsPerPage !== prevState.rowsPerPage
    ) {
      this._position();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._position);
  }

  _setControls(controls) {
    this._controls = findDOMNode(controls);
  }

  _position() {
    const table = findTable(findDOMNode(this));
    if (table) {
      this.setState({
        controlsMarginLeft: Math.max(0, table.offsetWidth - this._controls.offsetWidth),
      });
    }
  }

  _increment() {
    const { rows, onPagination, page } = this.props;
    const { start } = this.state;
    const rowsPerPage = getField(this.props, this.state, 'rowsPerPage');

    // Only correct multiple of rows per page
    const max = rows - (rows % rowsPerPage);

    const newStart = Math.min(start + rowsPerPage, max);
    const nextPage = typeof page !== 'undefined' ? page + 1 : (newStart / rowsPerPage) + 1;

    onPagination(newStart, rowsPerPage, nextPage);
    this.setState({ start: newStart });
  }

  _decrement() {
    const { page } = this.props;
    const { start } = this.state;
    const rowsPerPage = getField(this.props, this.state, 'rowsPerPage');
    const newStart = Math.max(0, start - rowsPerPage);
    const nextPage = typeof page !== 'undefined' ? page - 1 : (newStart / rowsPerPage) + 1;

    this.props.onPagination(newStart, rowsPerPage, nextPage);
    this.setState({ start: newStart });
  }

  _setRowsPerPage(rowsPerPage) {
    const { start } = this.state;

    const newStart = Math.max(0, start - (start % rowsPerPage));
    this.props.onPagination(newStart, rowsPerPage, newStart / rowsPerPage + 1);
    this.setState({ start: newStart, rowsPerPage });
  }

  render() {
    const { controlsMarginLeft } = this.state;
    const {
      className,
      rows,
      rowsPerPageLabel,
      rowsPerPageItems,
      incrementIconChildren,
      incrementIconClassName,
      decrementIconChildren,
      decrementIconClassName,
      page,
      ...props
    } = this.props;
    delete props.onPagination;
    delete props.rowsPerPage;
    delete props.defaultPage;
    delete props.defaultRowsPerPage;

    const rowsPerPage = getField(this.props, this.state, 'rowsPerPage');
    let { start } = this.state;
    if (typeof page !== 'undefined') {
      start = (page - 1) * rowsPerPage;
    }

    const pagination = `${start + 1}-${Math.min(rows, start + rowsPerPage)} of ${rows}`;
    return (
      <tfoot {...props} className={cn('md-table-footer', className)}>
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
