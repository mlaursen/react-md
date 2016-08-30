import React, { PureComponent, PropTypes, cloneElement, Children } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { TAB } from '../constants/keyCodes';
import { addSuffix } from '../utils/StringUtils';
import FontIcon from '../FontIcons';
import FloatingLabel from './FloatingLabel';
import TextDivider from './TextDivider';
import TextArea from './TextArea';
import Message from './Message';

export default class TextField extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    inputStyle: PropTypes.object,
    inputClassName: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    floatingLabel: PropTypes.bool,
    label: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf([
      'text',
      'number',
      'email',
      'search',
      'tel',
      'url',
      'password',
    ]).isRequired,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    active: PropTypes.bool,
    error: PropTypes.bool,
    floating: PropTypes.bool,
    required: PropTypes.bool,
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
    leftIcon: PropTypes.element,
    rightIcon: PropTypes.element,
    passwordIconChildren: PropTypes.node,
    passwordIconClassName: PropTypes.string,
    passwordInitiallyVisible: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    maxRows: PropTypes.number,
    customSize: PropTypes.string,
    errorText: PropTypes.string,
    helpText: PropTypes.string,
    helpOnFocus: PropTypes.bool,
    maxLength: PropTypes.number,
  };

  static defaultProps = {
    type: 'text',
    lineDirection: 'left',
    passwordIconChildren: 'remove_red_eye',
    passwordInitiallyVisible: false,
    rows: 2,
  };

  constructor(props) {
    super(props);

    let currentLength = 0;
    if (typeof props.value !== 'undefined') {
      currentLength = props.value.length;
    } else if (typeof props.defaultValue !== 'undefined') {
      currentLength = props.defaultValue.length;
    }

    this.state = {
      active: !!props.defaultValue || !!props.value,
      error: false,
      floating: !!props.defaultValue || !!props.value,
      passwordVisible: props.passwordInitiallyVisible,
      height: null,
      currentLength,
    };

    this.focus = this.focus.bind(this);
    this._blur = this._blur.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._togglePasswordField = this._togglePasswordField.bind(this);
    this._handleHeightChange = this._handleHeightChange.bind(this);
    this._findTextField = this._findTextField.bind(this);
    this._updateMultilineHeight = this._updateMultilineHeight.bind(this);
  }

  componentDidMount() {
    this._node = findDOMNode(this);
    this._findTextField();
    window.addEventListener('resize', this._updateMultilineHeight);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        currentLength: typeof nextProps.value !== 'undefined' ? nextProps.value.toString().length : 0,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { block, active } = this.props;
    if (block !== prevProps.block
      || active !== prevProps.active
      || this.state.active !== prevState.active
    ) {
      const fn = window[`${!block && (active || this.state.active) ? 'add' : 'remove'}EventListener`];
      fn('click', this._handleOutsideClick);
    }

    if (this.props.multiline !== prevProps.multiline) {
      this._findTextField();
    }
  }

  componentWillUnmount() {
    const { block, active } = this.props;
    if (!block && (active || this.state.active)) {
      window.removeEventListener('click', this._handleOutsideClick);
    }

    window.removeEventListener('resize', this._updateMultilineHeight);
  }

  focus() {
    this._textField.focus();
  }

  _findTextField() {
    if (this.props.multiline) {
      this._textField = this._node.querySelector('.md-text-field--multiline:last-child');
    } else {
      this._textField = this.refs.textField;
    }

    this._updateMultilineHeight();
  }

  _updateMultilineHeight() {
    if (!this.props.multiline) {
      return;
    }

    this._additionalHeight = parseInt(window.getComputedStyle(this._textField).getPropertyValue('margin-top'), 10);

    if (!this.props.block) {
      const divider = findDOMNode(this.refs.divider);
      const mb = parseInt(window.getComputedStyle(divider).getPropertyValue('margin-bottom'), 10);
      this._additionalHeight += (mb === 4 ? 12 : 16);
    }
  }

  _blur() {
    const value = this._textField.value;

    this.setState({
      active: false,
      error: this.props.required && !value,
      floating: !!value,
    });
  }

  _handleOutsideClick(e) {
    if (!this._node.contains(e.target)) {
      this._blur();
    }
  }

  _handleFocus(e) {
    const { onFocus, block } = this.props;
    if (onFocus) {
      onFocus(e);
    }

    if (!block) {
      this.setState({ active: true, floating: true });
    }
  }

  _handleChange(e) {
    const { onChange, maxLength } = this.props;
    if (onChange) {
      onChange(e.target.value, e);
    }

    if (typeof maxLength !== 'undefined') {
      const currentLength = e.target.value.length;
      this.setState({ currentLength, error: currentLength > maxLength });
    }
  }

  _handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if (!this.props.block && (e.which || e.keyCode) === TAB) {
      this._blur();
    }
  }

  _togglePasswordField() {
    this.setState({ passwordVisible: !this.state.passwordVisible }, this.focus);
  }

  _handleHeightChange(height) {
    if (this._additionalHeight) {
      this.setState({ height: height + this._additionalHeight });
    }
  }

  _cloneIcon(icon, active, error, disabled) {
    if (!icon) {
      return icon;
    }

    try {
      const iconEl = Children.only(icon);
      return cloneElement(iconEl, {
        className: cn('md-text-field-icon', {
          'md-text-field-icon--disabled': disabled,
          'md-text-field-icon--active': !error && active,
          'md-text-field-icon--error': error,
        }, iconEl.props.className),
      });
    } catch (e) {
      return icon;
    }
  }

  render() {
    const { passwordVisible, height, currentLength } = this.state;
    const {
      style,
      className,
      inputStyle,
      inputClassName,
      block,
      disabled,
      id,
      lineDirection,
      passwordIconChildren,
      passwordIconClassName,
      type,
      fullWidth,
      multiline,
      rows,
      maxRows,
      customSize,
      errorText,
      helpText,
      helpOnFocus,
      maxLength,
      ...props,
    } = this.props;
    delete props.placeholder;
    delete props.active;
    delete props.error;
    delete props.floating;
    delete props.leftIcon;
    delete props.rightIcon;
    delete props.onClick;
    delete props.passwordInitiallyVisible;
    delete props.label;
    delete props.floatingLabel;

    delete props.adjustMinWidth;

    let { placeholder, active, error, floating, leftIcon, rightIcon, label, floatingLabel } = this.props;
    active = active || this.state.active;
    error = error || this.state.error;
    floating = floating || this.state.floating;

    // Disable floating label on blocks
    floatingLabel = floatingLabel && !block;

    if (props.required) {
      if (label) {
        label = addSuffix(label, '*');
      }

      if (placeholder && !label && !floatingLabel) {
        placeholder = addSuffix(placeholder, '*');
      }
    }

    if (floatingLabel && !floating) {
      placeholder = null;
    } else if (!placeholder && !floatingLabel) {
      placeholder = label;
    }

    leftIcon = this._cloneIcon(leftIcon, active, error, disabled);
    if (type === 'password' && !disabled) {
      rightIcon = (
        <button
          type="button"
          onClick={this._togglePasswordField}
          className={cn('md-password-btn', {
            'md-password-btn--active': active,
            'md-password-btn--invisible': active && !passwordVisible,
          })}
        >
          <FontIcon iconClassName={passwordIconClassName} children={passwordIconChildren} />
        </button>
      );
    } else {
      rightIcon = this._cloneIcon(rightIcon, active, error, disabled);
    }

    let input;
    if (multiline) {
      input = (
        <TextArea
          key="area"
          ref="textField"
          {...props}
          disabled={disabled}
          id={id}
          rows={rows}
          maxRows={maxRows}
          placeholder={placeholder}
          style={inputStyle}
          floatingLabel={floatingLabel}
          className={inputClassName}
          onFocus={this._handleFocus}
          onKeyDown={this._handleKeyDown}
          onChange={this._handleChange}
          onHeightChange={this._handleHeightChange}
        />
      );
    } else {
      input = (
        <input
          {...props}
          disabled={disabled}
          type={passwordVisible ? 'text' : type}
          id={id}
          key="input"
          ref="textField"
          placeholder={placeholder}
          style={inputStyle}
          className={cn('md-text-field', {
            'md-text-field--password': type === 'password',
            [`md-text-field--${customSize}`]: customSize,
          }, inputClassName)}
          onFocus={this._handleFocus}
          onKeyDown={this._handleKeyDown}
          onChange={this._handleChange}
        />
      );
    }

    const divider = (
      <TextDivider
        key="divider"
        ref="divider"
        block={block}
        error={error}
        active={active}
        lineDirection={lineDirection}
      />
    );

    let children;
    if (leftIcon || rightIcon) {
      children = <div className="md-text-field-divider-container">{input}{divider}</div>;
    } else {
      children = [input, divider];
    }

    return (
      <label
        htmlFor={id}
        style={Object.assign({}, style, { height })}
        className={cn('md-text-field-container', {
          'md-text-field-container--input': !multiline,
          'md-text-field-container--full-width': fullWidth && !block,
          'md-text-field-container--block': block,
          'md-text-field-container--disabled': disabled,
          'md-text-field-container--input-floating-label': !multiline && floatingLabel,
          'md-text-field-container--multiline': multiline,
          'md-text-field-container--multiline-floating-label': multiline && floatingLabel,
          'md-text-field-container--with-icon': (!!leftIcon || !!rightIcon),
          [`md-text-field-container--${customSize}`]: !floatingLabel && customSize,
          [`md-text-field-container--floating-label-${customSize}`]: floatingLabel && customSize,
        }, className)}
      >
        <FloatingLabel
          label={label}
          floatingLabel={floatingLabel}
          floating={floating}
          error={error}
          active={active}
          disabled={disabled}
          iconOffset={!!leftIcon}
          customSize={customSize}
        />
        {leftIcon}
        {children}
        {rightIcon}
        <Message
          error={error}
          errorText={errorText}
          helpText={helpText}
          active={active}
          maxLength={maxLength}
          currentLength={currentLength}
          helpOnFocus={helpOnFocus}
          leftIcon={!!leftIcon}
          block={block}
          rightIcon={!!rightIcon}
        />
      </label>
    );
  }
}
