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

var _keyCodes = require('../constants/keyCodes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = function (_Component) {
  _inherits(Switch, _Component);

  function Switch(props) {
    _classCallCheck(this, Switch);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Switch).call(this, props));

    _this.toggleCheck = function (e) {
      var onChange = _this.props.onChange;

      onChange && onChange(e);
      if (typeof _this.props.toggled === 'undefined') {
        _this.setState({ toggled: !_this.state.toggled });
      }
    };

    _this.handleMouseDown = function (e) {
      if (!_this.props.disabled && !_this.timeout && e.button === _keyCodes.LEFT_MOUSE && !e.ctrlKey) {
        _this.setState({ active: true, leaving: false });
      }
    };

    _this.handleMouseUp = function (e) {
      if (!_this.props.disabled && _this.state.active && !_this.timeout && e.button === _keyCodes.LEFT_MOUSE && !e.ctrlKey) {
        _this.timeout = setTimeout(function () {
          _this.timeout = null;
          _this.setState({ active: false, leaving: false });
        }, 600);

        _this.setState({ leaving: true });
      }
    };

    _this.isToggled = function () {
      return typeof _this.props.toggled === 'undefined' ? _this.state.toggled : _this.props.toggled;
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { toggled: props.defaultToggled, active: false, leaving: false };
    return _this;
  }

  _createClass(Switch, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var label = _props.label;
      var labelBefore = _props.labelBefore;
      var toggled = _props.toggled;
      var disabled = _props.disabled;

      var props = _objectWithoutProperties(_props, ['className', 'label', 'labelBefore', 'toggled', 'disabled']);

      var _state = this.state;
      var active = _state.active;
      var leaving = _state.leaving;


      var labelClassName = (0, _classnames2.default)('md-control-container', className, { disabled: disabled });

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
          _react2.default.createElement('input', _extends({}, props, {
            type: 'checkbox',
            checked: this.isToggled(),
            className: 'md-control-input',
            onChange: this.toggleCheck,
            disabled: disabled
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

  return Switch;
}(_react.Component);

Switch.propTypes = {
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  defaultToggled: _react.PropTypes.bool,
  toggled: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.string,
  label: _react.PropTypes.node,
  labelBefore: _react.PropTypes.bool
};
exports.default = Switch;
module.exports = exports['default'];