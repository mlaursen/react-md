import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import injectInk from '../Inks';

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    disabled: PropTypes.bool,
    iconBefore: PropTypes.bool,
    href: PropTypes.string,

    // Injected from injectInk
    ink: PropTypes.node,
  };

  static defaultProps = {
    type: 'button',
    iconBefore: true,
  };

  constructor(props) {
    super(props);

    this._renderChildren = this._renderChildren.bind(this);
  }

  _renderChildren() {
    const { children, iconBefore, label } = this.props;
    if (!children) {
      return label;
    } else if (children) {
      return (
        <div className="icon-separator" key="label-icons">
          {iconBefore && children}
          <span className="text">{label}</span>
          {!iconBefore && children}
        </div>
      );
    }
    return label;
  }

  render() {
    const {
      className,
      href,
      primary,
      secondary,
      ink,
      ...props,
    } = this.props;

    delete props.iconBefore;
    delete props.label;
    delete props.children;

    return React.createElement(href ? 'a' : 'button', {
      ...props,
      href,
      className: cn('md-btn', className, {
        'md-primary': primary,
        'md-secondary': secondary,
      }),
    }, [ink, this._renderChildren()]);
  }
}

export default injectInk(Button);
