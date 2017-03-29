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
     * An optional function to call when a non-plain data table has a row toggled.
     * The callback will include the selected row id, the boolean if it is now selected,
     * and the count of rows that are selected. If the checkbox in the `TableHeader` was
     * clicked, the selected row id will be `-1`.
     *
     * ```js
     * onRowToggle(3, true, 8); // 4th row was toggled
     * onRowToggle(-1, true, 15); // select all checkbox was toggled on.
     * ```
     */
    onRowToggle: invalidIf(PropTypes.func, 'plain'),
  };

  static defaultProps = {
    uncheckedIconChildren: 'check_box_outline_blank',
    uncheckedIconClassName: 'material-icons',
    checkedIconChildren: 'check_box',
    checkedIconClassName: 'material-icons',
    defaultSelectedRows: [],
    responsive: true,
  };

  static childContextTypes = contextTypes;

  constructor(props) {
    super(props);

    const rows = props.defaultSelectedRows;
    this.state = {
      allSelected: this._allSelected(rows),
      selectedRows: rows,
    };

    this._removed = 0;
    this._initial = true;
    this._toggleAllRows = this._toggleAllRows.bind(this);
    this._toggleSelectedRow = this._toggleSelectedRow.bind(this);
    this._createCheckbox = this._createCheckbox.bind(this);
    this._removeCheckbox = this._removeCheckbox.bind(this);
  }

  getChildContext() {
    const {
      uncheckedIconChildren,
      uncheckedIconClassName,
      checkedIconChildren,
      checkedIconClassName,
      plain,
      baseId,
    } = this.props;

    return {
      uncheckedIconChildren,
      uncheckedIconClassName,
      checkedIconChildren,
      checkedIconClassName,
      plain,
      allSelected: this.state.allSelected,
      selectedRows: this.state.selectedRows,
      toggleAllRows: this._toggleAllRows,
      toggleSelectedRow: this._toggleSelectedRow,
      createCheckbox: this._createCheckbox,
      removeCheckbox: this._removeCheckbox,
      baseId,
      baseName: `${baseId}-control`,
    };
  }

  componentDidUpdate() {
    this._removed = 0;
    this._initial = false;
  }

  _allSelected(rows) {
    let all = rows.length !== 0;
    rows.some(checked => {
      if (!checked) {
        all = false;
      }

      return !all;
    });

    return all;
  }

  _createCheckbox(index) {
    this.setState((state, props) => {
      const selectedRows = state.selectedRows.slice();
      // Only use the default selected rows prop on first mount. If other changes occur after,
      // default to false.
      const selected = this._initial && props.defaultSelectedRows[index] || false;
      selectedRows.splice(index, 0, selected);
      return { selectedRows, allSelected: this._allSelected(selectedRows) };
    });
  }

  _removeCheckbox(index) {
    this.setState((state) => {
      // When multiple checkboxes are removed in a render cycle, they are removed in list order.
      // So to keep the index correct while removing, need to keep subract the provided index by
      // the current number of removed elements. This value gets reset to 0 after a finished cycle.
      const selectedRows = state.selectedRows.slice();
      selectedRows.splice(index - this._removed, 1);
      this._removed += 1;
      return { selectedRows, allSelected: this._allSelected(selectedRows) };
    });
  }

  _toggleAllRows() {
    const allSelected = !this.state.allSelected;
    if (this.props.onRowToggle) {
      this.props.onRowToggle(-1, allSelected, allSelected ? this.state.selectedRows.length : 0);
    }

    this.setState({
      allSelected,
      selectedRows: this.state.selectedRows.map(() => allSelected),
    });
  }

  _toggleSelectedRow(row) {
    const selectedRows = this.state.selectedRows.slice();
    selectedRows[row] = !selectedRows[row];
    const selectedCount = selectedRows.filter(selected => selected).length;

    if (this.props.onRowToggle) {
      this.props.onRowToggle(row, selectedRows[row], selectedCount);
    }

    this.setState({ selectedRows, allSelected: this._allSelected(selectedRows) });
  }

  render() {
    const {
      className,
      children,
      plain,
      responsive,
      ...props
    } = this.props;
    delete props.checkedIconChildren;
    delete props.checkedIconClassName;
    delete props.uncheckedIconChildren;
    delete props.uncheckedIconClassName;
    delete props.defaultSelectedRows;
    delete props.baseId;
    delete props.onRowToggle;

    const table = (
      <table
        {...props}
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
