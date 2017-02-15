import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import requiredForA11yIfNot from '../utils/PropTypes/requiredForA11yIfNot';
import invalidIf from '../utils/PropTypes/invalidIf';
import contextTypes from './contextTypes';

/**
 * The `DataTable` component is used to manage the state of all rows.
 * This can either be a __plain__ table or a __data__ table.
 *
 * A __data__ table will include checkboxes on each row while a __plain__ table
 * will not.
 */
export default class DataTable extends PureComponent {
  static propTypes = {
    /**
     * A base id to use for every checkbox or `EditDialogColumn` in the data table. This is
     * required for a11y if the data table is not plain.
     */
    baseId: requiredForA11yIfNot(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]), 'plain'),

    /**
     * Optional style to apply to the table.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the table.
     */
    className: PropTypes.string,

    /**
     * The table contents to display. This *should* be a list of `TableHeader` and `TableBody`
     * components.
     */
    children: PropTypes.node.isRequired,

    /**
     * An optional array of booleans denoting if a row is selected.
     * This is an associative array so the index must match the row
     * number in the `TableBody` component.
     */
    defaultSelectedRows: PropTypes.arrayOf(PropTypes.bool).isRequired,

    /**
     * Boolean if the table is responsive. This will wrap the table in a container
     * that allows scrolling to the right if overflow exists.
     */
    responsive: PropTypes.bool.isRequired,

    /**
     * Boolean if this table should not include the checkboxes on each row.
     * This really means that the entire table is unselectable and you wish
     * to display as a normal table.
     */
    plain: PropTypes.bool,

    /**
     * The icon className to use for the unchecked row icon. This value
     * will be passed down as `context`.
     */
    uncheckedIconClassName: PropTypes.string.isRequired,

    /**
     * The icon children to use for the unchecked row icon. This value
     * will be passed down as `context`.
     */
    uncheckedIconChildren: PropTypes.node,

    /**
     * The icon className to use for the checked row icon. This value
     * will be passed down as `context`.
     */
    checkedIconClassName: PropTypes.string.isRequired,

    /**
     * The icon children to use for the checked row icon. This value
     * will be passed down as `context`.
     */
    checkedIconChildren: PropTypes.node,

    /**
     * An optional function to call when a non-plain data table has a row toggled. The callback
     * will include:
     * - the row id
     * - boolean if the row is now checked
     * - the total count of rows selected
     * - the change event
     *
     * All rows will be toggled on or off when the row id is 0 and a `thead` exists in the table.
     */
    onRowToggle: invalidIf(PropTypes.func, 'plain'),

    /**
     * Boolean if the `DataTable` should inject checkboxes at the start of each row.
     */
    selectableRows: PropTypes.bool,
  };

  static defaultProps = {
    uncheckedIconChildren: 'check_box_outline_blank',
    uncheckedIconClassName: 'material-icons',
    checkedIconChildren: 'check_box',
    checkedIconClassName: 'material-icons',
    defaultSelectedRows: [],
    responsive: true,
    selectableRows: true,
  };

  static childContextTypes = contextTypes;

  constructor(props) {
    super(props);

    this.state = {
      header: true,
      allSelected: props.defaultSelectedRows.filter(b => b).length === 0,
      selectedRows: props.defaultSelectedRows,
    };

    this._initializeRows = this._initializeRows.bind(this);
    this._toggleSelectedRow = this._toggleSelectedRow.bind(this);
  }

  getChildContext() {
    const {
      uncheckedIconChildren,
      uncheckedIconClassName,
      checkedIconChildren,
      checkedIconClassName,
      plain,
      baseId,
      selectableRows,
    } = this.props;

    return {
      uncheckedIconChildren,
      uncheckedIconClassName,
      checkedIconChildren,
      checkedIconClassName,
      plain,
      allSelected: this.state.allSelected,
      selectedRows: this.state.selectedRows,
      toggleSelectedRow: this._toggleSelectedRow,
      baseId,
      baseName: `${baseId}-control`,
      selectableRows,
    };
  }

  _toggleSelectedRow(row, header, e) {
    let selectedRows;
    let allSelected = this.state.allSelected;
    let selectedCount = 0;
    const i = this.state.header ? row - 1 : row;
    const { checked } = e.target;
    if (header) {
      selectedRows = this.state.selectedRows.map(() => checked);
      allSelected = checked;
      selectedCount = !checked ? 0 : selectedRows.length;
    } else {
      selectedRows = this.state.selectedRows.slice();
      selectedRows[i] = !selectedRows[i];
      selectedCount = selectedRows.filter(b => b).length;
      allSelected = selectedCount === selectedRows.length;
    }

    if (this.props.onRowToggle) {
      this.props.onRowToggle(row, checked, selectedCount, e);
    }

    this.setState({ selectedRows, allSelected });
  }

  _initializeRows(table) {
    if (!table) {
      return;
    }

    const header = !!table.querySelector('thead');
    const rows = table.querySelectorAll('tbody tr').length;
    let nextState;
    if (rows !== this.state.selectedRows.length) {
      const selectedRows = [];
      for (let i = 0; i < rows; i++) {
        selectedRows[i] = this.state.selectedRows[i] || false;
      }

      nextState = { selectedRows, allSelected: selectedRows.filter(b => b).length === rows };
    }

    if (header !== this.state.header) {
      nextState = nextState || {};
      nextState.header = header;
    }

    if (nextState) {
      this.setState(nextState);
    }
  }

  render() {
    const {
      className,
      children,
      plain,
      responsive,
      /* eslint-disable no-unused-vars */
      checkedIconChildren,
      checkedIconClassName,
      uncheckedIconChildren,
      uncheckedIconClassName,
      defaultSelectedRows,
      baseId,
      onRowToggle,
      selectableRows,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const table = (
      <table
        {...props}
        ref={tableEl => this._initializeRows(tableEl)}
        className={cn('md-data-table', {
          'md-data-table--plain': plain,
        }, className)}
      >
        {children}
      </table>
    );

    return responsive ? <div className="md-data-table--responsive">{table}</div> : table;
  }
}
