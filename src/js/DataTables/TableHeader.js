import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class TableHeader extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    numeric: PropTypes.bool,
    adjusted: PropTypes.bool,
    grow: PropTypes.bool,
  };

  render() {
    const { className, numeric, adjusted, grow, children, ...props } = this.props;
    return (
      <th className={classnames('md-table-header', className, { numeric, adjusted, grow })} {...props}>
        {children}
      </th>
    );
  }
}
