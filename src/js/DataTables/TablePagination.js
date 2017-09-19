import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import getField from '../utils/getField';
import ResizeObserver from '../Helpers/ResizeObserver';
import SelectField from '../SelectFields/SelectField';
import Button from '../Buttons/Button';
import FontIcon from '../FontIcons/FontIcon';
import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
import findTable from './findTable';
import TableFooter from './TableFooter';
import TableColumn from './TableColumn';

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
     * An optional id to provide to the select field. If this is omitted, it will be
     * the `DataTable`'s `baseId` with '-pagination'.
     *
     * @see {@link DataTables/DataTable#baseId}
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional id to provide to the increment icon button. If this is omitted, it will be
     * the `id` with '-increment-btn'.
     *
     * @see {@link #id}
     */
    incrementId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional id to provide to the decrement icon button. If this is omitted, it will be
     * the `id` with '-decrement-btn'.
     *
     * @see {@link #id}
     */
    decrementId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the `tfoot` tag.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the `tfoot` tag.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the select field.
     *
     * @see {@link SelectFields/SelectField#style}
     */
    selectFieldStyle: PropTypes.object,

    /**
     * An optional className to apply to the select field.
     *
     * @see {@link SelectFields/SelectField#className}
     */
    selectFieldClassName: PropTypes.string,

    /**
     * An optional style to apply to the select field's input.
     *
     * @see {@link SelectFields/SelectField#inputStyle}
     */
    selectFieldInputStyle: PropTypes.object,

    /**
     * An optional className to apply to the select field's input.
     *
     * @see {@link SelectFields/SelectField#inputClassName}
     */
    selectFieldInputClassName: PropTypes.string,

    /**
     * Boolean if the select field should use the simplified menu logic.
     *
     * @see {@link Helpers/Layover#simplified}
     */
    simplifiedMenu: PropTypes.bool,

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
     * The current page for the pagination. This will make the component controlled, so the only way to get pagination
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
     * The icon to use for the increment icon button.
     */
    incrementIcon: PropTypes.element,

    /**
     * The icon to use for the decrement icon button.
     */
    decrementIcon: PropTypes.element,

    incrementIconChildren: deprecated(PropTypes.node, 'Use the `incrementIcon` prop instead'),
    incrementIconClassName: deprecated(PropTypes.string, 'Use the `incrementIcon` prop instead'),
    decrementIconChildren: deprecated(PropTypes.node, 'Use the `decrementIcon` prop instead'),
    decrementIconClassName: deprecated(PropTypes.string, 'Use the `decrementIcon` prop instead'),
  };

  static contextTypes = {
    baseId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    fixedFooter: PropTypes.bool,
  }

  static defaultProps = {
    defaultPage: 1,
    defaultRowsPerPage: 10,
    rowsPerPageLabel: 'Rows per page:',
    rowsPerPageItems: [10, 20, 30, 40, 50, 100],
    incrementIcon: <FontIcon>keyboard_arrow_right</FontIcon>,
    decrementIcon: <FontIcon>keyboard_arrow_left</FontIcon>,
    simplifiedMenu: false,
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

  _setControls = (controls) => {
    this._controls = controls;
    this._table = findTable(controls);

    if (this._table && this.context.fixedFooter) {
      this._table.addEventListener('scroll', this._throttledPosition);
    }
  };

  _position = () => {
    if (this._table) {
      const { fixedFooter } = this.context;
      const { offsetWidth, scrollLeft } = this._table;

      let controlsMarginLeft = offsetWidth - this._controls.offsetWidth;
      if (fixedFooter) {
        controlsMarginLeft += scrollLeft;
      }

      this.setState({
        controlsMarginLeft: Math.max(24, controlsMarginLeft),
      });
    }
  };

  _throttledPosition = () => {
    if (!this._ticking) {
      requestAnimationFrame(() => {
        this._ticking = false;
        this._position();
      });
    }

    this._ticking = true;
  };

  _increment = () => {
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
  };

  _decrement = () => {
    const { start } = this.state;
    const page = getField(this.props, this.state, 'page');
    const rowsPerPage = getField(this.props, this.state, 'rowsPerPage');
    const newStart = Math.max(0, start - rowsPerPage);
    const nextPage = page - 1;

    this.props.onPagination(newStart, rowsPerPage, nextPage);
    if (typeof this.props.page === 'undefined') {
      this.setState({ start: newStart, page: nextPage });
    }
  };

  _setRowsPerPage = (rowsPerPage) => {
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
  };

  render() {
    const { controlsMarginLeft, start } = this.state;
    const {
      className,
      selectFieldStyle,
      selectFieldClassName,
      selectFieldInputStyle,
      selectFieldInputClassName,
      rows,
      rowsPerPageLabel,
      rowsPerPageItems,
      incrementIcon,
      decrementIcon,
      simplifiedMenu,

      // deprecated
      incrementIconChildren,
      incrementIconClassName,
      decrementIconChildren,
      decrementIconClassName,
      /* eslint-disable no-unused-vars */
      id: propId,
      incrementId: propIncrementId,
      decrementId: propDecrementId,
      onPagination,
      rowsPerPage: propRowsPerPage,
      page: propPage,
      defaultPage,
      defaultRowsPerPage,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const { baseId } = this.context;
    const rowsPerPage = getField(this.props, this.state, 'rowsPerPage');
    let { id, incrementId, decrementId } = this.props;
    if (!id) {
      id = `${baseId}-pagination`;
    }

    if (!incrementId) {
      incrementId = `${id}-increment-btn`;
    }

    if (!decrementId) {
      decrementId = `${id}-decrement-btn`;
    }

    const pagination = `${start + 1}-${Math.min(rows, start + rowsPerPage)} of ${rows}`;
    return (
      <TableFooter {...props} className={cn('md-table-footer--pagination', className)}>
        <ResizeObserver watchWidth component="tr" onResize={this._throttledPosition} />
        <ResizeObserver watchWidth component="tr" target={this._table} onResize={this._throttledPosition} />
        <tr>
          {/* colspan 100% so footer columns do not align with body and header */}
          <TableColumn colSpan="100%">
            <div
              ref={this._setControls}
              className="md-table-pagination md-table-pagination--controls md-text"
              style={{ marginLeft: controlsMarginLeft }}
            >
              <span className="md-table-pagination__label">
                {rowsPerPageLabel}
              </span>
              <SelectField
                id={id}
                menuItems={rowsPerPageItems}
                position={SelectField.Positions.BELOW}
                style={selectFieldStyle}
                className={selectFieldClassName}
                inputStyle={selectFieldInputStyle}
                inputClassName={cn('md-select-field--pagination', selectFieldInputClassName)}
                value={rowsPerPage}
                onChange={this._setRowsPerPage}
                simplifiedMenu={simplifiedMenu}
              />
              <span className="md-table-pagination--label">{pagination}</span>
              <Button
                id={decrementId}
                icon
                onClick={this._decrement}
                disabled={start === 0}
                iconEl={getDeprecatedIcon(decrementIconClassName, decrementIconChildren, decrementIcon)}
              />
              <Button
                id={incrementId}
                icon
                onClick={this._increment}
                disabled={start + rowsPerPage >= rows}
                iconEl={getDeprecatedIcon(incrementIconClassName, incrementIconChildren, incrementIcon)}
              />
            </div>
            {/*
              * Since the footer controls is positioned absolutely for a persistent footer,
              * we have a mask to correctly set the height of the footer.
              */}
            <div className="md-table-pagination" />
          </TableColumn>
        </tr>
      </TableFooter>
    );
  }
}
