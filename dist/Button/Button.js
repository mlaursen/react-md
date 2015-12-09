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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _PropUtils = require('../utils/PropUtils');

var _Wrappers = require('../utils/Wrappers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MD_BTN_TYPES = ['flat', 'raised', 'floating', 'icon'];
var MD_BTN_COLORS = ['default', 'primary', 'secondary'];

var Button = (function (_Component) {
  _inherits(Button, _Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this, props));

    _this.getBtnClassName = function () {
      var _classnames;

      var keys = Object.keys(_this.props);
      var className = 'md-btn';
      if ((0, _PropUtils.isPropEnabled)(_this.props, 'disabled', keys)) {
        return className + ((0, _PropUtils.isPropEnabled)(_this.props, 'floating', keys) ? ' md-btn-floating' : '');
      }

      var color = null;
      var mdType = null;
      var colorFound = false;
      var typeFound = false;
      keys.some(function (k) {
        if ((0, _PropUtils.isPropEnabled)(_this.props, k, MD_BTN_COLORS)) {
          color = k;
          colorFound = true;
        } else if ((0, _PropUtils.isPropEnabled)(_this.props, k, MD_BTN_TYPES)) {
          mdType = k;
          typeFound = true;
        }
        return colorFound && typeFound;
      });
      return (0, _classnames3.default)(className, (_classnames = {}, _defineProperty(_classnames, 'md-btn-' + color, color), _defineProperty(_classnames, 'md-btn-' + mdType, mdType), _classnames));
    };

    _this.renderChildren = function () {
      var _this$props = _this.props;
      var children = _this$props.children;
      var iconBefore = _this$props.iconBefore;
      var label = _this$props.label;

      if ((0, _PropUtils.isPropEnabled)(_this.props, 'floating')) {
        return children;
      } else if (children) {
        return _react2.default.createElement(
          'div',
          { className: 'icon-separator' },
          iconBefore && children,
          label,
          !iconBefore && children
        );
      } else {
        return label;
      }
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

      var props = _objectWithoutProperties(_props, ['className', 'iconBefore', 'label', 'children']);

      var btnClassName = (0, _classnames3.default)(this.getBtnClassName(), className);

      return _react2.default.createElement(
        'button',
        _extends({}, props, { className: btnClassName }),
        this.renderChildren()
      );
    }
  }]);

  return Button;
})(_react.Component);

Button.propTypes = {
  className: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  label: _react.PropTypes.string,
  children: _react.PropTypes.node,
  flat: _react.PropTypes.bool,
  raised: _react.PropTypes.bool,
  floating: _react.PropTypes.bool,
  icon: _react.PropTypes.bool,
  type: _react.PropTypes.string,
  primary: _react.PropTypes.bool,
  secondary: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  iconBefore: _react.PropTypes.bool
};
Button.defaultProps = {
  type: 'button',
  iconBefore: true
};
exports.default = (0, _Wrappers.rippleComponent)()(Button);
module.exports = exports['default'];
//# sourceMappingURL=Button.js.map