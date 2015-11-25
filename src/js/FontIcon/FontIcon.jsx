import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class FontIcon extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  render() {
    return <i className={`md-icon ${this.props.className}`}>{this.props.children}</i>;
  }
}
