import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class DataTable extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    uncheckedIconClassName: PropTypes.string.isRequired,
    uncheckedIconChildren: PropTypes.node,
    checkedIconClassName: PropTypes.string.isRequired,
    checkedIconChildren: PropTypes.node,
    onHeaderCheckboxClick: PropTypes.func,
    defaultSelected: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]),
    multiselect: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    uncheckedIconChildren: 'check_box_outline_blank',
    uncheckedIconClassName: 'material-icons',
    checkedIconChildren: 'check_box',
    checkedIconClassName: 'material-icons',
    onHeaderCheckboxClick: function() {},
    multiselect: true,
  };

  static childContextTypes = {
    uncheckedIconClassName: PropTypes.string.isRequired,
    uncheckedIconChildren: PropTypes.node,
    checkedIconClassName: PropTypes.string.isRequired,
    checkedIconChildren: PropTypes.node,
  };

  getChildContext = () => {
    const {
      uncheckedIconChildren,
      uncheckedIconClassName,
      checkedIconChildren,
      checkedIconClassName,
    } = this.props;

    return {
      uncheckedIconChildren,
      uncheckedIconClassName,
      checkedIconChildren,
      checkedIconClassName,
    };
  };

  render() {
    const { className, children } = this.props;
    return (
      <table className={classnames('md-data-table', className)}>
        {children}
      </table>
    );
  }
}
