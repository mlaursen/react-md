import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';

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
  constructor(props, context) {
    super(props, context);

    this.state = {
      biggest: null,
      widths: [],
      hover: false,
    };
  }

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
  };

  static defaultProps = {
    autoAdjust: true,
  };

  static contextTypes = {
    plain: PropTypes.bool,
    header: PropTypes.bool,
  };

  componentDidMount() {
    if(this.props.autoAdjust) {
      this.setLongestColumn();
    }
  }

  /**
   * Need to ignore adding the hvoer state if the mouse is over a menu/menu item
   * or the edit dialog is open.
   *
   * @param {Function} classList - the classList to use for checking classNames
   * @return {Boolean} true if the hover state should be ignored for this classList
   */
  _ignoreHoverState(classList) {
    return classList.contains('md-menu')
      || ['md-edit-dialog', 'active'].every(cn => classList.contains(cn));
  }

  _handleMouseOver = (e) => {
    this.props.onMouseOver && this.props.onMouseOver(e);

    let target = e.target;
    while(target && target.parentNode) {
      if (target.classList && this._ignoreHoverState(target.classList)) {
        return this.setState({ hover: false });
      }

      target = target.parentNode;
    }

    this.setState({ hover: true });
  };

  _handleMouseLeave = (e) => {
    this.props.onMouseLeave && this.props.onMouseLeave(e);
    this.setState({ hover: false });
  };

  setLongestColumn = () => {
    const widths = [];
    const biggest = Array.prototype.slice.call(
      findDOMNode(this).querySelectorAll('.md-table-data:not(.prevent-grow),.md-table-header:not(.prevent-grow)')
    ).reduce((prev, curr, i) => {
      const width = curr.offsetWidth;
      widths.push(width);
      if(prev.width < width) {
        return { i, width };
      } else {
        return prev;
      }
    }, { width: 0, i: 0 });

    this.setState({ biggest, widths });
  };

  render() {
    const { biggest, widths, hover } = this.state;
    const { className, children, selected, onCheckboxClick, ...props } = this.props;
    delete props.autoAdjust;

    let checkbox;
    if(!this.context.plain) {
      checkbox = <TableCheckbox key="checkbox" checked={selected} onChange={onCheckboxClick} />;
    }

    const columns = React.Children.map(children, (column, i) => {
      return React.cloneElement(column, {
        key: column.key || i,
        ...column.props,
        header: typeof column.props.header === 'undefined' ? this.context.header : column.props.header,
        className: classnames(column.props.className, {
          'grow': biggest && biggest.i === i,
          // Not last item and the biggest width is greater than this item
          'adjusted': children.length > i + 1 && biggest && biggest.width > widths[i],
        }),
      });
    });

    return (
      <tr
        {...props}
        className={classnames('md-table-row', className, {
          hover,
          'active': selected,
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
