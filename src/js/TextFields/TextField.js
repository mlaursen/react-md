import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import FloatingLabel from './FloatingLabel';
import TextDivider from './TextDivider';
import TextFieldMessage from './TextFieldMessage';
import FontIcon from '../FontIcons';

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

/**
 * There is also an additional css class you can add to the text field to increase the font
 * size to a "title". This is configurable and there is a mixin to generate more of these helpers.
 *
 * Text Fields display as `inline-block` by default so that their size does not span `100%`. If
 * you want a text field per-line, wrap them in a div, or set them to display block (will make their width
 * expand as well though).
 *
 * There is a publically accessible `focus()` function to simplify the focusing of the text field.
 *
 * It can be used as follows:
 *
 * ```js
 * <TextField ref="textField" />
 * <button onClick={() => this.refs.textField.focus()}>Focus Text Field</button>
 * ```
 */
export default class TextField extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      active: false,
      currentRows: props.rows,
      areaHeight: 'auto',
      value: props.defaultValue,
      passwordVisible: false,
    };
  }

  static propTypes = {
    /**
     * An optional className to apply to the text field container.
     */
    className: PropTypes.string,

    /**
     * An optional className to apply to the input field iteself.
     */
    inputClassName: PropTypes.string,

    /**
     * A valid text field type. This should be one of the valid html5 input types.
     *
     * > If the text field is a multiline text field, it will not be applied because
     * > the main text field will be a `textarea`.
     */
    type: PropTypes.string.isRequired,

    /**
     * A label to display with the text field. If the text field is set to be
     * a single line text field, this will automatically be used as the placeholder
     * text if there is no `placeholder` prop given.
     */
    label: PropTypes.string,

    /**
     * An optional placeholder to display along with the floating label.
     */
    placeholder: PropTypes.string,

    /**
     * An optional value to set in the text field. This will make the component
     * controlled and require the `onChange` prop to be set.
     */
    value: valueType,

    /**
     * A default value to use for the text field.
     */
    defaultValue: valueType,

    /**
     * The number of rows to display by default. This will convert the text field
     * into a multiline text field.
     */
    rows: PropTypes.number,

    /**
     * The maximum number of rows that can be displayed in a multiline text field.
     * The text field will continue to expand in height until this value is met.
     * Settings this value to `-1` will allow the text field to expand infinitely.
     */
    maxRows: PropTypes.number,

    /**
     * An optional error text to display below the text field. If this value is `trueish`,
     * the icon, label, and text field didivder will be styled with the error color.
     */
    errorText: PropTypes.string,

    /**
     * An optional help text to display below the text field.
     */
    helpText: PropTypes.string,

    /**
     * A boolean if the help text should only be displayed on focus.
     */
    helpOnFocus: PropTypes.bool,

    /**
     * The max length for the text field. If this prop is set, it will automatically
     * add a counter below the text field.
     */
    maxLength: PropTypes.number,

    /**
     * Boolean if the label for the text field should float. Settings this to false
     * will make a single line text field.
     */
    floatingLabel: PropTypes.bool,

    /**
     * An optional icon to display to the left of the text field.
     */
    icon: PropTypes.node,

    /**
     * An optional icon to display to the right of the text field.
     */
    rightIcon: PropTypes.node,

    /**
     * An optional function to call when the text field is blurred.
     */
    onBlur: PropTypes.func,

    /**
     * An optional function to call when the text field's value has changed.
     * The callback will be `onChange(newValue, event)`.
     */
    onChange: PropTypes.func,

    /**
     * An optional function to call when the text field gains focus.
     */
    onFocus: PropTypes.func,

    /**
     * An optional function to call when the text field's value has changed.
     * It is similar to `onChange` except that it triggers immediately after
     * the value has changed while `onChange` happens on blur and after the
     * content has updated. You most likely want to use `onChange`.
     */
    onInput: PropTypes.func,

    /**
     * An optional function to call when a required text field is submitted in
     * a form without any value.
     */
    onInvalid: PropTypes.func,

    /**
     * An optional function to call when a user has pressed a key down.
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional function to call when a user has pressed and released a key.
     */
    onKeyPress: PropTypes.func,

    /**
     * An optional function to call when a user has released a key.
     */
    onKeyUp: PropTypes.func,

    /**
     * An optional function to call when text in the text field has been selected.
     */
    onSelect: PropTypes.func,

    /**
     * An optional function to call when the text field is clicked.
     */
    onClick: PropTypes.func,

    /**
     * Optional style to apply to the text field container.
     */
    style: PropTypes.object,

    /**
     * Optional style to apply to the text field input itself.
     */
    inputStyle: PropTypes.object,

    /**
     * The direction that the text field divider expands from when the text field
     * gains focus.
     */
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * Boolean if the text field is required.
     */
    required: PropTypes.bool,

    /**
     * An optional boolean if the text field is disabaled.
     */
    disabled: PropTypes.bool,

    /**
     * Boolean if the text field is read only.
     */
    readOnly: PropTypes.bool,

    /**
     * An optional size for the text field.
     */
    size: PropTypes.number,

    /**
     * Boolean if this text field should be styled as a full width text field.
     * Floating labels and the text field indicator will be removed automatically.
     */
    block: PropTypes.bool,

    /**
     * Boolean if the this text field should span the full width of a parent.
     */
    fullWidth: PropTypes.bool,

    /**
     * Any children used to render the password icon button.
     */
    passwordIconChildren: PropTypes.node,

    /**
     * Any icon className to use to render the password icon button.
     */
    passwordIconClassName: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
    defaultValue: '',
    floatingLabel: true,
    lineDirection: 'left',
    passwordIconChildren: 'remove_red_eye',
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

  /**
   * A publicly accessibly API for focusing the text field.
   */
  focus = () => {
    if(!this.textField) {
      this.textField = findDOMNode(this.refs.textField || this.refs.textarea);
    }


    this.textField.focus();
  };

  _togglePasswordField = () => {
    this.setState({ passwordVisible: !this.state.passwordVisible });
  };

  render() {
    const { active, currentRows, areaHeight, passwordVisible } = this.state;
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
      passwordIconChildren,
      passwordIconClassName,
      lineDirection,
      rows,
      maxRows,
      inputStyle,
      disabled,
      required,
      helpOnFocus,
      block,
      fullWidth,
      readOnly,
      size,
      onInput,
      onInvalid,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      onSelect,
      onClick,
      type,
      ...props,
    } = this.props;

    delete props.defaultValue;
    delete props.onBlur;
    delete props.onChange;
    delete props.onFocus;

    const value = this.getValue();
    const error = !!errorText || (!!maxLength && value.length > maxLength);
    const multiline = typeof rows === 'number';
    const useFloatingLabel = floatingLabel && !block;

    let fontIcon, textFieldMessage, indIcon;
    if(icon) {
      fontIcon = React.cloneElement(icon, {
        className: classnames('md-text-field-icon', {
          disabled,
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
    } else if(type === 'password') {
      indIcon = (
        <button
          type="button"
          onClick={this._togglePasswordField}
          className={classnames('md-password-btn', {
            'active': passwordVisible,
            'multi-line': useFloatingLabel,
            'single-line': !useFloatingLabel,
          })}
        >
          <FontIcon iconClassName={passwordIconClassName} children={passwordIconChildren} />
        </button>
      );
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
      className: classnames('md-text-field', inputClassName, {
        active,
        'floating-label': useFloatingLabel,
        'single-line': !useFloatingLabel && !multiline,
        'multi-line': multiline,
        'block': block,
        'full-width': fullWidth,
        'with-icon': rightIcon,
      }),
      disabled,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onClick,
      onInput,
      onInvalid,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      onSelect,
      readOnly,
      size,
      value,
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

      let visiblePlaceholder;
      if(active || !useFloatingLabel || block) {
        visiblePlaceholder = placeholder || label;

        if(required && visiblePlaceholder.indexOf('*') === -1) {
          visiblePlaceholder = visiblePlaceholder.trim() + ' *';
        }
      }

      textField = (
        <textarea
          {...textFieldProps}
          placeholder={visiblePlaceholder}
          ref="textarea"
          rows={rows}
          style={areaStyle}
        />
      );
    } else {
      let visiblePlaceholder;
      if(!useFloatingLabel) {
        visiblePlaceholder = placeholder || label;

        if(required && visiblePlaceholder.indexOf('*') === -1) {
          visiblePlaceholder = visiblePlaceholder.trim() + ' *';
        }
      } else {
        visiblePlaceholder = placeholder;
      }

      textField = (
        <input
          {...textFieldProps}
          ref="textField"
          type={passwordVisible ? 'text': type}
          style={inputStyle}
          placeholder={visiblePlaceholder}
        />
      );
    }

    return (
      <div
        {...props}
        className={classnames('md-text-field-container', className, {
          disabled,
          'multi-line': multiline,
          'block': block,
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
            disabled={disabled}
          />
          }
          {textField}
          {indIcon}
          {!block &&
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
