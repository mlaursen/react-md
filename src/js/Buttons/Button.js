import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';
import Ink from '../Ink';

const MD_BTN_TYPES = ['flat', 'raised', 'floating', 'icon'];
const MD_BTN_COLORS = ['default', 'primary', 'secondary'];


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
    icon: PropTypes.bool,
    type: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    disabled: PropTypes.bool,
    iconBefore: PropTypes.bool,
  };

  static defaultProps = {
    type: 'button',
    iconBefore: true,
  };

  getBtnClassName = () => {
    const keys = Object.keys(this.props);
    let className = 'md-btn';
    if(isPropEnabled(this.props, 'disabled', keys)) {
      return className + (isPropEnabled(this.props, 'floating', keys) ? ' md-btn-floating' : '');
    }

    let color = null;
    let mdType = null;
    let colorFound = false;
    let typeFound = false;
    keys.some(k => {
      if(isPropEnabled(this.props, k, MD_BTN_COLORS)) {
        color = k;
        colorFound = true;
      } else if(isPropEnabled(this.props, k, MD_BTN_TYPES)) {
        mdType = k;
        typeFound = true;
      }
      return colorFound && typeFound;
    });
    return classnames(className, {
      [`md-btn-${color}`]: color,
      [`md-btn-${mdType}`]: mdType,
    });
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
    const { className, iconBefore, label, children, ...props } = this.props;
    const btnClassName = classnames(this.getBtnClassName(), className);

    return (
      <button {...props} className={btnClassName}>
        <Ink key="ink" disabled={isPropEnabled(props, 'disabled')} />
        {this.renderChildren()}
      </button>
    );
  }
}
