import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import FontIcon from '../FontIcons';
import InkedControl from './InkedControl';


export default class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { checked: props.defaultChecked };
  }

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool.isRequired,
    label: PropTypes.node,
    labelBefore: PropTypes.bool.isRequired,
    checkedIcon: PropTypes.node.isRequired,
    uncheckedIcon: PropTypes.node.isRequired,
    name: PropTypes.string,
  };

  static defaultProps = {
    defaultChecked: false,
    labelBefore: false,
    checkedIcon: <FontIcon>check_box</FontIcon>,
    uncheckedIcon: <FontIcon>check_box_outline_blank</FontIcon>,
  };

  isChecked = () => {
    return typeof this.props.checked === 'undefined' ? this.state.checked : this.props.checked;
  };

  handleChange = (e) => {
    const { onChange, checked } = this.props;
    onChange && onChange(e);
    if(typeof checked === 'undefined') {
      this.setState({ checked: !this.state.checked });
    }
  };

  render() {
    const checked = this.isChecked();
    const {
      className,
      disabled,
      label,
      labelBefore,
      checkedIcon,
      uncheckedIcon,
      name,
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
          type="checkbox"
          className="md-control-input"
          checked={checked}
          onChange={this.handleChange}
          name={name}
          value={value}
        />
        <InkedControl
          type="checkbox"
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
