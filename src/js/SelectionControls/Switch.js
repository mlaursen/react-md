import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import { LEFT_MOUSE } from '../constants/keyCodes';

export default class Switch extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * Boolean if the switch is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Boolean if the switch is toggled on by default.
     */
    defaultToggled: PropTypes.bool.isRequired,

    /**
     * Boolean if the switch is toggled on. This will make the switch
     * a controlled component which requires the `onChange` prop to be
     * set.
     */
    toggled: PropTypes.bool,

    /**
     * An optional function to call when the toggled state changes.
     * It will be called with the next toggled state and the click event.
     *
     * `onChange(!toggled, event)`.
     */
    onChange: PropTypes.func,

    /**
     * An optional value to apply to the switch.
     */
    value: PropTypes.string,

    /**
     * An optional label to display with the switch.
     */
    label: PropTypes.node,

    /**
     * Boolean if the label should appear before the switch.
     */
    labelBefore: PropTypes.bool,

    /**
     * An optional id for the switch.
     */
    id: PropTypes.string,
  };

  static defaultProps = {
    defaultToggled: false,
  };

  constructor(props) {
    super(props);

    this.state = { toggled: props.defaultToggled, active: false, leaving: false };
    this._toggleCheck = this._toggleCheck.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
  }

  _isToggled(props, state) {
    return typeof props.toggled === 'undefined' ? state.toggled : props.toggled;
  }

  _toggleCheck(e) {
    const { onChange } = this.props;
    const toggled = !this._isToggled(this.props, this.state);
    if (onChange) {
      onChange(toggled, e);
    }

    if (typeof this.props.toggled === 'undefined') {
      this.setState({ toggled });
    }
  }

  _handleMouseDown(e) {
    if (!this.props.disabled && !this.timeout && e.button === LEFT_MOUSE && !e.ctrlKey) {
      this.setState({ active: true, leaving: false });
    }
  }

  _handleMouseUp(e) {
    if (!this.props.disabled && this.state.active && !this.timeout && e.button === LEFT_MOUSE && !e.ctrlKey) {
      this.timeout = setTimeout(() => {
        this.timeout = null;
        this.setState({ active: false, leaving: false });
      }, 600);

      this.setState({ leaving: true });
    }
  }

  render() {
    const { active, leaving } = this.state;
    const { className, label, labelBefore, disabled, style, id, ...props } = this.props;
    delete props.toggled;
    delete props.defaultToggled;

    const labelClassName = cn('md-control-container', className, { disabled });

    const spanLabel = label ? <span className="label">{label}</span> : null;
    return (
      <label
        className={labelClassName}
        onMouseDown={this._handleMouseDown}
        onMouseUp={this._handleMouseUp}
        style={style}
        htmlFor={id}
      >
        {labelBefore && spanLabel}
        <div className="md-switch-container">
          <input
            {...props}
            id={id}
            type="checkbox"
            checked={this._isToggled(this.props, this.state)}
            className="md-control-input"
            onChange={this._toggleCheck}
            disabled={disabled}
          />
          <div className="md-switch">
            <span className={cn('md-ink', { active, leaving })} />
          </div>
        </div>
        {!labelBefore && spanLabel}
      </label>
    );
  }
}

