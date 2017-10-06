import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import deprecated from 'react-prop-types/lib/deprecated';
import cn from 'classnames';

import getField from '../utils/getField';
import headerContextTypes from './headerContextTypes';
import rowContextTypes from './rowContextTypes';
import TableCheckbox from './TableCheckbox';

/**
 * A component for displaying a row in a `DataTable`. This will
 * automatically add a `Checkbox` component to the row if it is not
 * a `plain` table.
 */
export default class TableRow extends Component {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the row.
     */
    className: PropTypes.string,

    /**
     * A single or list of `TableColumn` to display in the table.
     *
     * > The specs "require" at least 3 columns for a non-plain data table, but that isn't
     * strictly enforced here.
     */
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,

    /**
     * An optional onClick function to call when a row is clicked.
     */
    onClick: PropTypes.func,

    /**
     * A function to call when the checkbox is clicked. This
     * function will will be called with `(rowIndex, checked, event)`.
     * The `TableBody` and `TableHeader` components will automatically
     * merge in a function to toggle the checkbox.
     */
    onCheckboxClick: PropTypes.func,

    /**
     * An optional function to call onMouseOver.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call onMouseLeave.
     */
    onMouseLeave: PropTypes.func,

    /**
     * Boolean if the row is currently selected. If this value will be
     * injected by the `TableHeader` or `TableBody` component.
     */
    selected: PropTypes.bool,

    /**
     * Boolean if the current row is selectable. This value will take precedence over anything inherited
     * by the `DataTable`.
     */
    selectable: PropTypes.bool,

    autoAdjust: deprecated(PropTypes.bool, 'Manually specify `grow` on one of the columns instead'),
  };

  static contextTypes = headerContextTypes;
  static childContextTypes = rowContextTypes;

  constructor(props, context) {
    super(props, context);

    this.state = { hover: false };
  }

  getChildContext() {
    const { baseId, ...context } = this.context;
    const id = `${baseId}-${this._row ? this._row.rowIndex : null}`;
    return {
      ...context,
      rowId: context.header ? `${baseId}-toggle-all` : id,
    };
  }

  /**
   * Need to ignore adding the hover state if the mouse is over a menu/menu item
   * or the edit dialog is open.
   *
   * @param {Function} classList - the classList to use for checking cn
   * @return {Boolean} true if the hover state should be ignored for this classList
   */
  _ignoreHoverState(classList) {
    return classList.contains('md-list--menu') || classList.contains('md-edit-dialog');
  }

  _handleMouseOver = (e) => {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    if (this.context.header) {
      return;
    }

    let target = e.target;
    while (target && target.parentNode) {
      if (target.classList && this._ignoreHoverState(target.classList)) {
        this.setState({ hover: false });
        return;
      }

      target = target.parentNode;
    }

    this.setState({ hover: true });
  };

  _handleMouseLeave = (e) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (this.context.header) {
      return;
    }

    this.setState({ hover: false });
  };

  _handleCheckboxClick = (checked, e) => {
    const { rowIndex } = this._row;
    if (this.props.onCheckboxClick) {
      this.props.onCheckboxClick(rowIndex, checked, e);
    }

    this.context.toggleSelectedRow(rowIndex, this.context.header, e);
  };

  _setRow = (row) => {
    this._row = row;
  };

  render() {
    const {
      className,
      children,
      selected,
      selectable,
      /* eslint-disable no-unused-vars */
      onCheckboxClick,
      // deprecated
      autoAdjust,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const { hover } = this.state;

    let checkbox;
    if (typeof selectable !== 'undefined' ? selectable : (!this.context.plain && this.context.selectableRows)) {
      checkbox = (
        <TableCheckbox
          key="checkbox"
          checked={selected}
          onChange={this._handleCheckboxClick}
          index={this._row ? this._row.rowIndex : null}
        />
      );
    }

    const length = Children.count(children) - 1;
    const columns = Children.map(Children.toArray(children), (col, i) => {
      let adjusted = col.props.adjusted;
      if (typeof adjusted === 'undefined') {
        adjusted = i === length ? false : undefined;
      }

      return cloneElement(col, {
        cellIndex: i + (checkbox ? 1 : 0),
        header: getField(col.props, this.context, 'header'),
        adjusted,
      });
    });

    return (
      <tr
        {...props}
        ref={this._setRow}
        className={cn('md-table-row', className, {
          'md-table-row--hover': hover,
          'md-table-row--active': !this.context.header && selected,
        })}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
      >
        {checkbox}
        {columns}
      </tr>
    );
  }
}
