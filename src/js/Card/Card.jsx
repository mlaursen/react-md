import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const { className, children, ...props } = this.props;
    return <div {...props} className={classnames('md-card', className)}>{children}</div>;
  }
}
