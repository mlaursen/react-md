import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import TableCheckbox from './TableCheckbox';

export default class TableRow extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: props.defaultSelected,
      biggest: null,
      widths: [],
    };
  }

  static propTypes = {
    defaultSelected: PropTypes.bool,
    selected: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    onClick: PropTypes.func,
    onCheckboxClick: PropTypes.func,
  };

  static defaultProps = {
    defaultSelected: false,
  };

  static contextTypes = {
    plain: PropTypes.bool,
  };

  componentDidMount() {
    this.setLongestColumn();
  }

  isSelected = () => {
    return typeof this.props.selected === 'undefined' ? this.state.selected : this.props.selected;
  };

  handleCheckboxClick = (e) => {
    e.stopPropagation();
    const { onCheckboxClick, selected } = this.props;
    onCheckboxClick && onCheckboxClick(e);

    if(typeof selected === 'undefined') {
      this.setState({ selected: !this.state.selected });
    }
  };

  setLongestColumn = () => {
    const widths = [];
    const biggest = Array.prototype.slice.call(ReactDOM.findDOMNode(this).querySelectorAll('.md-table-data,.md-table-header')).reduce((prev, curr, i) => {
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
    const { className, children, onCheckboxClick, ...props } = this.props;
    const selected = this.isSelected();
    const { biggest, widths } = this.state;

    let checkbox;
    if(!this.context.plain) {
      checkbox = <TableCheckbox key="checkbox" checked={selected} onClick={this.handleCheckboxClick} />;
    }

    const columns = React.Children.map(children, (column, i) => {
      return React.cloneElement(column, {
        key: column.key || i,
        ...column.props,
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
