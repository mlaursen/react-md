import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class TableData extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    numeric: PropTypes.bool,
    adjusted: PropTypes.bool,
  };

  render() {
    const { className, numeric, adjusted, children, ...props } = this.props;
    return (
      <td className={classnames('md-table-data', className, { numeric, adjusted })} {...props}>
        {children}
      </td>
    );
  }
}
