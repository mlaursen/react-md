import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import InkedControl from './InkedControl';

/**
 * This is the component that is used for the `Checkbox` component
 * and the `Radio` component. This is a label that includes
 * the input type, an icon showing the state of the control,
 * and an optional label.
 */
export default class ControlContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { checked: props.defaultChecked };
  }

  static propTypes = {
    /**
     * The type of the selection control.
     */
    type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,

    /**
     * The optional className to apply to the surrounding label.
     */
    className: PropTypes.string,

    /**
     * Boolean if the control is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional function to call when the checked state is called.
     */
    onChange: PropTypes.func,

    /**
     * An optional value for the control field.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    /**
     * Boolean if the control field is checked by default.
     */
    defaultChecked: PropTypes.bool.isRequired,

    /**
     * Boolean if this control is currently checked. This will
     * require the `onChange` prop to be defined since it will
     * become a controlled component.
     */
    checked: PropTypes.bool,

    /**
     * The icon to use for the checked state.
     */
    checkedIcon: PropTypes.node.isRequired,

    /**
     * The icon to use for the unchecked state.
     */
    uncheckedIcon: PropTypes.node.isRequired,

    /**
     * An optional label to display with the control.
     */
    label: PropTypes.node,

    /**
     * Boolean if the label should be displayed before or after the control field.
     */
    labelBefore: PropTypes.bool.isRequired,

    /**
     * An optional form name to give to the control.
     */
    name: PropTypes.string,
  };

  isChecked = () => {
    return typeof this.props.checked === 'undefined' ? this.state.checked : this.props.checked;
  };

  handleChange = (e) => {
    const { onChange, value, type } = this.props;
    const checked = !this.isChecked();
    if(onChange) {
      const arg = type === 'radio' ? value : checked;
      onChange(arg, e);
    }

    // prevents 2 change events triggering
    e.stopPropagation();

    if(typeof this.props.checked === 'undefined') {
      this.setState({ checked });
    }
  };

  render() {
    const isChecked = this.isChecked();
    const {
      className,
      disabled,
      label,
      labelBefore,
      checkedIcon,
      uncheckedIcon,
      name,
      value,
      type,
      ...props,
    } = this.props;

    delete props.checked;

    return (
      <label
        {...props}
        className={classnames('md-control-container', className, { disabled })}
      >
        {labelBefore && label}
        <input
          disabled={disabled}
          type={type}
          className="md-control-input"
          checked={isChecked}
          onChange={this.handleChange}
          name={name}
          value={value}
        />
        <InkedControl
          type={type}
          checked={isChecked}
          disabled={disabled}
        >
          {isChecked ? checkedIcon : uncheckedIcon}
        </InkedControl>
        {!labelBefore && label}
      </label>
    );
  }
}
