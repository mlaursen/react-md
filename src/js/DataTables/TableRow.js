import React, { Component, PropTypes, Children, cloneElement } from 'react';
import cn from 'classnames';

import getField from '../utils/getField';
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

    /**
     * Boolean if the row is currently selected. If this value will be
     * injected by the `TableHeader` or `TableBody` component.
     */
    selected: PropTypes.bool,

    /**
     * The row's index in the table. This is injected via the `TableBody` component.
     */
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
      hover: false,
      selects: [],
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

  _setLongestColumn(row) {
    if (!row || !this.props.autoAdjust) {
      return;
    }

    const selects = [];
    const cols = Array.prototype.slice.call(row.querySelectorAll('.md-table-column'));
    const biggest = cols.reduce((prevBiggest, col, i) => {
      selects.push(!!col.className.match(/select-field/));
      if (col.className.match(/prevent-grow/)) {
        return prevBiggest;
      }

      const width = col.offsetWidth;
      if (prevBiggest.width < width) {
        return { width, index: i };
      }

      return prevBiggest;
    }, { width: 0, index: 0 });

    if (this.state.biggest && this.state.biggest.index === biggest.index) {
      return;
    }

    this.setState({ biggest, selects });
  }

  render() {
    const { hover, biggest, selects } = this.state;
    const {
      className,
      children,
      selected,
      onCheckboxClick,
      ...props
    } = this.props;
    delete props.index;
    delete props.autoAdjust;

    let checkbox;
    if (!this.context.plain) {
      checkbox = <TableCheckbox key="checkbox" checked={selected} onChange={onCheckboxClick} />;
    }

    const length = children.length;
    const columns = Children.map(Children.toArray(children), (col, i) => cloneElement(col, {
      header: getField(col.props, this.context, 'header'),
      className: cn({
        'md-table-column--grow': getField(col.props, this.context, 'header') && biggest && biggest.index === i,
        'md-table-column--adjusted': selects.length && !selects[i] && biggest && biggest.index !== i && i + 1 < length,
      }, col.props.className),
    }));

    return (
      <tr
        {...props}
        ref={this._setLongestColumn}
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
