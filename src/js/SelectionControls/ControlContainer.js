import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import InkedControl from './InkedControl';

export default class ControlContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { checked: props.defaultChecked };
  }

  static propTypes = {
    type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    defaultChecked: PropTypes.bool.isRequired,
    checked: PropTypes.bool,
    checkedIcon: PropTypes.node.isRequired,
    uncheckedIcon: PropTypes.node.isRequired,
    label: PropTypes.node,
    labelBefore: PropTypes.bool.isRequired,
    name: PropTypes.string,
  };

  isChecked = () => {
    return typeof this.props.checked === 'undefined' ? this.state.checked : this.props.checked;
  };

  handleChange = (e) => {
    const { onChange, value, checked } = this.props;
    onChange && onChange(value, e);
    // prevents 2 change events triggering
    e.stopPropagation();

    if(typeof checked === 'undefined') {
      this.setState({ checked: !this.state.checked });
    }
  };

  handleClick = (e) => {
    // Prevent 2 onChange after a click event
    e.stopPropagation();
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
          onClick={this.handleClick}
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
