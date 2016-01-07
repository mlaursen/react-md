import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';

export default class Control extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { checked: props.isInitiallyChecked };
    this.timeout = null;
  }

  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    isInitiallyChecked: PropTypes.bool,
    rippleTimeout: PropTypes.number,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    labelBefore: PropTypes.bool,
  };

  static defaultProps = {
    isInitiallyChecked: false,
    rippleTimeout: 450,
    labelPosition: false,
  };

  toggleCheck = (e) => {
    const { onChange, value } = this.props;
    if(value && onChange) {
      onChange(e);
    } else {
      onChange && onChange(e);
      this.setState({ checked: !this.state.checked });
    }
  };

  isNotProceedable = (e, up) => {
    const isMouse = e.type === `mouse${up ? 'up' : 'down'}` && e.button !== 2;
    const isKey = e.type === `key${up ? 'down' : 'up'}` && (e.which || e.keyCode) === 9;

    return isPropEnabled(this.props, 'disabled') || this.timeout !== null || (!isMouse && !isKey);
  };

  createRipple = (e) => {
    if(this.isNotProceedable(e, false)) {
      return;
    }

    this.setState({ focused: true, leaving: false });
  };

  removeRipple = (e) => {
    if(this.isNotProceedable(e, true)) {
      return;
    }

    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ leaving: false, focused: false });
    }, this.props.rippleTimeout);
    this.setState({ leaving: true });
  };

  render() {
    const { className, type, label, labelBefore, ...props } = this.props;
    const { focused, leaving, checked } = this.state;

    const labelClassName = classnames('md-control-label', `md-${type}-label`, className, {
      'disabled': isPropEnabled(props, 'disabled'),
    });
    const spanLabel = label ? <span className="label">{label}</span> : null;
    return (
      <label className={labelClassName} onMouseDown={this.createRipple} onMouseUp={this.removeRipple}>
        {labelBefore && spanLabel}
        <div className="md-control-container">
          <input
            type={type === 'switch' ? 'checkbox' : type}
            checked={checked}
            className="md-control-input"
            {...props}
            onChange={this.toggleCheck}
            onKeyDown={this.removeRipple}
            onKeyUp={this.createRipple}
          />
          <div className={`md-control md-${type}`} />
          <span className={classnames('ripple', { 'active': focused, 'leave': leaving })} />
        </div>
        {!labelBefore && spanLabel}
      </label>
    );
  }
}

