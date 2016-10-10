import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import contextTypes from './contextTypes';
import requiredForA11yIf from '../utils/PropTypes/requiredForA11yIf';

/**
 * The `DataTable` component is used to manage the state of all rows.
 * This can either be a __plain__ table or a __data__ table.
 *
 * A __data__ table will include checkboxes on each row while a __plain__ table
 * will not.
 */
export default class DataTable extends PureComponent {
  static propTypes = {
    baseId: requiredForA11yIf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]), 'plain'),

    /**
     * An optional className to apply to the table.
     */
    className: PropTypes.string,

    /**
     * Optional style to apply to the table.
     */
    style: PropTypes.object,

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

    this.state = {
      allSelected: props.defaultSelectedRows.filter(b => b).length === 0,
      selectedRows: props.defaultSelectedRows,
    };

    this._initializeRows = this._initializeRows.bind(this);
    this._toggleAllRows = this._toggleAllRows.bind(this);
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
      baseId,
      baseName: `${baseId}-control`,
    };
  }

  componentDidMount() {
    this._initializeRows();
  }

  _toggleAllRows() {
    const allSelected = !this.state.allSelected;
    this.setState({
      allSelected,
      selectedRows: this.state.selectedRows.map(() => allSelected),
    });
  }

  _toggleSelectedRow(row) {
    const selectedRows = this.state.selectedRows.slice();
    selectedRows[row] = !selectedRows[row];

    this.setState({
      selectedRows,
      allSelected: selectedRows.filter(selected => selected).length === selectedRows.length,
    });
  }

  _initializeRows() {
    const rows = findDOMNode(this).querySelectorAll('.md-data-table tbody tr').length;

    const selectedRows = [];
    for (let i = 0; i < rows; i++) {
      selectedRows[i] = this.state.selectedRows[i] || false;
    }

    this.setState({
      selectedRows,
      allSelected: selectedRows.map(b => b).length === 0,
    });
  }

  render() {
    const {
      className,
      children,
      plain,
      responsive,
      ...props,
    } = this.props;
    delete props.checkedIconChildren;
    delete props.checkedIconClassName;
    delete props.uncheckedIconChildren;
    delete props.uncheckedIconClassName;
    delete props.defaultSelectedRows;
    delete props.baseId;

    const table = (
      <table
        className={cn('md-data-table', {
          'md-data-table--plain': plain,
        }, className)}
        {...props}
      >
        {children}
      </table>
    );

    return responsive ? <div className="md-data-table--responsive">{table}</div> : table;
  }
}
