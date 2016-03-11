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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup(props) {
    _classCallCheck(this, RadioGroup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RadioGroup).call(this, props));

    _this.handleChange = function (value, e) {
      _this.props.onChange && _this.props.onChange(value, e);
      _this.setState({ value: value });
    };

    _this.getValue = function () {
      return typeof _this.props.value === 'undefined' ? _this.state.value : _this.props.value;
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      value: props.defaultValue || _react2.default.Children.toArray(props.children)[0].props.value
    };
    return _this;
  }

  _createClass(RadioGroup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var component = _props.component;
      var className = _props.className;
      var children = _props.children;
      var name = _props.name;

      var props = _objectWithoutProperties(_props, ['component', 'className', 'children', 'name']);

      var fullProps = _extends({}, props, {
        className: (0, _classnames2.default)('md-radio-group', className)
      });
      var value = this.getValue();

      return _react2.default.createElement(component, fullProps, _react2.default.Children.map(children, function (child, i) {
        return _react2.default.cloneElement(child, {
          key: i,
          checked: value === child.props.value,
          onChange: _this2.handleChange,
          name: name || child.props.name,
          className: (0, _classnames2.default)({ 'inline': (0, _utils.isPropEnabled)(props, 'inline') })
        });
      }));
    }
  }]);

  return RadioGroup;
}(_react.Component);

RadioGroup.propTypes = {
  defaultValue: _react.PropTypes.string,
  className: _react.PropTypes.string,
  children: _react.PropTypes.arrayOf(_react.PropTypes.node),
  component: _react.PropTypes.string,
  inline: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  name: _react.PropTypes.string,
  value: _react.PropTypes.string
};
RadioGroup.defaultProps = {
  component: 'div'
};
exports.default = RadioGroup;
module.exports = exports['default'];