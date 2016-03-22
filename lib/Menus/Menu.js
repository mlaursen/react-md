'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Lists = require('../Lists');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this, props));

    _this.closeOnOutsideClick = function (e) {
      var container = _reactDom2.default.findDOMNode(_this.refs.container);
      var target = e.target;
      while (target.parentNode) {
        if (target === container) {
          return;
        }
        target = target.parentNode;
      }

      _this.props.close(e);
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(Menu, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props;
      var isOpen = _props.isOpen;
      var autoclose = _props.autoclose;
      var close = _props.close;

      if (close && autoclose && isOpen && !prevProps.isOpen) {
        window.addEventListener('click', this.closeOnOutsideClick);
      } else if (!isOpen && prevProps.isOpen) {
        if (close && autoclose) {
          window.removeEventListener('click', this.closeOnOutsideClick);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.closeOnOutsideClick);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var className = _props2.className;
      var listClassName = _props2.listClassName;
      var listStyle = _props2.listStyle;
      var children = _props2.children;
      var toggle = _props2.toggle;
      var isOpen = _props2.isOpen;
      var position = _props2.position;
      var close = _props2.close;
      var autoclose = _props2.autoclose;
      var below = _props2.below;
      var cascading = _props2.cascading;
      var expanderIconChildren = _props2.expanderIconChildren;
      var expanderIconClassName = _props2.expanderIconClassName;

      var props = _objectWithoutProperties(_props2, ['className', 'listClassName', 'listStyle', 'children', 'toggle', 'isOpen', 'position', 'close', 'autoclose', 'below', 'cascading', 'expanderIconChildren', 'expanderIconClassName']);

      return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        _extends({
          ref: 'container',
          component: 'div',
          transitionName: 'md-menu',
          transitionEnterTimeout: 300,
          transitionLeaveTimeout: 300,
          className: (0, _classnames2.default)('md-menu-container', className)
        }, props),
        toggle,
        isOpen && _react2.default.createElement(
          _Lists.List,
          {
            ref: 'list',
            className: (0, _classnames2.default)('md-menu', listClassName, 'md-transition-' + position, { below: below, cascading: cascading }),
            style: listStyle
          },
          _react2.default.Children.map(children, function (child, i) {
            var onClick = child.props.onClick;

            var handleOnClick = onClick;
            if (close && autoclose && !child.props.nestedItems) {
              handleOnClick = function handleOnClick(e) {
                if (onClick) {
                  onClick(e);
                }

                close(e);
              };
            }

            return _react2.default.cloneElement(child, {
              key: child.key || i,
              onClick: handleOnClick,
              expanderIconChildren: expanderIconChildren,
              expanderIconClassName: expanderIconClassName
            });
          })
        )
      );
    }
  }]);

  return Menu;
}(_react.Component);

Menu.Positions = {
  TOP_RIGHT: 'tr',
  TOP_LEFT: 'tl',
  BOTTOM_RIGHT: 'br',
  BOTTOM_LEFT: 'bl'
};
Menu.propTypes = {
  className: _react.PropTypes.string,
  listClassName: _react.PropTypes.string,
  listStyle: _react.PropTypes.object,
  children: _react.PropTypes.node,
  toggle: _react.PropTypes.node,
  isOpen: _react.PropTypes.bool.isRequired,
  style: _react.PropTypes.object,
  position: _react.PropTypes.oneOf(Object.keys(Menu.Positions).map(function (key) {
    return Menu.Positions[key];
  })),
  close: _react.PropTypes.func,
  autoclose: _react.PropTypes.bool,
  below: _react.PropTypes.bool,
  cascading: _react.PropTypes.bool,
  expanderIconChildren: _react.PropTypes.node,
  expanderIconClassName: _react.PropTypes.string
};
Menu.defaultProps = {
  position: Menu.Positions.TOP_RIGHT,
  autoclose: true,
  expanderIconChildren: 'keyboard_arrow_right'
};
exports.default = Menu;
module.exports = exports['default'];