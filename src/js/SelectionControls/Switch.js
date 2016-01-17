import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils';
import { LEFT_MOUSE } from '../constants/keyCodes';

export default class Control extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { checked: isPropEnabled(props, 'defaultToggled'), active: false, leaving: false };
  }

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    defaultToggled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    labelBefore: PropTypes.bool,
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

  handleMouseDown = (e) => {
    if(!isPropEnabled(this.props, 'disabled') && !this.timeout && e.button === LEFT_MOUSE && !e.ctrlKey) {
      this.setState({ active: true, leaving: false });
    }
  };

  handleMouseUp = (e) => {
    if(!isPropEnabled(this.props, 'disabled') && this.state.active && !this.timeout && e.button === LEFT_MOUSE && !e.ctrlKey) {
      this.timeout = setTimeout(() => {
        this.timeout = null;
        this.setState({ active: false, leaving: false });
      }, 600);

      this.setState({ leaving: true });
    }
  };

  render() {
    const { className, label, checked, ...props } = this.props;
    const { active, leaving } = this.state;

    const labelBefore = isPropEnabled(props, 'labelBefore');
    const labelClassName = classnames('md-control-container', className, {
      'disabled': isPropEnabled(props, 'disabled'),
    });

    const isChecked = typeof this.props.checked === 'undefined' ? this.state.checked : checked;
    const spanLabel = label ? <span className="label">{label}</span> : null;
    return (
      <label className={labelClassName} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
        {labelBefore && spanLabel}
        <div className="md-switch-container">
          <input
            type="checkbox"
            checked={isChecked}
            {...props}
            className="md-control-input"
            onChange={this.toggleCheck}
          />
          <div className="md-switch">
            <span className={classnames('md-ink', { active, leaving })} />
          </div>
        </div>
        {!labelBefore && spanLabel}
      </label>
    );
  }
}

