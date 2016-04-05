import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import FontIcon from '../FontIcons';
import InkedControl from './InkedControl';


export default class Radio extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    defaultChecked: PropTypes.bool.isRequired,
    checked: PropTypes.bool,
    checkedIcon: PropTypes.node.isRequired,
    uncheckedIcon: PropTypes.node.isRequired,
    label: PropTypes.node,
    labelBefore: PropTypes.bool.isRequired,
    name: PropTypes.string,
  };

  static defaultProps = {
    labelBefore: false,
    defaultChecked: false,
    checkedIcon: <FontIcon>radio_button_checked</FontIcon>,
    uncheckedIcon: <FontIcon>radio_button_unchecked</FontIcon>,
  };

  isChecked = () => {
    return typeof this.props.checked === 'undefined' ? this.state.checked : this.props.checked;
  };

  handleChange = (e) => {
    const { onChange, value } = this.props;
    onChange && onChange(value, e);
    // prevents 2 change events triggering
    e.stopPropagation();
  };

  render() {
    const {
      className,
      disabled,
      label,
      labelBefore,
      checkedIcon,
      uncheckedIcon,
      name,
      checked,
      value,
      ...props,
    } = this.props;

    return (
      <label
        {...props}
        className={classnames('md-control-container', className, { disabled })}
      >
        {labelBefore && label}
        <input
          disabled={disabled}
          type="radio"
          className="md-control-input"
          checked={checked}
          onChange={this.handleChange}
          name={name}
          value={value}
        />
        <InkedControl
          type="radio"
          checked={checked}
          disabled={disabled}
        >
          {checked ? checkedIcon : uncheckedIcon}
        </InkedControl>
        {!labelBefore && label}
      </label>
    );
  }
}
