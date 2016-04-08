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
    header: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    header: false,
  };

  render() {
    const { className, numeric, adjusted, header, children, ...props } = this.props;
    return (
      <td className={classnames(`md-table-${header ? 'header' : 'data'}`, className, { numeric, adjusted })} {...props}>
        {children}
      </td>
    );
  }
}
