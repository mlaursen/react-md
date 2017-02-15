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
    uncheckedIconClassName: PropTypes.string,

    /**
     * The icon children to use for the unchecked row icon. This value
     * will be passed down as `context`.
     */
    uncheckedIconChildren: PropTypes.node,

    /**
     * The icon className to use for the checked row icon. This value
     * will be passed down as `context`.
     */
    checkedIconClassName: PropTypes.string,

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

    /**
     * Boolean if the checkboxes in the table should also include an _indeterminate_ state.
     * It will use the `indeterminateIconChildren` and `indeterminateIconClassName` when at least
     * 1 row has been checked, but not all rows.
     */
    indeterminate: PropTypes.bool,

    /**
     * Any children required to display the indeterminate checkbox.
     */
    indeterminateIconChildren: PropTypes.node,

    /**
     * The icon className to use for the indeterminate checkbox.
     */
    indeterminateIconClassName: PropTypes.string,

    /**
     * This is the aria-label to apply to the checkbox in the table's header. This
     * is just used for accessibility since the checkboxes have no visible label.
     */
    checkboxHeaderLabel: PropTypes.string.isRequired,

    /**
     * This is the aria-label to apply to a checkbox in the table's body. This can either
     * be a constant string that will replace `{{row}}` with the current row index, or
     * a function that takes the row index and returns a string.
     *
     * ```js
     * checkboxLabelTemplate={rowIndex => `Toggle row ${row}`}
     * ```
     */
    checkboxLabelTemplate: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
  };

  static defaultProps = {
    checkedIconChildren: 'check_box',
    uncheckedIconChildren: 'check_box_outline_blank',
    indeterminateIconChildren: 'indeterminate_check_box',
    defaultSelectedRows: [],
    responsive: true,
    selectableRows: true,
    checkboxHeaderLabel: 'Toggle All Rows',
    checkboxLabelTemplate: 'Toggle row {{row}}',
  };

  static childContextTypes = contextTypes;

  constructor(props) {
    super(props);

    this.state = {
      header: true,
      allSelected: false,
      selectedRows: props.defaultSelectedRows,
      indeterminate: props.indeterminate ? false : undefined,
    };

    this._initializeRows = this._initializeRows.bind(this);
    this._toggleSelectedRow = this._toggleSelectedRow.bind(this);
  }

  getChildContext() {
    const {
      checkedIconChildren,
      checkedIconClassName,
      uncheckedIconChildren,
      uncheckedIconClassName,
      indeterminateIconChildren,
      indeterminateIconClassName,
      plain,
      baseId,
      selectableRows,
      checkboxHeaderLabel,
      checkboxLabelTemplate,
    } = this.props;

    return {
      checkedIconChildren,
      checkedIconClassName,
      uncheckedIconChildren,
      uncheckedIconClassName,
      indeterminateIconChildren,
      indeterminateIconClassName,
      indeterminate: this.state.indeterminate,
      plain,
      allSelected: this.state.allSelected,
      selectedRows: this.state.selectedRows,
      toggleSelectedRow: this._toggleSelectedRow,
      baseId,
      baseName: `${baseId}-control`,
      selectableRows,
      checkboxHeaderLabel,
      checkboxLabelTemplate,
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

    const indeterminate = this.props.indeterminate && !allSelected && selectedCount > 0;

    this.setState({ selectedRows, allSelected, indeterminate });
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

      const selectedLength = selectedRows.filter(b => b).length;
      nextState = {
        selectedRows,
        allSelected: selectedLength === rows,
        indeterminate: selectedLength > 0 && selectedLength !== rows,
      };
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
      indeterminateIconChildren,
      indeterminateIconClassName,
      indeterminate,
      defaultSelectedRows,
      baseId,
      onRowToggle,
      selectableRows,
      checkboxHeaderLabel,
      checkboxLabelTemplate,
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
