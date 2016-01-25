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

var _Buttons = require('../Buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, props));

    _this.handleChange = function (e) {
      var _this$props = _this.props;
      var onChange = _this$props.onChange;
      var value = _this$props.value;
      var checked = _this$props.checked;
      var type = _this$props.type;

      var nextChecked = !(typeof checked === 'undefined' ? _this.state.checked : checked);
      if (onChange) {
        if (type === 'radio') {
          onChange(value, e);
        } else if (typeof value === 'undefined') {
          onChange(nextChecked, e);
        } else {
          onChange(nextChecked, value, e);
        }
      }

      typeof e.stopPropagation === 'function' && e.stopPropagation();
      if (typeof value === 'undefined') {
        _this.setState({ checked: nextChecked });
      }
    };

    _this.toggleCheck = function () {
      _this.handleChange({ target: _this.refs.checkbox });
    };

    _this.state = { checked: props.defaultChecked };
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(Checkbox, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var label = _props.label;
      var checked = _props.checked;
      var checkedIcon = _props.checkedIcon;
      var uncheckedIcon = _props.uncheckedIcon;
      var style = _props.style;

      var props = _objectWithoutProperties(_props, ['className', 'label', 'checked', 'checkedIcon', 'uncheckedIcon', 'style']);

      var isLabelBefore = (0, _utils.isPropEnabled)(props, 'labelBefore');
      var isChecked = typeof checked !== 'undefined' ? checked : this.state.checked;
      var isDisabled = (0, _utils.isPropEnabled)(props, 'disabled');

      var checkboxLabel = label ? _react2.default.createElement(
        'label',
        { className: 'label' },
        label,
        _react2.default.createElement('input', _extends({
          ref: 'checkbox',
          checked: isChecked,
          className: 'md-control-input'
        }, props, {
          onChange: this.handleChange
        }))
      ) : null;
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('md-control-container', className, { 'disabled': isDisabled }), style: style },
        isLabelBefore && checkboxLabel,
        _react2.default.createElement(
          _Buttons.IconButton,
          {
            disabled: isDisabled,
            onClick: this.toggleCheck,
            className: (0, _classnames2.default)('md-' + props.type, { 'active': isChecked }),
            onClickInkMouseDown: true
          },
          isChecked ? checkedIcon : uncheckedIcon
        ),
        !isLabelBefore && checkboxLabel
      );
    }
  }]);

  return Checkbox;
}(_react.Component);

Checkbox.propTypes = {
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  defaultChecked: _react.PropTypes.bool,
  checked: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  label: _react.PropTypes.string,
  labelBefore: _react.PropTypes.bool,
  checkedIcon: _react.PropTypes.node.isRequired,
  uncheckedIcon: _react.PropTypes.node.isRequired,
  value: _react.PropTypes.string,
  style: _react.PropTypes.object,
  type: _react.PropTypes.string
};
exports.default = Checkbox;
module.exports = exports['default'];