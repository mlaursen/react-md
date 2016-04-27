'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Menu component is a controlled component. It requires a boolean `isOpen`
 * to determinte its state.
 *
 * Menus allow users to take an action by selecting from a list of choices revealed
 * upon opening a temporary, new sheet of material.
 */

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this, props));

    _this.closeOnOutsideClick = function (e) {
      return (0, _utils.onOutsideClick)(e, _reactDom2.default.findDOMNode(_this.refs.container), _this.props.close);
    };

    _this.handleListClick = function (e) {
      var node = e.target;
      while (node) {
        if (node.classList.contains('md-list-item')) {
          _this.props.close();
          return;
        }

        node = node.parentNode;
      }
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(Menu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var isOpen = _props.isOpen;
      var autoclose = _props.autoclose;
      var close = _props.close;

      if (isOpen && autoclose && close) {
        window.addEventListener('click', this.closeOnOutsideClick);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props2 = this.props;
      var isOpen = _props2.isOpen;
      var autoclose = _props2.autoclose;
      var close = _props2.close;

      if (!close || !autoclose || isOpen === prevProps.isOpen) {
        return;
      }
      if (isOpen) {
        window.addEventListener('click', this.closeOnOutsideClick);
      } else {
        window.removeEventListener('click', this.closeOnOutsideClick);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.closeOnOutsideClick);
    }

    /**
     * Checks if a list item was the target of a click event. Closes the menu if it was.
     *
     * There is only a single event listener to help with giant lists always rerendering since the
     * onClick functions were not equal with autobinding.
     *
     * @param {Object} e the click event.
     */

  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var className = _props3.className;
      var listClassName = _props3.listClassName;
      var listStyle = _props3.listStyle;
      var children = _props3.children;
      var toggle = _props3.toggle;
      var isOpen = _props3.isOpen;
      var position = _props3.position;
      var close = _props3.close;
      var autoclose = _props3.autoclose;
      var cascading = _props3.cascading;
      var expanderIconChildren = _props3.expanderIconChildren;
      var expanderIconClassName = _props3.expanderIconClassName;

      var props = _objectWithoutProperties(_props3, ['className', 'listClassName', 'listStyle', 'children', 'toggle', 'isOpen', 'position', 'close', 'autoclose', 'cascading', 'expanderIconChildren', 'expanderIconClassName']);

      var menuItems = void 0;
      if (isOpen) {
        var listProps = {
          ref: 'list',
          className: (0, _classnames2.default)('md-menu', listClassName, 'md-transition-' + position, { cascading: cascading }),
          style: listStyle
        };

        if (autoclose && close) {
          listProps.onClick = this.handleListClick;
        }

        var items = _react2.default.Children.map(children, function (child, key) {
          if (!child) {
            return child;
          }

          return _react2.default.cloneElement(child, {
            key: child.key || key,
            expanderIconChildren: expanderIconChildren,
            expanderIconClassName: expanderIconClassName
          });
        });

        menuItems = _react2.default.createElement(
          _Lists.List,
          listProps,
          items
        );
      }
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
        menuItems
      );
    }
  }]);

  return Menu;
}(_react.Component);

Menu.Positions = {
  TOP_RIGHT: 'tr',
  TOP_LEFT: 'tl',
  BOTTOM_RIGHT: 'br',
  BOTTOM_LEFT: 'bl',
  BELOW: 'below'
};
Menu.propTypes = {
  /**
   * The optional className for the menu container.
   */
  className: _react.PropTypes.string,

  /**
   * The optional style to apply to the menu container.
   */
  style: _react.PropTypes.object,

  /**
   * The optional className to apply to the opened menu List.
   */
  listClassName: _react.PropTypes.string,

  /**
   * The optional style to apply to the opened menu List.
   */
  listStyle: _react.PropTypes.object,

  /**
   * An array of `ListItem`, `ListItemControl`, `Divider`, `Subheader`, or react element
   * to display when the menu is open.
   */
  children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.arrayOf(_react.PropTypes.element)]),

  /**
   * The component to use that will toggle the `isOpen` prop. This will make
   * the menu relative to this component. An example would be using an `IconButton`,
   * or another button as a toggle.
   */
  toggle: _react.PropTypes.node,

  /**
   * Boolean if the menu is currently open.
   */
  isOpen: _react.PropTypes.bool.isRequired,

  /**
   * The position that the menu should appear from.
   */
  position: _react.PropTypes.oneOf(Object.keys(Menu.Positions).map(function (key) {
    return Menu.Positions[key];
  })),

  /**
   * An optional function that will force the menu to close. This is used so that the
   * menu will be closed when an element outside the menu is clicked.
   */
  close: _react.PropTypes.func,

  /**
   * Boolean if the menu should autoclose when one of the items are clicked.
   * This will only work if the `close` function is given as well.
   */
  autoclose: _react.PropTypes.bool,

  /**
   * Boolean if there are any nested items in the menu items. This will apply additional
   * styling and position for the nested items.
   */
  cascading: _react.PropTypes.bool,

  /**
   * Any children needed to display the expander icon for nested `ListItem`.
   */
  expanderIconChildren: _react.PropTypes.node,

  /**
   * The icon className to use for the expander icon.
   */
  expanderIconClassName: _react.PropTypes.string
};
Menu.defaultProps = {
  position: Menu.Positions.TOP_RIGHT,
  autoclose: true,
  expanderIconChildren: 'keyboard_arrow_right',
  expanderIconClassName: 'material-icons'
};
exports.default = Menu;
module.exports = exports['default'];