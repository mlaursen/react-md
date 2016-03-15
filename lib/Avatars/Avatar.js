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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Avatar = function (_Component) {
  _inherits(Avatar, _Component);

  function Avatar(props) {
    _classCallCheck(this, Avatar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Avatar).call(this, props));

    _this.getColor = function () {
      var _this$props = _this.props;
      var suffix = _this$props.suffix;
      var suffixes = _this$props.suffixes;
      var random = _this$props.random;

      if (suffix) {
        return 'md-avatar-' + suffix;
      } else if (!!suffixes && !random) {
        return null;
      }

      var i = Math.floor(Math.random() * (suffixes.length - 1)) + 1;
      return 'md-avatar-' + suffixes[i];
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(Avatar, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var src = _props.src;
      var alt = _props.alt;
      var icon = _props.icon;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['className', 'src', 'alt', 'icon', 'children']);

      return _react2.default.createElement(
        'div',
        _extends({ className: (0, _classnames2.default)('md-avatar', className, this.getColor()) }, props),
        src && _react2.default.createElement('img', { src: src, alt: alt, className: 'md-img-avatar' }),
        !src && _react2.default.createElement(
          'div',
          { className: 'md-avatar-content' },
          icon || children
        )
      );
    }
  }]);

  return Avatar;
}(_react.Component);

Avatar.propTypes = {
  className: _react.PropTypes.string,
  src: _react.PropTypes.string,
  alt: _react.PropTypes.string,
  icon: _react.PropTypes.node,
  children: _react.PropTypes.string,
  random: _react.PropTypes.bool,
  suffixes: _react.PropTypes.arrayOf(_react.PropTypes.string),
  suffix: _react.PropTypes.string
};
Avatar.defaultProps = {
  suffixes: ['color-1', 'color-2', 'color-3']
};
exports.default = Avatar;
module.exports = exports['default'];