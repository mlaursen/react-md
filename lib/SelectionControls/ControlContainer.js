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

var _InkedControl = require('./InkedControl');

var _InkedControl2 = _interopRequireDefault(_InkedControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlContainer = function (_Component) {
  _inherits(ControlContainer, _Component);

  function ControlContainer(props) {
    _classCallCheck(this, ControlContainer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ControlContainer).call(this, props));

    _this.isChecked = function () {
      return typeof _this.props.checked === 'undefined' ? _this.state.checked : _this.props.checked;
    };

    _this.handleChange = function (e) {
      var _this$props = _this.props;
      var onChange = _this$props.onChange;
      var value = _this$props.value;
      var checked = _this$props.checked;

      onChange && onChange(value, e);
      // prevents 2 change events triggering
      e.stopPropagation();

      if (typeof checked === 'undefined') {
        _this.setState({ checked: !_this.state.checked });
      }
    };

    _this.handleClick = function (e) {
      // Prevent 2 onChange after a click event
      e.stopPropagation();
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { checked: props.defaultChecked };
    return _this;
  }

  _createClass(ControlContainer, [{
    key: 'render',
    value: function render() {
      var isChecked = this.isChecked();
      var _props = this.props;
      var className = _props.className;
      var disabled = _props.disabled;
      var label = _props.label;
      var labelBefore = _props.labelBefore;
      var checkedIcon = _props.checkedIcon;
      var uncheckedIcon = _props.uncheckedIcon;
      var name = _props.name;
      var value = _props.value;
      var checked = _props.checked;
      var type = _props.type;

      var props = _objectWithoutProperties(_props, ['className', 'disabled', 'label', 'labelBefore', 'checkedIcon', 'uncheckedIcon', 'name', 'value', 'checked', 'type']);

      return _react2.default.createElement(
        'label',
        _extends({}, props, {
          className: (0, _classnames2.default)('md-control-container', className, { disabled: disabled })
        }),
        labelBefore && label,
        _react2.default.createElement('input', {
          disabled: disabled,
          type: type,
          className: 'md-control-input',
          checked: isChecked,
          onChange: this.handleChange,
          name: name,
          value: value,
          onClick: this.handleClick
        }),
        _react2.default.createElement(
          _InkedControl2.default,
          {
            type: type,
            checked: isChecked,
            disabled: disabled
          },
          isChecked ? checkedIcon : uncheckedIcon
        ),
        !labelBefore && label
      );
    }
  }]);

  return ControlContainer;
}(_react.Component);

ControlContainer.propTypes = {
  type: _react.PropTypes.oneOf(['radio', 'checkbox']).isRequired,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  defaultChecked: _react.PropTypes.bool.isRequired,
  checked: _react.PropTypes.bool,
  checkedIcon: _react.PropTypes.node.isRequired,
  uncheckedIcon: _react.PropTypes.node.isRequired,
  label: _react.PropTypes.node,
  labelBefore: _react.PropTypes.bool.isRequired,
  name: _react.PropTypes.string
};
exports.default = ControlContainer;
module.exports = exports['default'];