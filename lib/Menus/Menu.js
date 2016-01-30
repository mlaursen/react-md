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

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ITEM_SCALE = 56;

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this, props));

    _initialiseProps.call(_this);

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    var minWidth = undefined;
    if (props.minWidth) {
      minWidth = ITEM_SCALE * props.minWidth;
    }
    _this.state = { minWidth: minWidth };
    return _this;
  }

  _createClass(Menu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.isOpen) {
        this.calcMinWidth();
      }
    }
  }, {
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

        if (!this.state.minWidth) {
          this.calcMinWidth();
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
      var children = _props2.children;
      var toggle = _props2.toggle;
      var isOpen = _props2.isOpen;
      var position = _props2.position;
      var close = _props2.close;
      var autoclose = _props2.autoclose;

      var props = _objectWithoutProperties(_props2, ['className', 'listClassName', 'children', 'toggle', 'isOpen', 'position', 'close', 'autoclose']);

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
            className: (0, _classnames2.default)('md-menu', listClassName, 'md-transition-' + position, {
              'below': (0, _utils.isPropEnabled)(props, 'below'),
              'cascading': (0, _utils.isPropEnabled)(props, 'cascading')
            }),
            ref: 'list',
            style: { minWidth: this.state.minWidth }
          },
          _react2.default.Children.map(children, function (child, i) {
            var onClick = child.props.onClick;

            var handleOnClick = onClick;
            if (close && autoclose) {
              handleOnClick = function handleOnClick(e) {
                if (onClick) {
                  onClick(e);
                }

                close(e);
              };
            }
            return _react2.default.cloneElement(child, {
              key: child.key || i,
              onClick: handleOnClick
            });
          })
        )
      );
    }
  }]);

  return Menu;
}(_react.Component);

Menu.minWidths = [1.5, 2, 3, 6, 7];
Menu.positions = ['tr', 'tl', 'br', 'bl'];
Menu.propTypes = {
  className: _react.PropTypes.string,
  listClassName: _react.PropTypes.string,
  children: _react.PropTypes.node,
  toggle: _react.PropTypes.node,
  isOpen: _react.PropTypes.bool.isRequired,
  isBelow: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  minWidth: _react.PropTypes.oneOf(Menu.minWidths),
  position: _react.PropTypes.oneOf(Menu.positions),
  close: _react.PropTypes.func,
  autoclose: _react.PropTypes.bool
};
Menu.defaultProps = {
  position: Menu.positions[0],
  autoclose: true
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.closeOnOutsideClick = function (e) {
    var container = _reactDom2.default.findDOMNode(_this2.refs.container);
    var target = e.target;
    while (target.parentNode) {
      if (target === container) {
        return;
      }
      target = target.parentNode;
    }

    _this2.props.close(e);
  };

  this.calcMinWidth = function () {
    var items = _reactDom2.default.findDOMNode(_this2.refs.list).querySelectorAll('.md-list-tile');
    var maxWidth = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        maxWidth = Math.max(maxWidth, item.offsetWidth);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var minWidth = undefined;
    for (var i = 0; i < Menu.minWidths.length; i++) {
      minWidth = ITEM_SCALE * Menu.minWidths[i];
      if (maxWidth < minWidth) {
        break;
      }
    }

    _this2.setState({ minWidth: minWidth });
  };
};

exports.default = Menu;
module.exports = exports['default'];