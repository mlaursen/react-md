'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

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
      var _props = this.props;
      var className = _props.className;
      var label = _props.label;
      var placeholder = _props.placeholder;
      var maxLength = _props.maxLength;
      var helpText = _props.helpText;
      var errorText = _props.errorText;
      var floatingLabel = _props.floatingLabel;
      var icon = _props.icon;
      var lineDirection = _props.lineDirection;
      var rows = _props.rows;
      var maxRows = _props.maxRows;
      var style = _props.style;

      var props = _objectWithoutProperties(_props, ['className', 'label', 'placeholder', 'maxLength', 'helpText', 'errorText', 'floatingLabel', 'icon', 'lineDirection', 'rows', 'maxRows', 'style']);

      var _state = this.state;
      var active = _state.active;
      var currentRows = _state.currentRows;
      var areaHeight = _state.areaHeight;

      var value = this.getValue();
      var error = !!errorText || !!maxLength && value.length > maxLength;
      var required = (0, _utils.isPropEnabled)(props, 'required');
      var helpOnFocus = (0, _utils.isPropEnabled)(props, 'helpOnFocus');
      var multiline = typeof rows === 'number';
      var fullWidth = (0, _utils.isPropEnabled)(props, 'fullWidth');

      var fontIcon = undefined,
          textFieldMessage = undefined;
      if (icon) {
        fontIcon = _react2.default.cloneElement(icon, {
          className: (0, _classnames2.default)('md-text-field-icon', {
            active: active,
            error: error,
            'with-floating-label': floatingLabel,
            'normal': !!value
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

      var textFieldProps = _extends({}, props, {
        value: value,
        className: (0, _classnames2.default)('md-text-field', {
          active: active,
          'floating-label': floatingLabel,
          'single-line': !floatingLabel && !multiline,
          'multi-line': multiline,
          'full-width': fullWidth
        }),
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onChange: this.handleChange
      });

      var textField = undefined;
      if (multiline) {
        var areaStyle = style ? Object.assign({}, style) : {};
        if (maxRows) {
          if (currentRows < maxRows || maxRows === -1) {
            areaStyle.overflow = 'hidden';
          }

          if (areaHeight) {
            areaStyle.height = areaHeight;
          }
        }

        textField = _react2.default.createElement('textarea', _extends({}, textFieldProps, {
          placeholder: active || !floatingLabel || fullWidth ? placeholder || label : null,
          ref: 'textarea',
          rows: rows,
          style: areaStyle
        }));
      } else {
        textField = _react2.default.createElement('input', _extends({}, textFieldProps, {
          style: style,
          placeholder: !floatingLabel ? placeholder || label : placeholder
        }));
      }

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('md-text-field-container', className, {
            'full-width': fullWidth,
            'single-line-full-width': fullWidth && !multiline,
            'with-message': helpText || errorText
          })
        },
        _react2.default.createElement(
          'label',
          { className: 'md-text-field-label' },
          fontIcon,
          floatingLabel && label && _react2.default.createElement(_FloatingLabel2.default, {
            label: label,
            active: active,
            error: error,
            required: required,
            value: value
          }),
          textField,
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
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  type: _react.PropTypes.string.isRequired,
  label: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  value: valueType,
  defaultValue: valueType,
  rows: _react.PropTypes.number,
  maxRows: _react.PropTypes.number,
  errorText: _react.PropTypes.string,
  helpText: _react.PropTypes.string,
  helpOnFocus: _react.PropTypes.bool,
  maxLength: _react.PropTypes.number,
  floatingLabel: _react.PropTypes.bool,
  icon: _react.PropTypes.node,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  style: _react.PropTypes.object,
  lineDirection: _react.PropTypes.oneOf(['left', 'center', 'right'])
};
TextField.defaultProps = {
  type: 'text',
  defaultValue: '',
  floatingLabel: true,
  lineDirection: 'left'
};
exports.default = TextField;
module.exports = exports['default'];