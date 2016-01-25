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

var _TextFieldInfo = require('./TextFieldInfo');

var _TextFieldInfo2 = _interopRequireDefault(_TextFieldInfo);

var _TextFieldLabel = require('./TextFieldLabel');

var _TextFieldLabel2 = _interopRequireDefault(_TextFieldLabel);

var _TextFieldDivider = require('./TextFieldDivider');

var _TextFieldDivider2 = _interopRequireDefault(_TextFieldDivider);

var _keyCodes = require('../constants/keyCodes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextField = function (_Component) {
  _inherits(TextField, _Component);

  function TextField(props) {
    _classCallCheck(this, TextField);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextField).call(this, props));

    _this.handleFocus = function () {
      _this.setState({ active: true });
    };

    _this.handleBlur = function () {
      _this.setState({ active: false });
    };

    _this.getValue = function () {
      return typeof _this.props.value !== 'undefined' ? _this.props.value : _this.state.value;
    };

    _this.handleChange = function (e) {
      // Firefox calls handle change after escape while other browsers don't. Hacky fix
      if (_this.state.isEscape) {
        return;
      }

      if (_this.props.onChange) {
        _this.props.onChange(e.target.value, e);
      }

      var state = { value: e.target.value };

      var _this$props = _this.props;
      var rows = _this$props.rows;
      var maxRows = _this$props.maxRows;

      if (!rows || !maxRows) {
        _this.setState(state);
        return;
      }

      var textarea = _this.refs.textarea;
      var offsetHeight = textarea.offsetHeight;
      var scrollHeight = textarea.scrollHeight;
      var _this$state = _this.state;
      var currentRows = _this$state.currentRows;
      var height = _this$state.height;

      if (scrollHeight <= (height || offsetHeight) || maxRows !== -1 && currentRows >= maxRows) {
        return;
      }

      currentRows++;
      state.currentRows = currentRows;
      state.height = currentRows * _this.lineHeight;
      _this.setState(state);
    };

    _this.handleKeyDown = function (e) {
      if ((e.which || e.keyCode) === _keyCodes.ESC) {
        if (_this.props.onChange) {
          _this.props.onChange('', e);
        }
        _this.setState({ value: '', isEscape: true });
      } else if (_this.state.isEscape) {
        _this.setState({ isEscape: false });
      }
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { active: false, currentRows: props.rows, value: props.defaultValue };

    _this.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    return _this;
  }

  _createClass(TextField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.rows) {
        this.lineHeight = this.refs.textarea.offsetHeight / this.props.rows;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var label = _props.label;
      var lineDirection = _props.lineDirection;
      var maxLength = _props.maxLength;
      var floatingLabel = _props.floatingLabel;
      var helpText = _props.helpText;
      var errorText = _props.errorText;
      var rows = _props.rows;
      var maxRows = _props.maxRows;
      var placeholder = _props.placeholder;
      var icon = _props.icon;

      var props = _objectWithoutProperties(_props, ['className', 'label', 'lineDirection', 'maxLength', 'floatingLabel', 'helpText', 'errorText', 'rows', 'maxRows', 'placeholder', 'icon']);

      var _state = this.state;
      var active = _state.active;
      var currentRows = _state.currentRows;
      var height = _state.height;

      var isError = !!errorText || !!maxLength && this.getValue().length > maxLength;
      var isHelpOnFocus = (0, _utils.isPropEnabled)(props, 'helpOnFocus');
      var isInfoDisplayed = errorText || maxLength || helpText && (!isHelpOnFocus || active);
      var isTextArea = typeof rows === 'number';
      var isFullWidth = (0, _utils.isPropEnabled)(props, 'fullWidth');

      var style = {};
      if (rows && maxRows) {
        if (currentRows < maxRows || maxRows === -1) {
          style.overflow = 'hidden';
        }

        if (height || this.lineHeight) {
          style.height = (height || this.lineHeight * rows) + 'px';
        }
      }

      var fontIcon = undefined;
      if (icon) {
        fontIcon = _react2.default.cloneElement(icon, {
          className: (0, _classnames2.default)({
            'active': active,
            'error': isError,
            'hint': !active && !this.getValue()
          })
        });
      }

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('md-text-field-container', className, {
            'single-line': !isFullWidth && !isTextArea,
            'no-label': !floatingLabel,
            'multi-line': isTextArea,
            'full-width': isFullWidth,
            'inline-counter': isFullWidth && !isTextArea && maxLength
          }) },
        _react2.default.createElement(
          'label',
          { className: 'md-text-field-label-container' },
          fontIcon,
          floatingLabel && label && _react2.default.createElement(_TextFieldLabel2.default, {
            label: label,
            active: active,
            isError: isError,
            value: this.getValue(),
            required: (0, _utils.isPropEnabled)(props, 'required')
          }),
          isTextArea ? _react2.default.createElement('textarea', _extends({}, props, {
            ref: 'textarea',
            rows: rows,
            style: style,
            className: (0, _classnames2.default)('md-text-field', { 'active': active }),
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onKeyDown: this.handleKeyDown,
            value: this.getValue(),
            onChange: this.handleChange,
            placeholder: placeholder
          })) : _react2.default.createElement('input', _extends({}, props, {
            className: (0, _classnames2.default)('md-text-field', { 'active': active, 'chrome': this.isChrome }),
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onKeyDown: this.handleKeyDown,
            value: this.getValue(),
            onChange: this.handleChange,
            placeholder: !floatingLabel ? label : placeholder
          })),
          !isFullWidth && _react2.default.createElement(_TextFieldDivider2.default, { active: active, isError: isError, lineDirection: lineDirection })
        ),
        isInfoDisplayed && _react2.default.createElement(_TextFieldInfo2.default, {
          value: this.getValue(),
          isError: isError,
          text: errorText || helpText,
          maxLength: maxLength,
          isHelpOnFocus: isHelpOnFocus,
          active: active
        })
      );
    }
  }]);

  return TextField;
}(_react.Component);

TextField.propTypes = {
  label: _react.PropTypes.string,
  className: _react.PropTypes.string,
  defaultValue: _react.PropTypes.string,
  lineDirection: _react.PropTypes.oneOf(['left', 'right', 'center']),
  type: _react.PropTypes.string,
  required: _react.PropTypes.bool,
  maxLength: _react.PropTypes.number,
  errorText: _react.PropTypes.string,
  helpText: _react.PropTypes.string,
  helpOnFocus: _react.PropTypes.bool,
  rows: _react.PropTypes.number,
  maxRows: _react.PropTypes.number,
  placeholder: _react.PropTypes.string,
  floatingLabel: _react.PropTypes.bool,
  icon: _react.PropTypes.node,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  onChange: _react.PropTypes.func,
  fullWidth: _react.PropTypes.bool
};
TextField.defaultProps = {
  defaultValue: '',
  lineDirection: 'left',
  type: 'text',
  floatingLabel: true
};
exports.default = TextField;
module.exports = exports['default'];