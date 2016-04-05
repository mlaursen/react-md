import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { InkHOC } from '../Inks';

class Button extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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
  };

  static defaultProps = {
    type: 'button',
    iconBefore: true,
  };

  renderChildren = () => {
    const { children, iconBefore, label } = this.props;
    if(!children) {
      return label;
    } else if(children) {
      return (
        <div className="icon-separator">
          {iconBefore && children}
          <span className="text">{label}</span>
          {!iconBefore && children}
        </div>
      );
    }
    return label;
  };

  render() {
    const {
      className,
      iconBefore,
      label,
      children,
      href,
      primary,
      secondary,
      ...props,
    } = this.props;

    return React.createElement(href ? 'a' : 'button', {
      ...props,
      href: href,
      className: classnames('md-btn', className, {
        'md-primary': primary,
        'md-secondary': secondary,
      }),
    }, this.renderChildren());
  }
}

export default InkHOC(Button);
