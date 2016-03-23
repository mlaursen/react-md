import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import IconButton from './IconButton';

export default class FloatingButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    children: PropTypes.string,
    fixed: PropTypes.bool,
    mini: PropTypes.bool,
    avatar: PropTypes.node,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
  };

  render() {
    const {
      className,
      fixed,
      mini,
      primary,
      secondary,
      children,
      iconClassName,
      ...props,
    } = this.props;
    return (
      <IconButton
        {...props}
        className={classnames('md-floating-btn', className, {
          mini,
          fixed,
          'md-primary': primary,
          'md-secondary': secondary,
        })}
        iconClassName={iconClassName}
      >
        {children}
      </IconButton>
    );
  }
}
