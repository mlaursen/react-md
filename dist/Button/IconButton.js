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

var _FontIcon = require('../FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Wrappers = require('../utils/Wrappers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconButton = (function (_Component) {
  _inherits(IconButton, _Component);

  function IconButton(props) {
    _classCallCheck(this, IconButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IconButton).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { mouseDownTime: null };
    return _this;
  }

  _createClass(IconButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var iconClassName = _props.iconClassName;
      var children = _props.children;
      var className = _props.className;
      var href = _props.href;
      var type = _props.type;

      var props = _objectWithoutProperties(_props, ['iconClassName', 'children', 'className', 'href', 'type']);

      var btnProps = _extends({}, props, {
        className: (0, _classnames2.default)(className, 'md-btn', 'md-btn-icon')
      });

      if (href) {
        btnProps.href = href;
      } else {
        btnProps.type = type;
      }
      return _react2.default.createElement(href ? 'a' : 'button', btnProps, _react2.default.createElement(
        _FontIcon2.default,
        { iconClassName: iconClassName },
        children
      ));
    }
  }]);

  return IconButton;
})(_react.Component);

IconButton.propTypes = {
  iconClassName: _react.PropTypes.string,
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  onClick: _react.PropTypes.func,
  tooltipPosition: _react.PropTypes.string,
  tooltip: _react.PropTypes.string,
  href: _react.PropTypes.string,
  type: _react.PropTypes.string
};
IconButton.defaultProps = {
  type: 'button'
};
exports.default = (0, _Wrappers.rippleComponent)(true, 1)(IconButton);
module.exports = exports['default'];
//# sourceMappingURL=IconButton.js.map