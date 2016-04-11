import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import FloatingLabel from './FloatingLabel';
import TextDivider from './TextDivider';
import TextFieldMessage from './TextFieldMessage';

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
      areaHeight: 'auto',
      value: props.defaultValue,
    };
  }

  static propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: valueType,
    defaultValue: valueType,
    rows: PropTypes.number,
    maxRows: PropTypes.number,
    errorText: PropTypes.string,
    helpText: PropTypes.string,
    helpOnFocus: PropTypes.bool,
    maxLength: PropTypes.number,
    floatingLabel: PropTypes.bool,
    icon: PropTypes.node,
    rightIcon: PropTypes.node,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onInput: PropTypes.func,
    onInvalid: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func,
    onSelect: PropTypes.func,
    style: PropTypes.object,
    inputStyle: PropTypes.object,
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']),
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
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

  handleChange = (e, reset = false) => {
    const { onChange, rows, maxRows } = this.props;
    const value = reset ? '' : e.target.value;
    if(onChange) {
      onChange(value, e);
    }

    if(typeof this.props.value !== 'undefined') {
      return;
    } else if(!rows || !maxRows) {
      this.setState({ value });
      return;
    }

    let state = { value };


    const { textarea } = this.refs;
    const { offsetHeight, scrollHeight } = textarea;
    let { currentRows, areaHeight } = this.state;

    const moreRows = maxRows !== -1 && currentRows >= maxRows;
    const noScroll = scrollHeight <= (typeof areaHeight === 'number' && areaHeight || offsetHeight);
    if(noScroll || moreRows) {
      this.setState(state);
      return;
    }

    currentRows++;
    state.currentRows = currentRows;
    state.areaHeight = scrollHeight;
    this.setState(state);
  };

  render() {
    const { active, currentRows, areaHeight } = this.state;
    const {
      className,
      inputClassName,
      label,
      placeholder,
      maxLength,
      helpText,
      errorText,
      floatingLabel,
      icon,
      rightIcon,
      lineDirection,
      rows,
      maxRows,
      style,
      inputStyle,
      required,
      helpOnFocus,
      fullWidth,
      defaultValue,
      onBlur,
      onChange,
      onFocus,
      onInput,
      onInvalid,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      onSelect,
      type,
      ...props,
    } = this.props;
    const value = this.getValue();
    const error = !!errorText || (!!maxLength && value.length > maxLength);
    const multiline = typeof rows === 'number';
    const useFloatingLabel = floatingLabel && !fullWidth;

    let fontIcon, textFieldMessage, indIcon;
    if(icon) {
      fontIcon = React.cloneElement(icon, {
        className: classnames('md-text-field-icon', {
          active,
          error,
          'with-floating-label': useFloatingLabel,
          'normal': !!value,
        }),
      });
    }

    if(rightIcon) {
      indIcon = React.cloneElement(rightIcon, {
        className: classnames('md-text-field-ind', {
          'single-line': !useFloatingLabel,
        }),
      });
    }

    if(errorText || maxLength || helpText) {
      textFieldMessage = (
        <TextFieldMessage
          value={value}
          error={error}
          helpOnFocus={helpOnFocus}
          active={active}
          message={errorText || helpText}
          maxLength={maxLength}
          className={icon ? 'icon-offset' : null}
        />
      );
    }

    const textFieldProps = {
      value,
      className: classnames('md-text-field', inputClassName, {
        active,
        'floating-label': useFloatingLabel,
        'single-line': !useFloatingLabel && !multiline,
        'multi-line': multiline,
        'full-width': fullWidth,
      }),
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onInput: onInput,
      onInvalid: onInvalid,
      onKeyDown: onKeyDown,
      onKeyPress: onKeyPress,
      onKeyUp: onKeyUp,
      onSelect: onSelect,
      type: type
    };

    let textField;
    if(multiline) {
      let areaStyle = inputStyle ? Object.assign({}, inputStyle) : {};
      if(maxRows) {
        if(currentRows < maxRows || maxRows === -1) {
          areaStyle.overflow = 'hidden';
        }

        if(areaHeight) {
          areaStyle.height = areaHeight;
        }
      }

      textField = (
        <textarea
          {...textFieldProps}
          placeholder={active || !useFloatingLabel || fullWidth ? (placeholder || label) : null}
          ref="textarea"
          rows={rows}
          style={areaStyle}
        />
      );
    } else {
      textField = (
        <input
          {...textFieldProps}
          style={inputStyle}
          placeholder={!useFloatingLabel ? (placeholder || label) : placeholder}
        />
      );
    }

    return (
      <div
        {...props}
        className={classnames('md-text-field-container', className, {
          'multi-line': multiline,
          'full-width': fullWidth,
          'with-message': helpText || errorText,
        })}
      >
        <label className="md-text-field-label">
          {fontIcon}
          {useFloatingLabel && label &&
          <FloatingLabel
            label={label}
            active={active}
            error={error}
            required={required}
            value={value}
          />
          }
          {textField}
          {indIcon}
          {!fullWidth &&
          <TextDivider
            icon={!!icon}
            active={active}
            error={error}
            lineDirection={lineDirection}
          />
          }
        </label>
        {textFieldMessage}
      </div>
    );
  }
}
