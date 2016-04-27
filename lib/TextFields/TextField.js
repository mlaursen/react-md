'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FloatingLabel = require('./FloatingLabel');

var _FloatingLabel2 = _interopRequireDefault(_FloatingLabel);

var _TextDivider = require('./TextDivider');

var _TextDivider2 = _interopRequireDefault(_TextDivider);

var _TextFieldMessage = require('./TextFieldMessage');

var _TextFieldMessage2 = _interopRequireDefault(_TextFieldMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var valueType = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]);

/**
 * There is also an additional css class you can add to the text field to increase the font
 * size to a "title". This is configurable and there is a mixin to generate more of these helpers.
 *
 * Text Fields display as `inline-block` by default so that their size does not span `100%`. If
 * you want a text field per-line, wrap them in a div, or set them to display block (will make their width
 * expand as well though).
 */

var TextField = function (_Component) {
  _inherits(TextField, _Component);

  function TextField(props) {
    _classCallCheck(this, TextField);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextField).call(this, props));

    _this.getValue = function () {
      return typeof _this.props.value === 'undefined' ? _this.state.value : _this.props.value;
    };

    _this.handleFocus = function (e) {
      if (_this.props.onFocus) {
        _this.props.onFocus(e);
      }

      _this.setState({ active: true });
    };

    _this.handleBlur = function (e) {
      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }

      _this.setState({ active: false });
    };

    _this.handleChange = function (e) {
      var reset = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var _this$props = _this.props;
      var onChange = _this$props.onChange;
      var rows = _this$props.rows;
      var maxRows = _this$props.maxRows;

      var value = reset ? '' : e.target.value;
      if (onChange) {
        onChange(value, e);
      }

      if (typeof _this.props.value !== 'undefined') {
        return;
      } else if (!rows || !maxRows) {
        _this.setState({ value: value });
        return;
      }

      var state = { value: value };

      var textarea = _this.refs.textarea;
      var offsetHeight = textarea.offsetHeight;
      var scrollHeight = textarea.scrollHeight;
      var _this$state = _this.state;
      var currentRows = _this$state.currentRows;
      var areaHeight = _this$state.areaHeight;


      var moreRows = maxRows !== -1 && currentRows >= maxRows;
      var noScroll = scrollHeight <= (typeof areaHeight === 'number' && areaHeight || offsetHeight);
      if (noScroll || moreRows) {
        _this.setState(state);
        return;
      }

      currentRows++;
      state.currentRows = currentRows;
      state.areaHeight = scrollHeight;
      _this.setState(state);
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      active: false,
      currentRows: props.rows,
      areaHeight: 'auto',
      value: props.defaultValue
    };
    return _this;
  }

  _createClass(TextField, [{
    key: 'render',
    value: function render() {
      var _state = this.state;
      var active = _state.active;
      var currentRows = _state.currentRows;
      var areaHeight = _state.areaHeight;
      var _props = this.props;
      var className = _props.className;
      var inputClassName = _props.inputClassName;
      var label = _props.label;
      var placeholder = _props.placeholder;
      var maxLength = _props.maxLength;
      var helpText = _props.helpText;
      var errorText = _props.errorText;
      var floatingLabel = _props.floatingLabel;
      var icon = _props.icon;
      var rightIcon = _props.rightIcon;
      var lineDirection = _props.lineDirection;
      var rows = _props.rows;
      var maxRows = _props.maxRows;
      var inputStyle = _props.inputStyle;
      var disabled = _props.disabled;
      var required = _props.required;
      var helpOnFocus = _props.helpOnFocus;
      var fullWidth = _props.fullWidth;
      var defaultValue = _props.defaultValue;
      var readOnly = _props.readOnly;
      var size = _props.size;
      var onBlur = _props.onBlur;
      var onChange = _props.onChange;
      var onFocus = _props.onFocus;
      var onInput = _props.onInput;
      var onInvalid = _props.onInvalid;
      var onKeyDown = _props.onKeyDown;
      var onKeyPress = _props.onKeyPress;
      var onKeyUp = _props.onKeyUp;
      var onSelect = _props.onSelect;
      var type = _props.type;

      var props = _objectWithoutProperties(_props, ['className', 'inputClassName', 'label', 'placeholder', 'maxLength', 'helpText', 'errorText', 'floatingLabel', 'icon', 'rightIcon', 'lineDirection', 'rows', 'maxRows', 'inputStyle', 'disabled', 'required', 'helpOnFocus', 'fullWidth', 'defaultValue', 'readOnly', 'size', 'onBlur', 'onChange', 'onFocus', 'onInput', 'onInvalid', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onSelect', 'type']);

      var value = this.getValue();
      var error = !!errorText || !!maxLength && value.length > maxLength;
      var multiline = typeof rows === 'number';
      var useFloatingLabel = floatingLabel && !fullWidth;

      var fontIcon = void 0,
          textFieldMessage = void 0,
          indIcon = void 0;
      if (icon) {
        fontIcon = _react2.default.cloneElement(icon, {
          className: (0, _classnames2.default)('md-text-field-icon', {
            active: active,
            error: error,
            'with-floating-label': useFloatingLabel,
            'normal': !!value
          })
        });
      }

      if (rightIcon) {
        indIcon = _react2.default.cloneElement(rightIcon, {
          className: (0, _classnames2.default)('md-text-field-ind', {
            'single-line': !useFloatingLabel
          })
        });
      }

      if (errorText || maxLength || helpText) {
        textFieldMessage = _react2.default.createElement(_TextFieldMessage2.default, {
          value: value,
          error: error,
          helpOnFocus: helpOnFocus,
          active: active,
          message: errorText || helpText,
          maxLength: maxLength,
          className: icon ? 'icon-offset' : null
        });
      }

      var textFieldProps = {
        className: (0, _classnames2.default)('md-text-field', inputClassName, {
          active: active,
          'floating-label': useFloatingLabel,
          'single-line': !useFloatingLabel && !multiline,
          'multi-line': multiline,
          'full-width': fullWidth
        }),
        disabled: disabled,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        onInput: onInput,
        onInvalid: onInvalid,
        onKeyDown: onKeyDown,
        onKeyPress: onKeyPress,
        onKeyUp: onKeyUp,
        onSelect: onSelect,
        readOnly: readOnly,
        size: size,
        type: type,
        value: value
      };

      var textField = void 0;
      if (multiline) {
        var areaStyle = inputStyle ? Object.assign({}, inputStyle) : {};
        if (maxRows) {
          if (currentRows < maxRows || maxRows === -1) {
            areaStyle.overflow = 'hidden';
          }

          if (areaHeight) {
            areaStyle.height = areaHeight;
          }
        }

        textField = _react2.default.createElement('textarea', _extends({}, textFieldProps, {
          placeholder: active || !useFloatingLabel || fullWidth ? placeholder || label : null,
          ref: 'textarea',
          rows: rows,
          style: areaStyle
        }));
      } else {
        textField = _react2.default.createElement('input', _extends({}, textFieldProps, {
          style: inputStyle,
          placeholder: !useFloatingLabel ? placeholder || label : placeholder
        }));
      }

      return _react2.default.createElement(
        'div',
        _extends({}, props, {
          className: (0, _classnames2.default)('md-text-field-container', className, {
            'multi-line': multiline,
            'full-width': fullWidth,
            'with-message': helpText || errorText
          })
        }),
        _react2.default.createElement(
          'label',
          { className: 'md-text-field-label' },
          fontIcon,
          useFloatingLabel && label && _react2.default.createElement(_FloatingLabel2.default, {
            label: label,
            active: active,
            error: error,
            required: required,
            value: value
          }),
          textField,
          indIcon,
          !fullWidth && _react2.default.createElement(_TextDivider2.default, {
            icon: !!icon,
            active: active,
            error: error,
            lineDirection: lineDirection
          })
        ),
        textFieldMessage
      );
    }
  }]);

  return TextField;
}(_react.Component);

TextField.propTypes = {
  /**
   * An optional className to apply to the text field container.
   */
  className: _react.PropTypes.string,

  /**
   * An optional className to apply to the input field iteself.
   */
  inputClassName: _react.PropTypes.string,

  /**
   * A valid text field type. This should be one of the valid html5 input types.
   *
   * > If the text field is a multiline text field, it will not be applied because
   * > the main text field will be a `textarea`.
   */
  type: _react.PropTypes.string.isRequired,

  /**
   * A label to display with the text field. If the text field is set to be
   * a single line text field, this will automatically be used as the placeholder
   * text if there is no `placeholder` prop given.
   */
  label: _react.PropTypes.string,

  /**
   * An optional placeholder to display along with the floating label.
   */
  placeholder: _react.PropTypes.string,

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
  rows: _react.PropTypes.number,

  /**
   * The maximum number of rows that can be displayed in a multiline text field.
   * The text field will continue to expand in height until this value is met.
   * Settings this value to `-1` will allow the text field to expand infinitely.
   */
  maxRows: _react.PropTypes.number,

  /**
   * An optional error text to display below the text field. If this value is `trueish`,
   * the icon, label, and text field didivder will be styled with the error color.
   */
  errorText: _react.PropTypes.string,

  /**
   * An optional help text to display below the text field.
   */
  helpText: _react.PropTypes.string,

  /**
   * A boolean if the help text should only be displayed on focus.
   */
  helpOnFocus: _react.PropTypes.bool,

  /**
   * The max length for the text field. If this prop is set, it will automatically
   * add a counter below the text field.
   */
  maxLength: _react.PropTypes.number,

  /**
   * Boolean if the label for the text field should float. Settings this to false
   * will make a single line text field.
   */
  floatingLabel: _react.PropTypes.bool,

  /**
   * An optional icon to display to the left of the text field.
   */
  icon: _react.PropTypes.node,

  /**
   * An optional icon to display to the right of the text field.
   */
  rightIcon: _react.PropTypes.node,

  /**
   * An optional function to call when the text field is blurred.
   */
  onBlur: _react.PropTypes.func,

  /**
   * An optional function to call when the text field's value has changed.
   * The callback will be `onChange(newValue, event)`.
   */
  onChange: _react.PropTypes.func,

  /**
   * An optional function to call when the text field gains focus.
   */
  onFocus: _react.PropTypes.func,

  /**
   * An optional function to call when the text field's value has changed.
   * It is similar to `onChange` except that it triggers immediately after
   * the value has changed while `onChange` happens on blur and after the
   * content has updated. You most likely want to use `onChange`.
   */
  onInput: _react.PropTypes.func,

  /**
   * An optional function to call when a required text field is submitted in
   * a form without any value.
   */
  onInvalid: _react.PropTypes.func,

  /**
   * An optional function to call when a user has pressed a key down.
   */
  onKeyDown: _react.PropTypes.func,

  /**
   * An optional function to call when a user has pressed and released a key.
   */
  onKeyPress: _react.PropTypes.func,

  /**
   * An optional function to call when a user has released a key.
   */
  onKeyUp: _react.PropTypes.func,

  /**
   * An optional function to call when text in the text field has been selected.
   */
  onSelect: _react.PropTypes.func,

  /**
   * Optional style to apply to the text field container.
   */
  style: _react.PropTypes.object,

  /**
   * Optional style to apply to the text field input itself.
   */
  inputStyle: _react.PropTypes.object,

  /**
   * The direction that the text field divider expands from when the text field
   * gains focus.
   */
  lineDirection: _react.PropTypes.oneOf(['left', 'center', 'right']),

  /**
   * Boolean if the text field is required.
   */
  required: _react.PropTypes.bool,

  /**
   * An optional boolean if the text field is disabaled.
   */
  disabled: _react.PropTypes.bool,

  /**
   * Boolean if the text field is read only.
   */
  readOnly: _react.PropTypes.bool,

  /**
   * An optional size for the text field.
   */
  size: _react.PropTypes.number,

  /**
   * Boolean if this text field should be styled as a full width text field.
   * Floating labels and the text field indicator will be removed automatically.
   */
  fullWidth: _react.PropTypes.bool
};
TextField.defaultProps = {
  type: 'text',
  defaultValue: '',
  floatingLabel: true,
  lineDirection: 'left'
};
exports.default = TextField;
module.exports = exports['default'];