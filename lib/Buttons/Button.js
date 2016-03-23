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

var _Inks = require('../Inks');

var _Inks2 = _interopRequireDefault(_Inks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this, props));

    _this.renderChildren = function () {
      var _this$props = _this.props;
      var children = _this$props.children;
      var iconBefore = _this$props.iconBefore;
      var label = _this$props.label;

      if (!children) {
        return label;
      } else if (children) {
        return _react2.default.createElement(
          'div',
          { className: 'icon-separator' },
          iconBefore && children,
          _react2.default.createElement(
            'span',
            { className: 'text' },
            label
          ),
          !iconBefore && children
        );
      }
      return label;
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var iconBefore = _props.iconBefore;
      var label = _props.label;
      var children = _props.children;
      var href = _props.href;
      var primary = _props.primary;
      var secondary = _props.secondary;

      var props = _objectWithoutProperties(_props, ['className', 'iconBefore', 'label', 'children', 'href', 'primary', 'secondary']);

      var button = _react2.default.createElement(href ? 'a' : 'button', _extends({}, props, {
        href: href,
        className: (0, _classnames2.default)('md-btn', className, {
          'md-primary': primary,
          'md-secondary': secondary
        })
      }), this.renderChildren());
      return _react2.default.createElement(
        _Inks2.default,
        { disabled: props.disabled },
        button
      );
    }
  }]);

  return Button;
}(_react.Component);

Button.propTypes = {
  className: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  label: _react.PropTypes.string,
  children: _react.PropTypes.node,
  type: _react.PropTypes.string,
  primary: _react.PropTypes.bool,
  secondary: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  iconBefore: _react.PropTypes.bool,
  href: _react.PropTypes.string
};
Button.defaultProps = {
  type: 'button',
  iconBefore: true
};
exports.default = Button;
module.exports = exports['default'];