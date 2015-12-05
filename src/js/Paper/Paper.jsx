import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class Paper extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    zDepth: PropTypes.number.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    zDepth: 1,
  }

  render() {
    const { children, zDepth, ...props } = this.props;
    const className = classnames('paper', `paper-${zDepth}`, props.className);
    return <div {...props} className={className}>{children}</div>;
  }
}
