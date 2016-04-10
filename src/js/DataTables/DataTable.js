import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

/**
 * The `DataTable` component is used to manage the state of all rows.
 * This can either be a __plain__ table or a __data__ table.
 *
 * A __data__ table will include checkboxes on each row while a __plain__ table
 * will not.
 */
export default class DataTable extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      allSelected: props.defaultSelectedRows.filter(b => b).length === 0,
      selectedRows: props.defaultSelectedRows,
    };
  }

  static propTypes = {
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

  static childContextTypes = {
    uncheckedIconClassName: PropTypes.string.isRequired,
    uncheckedIconChildren: PropTypes.node,
    checkedIconClassName: PropTypes.string.isRequired,
    checkedIconChildren: PropTypes.node,
    plain: PropTypes.bool,
    allSelected: PropTypes.bool.isRequired,
    selectedRows: PropTypes.arrayOf(PropTypes.bool).isRequired,
    toggleAllRows: PropTypes.func.isRequired,
    toggleSelectedRow: PropTypes.func.isRequired,
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
      allSelected: this.state.allSelected,
      selectedRows: this.state.selectedRows,
      toggleAllRows: this.toggleAllRows,
      toggleSelectedRow: this.toggleSelectedRow,
    };
  };

  componentDidMount() {
    this.initializeRows();
  }

  toggleAllRows = () => {
    const allSelected = !this.state.allSelected;
    this.setState({
      allSelected,
      selectedRows: this.state.selectedRows.map(() => allSelected),
    });
  };

  toggleSelectedRow = (row) => {
    const selectedRows = this.state.selectedRows.slice();
    selectedRows[row] = !selectedRows[row];

    this.setState({
      selectedRows,
      allSelected: selectedRows.filter(selected => selected).length === selectedRows.length,
    });
  };

  initializeRows = () => {
    const rows = ReactDOM.findDOMNode(this).querySelectorAll('.md-data-table tbody tr').length;

    const selectedRows = [];
    for(let i = 0; i < rows; i++) {
      selectedRows[i] = this.state.selectedRows[i] || false;
    }

    this.setState({
      selectedRows,
      allSelected: selectedRows.map(b => b).length === 0,
    });
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
