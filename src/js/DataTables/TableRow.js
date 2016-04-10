import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import TableCheckbox from './TableCheckbox';

/**
 * A component for displaying a row in a `DataTable`. This will
 * automatically add a `Checkbox` component to the row if it is not
 * a `plain` table.
 *
 * This component will also automatically adjust the padding between
 * columns based on the longest column if the `autoFindLongest` prop
 * is set to true.
 */
export default class TableRow extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      biggest: null,
      widths: [],
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

  handleCheckboxClick = (e) => {
    e.stopPropagation();
    const { onCheckboxClick } = this.props;
    onCheckboxClick && onCheckboxClick(e);
  };

  setLongestColumn = () => {
    const widths = [];
    const biggest = Array.prototype.slice.call(ReactDOM.findDOMNode(this).querySelectorAll('.md-table-data:not(.prevent-grow),.md-table-header:not(.prevent-grow)')).reduce((prev, curr, i) => {
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
    const { className, children, onCheckboxClick, selected, ...props } = this.props;
    const { biggest, widths } = this.state;

    let checkbox;
    if(!this.context.plain) {
      checkbox = <TableCheckbox key="checkbox" checked={selected} onClick={this.handleCheckboxClick} />;
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
      <tr {...props} className={classnames('md-table-row', className, { 'active': selected })}>
        {checkbox}
        {columns}
      </tr>
    );
  }
}
