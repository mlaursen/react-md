import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import Toolbar from '../Toolbar';
import { isPropEnabled } from '../utils/PropUtils';

export default class AppBar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    title: PropTypes.string,
    leftNode: PropTypes.node,
    rightNode: PropTypes.node,
    children: PropTypes.node,
    withTabs: PropTypes.bool,
  };

  static defaultProps = {
    primary: true,
    secondary: false,
  };

  render() {
    const { primary, secondary, title, className, leftNode, rightNode, children, ...props } = this.props;
    return (
      <Toolbar
        primary={primary}
        secondary={secondary}
        className={classnames('md-app-bar', className, {
          'with-tabs': isPropEnabled(props, 'withTabs'),
        })}
        {...props}
        >
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
