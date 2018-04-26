import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import requiredForA11yIfNot from '../utils/PropTypes/requiredForA11yIfNot';
import invalidIf from '../utils/PropTypes/invalidIf';
import FontIcon from '../FontIcons/FontIcon';
import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
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
     * required for a11y if the data table is not plain. It is recommended to always provide
     * this prop if you are using any of the advanced table components to auto-generate unique
     * ids for each element.
     *
     * @see {@link DataTables/EditDialogColumn}
     * @see {@link DataTables/SelectFieldColumn}
     * @see {@link DataTables/DropdownMenuColumn}
     * @see {@link DataTables/MenuButtonColumn}
     * @see {@link DataTables/TablePagination}
     */
    baseId: requiredForA11yIfNot(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]), 'plain'),

    /**
     * Optional style to apply to the table. If the table is `responsive`, this will be applied to the surrounding `div`
     * instead of the table itself. Use the `tableStyle` in this case.
     *
     * @see {@link #tableStyle}
     * @see {@link #responsive}
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the table. If the table is `responsive`, this will be applied to the
     * surrounding `div` instead of the table itself. Use the `tableClassName` in this case.
     *
     * @see {@link #tableClassName}
     * @see {@link #responsive}
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the `table` itself when the `responsive` prop is enabled. If the table is not
     * `responsive`, use the `style` prop.
     *
     * @see {@link #style}
     * @see {@link #responsive}
     */
    tableStyle: PropTypes.object,

    /**
     * An optional className to apply to the `table` itself when the `responsive` prop is enabled. If the table is not
     * `responsive`, use the `className` prop.
     *
     * @see {@link #className}
     * @see {@link #responsive}
     */
    tableClassName: PropTypes.string,

    /**
     * An optional style to apply to the fixed table wrapper that appears when there is a fixed
     * header or a fixed footer.
     *
     * @see {@link #fixedHeader}
     * @see {@link #fixedFooter}
     * @see {@link #fixedWrapperClassName}
     * @see {@link #fixedScrollWrapperStyle}
     * @see {@link #fixedScrollWrapperClassName}
     */
    fixedWrapperStyle: PropTypes.object,

    /**
     * An optional className to apply to the fixed table wrapper that appears when there is a fixed
     * header or a fixed footer.
     *
     * @see {@link #fixedHeader}
     * @see {@link #fixedFooter}
     * @see {@link #fixedWrapperStyle}
     * @see {@link #fixedScrollWrapperStyle}
     * @see {@link #fixedScrollWrapperClassName}
     */
    fixedWrapperClassName: PropTypes.string,

    /**
     * An optional style to apply to the fixed table wrapper's scroll container that appears when there is a fixed
     * header or a fixed footer.
     *
     * @see {@link #fixedHeader}
     * @see {@link #fixedFooter}
     * @see {@link #fixedWrapperStyle}
     * @see {@link #fixedWrapperClassName}
     * @see {@link #fixedScrollWrapperStyle}
     */
    fixedScrollWrapperStyle: PropTypes.object,

    /**
     * An optional className to apply to the fixed table wrapper's scroll container that appears when there is a fixed
     * header or a fixed footer.
     *
     * @see {@link #fixedHeader}
     * @see {@link #fixedFooter}
     * @see {@link #fixedWrapperStyle}
     * @see {@link #fixedWrapperClassName}
     * @see {@link #fixedScrollWrapperStyle}
     */
    fixedScrollWrapperClassName: PropTypes.string,

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
     * The checked checkbox icon to display when a row is selected. This really defaults
     * to the `checkedCheckboxIcon` prop from the `SelectionControl`.
     *
     * @see {@link SelectionControls/SelectionControl#checkedCheckboxIcon}
     */
    checkedIcon: PropTypes.element,

    /**
     * The unchecked checkbox icon to display when a row is selected. This really defaults
     * to the `uncheckedCheckboxIcon` prop from the `SelectionControl`.
     *
     * @see {@link SelectionControls/SelectionControl#uncheckedCheckboxIcon}
     */
    uncheckedIcon: PropTypes.element,

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
     * An optional icon to display when the selected state is indeterminate.
     *
     * @see {@link #indeterminate}
     */
    indeterminateIcon: PropTypes.element,

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

    /**
     * Boolean if the table should include a fixed header. This will allow the `TableHeader` component
     * to stay fixed to the top of the table while the `TableBody` scrolls horizontally.
     *
     * @see {@link #fixedFooter}
     * @see [react-md-make-fixed-table](/components/data-tables?tab=2#mixin-react-md-make-fixed-table)
     */
    fixedHeader: PropTypes.bool,

    /**
     * Boolean if the table should include a fixed footer. This will allow the `TableFooter` component
     * to stay fixed to the bottom of the table while the `TableBody` scrolls horizontally.
     *
     * @see {@link #fixedHeader}
     * @see [react-md-make-fixed-table](/components/data-tables?tab=2#mixin-react-md-make-fixed-table)
     */
    fixedFooter: PropTypes.bool,

    /**
     * Either a boolean or a shape of booleans for if a divider should appear at the top or bottom of the table
     * when there is a fixed header/footer. By default, this will automatically create dividers.
     *
     * @see {@link #fixedHeader}
     * @see {@link #fixedFooter}
     */
    fixedDividers: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        header: PropTypes.bool,
        footer: PropTypes.bool,
      }),
    ]),

    /**
     * An optional height to set for a table with a fixed header and/or a fixed footer. It is recommended to use
     * the related `react-md-make-fixed-table` mixin instead.
     *
     * @see {@link #headerHeight}
     * @see {@link #footerHeight}
     */
    fixedHeight: PropTypes.number,

    /**
     * An optional width to set for a table with a fixed header and/or a fixed footer. It is recommended to use
     * the related `react-md-make-fixed-table` mixin instead.
     */
    fixedWidth: PropTypes.number,

    /**
     * This is the height of the table's header columns. This should be equal to the `md-data-table-header-height`
     * variable.
     *
     * @see [md-data-table-header-height](/components/data-tables?tab=2#variable-md-data-table-header-height)
     * @see {@link #fixedHeight}
     */
    headerHeight: PropTypes.number.isRequired,

    /**
     * This is the height of the table's header columns. This should be equal to the `md-data-table-header-height`
     * variable.
     *
     * @see [md-data-table-column-height](/components/data-tables?tab=2#variable-md-data-table-column-height)
     * @see {@link #fixedHeight}
     */
    footerHeight: PropTypes.number.isRequired,

    /**
     * Boolean if the `<table>` element should always span the entire width of its container.
     */
    fullWidth: PropTypes.bool,

    indeterminateIconChildren: deprecated(PropTypes.node, 'Use the `indeterminateIcon` prop instead'),
    indeterminateIconClassName: deprecated(PropTypes.string, 'Use the `indeterminateIcon` prop instead'),
    checkedIconClassName: deprecated(PropTypes.string, 'Use the `checkedIcon` prop instead'),
    checkedIconChildren: deprecated(PropTypes.node, 'Use the `checkedIcon` prop instead'),
    uncheckedIconClassName: deprecated(PropTypes.string, 'Use the `uncheckedIcon` prop instead'),
    uncheckedIconChildren: deprecated(PropTypes.node, 'Use the `uncheckedIcon` prop instead'),
  };

  static defaultProps = {
    indeterminateIcon: <FontIcon>indeterminate_check_box</FontIcon>,
    defaultSelectedRows: [],
    responsive: true,
    selectableRows: true,
    checkboxHeaderLabel: 'Toggle All Rows',
    checkboxLabelTemplate: 'Toggle row {{row}}',
    fixedHeader: false,
    fixedFooter: false,
    fixedDividers: true,
    headerHeight: 56,
    footerHeight: 48,
    fullWidth: true,
  };

  static childContextTypes = contextTypes;

  constructor(props) {
    super();

    const rows = props.defaultSelectedRows;
    this.state = {
      header: false,
      indeterminate: props.indeterminate ? false : undefined,
      allSelected: this._allSelected(rows),
      selectedRows: rows,
    };

    this._removed = 0;
    this._initial = true;
  }

  getChildContext() {
    const {
      checkedIcon,
      uncheckedIcon,
      indeterminateIcon,
      plain,
      baseId,
      selectableRows,
      checkboxHeaderLabel,
      checkboxLabelTemplate,
      fixedHeader,
      fixedFooter,

      // deprecated
      checkedIconChildren,
      checkedIconClassName,
      uncheckedIconChildren,
      uncheckedIconClassName,
      indeterminateIconChildren,
      indeterminateIconClassName,
    } = this.props;

    return {
      checkedIcon: getDeprecatedIcon(checkedIconClassName, checkedIconChildren, checkedIcon),
      uncheckedIcon: getDeprecatedIcon(uncheckedIconClassName, uncheckedIconChildren, uncheckedIcon),
      indeterminateIcon: getDeprecatedIcon(indeterminateIconClassName, indeterminateIconChildren, indeterminateIcon),
      indeterminate: this.state.indeterminate,
      plain,
      allSelected: this.state.allSelected,
      selectedRows: this.state.selectedRows,
      toggleSelectedRow: this._toggleSelectedRow,
      createCheckbox: this._createCheckbox,
      removeCheckbox: this._removeCheckbox,
      baseId,
      baseName: `${baseId}-control`,
      selectableRows,
      checkboxHeaderLabel,
      checkboxLabelTemplate,
      fixedHeader,
      fixedFooter,
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

  _setTable = (table) => {
    this._table = table;
  };

  _createCheckbox = (index) => {
    this.setState((state, props) => {
      const selectedRows = state.selectedRows.slice();
      // Only use the default selected rows prop on first mount. If other changes occur after,
      // default to false.
      const selected = this._initial && props.defaultSelectedRows[index] || false;
      selectedRows.splice(index, 0, selected);
      return { selectedRows, allSelected: this._allSelected(selectedRows) };
    });
  };

  _removeCheckbox = (index) => {
    this.setState((state) => {
      // When multiple checkboxes are removed in a render cycle, they are removed in list order.
      // So to keep the index correct while removing, need to keep subtract the provided index by
      // the current number of removed elements. This value gets reset to 0 after a finished cycle.
      const selectedRows = state.selectedRows.slice();

      // This is really ugly. React 16 doesn't need to track all this while React 15 does
      if (React.version && React.version.match(/^16\./)) {
        selectedRows.splice(index, 1);
      } else {
        selectedRows.splice(index - this._removed, 1);
        this._removed += 1;
      }
      return { selectedRows, allSelected: this._allSelected(selectedRows) };
    });
  };

  _toggleSelectedRow = (row, header, e) => {
    let selectedRows;
    let allSelected = this.state.allSelected;
    let selectedCount = 0;
    const i = this._table && this._table.querySelector('.md-table-header') ? row - 1 : row;
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
  };

  render() {
    const {
      style,
      className,
      tableStyle,
      tableClassName,
      fixedWrapperStyle,
      fixedWrapperClassName,
      fixedScrollWrapperStyle,
      fixedScrollWrapperClassName,
      children,
      plain,
      responsive,
      fixedHeader,
      fixedFooter,
      fixedDividers,
      fixedHeight,
      fixedWidth,
      headerHeight,
      footerHeight,
      fullWidth,
      /* eslint-disable no-unused-vars */
      indeterminate,
      indeterminateIcon,
      checkedIcon,
      uncheckedIcon,
      defaultSelectedRows,
      baseId,
      onRowToggle,
      selectableRows,
      checkboxHeaderLabel,
      checkboxLabelTemplate,

      // deprecated
      checkedIconChildren,
      checkedIconClassName,
      uncheckedIconChildren,
      uncheckedIconClassName,
      indeterminateIconChildren,
      indeterminateIconClassName,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const table = (
      <table
        {...props}
        ref={this._setTable}
        style={responsive ? tableStyle : style}
        className={cn('md-data-table', {
          'md-data-table--plain': plain,
          'md-data-table--full-width': fullWidth,
          [className]: !responsive && className,
          [tableClassName]: responsive && tableClassName,
        })}
      >
        {children}
      </table>
    );

    if (!responsive) {
      return table;
    }

    let content = table;
    if (fixedHeader || fixedFooter) {
      let height = fixedHeight;
      if (fixedHeight) {
        if (fixedHeader) {
          height -= headerHeight;
        }

        if (fixedFooter) {
          height -= footerHeight;
        }
      }

      let borderTop = fixedHeader;
      let borderBot = fixedFooter;
      if (typeof fixedDividers === 'boolean') {
        borderTop = borderTop && fixedDividers;
        borderBot = borderBot && fixedDividers;
      } else {
        borderTop = borderTop && (typeof fixedDividers.header === 'undefined' || fixedDividers.header);
        borderBot = borderBot && (typeof fixedDividers.footer === 'undefined' || fixedDividers.footer);
      }

      content = (
        <div
          style={fixedWrapperStyle}
          className={cn('md-data-table__fixed-wrapper', {
            'md-data-table__fixed-wrapper--header': fixedHeader,
            'md-data-table__fixed-wrapper--footer': fixedFooter,
          }, fixedWrapperClassName)}
        >
          <div
            style={{ height, ...fixedScrollWrapperStyle }}
            className={cn('md-data-table__scroll-wrapper', {
              'md-divider-border': fixedDividers,
              'md-divider-border--top': borderTop,
              'md-divider-border--bottom': borderBot,
            }, fixedScrollWrapperClassName)}
          >
            {table}
          </div>
        </div>
      );
    }

    return (
      <div
        style={{ width: fixedWidth, ...style }}
        className={cn('md-data-table--responsive', {
          'md-data-table--fixed': fixedHeader || fixedFooter,
        }, className)}
      >
        {content}
      </div>
    );
  }
}
