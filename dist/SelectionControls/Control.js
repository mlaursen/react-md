'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PropUtils = require('../utils/PropUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = (function (_Component) {
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

    _this.isNotProceedable = function (e, up) {
      var isMouse = e.type === 'mouse' + (up ? 'up' : 'down') && e.button !== 2;
      var isKey = e.type === 'key' + (up ? 'down' : 'up') && (e.which || e.keyCode) === 9;

      return (0, _PropUtils.isPropEnabled)(_this.props, 'disabled') || _this.timeout !== null || !isMouse && !isKey;
    };

    _this.createRipple = function (e) {
      if (_this.isNotProceedable(e, false)) {
        return;
      }

      _this.setState({ focused: true, leaving: false });
    };

    _this.removeRipple = function (e) {
      if (_this.isNotProceedable(e, true)) {
        return;
      }

      _this.timeout = setTimeout(function () {
        _this.timeout = null;
        _this.setState({ leaving: false, focused: false });
      }, _this.props.rippleTimeout);
      _this.setState({ leaving: true });
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { checked: props.isInitiallyChecked };
    _this.timeout = null;
    return _this;
  }

  _createClass(Control, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var type = _props.type;
      var label = _props.label;
      var labelBefore = _props.labelBefore;

      var props = _objectWithoutProperties(_props, ['className', 'type', 'label', 'labelBefore']);

      var _state = this.state;
      var focused = _state.focused;
      var leaving = _state.leaving;
      var checked = _state.checked;

      var labelClassName = (0, _classnames2.default)('md-control-label', 'md-' + type + '-label', className, {
        'disabled': (0, _PropUtils.isPropEnabled)(props, 'disabled')
      });
      var spanLabel = label ? _react2.default.createElement(
        'span',
        { className: 'label' },
        label
      ) : null;
      return _react2.default.createElement(
        'label',
        { className: labelClassName, onMouseDown: this.createRipple, onMouseUp: this.removeRipple },
        labelBefore && spanLabel,
        _react2.default.createElement(
          'div',
          { className: 'md-control-container' },
          _react2.default.createElement('input', _extends({ type: type === 'switch' ? 'checkbox' : type, checked: checked, className: 'md-control-input' }, props, { onChange: this.toggleCheck, onKeyDown: this.removeRipple, onKeyUp: this.createRipple })),
          _react2.default.createElement('div', { className: 'md-control md-' + type }),
          _react2.default.createElement('span', { className: (0, _classnames2.default)('ripple', { 'active': focused, 'leave': leaving }) })
        ),
        !labelBefore && spanLabel
      );
    }
  }]);

  return Control;
})(_react.Component);

Control.propTypes = {
  type: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  isInitiallyChecked: _react.PropTypes.bool,
  rippleTimeout: _react.PropTypes.number,
  checked: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.string,
  label: _react.PropTypes.string,
  labelBefore: _react.PropTypes.bool
};
Control.defaultProps = {
  isInitiallyChecked: false,
  rippleTimeout: 450,
  labelPosition: false
};
exports.default = Control;
module.exports = exports['default'];
//# sourceMappingURL=Control.js.map