import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Toolbar } from '../index';

export default class AppBar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    primary: PropTypes.bool,
    title: PropTypes.string,
    leftNode: PropTypes.node,
    rightNode: PropTypes.node,
  }

  static defaultProps = {
    primary: true,
  }

  render() {
    const { primary, title, leftNode, rightNode } = this.props;
    return (
      <Toolbar primary={primary} className="md-app-bar">
        <div className="md-app-bar-left">
          {leftNode}
          <h4 className="md-app-bar-title">{title}</h4>
        </div>
        <div className="md-app-bar-right">
          {rightNode}
        </div>
      </Toolbar>
    );
  }
}
