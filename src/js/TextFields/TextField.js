import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import isValued from '../utils/isValued';
import getField from '../utils/getField';
import getTextWidth from '../utils/Positioning/getTextWidth';
import controlled from '../utils/PropTypes/controlled';
import invalidIf from '../utils/PropTypes/invalidIf';
import minNumber from '../utils/PropTypes/minNumber';
import addSuffix from '../utils/StringUtils/addSuffix';
import FontIcon from '../FontIcons/FontIcon';
import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
import FloatingLabel from './FloatingLabel';
import TextFieldMessage from './TextFieldMessage';
import PasswordButton from './PasswordButton';
import InputField from './InputField';
import TextFieldDivider from './TextFieldDivider';

const DEFAULT_TEXT_FIELD_SIZE = 180;

const WILL_RECEIVE_KEYS = ['style', 'value', 'resize'];
const DID_UPDATE_KEYS = ['leftIcon', 'rightIcon', 'passwordIcon', 'inlineIndicator'];

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
     * The id for a text field. This is required when using the `label` prop for accessibility,
     * but normally a good idea to include one anyways.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

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
    block: PropTypes.bool,

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
    label: invalidIf(PropTypes.node, 'block'),

    /**
     * An optional placeholder text to display in the text field. If there is no `label` prop,
     * the text field will be displayed as a single line text field. If there is a `label` prop,
     * this will only be visible when there is no value and the user focused the text field.
     */
    placeholder: PropTypes.string,

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
     * An optional onChange function to call. If the `value` prop is defined, this is
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
     * An optional function to call when the text field is blurred.
     */
    onBlur: PropTypes.func,

    /**
     * An optional function to call when the text field is focused.
     */
    onFocus: PropTypes.func,

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
     * externally modified as well. The floating state is true when the text field gains focus
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
     * The icon to use for a password text field.
     */
    passwordIcon: PropTypes.element,

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
     * or equal to 1. When this value is set, the text field will be converted to a multiline
     * field.
     */
    rows: minNumber(1, false),

    /**
     * The maximum number of rows for a `multiline` text field. If this value is
     * `undefined`, `0`, or a number less than `0`, the multiline text field will
     * infinitely expand.
     */
    maxRows: PropTypes.number,

    /**
     * An optional custom size to apply to the text field. This is used along with
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
    errorText: PropTypes.node,

    /**
     * An optional help text to display below the text field. This will always be visible
     * unless the `helpOnFocus` prop is set to true. Otherwise it will appear on focus.
     */
    helpText: PropTypes.node,

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

    /**
     * This prop allows the text field to resize its width to stay between the min and max sizes provided. By
     * default, the field will expand and collapse based on the amount of text provided. The collapsing can
     * be disabled by providing `disableShrink` to the configuration object.
     *
     * If the `min` prop is not provided, it will default to `180` which is about the same size as a default
     * text field.
     */
    resize: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number.isRequired,
      disableShrink: PropTypes.bool,
    }),

    /**
     * Boolean if the TextField is in a toolbar and acting as a title. This will apply additional styles to the
     * text field to make it look like the toolbar's title.
     */
    toolbar: PropTypes.bool,

    passwordIconChildren: deprecated(PropTypes.node, 'Use the `passwordIcon` prop instead'),
    passwordIconClassName: deprecated(PropTypes.string, 'Use the `passwordIcon` prop instead'),
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
    passwordIcon: <FontIcon>remove_red_eye</FontIcon>,
    leftIconStateful: true,
    rightIconStateful: true,
    fullWidth: true,
  };

  constructor(props) {
    super(props);

    const currentLength = this._getLength(typeof props.value !== 'undefined' ? props.value : props.defaultValue);

    this._canvas = null;
    let width = null;
    if (typeof props.resize !== 'undefined') {
      width = typeof props.resize.min === 'number' ? props.resize.min : DEFAULT_TEXT_FIELD_SIZE;
    }

    this.state = {
      active: false,
      error: props.maxLength ? props.maxLength < currentLength : false,
      floating: isValued(props.defaultValue) || isValued(props.value),
      passwordVisible: props.passwordInitiallyVisible,
      currentLength,
      styles: width ? { width, ...props.style } : props.style,
    };
  }

  componentDidMount() {
    const { value, defaultValue, resize } = this.props;
    const v = typeof value !== 'undefined' ? value : defaultValue;
    if (resize) { // always want to set width on mount
      this.setState({ width: this._calcWidth(v) }); // eslint-disable-line react/no-did-mount-set-state
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value, resize, style } = nextProps;
    const nextState = {};
    if (value !== this.props.value) {
      nextState.error = this._isErrored(nextProps);
      nextState.floating = isValued(value);
      nextState.currentLength = this._getLength(value);
    }

    if (WILL_RECEIVE_KEYS.some(key => this.props[key] !== nextProps[key])) {
      if (!resize) {
        nextState.styles = style;
      } else {
        const width = this._calcWidth(value, nextProps);
        nextState.styles = { width, ...style };
      }
    }

    this.setState(nextState);
  }

  componentDidUpdate(prevProps) {
    const { resize, value, style } = this.props;
    if (resize && DID_UPDATE_KEYS.some(key => this.props[key] !== prevProps[key])) {
      const width = this._calcWidth(value, this.props);
      this.setState({ styles: { width, ...style } }); // eslint-disable-line react/no-did-update-set-state
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
  getField = () => this._field.getField();

  /**
   * A helper function for focusing the `input` field or the `textarea` in the `TextField`.
   * This is accessibile if you use `refs`.
   * Example:
   *
   * ```js
   * <TextField ref={field => this._field = field;} label="Hello" />;
   *
   * this._field.focus();
   * ```
   */
  focus = () => {
    this._field.focus();
  };

  /**
   * Gets the current value from the text field. This is used when you have an uncontrolled
   * text field and simply need the value from a ref callback.
   *
   * @return {String} the text field's value
   */
  get value() {
    return this.getField().value;
  }


  /**
   * A helper function for blurring the `input` field or the `textarea` in the `TextField`.
   * This is accessible if you use `refs`.
   * Example:
   *
   * ```js
   * <TextField ref={field => this._field = field;} label="Hello" />;
   *
   * this._field.blur();
   * ```
   */
  blur() {
    this._field.blur();
  }

  _cloneIcon(icon, active, error, disabled, stateful, block, dir) {
    if (!icon) {
      return icon;
    }

    try {
      const iconEl = Children.only(icon);
      return cloneElement(iconEl, {
        key: iconEl.key || `icon-${dir}`,
        disabled: stateful ? disabled : undefined,
        primary: stateful ? !error && active : undefined,
        error: stateful ? error : undefined,
        className: cn('md-text-field-icon', {
          'md-text-field-icon--positioned': !block,
        }, iconEl.props.className),
      });
    } catch (e) {
      return icon;
    }
  }

  _getLength = (v) => {
    if (isValued(v)) {
      return String(v).length;
    }

    return 0;
  };

  _setContainer = (div) => {
    this._container = div;
  };

  _setField = (field) => {
    if (field !== null) {
      this._field = field;
    }
  };

  /**
   * A small utility function for calculating an inline-icon's width keeping the SVG Icons
   * in mind and any margin that gets applied for spacing.
   */
  _calcIconWidth = (icon) => {
    const style = window.getComputedStyle(icon);

    return icon.getBoundingClientRect().width
      + parseInt(style.marginLeft, 10);
  };

  _calcWidth = (value, props = this.props) => {
    let text = value;
    // if it is a password, use the bullet unicode instead
    if (props.type === 'password') {
      text = [...new Array(value.length)].reduce(s => `${s}\u2022`, '');
    }

    const field = this._field && this._field.getField();
    if (!isValued(text) && field) {
      text = field.value;
    }

    let width = getTextWidth(text, field);
    if (width === null || !field) {
      // some error happened, don't do other logic
      return width;
    }

    const { max } = props.resize;
    const min = getField(props.resize, { min: DEFAULT_TEXT_FIELD_SIZE }, 'min');

    if (this._container) {
      const indicator = this._container.querySelector('.md-text-field-inline-indicator');
      if (indicator) {
        width += indicator.getBoundingClientRect().width;
      }

      const iconContainer = this._container.querySelector('.md-text-field-icon-container');
      if (iconContainer) {
        // There is conditionally an icon before and after the text field, or only an icon before/after
        // There is never a third icon if the indicator is defined
        const [first, second, third] = iconContainer.children;
        if (first.classList.contains('md-icon')) {
          width += first.getBoundingClientRect().width;
          width += parseInt(window.getComputedStyle(second).marginLeft, 10);

          if (third) {
            width += this._calcIconWidth(third);
          }
        } else if (second) {
          width += this._calcIconWidth(second);
        }
      }
    }

    return Math.ceil(Math.min(max, Math.max(min, width)));
  };

  _isErrored = ({ value, maxLength, required } = this.props) => {
    let { error } = this.state;
    const currentLength = this._getLength(value);
    if (required && error) {
      error = !isValued(value);
    }

    if (maxLength) {
      error = error || currentLength > maxLength;
    }

    return error;
  };

  _handleContainerClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (!this.props.disabled) {
      this.focus();
    }
  };

  _handleBlur = (e) => {
    const { required, maxLength, onBlur } = this.props;
    if (onBlur) {
      onBlur(e);
    }

    const { value } = e.target;
    const state = {
      active: false,
      error: (required && !isValued(value)) || (maxLength && String(value).length > maxLength),
    };

    if (!this.props.block) {
      state.floating = isValued(value);
    }

    this.setState(state);
  };

  _handleFocus = (e) => {
    const { onFocus, block } = this.props;
    if (onFocus) {
      onFocus(e);
    }

    const state = { active: true };
    if (!block) {
      state.floating = true;
    }

    this.setState(state);
  };

  _handleChange = (e) => {
    const { onChange, maxLength, required, resize } = this.props;
    const { value } = e.target;
    if (onChange) {
      onChange(e.target.value, e);
    }

    const currentLength = value.length;
    let state;
    if (typeof maxLength !== 'undefined') {
      state = { currentLength, error: currentLength > maxLength };
    } else if (required && this.state.error) {
      state = { error: !currentLength };
    }

    if (typeof this.props.value === 'undefined' && resize) {
      const width = this._calcWidth(value);
      if (!resize.disableShrink || !this.state.styles || width > this.state.styles.width) {
        state = state || {};
        state.styles = { ...this.state.styles, width };
      }
    }

    if (state) {
      this.setState(state);
    }
  };

  _togglePasswordField = () => {
    this.setState({ passwordVisible: !this.state.passwordVisible }, this.focus);
  };

  render() {
    const { currentLength, passwordVisible, styles } = this.state;
    const {
      id,
      type,
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
      passwordIcon,
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
      toolbar,

      // deprecated
      icon,
      passwordIconChildren,
      passwordIconClassName,
      /* eslint-disable no-unused-vars */
      style,
      label: propLabel,
      placeholder: propPlaceholder,
      error: propError,
      active: propActive,
      floating: propFloating,
      leftIcon: propLeftIcon,
      rightIcon: propRightIcon,
      onClick,
      onChange,
      onBlur,
      onFocus,
      resize,

      // deprecated
      adjustMinWidth,
      floatingLabel: propFloatingLabel,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

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
          onClick={this._togglePasswordField}
          active={active}
          passwordVisible={passwordVisible}
          icon={getDeprecatedIcon(passwordIconClassName, passwordIconChildren, passwordIcon)}
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
        className={cn({ 'md-text-field--toolbar': toolbar }, inputClassName)}
        disabled={disabled}
        customSize={customSize}
        fullWidth={fullWidth}
        passwordVisible={passwordVisible}
        placeholder={placeholder}
        block={block}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        onChange={this._handleChange}
        inlineIndicator={!!inlineIndicator}
      />
    );

    let divider;
    if (!block) {
      divider = (
        <TextFieldDivider
          key="text-divider"
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

    const multiline = typeof props.rows !== 'undefined';
    return (
      <div
        style={styles}
        className={cn('md-text-field-container', {
          'md-inline-block': !fullWidth && !block,
          'md-full-width': block || fullWidth,
          'md-text-field-container--disabled': disabled,
          'md-text-field-container--input': !multiline,
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
        ref={this._setContainer}
      >
        {ink}
        {children}
      </div>
    );
  }
}
