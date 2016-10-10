import React, { Component, PropTypes, Children } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import headerContextTypes from './headerContextTypes';
import rowContextTypes from './rowContextTypes';
import TableCheckbox from './TableCheckbox';

/**
 * A component for displaying a row in a `DataTable`. This will
 * automatically add a `Checkbox` component to the row if it is not
 * a `plain` table.
 *
 * This component will also automatically adjust the padding between
 * columns based on the longest column if the `autoAdjust` prop
 * is set to true.
 */
export default class TableRow extends Component {
  static propTypes = {
    /**
     * Boolean if the row is currently selected. If this value will be
     * injected by the `TableHeader` or `TableBody` component.
     */
    selected: PropTypes.bool,

    /**
     * An optional className to apply to the row.
     */
    className: PropTypes.string,

    /**
     * A list of `TableColumn` to display in the table.
     *
     * > There should be at least 3 columns in a Data table (non plain)
     */
    children: PropTypes.arrayOf(PropTypes.node).isRequired,

    /**
     * An optional onClick function to call when a row is clicked.
     */
    onClick: PropTypes.func,

    /**
     * A function to call when the checkbox is clicked. This
     * function will will be called with `(rowIndex, event)`. The
     * `TableBody` and `TableHeader` components will automatically
     * merge in a function to goggle the checkbox.
     */
    onCheckboxClick: PropTypes.func,

    /**
     * A boolean if the row should automatically check all the `TableColumn`s in the row
     * and add the className `grow` to the one that is the biggest. You can also disable
     * individual columns by adding the className `.prevent-grow` to them.
     */
    autoAdjust: PropTypes.bool.isRequired,

    /**
     * An optional function to call onMouseOver.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call onMouseLeave.
     */
    onMouseLeave: PropTypes.func,

    index: PropTypes.number,
  };

  static defaultProps = {
    autoAdjust: true,
  };

  static contextTypes = headerContextTypes;
  static childContextTypes = rowContextTypes;

  constructor(props, context) {
    super(props, context);

    this.state = {
      biggest: null,
      widths: [],
      hover: false,
    };

    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._setLongestColumn = this._setLongestColumn.bind(this);
  }

  getChildContext() {
    const { baseId, ...context } = this.context;
    return {
      ...context,
      rowId: context.header ? `${baseId}CheckboxToggleAll` : `${baseId}${this.props.index}`,
    };
  }

  componentDidMount() {
    if (this.props.autoAdjust) {
      this._setLongestColumn();
    }
  }

  /**
   * Need to ignore adding the hvoer state if the mouse is over a menu/menu item
   * or the edit dialog is open.
   *
   * @param {Function} classList - the classList to use for checking cn
   * @return {Boolean} true if the hover state should be ignored for this classList
   */
  _ignoreHoverState(classList) {
    return classList.contains('md-list--menu')
      || ['md-edit-dialog', 'md-edit-dialog--active'].every(className => classList.contains(className));
  }

  _handleMouseOver(e) {
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
  }

  _handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (this.context.header) {
      return;
    }

    this.setState({ hover: false });
  }

  _setLongestColumn() {
    const widths = [];
    const biggest = Array.prototype.slice.call(
      findDOMNode(this).querySelectorAll(
        '.md-table-data:not(.prevent-grow),.md-table-header:not(.prevent-grow)'
      )
    ).reduce((prev, curr, i) => {
      const width = curr.offsetWidth;
      widths.push(width);
      if (prev.width < width) {
        return { i, width };
      } else {
        return prev;
      }
    }, { width: 0, i: 0 });

    this.setState({ biggest, widths });
  }

  render() {
    const { biggest, widths, hover } = this.state;
    const { className, children, selected, onCheckboxClick, ...props } = this.props;
    delete props.autoAdjust;
    delete props.index;

    let checkbox;
    if (!this.context.plain) {
      checkbox = <TableCheckbox key="checkbox" checked={selected} onChange={onCheckboxClick} />;
    }

    const columns = Children.map(children, (column, i) => React.cloneElement(column, {
      ...column.props,
      header: typeof column.props.header === 'undefined'
        ? this.context.header
        : column.props.header,
      className: cn({
        'md-table-column--grow': biggest && biggest.i === i,
        // Not last item and the biggest width is greater than this item
        'md-table-column--adjusted': children.length > i + 1 && biggest && biggest.width > widths[i],
      }, column.props.className),
    }));

    return (
      <tr
        {...props}
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
