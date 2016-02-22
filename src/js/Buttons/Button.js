import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { isPropEnabled, mergeClassNames } from '../utils';
import { TAB } from '../constants/keyCodes';
import Ink from '../Inks';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { focused: false };
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
    onKeyUp: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    type: 'button',
    iconBefore: true,
  };

  handleKeyUp = (e) => {
    if(this.props.onKeyUp) { this.props.onKeyUp(e); }
    if((e.keyCode || e.which) === TAB) {
      this.setState({ focused: true });
    }
  };

  handleBlur = (e) => {
    if(this.props.onBlur) { this.props.onBlur(e); }
    this.setState({ focused: false });
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
    const { focused } = this.state;
    const disabled = isPropEnabled(props, 'disabled');
    return (
      <button
        {...props}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        className={mergeClassNames(props, 'md-btn', className)}
        >
        <Ink key="ink" disabled={disabled} focused={focused} />
        {this.renderChildren()}
      </button>
    );
  }
}
