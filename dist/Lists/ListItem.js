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

var _Wrappers = require('../utils/Wrappers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = (function (_Component) {
  _inherits(ListItem, _Component);

  function ListItem(props) {
    _classCallCheck(this, ListItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ListItem).call(this, props));

    _this.renderText = function () {
      var _this$props = _this.props;
      var primaryText = _this$props.primaryText;
      var secondaryText = _this$props.secondaryText;
      var secondaryText2 = _this$props.secondaryText2;
      var leftIcon = _this$props.leftIcon;
      var leftAvatar = _this$props.leftAvatar;
      var rightIcon = _this$props.rightIcon;
      var rightAvatar = _this$props.rightAvatar;

      var tileTitle = _react2.default.createElement(
        'div',
        { key: 'tile-title', className: 'md-tile-primary-text' },
        primaryText
      );

      if (!leftIcon && !leftAvatar && !rightIcon) {
        return tileTitle;
      }

      var contentClassName = (0, _classnames2.default)('md-tile-content', {
        'icon-left': !!leftIcon || !!leftAvatar,
        'icon-right': !!rightIcon || !!rightAvatar
      });
      return _react2.default.createElement(
        'div',
        { key: 'tile-content', className: contentClassName },
        tileTitle,
        secondaryText && _react2.default.createElement(
          'div',
          { className: 'md-tile-secondary-text' },
          secondaryText
        ),
        secondaryText2 && _react2.default.createElement(
          'div',
          { className: 'md-tile-secondary-text' },
          secondaryText2
        )
      );
    };

    _this.renderLeftChildren = function () {
      var _this$props2 = _this.props;
      var leftIcon = _this$props2.leftIcon;
      var leftAvatar = _this$props2.leftAvatar;

      if (!leftIcon && !leftAvatar) {
        return null;
      }

      return _react2.default.cloneElement(leftIcon || leftAvatar, { key: 'left-children' });
    };

    _this.renderRightChildren = function () {
      return null;
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(ListItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var component = _props.component;
      var className = _props.className;
      var secondaryText = _props.secondaryText;
      var secondaryText2 = _props.secondaryText2;

      var props = _objectWithoutProperties(_props, ['component', 'className', 'secondaryText', 'secondaryText2']);

      return _react2.default.createElement(component || 'li', _extends({
        role: 'button',
        className: (0, _classnames2.default)('md-list-tile', className, { 'md-list-3-lines': !!secondaryText && !!secondaryText2 })
      }, props), [this.renderLeftChildren(), this.renderText(), this.renderRightChildren()]);
    }
  }]);

  return ListItem;
})(_react.Component);

ListItem.propTypes = {
  primaryText: _react.PropTypes.string.isRequired,
  secondaryText: _react.PropTypes.node,
  secondaryText2: _react.PropTypes.node,
  className: _react.PropTypes.string,
  leftIcon: _react.PropTypes.node,
  leftAvatar: _react.PropTypes.node,
  rightIcon: _react.PropTypes.node,
  rightAvatar: _react.PropTypes.node,
  component: _react.PropTypes.func
};
exports.default = (0, _Wrappers.rippleComponent)()(ListItem);
module.exports = exports['default'];
//# sourceMappingURL=ListItem.js.map