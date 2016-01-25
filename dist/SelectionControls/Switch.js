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

var _keyCodes = require('../constants/keyCodes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = function (_Component) {
  _inherits(Control, _Component);

  function Control(props) {
    _classCallCheck(this, Control);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Control).call(this, props));

    _this.toggleCheck = function (e) {
      var _this$props = _this.props;
      var onChange = _this$props.onChange;
      var value = _this$props.value;

      if (value && onChange) {
        onChange(e);
      } else {
        onChange && onChange(e);
        _this.setState({ checked: !_this.state.checked });
      }
    };

    _this.handleMouseDown = function (e) {
      if (!(0, _utils.isPropEnabled)(_this.props, 'disabled') && !_this.timeout && e.button === _keyCodes.LEFT_MOUSE && !e.ctrlKey) {
        _this.setState({ active: true, leaving: false });
      }
    };

    _this.handleMouseUp = function (e) {
      if (!(0, _utils.isPropEnabled)(_this.props, 'disabled') && _this.state.active && !_this.timeout && e.button === _keyCodes.LEFT_MOUSE && !e.ctrlKey) {
        _this.timeout = setTimeout(function () {
          _this.timeout = null;
          _this.setState({ active: false, leaving: false });
        }, 600);

        _this.setState({ leaving: true });
      }
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { checked: (0, _utils.isPropEnabled)(props, 'defaultToggled'), active: false, leaving: false };
    return _this;
  }

  _createClass(Control, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var label = _props.label;
      var checked = _props.checked;

      var props = _objectWithoutProperties(_props, ['className', 'label', 'checked']);

      var _state = this.state;
      var active = _state.active;
      var leaving = _state.leaving;

      var labelBefore = (0, _utils.isPropEnabled)(props, 'labelBefore');
      var labelClassName = (0, _classnames2.default)('md-control-container', className, {
        'disabled': (0, _utils.isPropEnabled)(props, 'disabled')
      });

      var isChecked = typeof this.props.checked === 'undefined' ? this.state.checked : checked;
      var spanLabel = label ? _react2.default.createElement(
        'span',
        { className: 'label' },
        label
      ) : null;
      return _react2.default.createElement(
        'label',
        { className: labelClassName, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp },
        labelBefore && spanLabel,
        _react2.default.createElement(
          'div',
          { className: 'md-switch-container' },
          _react2.default.createElement('input', _extends({
            type: 'checkbox',
            checked: isChecked
          }, props, {
            className: 'md-control-input',
            onChange: this.toggleCheck
          })),
          _react2.default.createElement(
            'div',
            { className: 'md-switch' },
            _react2.default.createElement('span', { className: (0, _classnames2.default)('md-ink', { active: active, leaving: leaving }) })
          )
        ),
        !labelBefore && spanLabel
      );
    }
  }]);

  return Control;
}(_react.Component);

Control.propTypes = {
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  defaultToggled: _react.PropTypes.bool,
  checked: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.string,
  label: _react.PropTypes.string,
  labelBefore: _react.PropTypes.bool
};
exports.default = Control;
module.exports = exports['default'];