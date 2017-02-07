import React, { PureComponent, PropTypes, Children, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { TAB } from '../constants/keyCodes';
import controlled from '../utils/PropTypes/controlled';
import invalidIf from '../utils/PropTypes/invalidIf';
import minNumber from '../utils/PropTypes/minNumber';
import addSuffix from '../utils/StringUtils/addSuffix';
import FloatingLabel from './FloatingLabel';
import TextFieldMessage from './TextFieldMessage';
import PasswordButton from './PasswordButton';
import InputField from './InputField';
import TextFieldDivider from './TextFieldDivider';

/**
 * The `TextField` component can either be a single line `input` field or a multiline
 * `textarea` field. `FontIcon`s, messages, and password indicators can also be added
 * to this field.
 *
 * The optional mouse and touch events will be added to the entire container while the
 * text specific events will be added to the `input` or `textarea` tags.
 */
export default class TextField extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the text field's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the text field's container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the `input` or `textarea` tag.
     */
    inputStyle: PropTypes.object,

    /**
     * An optional className to apply to the `input` or `textarea` tag.
     */
    inputClassName: PropTypes.string,

    /**
     * An optional value to apply to the text field. This will make the component
     * controlled and require the `onChange` prop.
     */
    value: controlled(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]), 'onChange'),

    /**
     * An optional default value for the text field.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    /**
     * Boolean if the text field should be displayed as a `block`. This is equivalent to
     * the `full width` text field in the Material Design specs. This view will disable
     * floating labels and remove the text divider from the component.
     */
    block: (props, propName, component, ...others) => {
      let err = PropTypes.bool(props, propName, component, ...others);
      if (!err && props[propName] && props.label) {
        err = new Error(
          `The \`${component}\` is unable to have a \`label\` and be displayed as \`block\`. ` +
          `If you would like a \`label\` for the block \`${component}\`, please use the \`placeholder\` prop.`
        );
      }

      return err;
    },

    /**
     * Boolean if the `block` text field should include padding to the left and right of
     * the text field.
     */
    paddedBlock: PropTypes.bool,

    /**
     * Boolean if the text field is currently disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional label to display with the text field. This will convert the text field
     * into a floating label text field. You can make it single line by only using the
     * `placeholder` prop.
     */
    label: PropTypes.string,

    /**
     * An optional placeholder text to display in the text field. If there is no `label` prop,
     * the text field will be displayed as a single line text field. If there is a `label` prop,
     * this will only be visible when there is no value and the user focused the text field.
     */
    placeholder: PropTypes.string,

    /**
     * The id for the text field.  This is required for a11y if the `label` prop is defined.
     */
    id: (props, propName, component, ...others) => {
      const validator = PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]);
      if (typeof props.label !== 'undefined') {
        return isRequiredForA11y(validator)(props, propName, component, ...others);
      }

      return validator(props, propName, component, ...others);
    },

    /**
     * The type for the text field. This is one of the most import props for mobile accessibility
     * as it will update the keyboard for the text type. This does not get applied on multiline
     * text fields.
     */
    type: PropTypes.oneOf([
      'text',
      'number',
      'email',
      'search',
      'tel',
      'url',
      'password',
    ]).isRequired,

    /**
     * An optional function to call when the text field's container triggers the `click` event.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the text field's container triggers the `doubleclick`
     * event.
     */
    onDoubleClick: PropTypes.func,

    /**
     * An optional function to call when the text field's container triggers the `touchstart`
     * event.
     */
    onTouchStart: PropTypes.func,

    /**
     * An optional function to call when the text field's container triggers the `touchmove`
     * event.
     */
    onTouchMove: PropTypes.func,

    /**
     * An optional function to call when the text field's container triggers the `touchcancel`
     * event.
     */
    onTouchCancel: PropTypes.func,

    /**
     * An optional function to call when the text field's container triggers the `touchend`
     * event.
     */
    onTouchEnd: PropTypes.func,

    /**
     * An optional function to call when the text field's container triggers the `mousedown`
     * event.
     */
    onMouseDown: PropTypes.func,

    /**
     * An optional function to call when the text field's container triggers the `mouseup`
     * event.
     */
    onMouseUp: PropTypes.func,

    /**
     * An optional function to call when the text field's container triggers the `mouseover`
     * event.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call when the text field's container triggers the `mouseleave`
     * event.
     */
    onMouseLeave: PropTypes.func,

    /**
     * An optional onChange function to call. If the `value` prop is true, this is
     * required.
     *
     * When the value changes in the text field, this will be called with the new text
     * field's value and the change event.
     *
     * ```js
     * onChange(e.target.value, e);
     * ```
     */
    onChange: PropTypes.func,

    /**
     * An optional function to call when the text field is focused.
     */
    onFocus: PropTypes.func,

    /**
     * An optional function to call when the text field has the `keydown` event.
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional boolean if the `active` state of the text field can be externally
     * modified as well. The text field is usually considered active when it gains focus.
     *
     * If this prop is set, it will check both the active prop and the active state to
     * determine if one is true.
     */
    active: PropTypes.bool,

    /**
     * An optional boolean if the `error` state of the text field can be externally
     * modified as well. The text field is usually considered errored when it is required
     * and there is no value or the current length of the text field's value is greater
     * than the `maxLength` prop.
     *
     * If this prop is set, it will check both the error prop and the error state to
     * determine if one is true.
     */
    error: PropTypes.bool,

    /**
     * An optional boolean if the `floating` state of the text field's floating label can be
     * externally modified as well. The floating state is true when the tet field gains focus
     * or there is a value in the text field.
     *
     * If this prop is set, it will check both the floating prop and the floating state to
     * determine if one is true.
     */
    floating: PropTypes.bool,

    /**
     * Boolean if the text field is required. If the user blurs the text field while there is
     * no value and it is required, the `error` state will be set to true.
     */
    required: PropTypes.bool,

    /**
     * The direction that the underline should appear from.
     */
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']).isRequired,

    /**
     * An optional icon to place to the left of the text field.
     */
    leftIcon: PropTypes.element,

    /**
     * Boolean if the left icon should be stateful. This means that the icon will
     * gain the active or error colors with the text field.
     */
    leftIconStateful: PropTypes.bool,

    /**
     * An optional icon to place to the right of the text field.
     */
    rightIcon: PropTypes.element,

    /**
     * Boolean if the right icon should be stateful. This means that the icon will
     * gain the active or error colors with the text field.
     */
    rightIconStateful: PropTypes.bool,

    /**
     * Any children used to display the password icon.
     */
    passwordIconChildren: PropTypes.node,

    /**
     * The icon className for the password icon.
     */
    passwordIconClassName: PropTypes.string,

    /**
     * Boolean if the password is initially visible.
     */
    passwordInitiallyVisible: PropTypes.bool,

    /**
     * Boolean if the text field should be displayed as full width.
     */
    fullWidth: PropTypes.bool,

    /**
     * The number of rows for the `multiline` text field. This value must be greater than
     * or equal to 2. When this value is set, the text field will be converted to a multiline
     * field.
     */
    rows: minNumber(2, false),

    /**
     * The maximum number of rows for a `multiline` text field. If this value is
     * `undefined`, `0`, or a number less than `0`, the multiline text field will
     * infinitely expand.
     */
    maxRows: PropTypes.number,

    /**
     * An optional customsize to apply to the text field. This is used along with
     * the `$md-text-field-custom-sizes` variable. It basically applies a className of
     * `md-text-field--NAME`.
     */
    customSize: PropTypes.string,

    /**
     * An optional error text to display below the text field. This will only appear when
     * the text field has the `error` state through the `error` prop, the current length
     * of the text field's value is greater than the `maxLength` prop, or the field is
     * required and the user blurs the text field with no value.
     */
    errorText: invalidIf(PropTypes.string, 'block'),

    /**
     * An optional help text to display below the text field. This will always be visible
     * unless the `helpOnFocus` prop is set to true. Otherwise it will appear on focus.
     */
    helpText: invalidIf(PropTypes.string, 'block'),

    /**
     * Boolean if the help text should display on focus only.
     */
    helpOnFocus: PropTypes.bool,

    /**
     * An optional max length for the text field. This will insert a counter underneath the
     * text field that appears on focus.
     */
    maxLength: PropTypes.number,

    /**
     * The ink when there is an injectInk above the text field. Used from the SelectField.
     *
     * @access private
     */
    ink: PropTypes.node,

    /**
     * An optional element to display inside of the `TextField` to the farthest right. This will
     * position the indicator absolutely and add some additional padding to the `TextField`.
     */
    inlineIndicator: PropTypes.element,

    icon: deprecated(PropTypes.node, 'Use the `leftIcon` or `rightIcon` prop instead'),
    floatingLabel: deprecated(
      PropTypes.bool,
      'The `label` prop is now always floating. To create a non-floating text field, only use the `placeholder` prop'
    ),
    adjustMinWidth: deprecated(PropTypes.bool, 'Manually add a min width style instead'),
  };

  static defaultProps = {
    type: 'text',
    lineDirection: 'left',
    passwordIconChildren: 'remove_red_eye',
    leftIconStateful: true,
    rightIconStateful: true,
    fullWidth: true,
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
      active: false,
      error: false,
      floating: !!props.defaultValue || !!props.value,
      passwordVisible: props.passwordInitiallyVisible,
      height: null,
      currentLength,
    };

    this.focus = this.focus.bind(this);
    this.getField = this.getField.bind(this);
    this._blur = this._blur.bind(this);
    this._setField = this._setField.bind(this);
    this._setDivider = this._setDivider.bind(this);
    this._setMessage = this._setMessage.bind(this);
    this._setContainer = this._setContainer.bind(this);
    this._setPasswordBtn = this._setPasswordBtn.bind(this);
    this._setFloatingLabel = this._setFloatingLabel.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleHeightChange = this._handleHeightChange.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._updateMultilineHeight = this._updateMultilineHeight.bind(this);
    this._togglePasswordField = this._togglePasswordField.bind(this);
    this._handleContainerClick = this._handleContainerClick.bind(this);
  }

  componentDidMount() {
    if (this._isMultiline(this.props)) {
      this._updateMultilineHeight();
      window.addEventListener('resize', this._updateMultilineHeight);
    }
  }

  componentWillReceiveProps(nextProps) {
    const multiline = this._isMultiline(nextProps);
    if (this._isMultiline(this.props) !== multiline) {
      this._updateMultilineHeight(nextProps);
      window[`${multiline ? 'add' : 'remove'}EventListener`]('resize', this._updateMultilineHeight);
    }

    if (this.props.value !== nextProps.value) {
      const value = typeof nextProps.value !== 'undefined' ? nextProps.value.toString() : '';
      let error = this.state.error;

      if (nextProps.maxLength) {
        error = value.length > nextProps.maxLength;
      } else if (nextProps.required && error) {
        error = !value;
      }

      this.setState({
        error,
        floating: !!value || (this.state.floating && this.state.active),
        currentLength: value.length,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { block, active } = this.props;
    if (block !== prevProps.block
      || active !== prevProps.active
      || this.state.active !== prevState.active
    ) {
      const fn = window[`${(active || this.state.active) ? 'add' : 'remove'}EventListener`];
      fn('mousedown', this._handleOutsideClick);
      fn('touchstart', this._handleOutsideClick);
    }

    if (this._isMultiline(this.props) && !this._isMultiline(prevProps)) {
      this._updateMultilineHeight(this.props);
    }
  }

  componentWillUnmount() {
    const { active } = this.props;
    const rm = window.removeEventListener;
    if (active || this.state.active) {
      rm('mousedown', this._handleOutsideClick);
      rm('touchstart', this._handleOutsideClick);
    }

    if (this._isMultiline(this.props)) {
      rm('resize', this._updateMultilineHeight);
    }
  }

  /**
   * A helper function for getting the specific `input` field or the `textarea` in the `TextField`.
   * This is accessible if you use `refs`.
   *
   * Example:
   *
   * ```js
   * <TextField ref={field => this._field = field;} label="Hello" />;
   *
   * this._field.getField(); // `input` node
   * ```
   */
  getField() {
    return this._field.getField();
  }

  /**
   * A helper function for focusing the `input` field or the `textarea` in the `TextField`.
   * This is accessibile if you use `refs`.
   * Example:
   *
   * ```js
   * <TextField ref={field => this._field = field;} label="Hello" />;
   *
   * this._field.focus(); // `input` node
   * ```
   */
  focus() {
    this._field.focus();
  }

  _isMultiline(props) {
    return typeof props.rows !== 'undefined';
  }

  _cloneIcon(icon, active, error, disabled, stateful, block, dir) {
    if (!icon) {
      return icon;
    }

    try {
      const iconEl = Children.only(icon);
      return cloneElement(iconEl, {
        key: `icon-${dir}`,
        className: cn('md-text-field-icon', {
          'md-text-field-icon--positioned': !block,
          'md-text-field-icon--disabled': disabled,
          'md-text-field-icon--active': stateful && (!error && active),
          'md-text-field-icon--error': stateful && error,
        }, iconEl.props.className),
      });
    } catch (e) {
      return icon;
    }
  }

  _setField(field) {
    if (field !== null) {
      this._field = field;
    }
  }

  _setMessage(message) {
    if (message !== null) {
      this._message = findDOMNode(message);
    }
  }

  _setDivider(divider) {
    if (divider !== null) {
      this._divider = findDOMNode(divider);
    }
  }

  _setContainer(container) {
    if (container !== null) {
      this._node = container;
    }
  }

  _setPasswordBtn(btn) {
    if (btn !== null) {
      this._password = findDOMNode(btn);
    }
  }

  _setFloatingLabel(label) {
    if (label !== null) {
      this._label = findDOMNode(label);
    }
  }

  _handleContainerClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (!this.props.disabled) {
      this.focus();
    }
  }

  _updateMultilineHeight(props = this.props) {
    const { block } = props;
    const multiline = this._isMultiline(props);
    if (!multiline) {
      return;
    }

    const cs = window.getComputedStyle(findDOMNode(this._field));
    this._additionalHeight = parseInt(cs.getPropertyValue('margin-top'), 10);

    if (!block) {
      const mb = parseInt(window.getComputedStyle(this._divider).getPropertyValue('margin-bottom'), 10);
      this._additionalHeight += (mb === 4 ? 12 : 16);
    }

    if (this._message) {
      this._additionalHeight += this._message.offsetHeight;
    }
  }

  _blur() {
    const value = this._field.getValue();

    const state = { active: false, error: this.props.required && !value };
    if (!this.props.block) {
      state.floating = !!value;
    }

    this.setState(state);
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

    const state = { active: true };
    if (!block) {
      state.floating = true;
    }

    this.setState(state);
  }

  _handleChange(e) {
    const { onChange, maxLength, required } = this.props;
    if (onChange) {
      onChange(e.target.value, e);
    }

    const currentLength = e.target.value.length;
    if (typeof maxLength !== 'undefined') {
      this.setState({ currentLength, error: currentLength > maxLength });
    } else if (required && this.state.error) {
      this.setState({ error: !currentLength });
    }
  }

  _handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if ((e.which || e.keyCode) === TAB) {
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

  render() {
    const { currentLength, passwordVisible, height } = this.state;
    const {
      id,
      type,
      style,
      className,
      inputStyle,
      inputClassName,
      block,
      fullWidth,
      required,
      customSize,
      maxLength,
      errorText,
      helpText,
      helpOnFocus,
      disabled,
      leftIconStateful,
      rightIconStateful,
      passwordIconChildren,
      passwordIconClassName,
      lineDirection,
      paddedBlock,
      onDoubleClick,
      onTouchStart,
      onTouchMove,
      onTouchCancel,
      onTouchEnd,
      onMouseDown,
      onMouseUp,
      onMouseOver,
      onMouseLeave,
      ink,
      inlineIndicator,
      icon,
      ...props
    } = this.props;
    delete props.label;
    delete props.placeholder;
    delete props.error;
    delete props.active;
    delete props.floating;
    delete props.leftIcon;
    delete props.rightIcon;
    delete props.adjustMinWidth;
    delete props.onClick;
    delete props.onChange;
    delete props.onKeyDown;
    delete props.onFocus;
    delete props.floatingLabel;

    let {
      label,
      placeholder,
      error,
      active,
      floating,
      leftIcon,
      rightIcon,
    } = this.props;
    active = active || this.state.active;
    error = error || this.state.error;
    floating = floating || this.state.floating;

    if (required) {
      if (label) {
        label = addSuffix(label, '*');
      }

      if (placeholder && !label) {
        placeholder = addSuffix(placeholder, '*');
      }
    }

    if (label && !floating) {
      placeholder = null;
    }

    leftIcon = this._cloneIcon(icon || leftIcon, active, error, disabled, leftIconStateful, block, 'left');
    if (type === 'password' && !disabled) {
      rightIcon = (
        <PasswordButton
          key="password-btn"
          ref={this._setPasswordBtn}
          onClick={this._togglePasswordField}
          active={active}
          passwordVisible={passwordVisible}
          iconChildren={passwordIconChildren}
          iconClassName={passwordIconClassName}
          block={block}
          floating={!!label}
        />
      );
    } else if (inlineIndicator) {
      const el = Children.only(inlineIndicator);
      rightIcon = cloneElement(inlineIndicator, {
        key: 'icon-right',
        className: cn('md-text-field-inline-indicator', {
          'md-text-field-inline-indicator--floating': label,
          'md-text-field-inline-indicator--block': block,
        }, el.props.className),
      });
    } else {
      rightIcon = this._cloneIcon(rightIcon, active, error, disabled, rightIconStateful, block, 'right');
    }
    const rightIconed = !!rightIcon && type !== 'password' && !inlineIndicator;

    const floatingLabel = (
      <FloatingLabel
        key="label"
        ref={this._setFloatingLabel}
        label={label}
        htmlFor={id}
        active={active}
        error={error}
        floating={floating}
        customSize={customSize}
        disabled={disabled}
        iconOffset={!!leftIcon}
      />
    );

    const message = (
      <TextFieldMessage
        key="message"
        ref={this._setMessage}
        active={active}
        error={error}
        errorText={errorText}
        helpText={helpText}
        helpOnFocus={helpOnFocus}
        block={block}
        maxLength={maxLength}
        leftIcon={!!leftIcon}
        rightIcon={!!rightIcon}
        currentLength={currentLength}
      />
    );

    const field = (
      <InputField
        {...props}
        key="field"
        ref={this._setField}
        id={id}
        type={type}
        label={label}
        style={inputStyle}
        className={inputClassName}
        disabled={disabled}
        customSize={customSize}
        fullWidth={fullWidth}
        passwordVisible={passwordVisible}
        placeholder={placeholder}
        block={block}
        onFocus={this._handleFocus}
        onKeyDown={this._handleKeyDown}
        onChange={this._handleChange}
        onHeightChange={this._handleHeightChange}
        inlineIndicator={!!inlineIndicator}
      />
    );

    let divider;
    if (!block) {
      divider = (
        <TextFieldDivider
          key="text-divider"
          ref={this._setDivider}
          active={active}
          error={error}
          lineDirection={lineDirection}
        />
      );
    }

    let children;
    if (leftIcon || rightIconed) {
      children = (
        <div key="icon-divider" className="md-text-field-icon-container">
          {leftIcon}
          <div
            key="divider-container"
            className={cn('md-text-field-divider-container', {
              'md-text-field-divider-container--grow': fullWidth,
            })}
          >
            {field}
            {divider}
          </div>
          {rightIcon}
        </div>
      );
    } else {
      children = [leftIcon, field, divider, rightIcon];
    }

    children = [floatingLabel, children, message];

    const multiline = this._isMultiline(this.props);
    return (
      <div
        ref={this._setContainer}
        style={Object.assign({}, style, { height })}
        className={cn('md-text-field-container', {
          'md-inline-block': !fullWidth && !block,
          'md-full-width': block || fullWidth,
          'md-text-field-container--disabled': disabled,
          'md-text-field-container--input': typeof props.rows === 'undefined',
          'md-text-field-container--input-block': block && !multiline,
          'md-text-field-container--multiline': multiline,
          'md-text-field-container--multiline-block': multiline && block,
          'md-text-field-container--padded-block': block && paddedBlock,
        }, className)}
        onClick={this._handleContainerClick}
        onDoubleClick={onDoubleClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        onTouchMove={onTouchMove}
      >
        {ink}
        {children}
      </div>
    );
  }
}
