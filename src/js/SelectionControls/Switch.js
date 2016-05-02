import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { LEFT_MOUSE } from '../constants/keyCodes';

export default class Switch extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { toggled: props.defaultToggled, active: false, leaving: false };
  }

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    defaultToggled: PropTypes.bool.isRequired,
    toggled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.node,
    labelBefore: PropTypes.bool,
  };

  static defaultProps = {
    defaultToggled: false,
  };

  toggleCheck = (e) => {
    const { onChange } = this.props;
    onChange && onChange(e);
    if(typeof this.props.toggled === 'undefined') {
      this.setState({ toggled: !this.state.toggled });
    }
  };

  handleMouseDown = (e) => {
    if(!this.props.disabled && !this.timeout && e.button === LEFT_MOUSE && !e.ctrlKey) {
      this.setState({ active: true, leaving: false });
    }
  };

  handleMouseUp = (e) => {
    if(!this.props.disabled && this.state.active && !this.timeout && e.button === LEFT_MOUSE && !e.ctrlKey) {
      this.timeout = setTimeout(() => {
        this.timeout = null;
        this.setState({ active: false, leaving: false });
      }, 600);

      this.setState({ leaving: true });
    }
  };

  isToggled = () => {
    return typeof this.props.toggled === 'undefined' ? this.state.toggled : this.props.toggled;
  };

  render() {
    const { active, leaving } = this.state;
    const { className, label, labelBefore, disabled, ...props } = this.props;
    delete props.toggled;

    const labelClassName = classnames('md-control-container', className, { disabled });

    const spanLabel = label ? <span className="label">{label}</span> : null;
    return (
      <label className={labelClassName} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
        {labelBefore && spanLabel}
        <div className="md-switch-container">
          <input
            {...props}
            type="checkbox"
            checked={this.isToggled()}
            className="md-control-input"
            onChange={this.toggleCheck}
            disabled={disabled}
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

