import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { isPropEnabled, mergeClassNames } from '../utils';
import Ink from '../Inks';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string,
    children: PropTypes.node,
    flat: PropTypes.bool,
    raised: PropTypes.bool,
    floating: PropTypes.bool,
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
    if(isPropEnabled(this.props, 'floating')) {
      return children;
    } else if(!children) {
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
    const { className, iconBefore, label, children, href, ...props } = this.props;
    const disabled = isPropEnabled(props, 'disabled');

    const button = React.createElement(href ? 'a' : 'button', {
      ...props,
      href: href,
      className: mergeClassNames(props, 'md-btn', className),
    }, this.renderChildren());
    return (
      <Ink disabled={disabled}>
        {button}
      </Ink>
    );
  }
}
