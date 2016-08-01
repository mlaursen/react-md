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
  };

  static defaultProps = {
    defaultToggled: false,
  };

  toggleCheck = (e) => {
    const { onChange } = this.props;
    const toggled = !this.isToggled();
    onChange && onChange(toggled, e);

    if(typeof this.props.toggled === 'undefined') {
      this.setState({ toggled });
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
    const { className, label, labelBefore, disabled, style, ...props } = this.props;
    delete props.toggled;
    delete props.defaultToggled;

    const labelClassName = classnames('md-control-container', className, { disabled });

    const spanLabel = label ? <span className="label">{label}</span> : null;
    return (
      <label
        className={labelClassName}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        style={style}
      >
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

