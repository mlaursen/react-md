import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled, mergeClassNames } from '../utils';
import { TAB } from '../constants/keyCodes';
import Ink from '../Ink';

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
  };

  static defaultProps = {
    type: 'button',
    iconBefore: true,
  };

  handleKeyUp = (e) => {
    if((e.keyCode || e.which) === TAB) {
      this.setState({ focused: true });
    }
  };

  handleBlur = () => {
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
    const isDisabled = isPropEnabled(props, 'disabled');
    return (
      <button
        {...props}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        className={classnames(mergeClassNames(props, className, 'md-btn'), {
          'md-floating-btn': isPropEnabled(props, 'floating'),
          'md-flat-btn': !isDisabled && isPropEnabled(props, 'flat'),
          'md-raised-btn': !isDisabled && isPropEnabled(props, 'raised'),
        })}
        >
        <Ink key="ink" disabled={isPropEnabled(props, 'disabled')} focused={focused} />
        {this.renderChildren()}
      </button>
    );
  }
}
