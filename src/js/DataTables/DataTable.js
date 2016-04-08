import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class DataTable extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      allSelected: false,
      selectedRows: props.defaultSelected,
    };
  }

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    allSelected: PropTypes.bool,
    defaultSelected: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]),
    multiselect: PropTypes.bool.isRequired,
    responsive: PropTypes.bool.isRequired,

    /**
     * Boolean if this table should not include the checkboxes on each row.
     * This really means that the entire table is unselectable and you wish
     * to display as a normal table.
     */
    plain: PropTypes.bool,

    uncheckedIconClassName: PropTypes.string.isRequired,
    uncheckedIconChildren: PropTypes.node,
    checkedIconClassName: PropTypes.string.isRequired,
    checkedIconChildren: PropTypes.node,
  };

  static defaultProps = {
    uncheckedIconChildren: 'check_box_outline_blank',
    uncheckedIconClassName: 'material-icons',
    checkedIconChildren: 'check_box',
    checkedIconClassName: 'material-icons',
    multiselect: true,
    responsive: true,
  };

  static childContextTypes = {
    uncheckedIconClassName: PropTypes.string.isRequired,
    uncheckedIconChildren: PropTypes.node,
    checkedIconClassName: PropTypes.string.isRequired,
    checkedIconChildren: PropTypes.node,
    selectedRows: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]),
    plain: PropTypes.bool,
  };

  getChildContext = () => {
    const {
      uncheckedIconChildren,
      uncheckedIconClassName,
      checkedIconChildren,
      checkedIconClassName,
      plain,
    } = this.props;

    return {
      uncheckedIconChildren,
      uncheckedIconClassName,
      checkedIconChildren,
      checkedIconClassName,
      plain,
    };
  };

  render() {
    const { className, children, plain, style, responsive } = this.props;
    const table = (
      <table className={classnames('md-data-table', className, { 'full-width': plain })} style={style}>
        {children}
      </table>
    );

    return responsive ? <div className="md-data-table-container">{table}</div> : table;
  }
}
