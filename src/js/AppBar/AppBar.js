import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { Toolbar } from '../index';

export default class AppBar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    primary: PropTypes.bool,
    title: PropTypes.string,
    leftNode: PropTypes.node,
    rightNode: PropTypes.node,
    children: PropTypes.node,
  }

  static defaultProps = {
    primary: true,
  }

  render() {
    const { primary, title, className, leftNode, rightNode, children, ...props } = this.props;
    return (
      <Toolbar primary={primary} className={classnames('md-app-bar', className)} {...props}>
        <div className="md-app-bar-left">
          {leftNode}
          {title && <h4 className="md-app-bar-title">{title}</h4>}
        </div>
        {children}
        <div className="md-app-bar-right">
          {rightNode}
        </div>
      </Toolbar>
    );
  }
}
