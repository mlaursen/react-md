'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Buttons = require('../Buttons');

var _Transitions = require('../Transitions');

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _ListTile = require('./ListTile');

var _ListTile2 = _interopRequireDefault(_ListTile);

var _ListItemText = require('./ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = function (_Component) {
  _inherits(ListItem, _Component);

  function ListItem(props) {
    _classCallCheck(this, ListItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ListItem).call(this, props));

    _this.renderLeftChildren = function () {
      var _this$props = _this.props;
      var leftIcon = _this$props.leftIcon;
      var leftAvatar = _this$props.leftAvatar;

      if (!leftIcon && !leftAvatar) {
        return null;
      }

      return _react2.default.cloneElement(leftIcon || leftAvatar, { key: 'left-children' });
    };

    _this.renderRightChildren = function () {
      var _this$props2 = _this.props;
      var rightIcon = _this$props2.rightIcon;
      var rightAvatar = _this$props2.rightAvatar;
      var expanderIconChildren = _this$props2.expanderIconChildren;
      var expanderIconClassName = _this$props2.expanderIconClassName;
      var nestedItems = _this$props2.nestedItems;
      var disabled = _this$props2.disabled;


      if (!rightIcon && !rightAvatar && !(nestedItems && nestedItems.length)) {
        return null;
      }

      if (nestedItems && nestedItems.length) {
        var className = (0, _classnames2.default)('md-list-expander', { 'active': _this.isOpen() });
        if (!rightIcon) {
          return _react2.default.createElement(_Buttons.IconButton, {
            key: 'toggle',
            disabled: disabled,
            onClick: _this.toggleNestedItems,
            iconClassName: expanderIconClassName,
            className: className,
            children: expanderIconChildren
          });
        }

        return _react2.default.cloneElement(rightIcon, { key: 'toggle', className: className });
      }

      return _react2.default.cloneElement(rightIcon || rightAvatar, { key: 'right-children' });
    };

    _this.isOpen = function () {
      return typeof _this.props.isOpen === 'undefined' ? _this.state.isOpen : _this.props.isOpen;
    };

    _this.toggleNestedItems = function (e) {
      var onExpanderClick = _this.props.onExpanderClick;

      e.stopPropagation();

      if (onExpanderClick) {
        onExpanderClick(e);
      } else {
        _this.setState({ isOpen: !_this.state.isOpen });
      }
    };

    _this.handleClick = function (e) {
      var _this$props3 = _this.props;
      var onClick = _this$props3.onClick;
      var nestedItems = _this$props3.nestedItems;
      var expandOnClick = _this$props3.expandOnClick;
      var disabled = _this$props3.disabled;

      if (disabled) {
        return;
      }
      onClick && onClick(e);

      if (expandOnClick && nestedItems) {
        _this.toggleNestedItems(e);
      }
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { isOpen: props.initiallyOpen, hover: false };
    return _this;
  }

  _createClass(ListItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var hover = this.state.hover;
      var _props = this.props;
      var component = _props.component;
      var className = _props.className;
      var containerClassName = _props.containerClassName;
      var primaryText = _props.primaryText;
      var secondaryText = _props.secondaryText;
      var threeLines = _props.threeLines;
      var leftIcon = _props.leftIcon;
      var leftAvatar = _props.leftAvatar;
      var rightIcon = _props.rightIcon;
      var rightAvatar = _props.rightAvatar;
      var nestedItems = _props.nestedItems;
      var expanderIconClassName = _props.expanderIconClassName;
      var expanderIconChildren = _props.expanderIconChildren;
      var disabled = _props.disabled;

      var props = _objectWithoutProperties(_props, ['component', 'className', 'containerClassName', 'primaryText', 'secondaryText', 'threeLines', 'leftIcon', 'leftAvatar', 'rightIcon', 'rightAvatar', 'nestedItems', 'expanderIconClassName', 'expanderIconChildren', 'disabled']);

      var children = void 0;
      if (this.isOpen() && nestedItems && nestedItems.length) {
        children = _react2.default.createElement(
          _Transitions.Height,
          { key: 'nested-list' },
          _react2.default.createElement(
            _List2.default,
            null,
            nestedItems
          )
        );
      }

      return _react2.default.createElement(
        _reactAddonsTransitionGroup2.default,
        {
          component: 'li',
          className: (0, _classnames2.default)('md-list-item', containerClassName, { hover: hover }),
          onMouseOver: function onMouseOver() {
            return _this2.setState({ hover: true });
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.setState({ hover: false });
          }
        },
        _react2.default.createElement(
          _ListTile2.default,
          _extends({}, props, {
            component: component,
            disabled: disabled,
            onClick: this.handleClick,
            className: (0, _classnames2.default)(className, {
              'secondary-action': nestedItems && nestedItems.length,
              'avatar-height': leftAvatar || rightAvatar,
              'two-lines': secondaryText,
              'three-lines': threeLines && secondaryText
            })
          }),
          this.renderLeftChildren(),
          _react2.default.createElement(_ListItemText2.default, {
            key: 'text',
            primaryText: primaryText,
            secondaryText: secondaryText,
            className: (0, _classnames2.default)({
              'avatar-offset': !!leftAvatar,
              'icon-offset': !!leftIcon
            })
          }),
          this.renderRightChildren()
        ),
        children
      );
    }
  }]);

  return ListItem;
}(_react.Component);

ListItem.propTypes = {
  primaryText: _react.PropTypes.node,
  secondaryText: _react.PropTypes.node,
  className: _react.PropTypes.string,
  containerClassName: _react.PropTypes.string,
  leftIcon: _react.PropTypes.node,
  leftAvatar: _react.PropTypes.node,
  rightIcon: _react.PropTypes.node,
  rightAvatar: _react.PropTypes.node,
  component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
  nestedItems: _react.PropTypes.arrayOf(_react.PropTypes.node),
  initiallyOpen: _react.PropTypes.bool,
  isOpen: _react.PropTypes.bool,
  onExpanderClick: _react.PropTypes.func,
  expandOnClick: _react.PropTypes.bool,
  expanderIconChildren: _react.PropTypes.node,
  expanderIconClassName: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  disabled: _react.PropTypes.bool,
  threeLines: _react.PropTypes.bool
};
ListItem.defaultProps = {
  component: 'div',
  initiallyOpen: false,
  expanderIconChildren: 'keyboard_arrow_down',
  expandOnClick: true
};
exports.default = ListItem;
module.exports = exports['default'];