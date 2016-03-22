'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Transitions2 = _interopRequireDefault(_Transitions);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Inks = require('../Inks');

var _Inks2 = _interopRequireDefault(_Inks);

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

    _this.renderText = function () {
      var _this$props = _this.props;
      var primaryText = _this$props.primaryText;
      var secondaryText = _this$props.secondaryText;
      var secondaryText2 = _this$props.secondaryText2;
      var leftIcon = _this$props.leftIcon;
      var leftAvatar = _this$props.leftAvatar;
      var rightIcon = _this$props.rightIcon;
      var rightAvatar = _this$props.rightAvatar;
      var nestedItems = _this$props.nestedItems;

      if (!primaryText) {
        return null;
      }

      var tileTitle = _react2.default.createElement(
        'div',
        { key: 'tile-title', className: 'md-tile-primary-text' },
        primaryText
      );

      if (!leftIcon && !leftAvatar && !rightIcon && !rightAvatar && !(nestedItems && nestedItems.length)) {
        return tileTitle;
      }

      var contentClassName = (0, _classnames2.default)('md-tile-content', {
        'icon-left': leftIcon,
        'avatar-left': leftAvatar,
        'icon-right': rightIcon || nestedItems && nestedItems.length,
        'avatar-right': rightAvatar
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
      var primaryActionNode = _this$props2.primaryActionNode;

      if (!leftIcon && !leftAvatar && !primaryActionNode) {
        return null;
      }

      return _react2.default.cloneElement(primaryActionNode || leftIcon || leftAvatar, { key: 'left-children' });
    };

    _this.renderRightChildren = function () {
      var _this$props3 = _this.props;
      var rightIcon = _this$props3.rightIcon;
      var rightAvatar = _this$props3.rightAvatar;
      var expanderIconChildren = _this$props3.expanderIconChildren;
      var expanderIconClassName = _this$props3.expanderIconClassName;
      var nestedItems = _this$props3.nestedItems;
      var secondaryActionNode = _this$props3.secondaryActionNode;
      var disabled = _this$props3.disabled;

      if (!rightIcon && !rightAvatar && !(nestedItems && nestedItems.length) && !secondaryActionNode) {
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

      return _react2.default.cloneElement(rightIcon || rightAvatar || secondaryActionNode, { key: 'right-children' });
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
      var _this$props4 = _this.props;
      var onClick = _this$props4.onClick;
      var nestedItems = _this$props4.nestedItems;
      var expandOnClick = _this$props4.expandOnClick;
      var primaryAction = _this$props4.primaryAction;
      var primaryActionNode = _this$props4.primaryActionNode;
      var disabled = _this$props4.disabled;

      if (disabled) {
        return;
      }
      onClick && onClick(e);

      if (expandOnClick && nestedItems) {
        _this.toggleNestedItems(e);
      } else if (primaryAction && primaryActionNode) {
        primaryAction(e);
      }
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { isOpen: props.initiallyOpen };
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
      var leftIcon = _props.leftIcon;
      var leftAvatar = _props.leftAvatar;
      var rightIcon = _props.rightIcon;
      var rightAvatar = _props.rightAvatar;
      var nestedItems = _props.nestedItems;
      var expanderIconClassName = _props.expanderIconClassName;
      var expanderIconChildren = _props.expanderIconChildren;
      var primaryAction = _props.primaryAction;
      var primaryActionNode = _props.primaryActionNode;
      var secondaryAction = _props.secondaryAction;
      var secondaryActionNode = _props.secondaryActionNode;
      var disabled = _props.disabled;

      var props = _objectWithoutProperties(_props, ['component', 'className', 'secondaryText', 'secondaryText2', 'leftIcon', 'leftAvatar', 'rightIcon', 'rightAvatar', 'nestedItems', 'expanderIconClassName', 'expanderIconChildren', 'primaryAction', 'primaryActionNode', 'secondaryAction', 'secondaryActionNode', 'disabled']);

      var content = _react2.default.createElement(component, _extends({
        role: 'button',
        tabIndex: component === 'div' && !nestedItems ? 0 : null
      }, props, {
        disabled: disabled,
        onClick: this.handleClick,
        className: (0, _classnames2.default)('md-list-tile', className, {
          'two-lines': secondaryText,
          'three-lines': !!secondaryText && !!secondaryText2,
          'md-list-avatar': leftAvatar || rightAvatar,
          'controls': primaryAction && primaryActionNode || secondaryAction && secondaryActionNode,
          'controls-left': primaryAction && primaryActionNode,
          'controls-right': secondaryAction && secondaryActionNode || !!nestedItems
        })
      }), [this.renderLeftChildren(), this.renderText(), this.renderRightChildren()]);

      // If the list does not have controls
      if (!primaryAction && !primaryActionNode && !secondaryAction && !secondaryActionNode) {
        content = _react2.default.createElement(
          _Inks2.default,
          { disabled: disabled },
          content
        );
      }

      var children = undefined;
      if (this.isOpen() && nestedItems && nestedItems.length) {
        children = _react2.default.createElement(
          _Transitions2.default,
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
        { component: 'li' },
        content,
        children
      );
    }
  }]);

  return ListItem;
}(_react.Component);

ListItem.propTypes = {
  primaryText: _react.PropTypes.node,
  secondaryText: _react.PropTypes.node,
  secondaryText2: _react.PropTypes.node,
  className: _react.PropTypes.string,
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
  primaryAction: _react.PropTypes.func,
  primaryActionNode: _react.PropTypes.node,
  secondaryAction: _react.PropTypes.func,
  secondaryActionNode: _react.PropTypes.node,
  disabled: _react.PropTypes.bool
};
ListItem.defaultProps = {
  component: 'div',
  initiallyOpen: false,
  expanderIconChildren: 'keyboard_arrow_down',
  expandOnClick: true
};
exports.default = ListItem;
module.exports = exports['default'];