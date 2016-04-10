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
    containerClassName: PropTypes.string,
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
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    style: PropTypes.object,
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
      containerClassName,
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
      required,
      helpOnFocus,
      fullWidth,
      defaultValue,
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
      ...props,
      value,
      className: classnames('md-text-field', className, {
        active,
        'floating-label': useFloatingLabel,
        'single-line': !useFloatingLabel && !multiline,
        'multi-line': multiline,
        'full-width': fullWidth,
      }),
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
    };

    let textField;
    if(multiline) {
      let areaStyle = style ? Object.assign({}, style) : {};
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
          style={style}
          placeholder={!useFloatingLabel ? (placeholder || label) : placeholder}
        />
      );
    }

    return (
      <div
        className={classnames('md-text-field-container', containerClassName, {
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
