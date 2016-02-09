import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils';
import FloatingLabel from './FloatingLabel';
import TextDivider from './TextDivider';

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export default class TextField extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      active: false,
      currentRows: props.rows,
      value: props.defaultValue,
    };
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: valueType,
    defaultValue: valueType,
    rows: PropTypes.number,
    errorText: PropTypes.string,
    infoText: PropTypes.string,
    maxLength: PropTypes.number,
    floatingLabel: PropTypes.bool,
    icon: PropTypes.node,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']),
  };

  static defaultProps = {
    type: 'text',
    defaultValue: '',
    floatingLabel: true,
    lineDirection: 'left',
  };

  getValue = () => {
    return typeof this.props.value === 'undefined' ? this.state.value : this.props.value;
  };

  handleFocus = (e) => {
    if(this.props.onFocus) {
      this.props.onFocus(e);
    }

    this.setState({ active: true });
  };

  handleBlur = (e) => {
    if(this.props.onBlur) {
      this.props.onBlur(e);
    }

    this.setState({ active: false });
  };

  handleChange = (e) => {
    const { value } = e.target;
    if(this.props.onChange) {
      this.props.onChange(value, e);
    }

    if(typeof this.props.value !== 'undefined') { return; }
    let state = { value };

    this.setState(state);
  };

  render() {
    const { className, label, placeholder, maxLength, errorText, floatingLabel, icon, lineDirection, ...props } = this.props;
    const { active } = this.state;
    const value = this.getValue();
    const error = !!errorText || (!maxLength && value.length > maxLength);
    const required = isPropEnabled(props, 'required');

    let fontIcon;
    if(icon) {
      fontIcon = React.cloneElement(icon, {
        className: classnames('md-text-field-icon', {
          active,
          error,
          'normal': !!value,
        }),
      });
    }

    const textFieldProps = {
      value,
      ...props,
      className: classnames('md-text-field', { active }),
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKeyDown,
      onChange: this.handleChange,
    };

    return (
      <div
        className={classnames('md-text-field-container', className, {
          'single-line': !floatingLabel,
          'multi-line': false,
        })}
      >
        <label>
          {fontIcon}
          {floatingLabel && label &&
          <FloatingLabel
            label={label}
            active={active}
            error={error}
            required={required}
            value={value}
          />
          }
          <input
            {...textFieldProps}
            placeholder={!floatingLabel ? label : placeholder}
          />
          <TextDivider
            icon={!!icon}
            active={active}
            error={error}
            lineDirection={lineDirection}
          />
        </label>
      </div>
    );
  }
}
