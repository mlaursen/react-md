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

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

var _ControlContainer = require('./ControlContainer');

var _ControlContainer2 = _interopRequireDefault(_ControlContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(Checkbox, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ControlContainer2.default, _extends({}, this.props, { type: 'checkbox' }));
    }
  }]);

  return Checkbox;
}(_react.Component);

Checkbox.propTypes = {
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  checked: _react.PropTypes.bool,
  defaultChecked: _react.PropTypes.bool.isRequired,
  label: _react.PropTypes.node,
  labelBefore: _react.PropTypes.bool.isRequired,
  checkedIcon: _react.PropTypes.node.isRequired,
  uncheckedIcon: _react.PropTypes.node.isRequired,
  name: _react.PropTypes.string
};
Checkbox.defaultProps = {
  defaultChecked: false,
  labelBefore: false,
  checkedIcon: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'check_box'
  ),
  uncheckedIcon: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'check_box_outline_blank'
  )
};
exports.default = Checkbox;
module.exports = exports['default'];