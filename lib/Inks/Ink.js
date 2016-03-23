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

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keyCodes = require('../constants/keyCodes');

var _InkTransition = require('./InkTransition');

var _InkTransition2 = _interopRequireDefault(_InkTransition);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ink = function (_Component) {
  _inherits(Ink, _Component);

  function Ink(props) {
    _classCallCheck(this, Ink);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ink).call(this, props));

    _this.addEventListeners = function () {
      var node = _reactDom2.default.findDOMNode(_this);
      if (_utils.isTouchDevice) {
        node.addEventListener('touchstart', _this.handleTouchStart);
        node.addEventListener('touchend', _this.handleTouchEnd);
      } else {
        node.addEventListener('keyup', _this.handleKeyUp);
        node.addEventListener('blur', _this.handleBlur);
        node.addEventListener('mousedown', _this.handleMouseDown);
        node.addEventListener('mouseup', _this.handleMouseUp);
        node.addEventListener('mouseleave', _this.handleMouseLeave);
      }
    };

    _this.calcR = function (a, b) {
      return Math.sqrt(a * a + b * b);
    };

    _this.invalidClickEvent = function (_ref) {
      var button = _ref.button;
      var ctrlKey = _ref.ctrlKey;

      return button !== _keyCodes.LEFT_MOUSE || ctrlKey;
    };

    _this.createInk = function (pageX, pageY) {
      var container = _reactDom2.default.findDOMNode(_this.refs.container);

      var left = 0,
          top = 0;
      var size = undefined,
          x = undefined,
          y = undefined;
      if (typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
        var offset = (0, _utils.getOffset)(container);

        x = pageX - offset.left;
        y = pageY - offset.top;
      } else {
        var node = container.parentNode;
        x = node.offsetWidth / 2;
        y = node.offsetHeight / 2;
      }

      var offsetWidth = container.offsetWidth;
      var offsetHeight = container.offsetHeight;

      var r = Math.max(_this.calcR(x, y), _this.calcR(offsetWidth - x, y), _this.calcR(offsetWidth - x, offsetHeight - y), _this.calcR(x, offsetHeight - y));

      left = x - r;
      top = y - r;
      size = r * 2;

      var ink = {
        style: {
          left: left,
          top: top,
          width: size,
          height: size
        },
        time: new Date()
      };
      _this.setState({
        inks: [].concat(_toConsumableArray(_this.state.inks), [ink])
      });
    };

    _this.popInk = function () {
      if (!_this.state.inks.length) {
        return;
      }
      var inks = _this.state.inks.slice();
      inks.pop();
      _this.setState({ inks: inks });
    };

    _this.handleMouseDown = function (e) {
      if (_this.props.disabled || _this.invalidClickEvent(e)) {
        return;
      }
      e.stopPropagation();

      _this.createInk(e.pageX, e.pageY);
      _this.setState({
        skipMouseUp: false
      });
    };

    _this.handleMouseLeave = function () {
      if (!_this.props.disabled) {
        _this.popInk();
        _this.setState({
          skipMouseUp: true
        });
      }
    };

    _this.handleMouseUp = function (e) {
      if (_this.props.disabled || _this.invalidClickEvent(e) || _this.state.skipMouseUp) {
        return;
      }
      _this.popInk();
    };

    _this.handleTouchStart = function (e) {
      if (_this.props.disabled) {
        return;
      }
      e.stopPropagation();
      var _e$changedTouches$ = e.changedTouches[0];
      var pageX = _e$changedTouches$.pageX;
      var pageY = _e$changedTouches$.pageY;

      _this.createInk(pageX, pageY);
    };

    _this.handleTouchEnd = function () {
      if (_this.props.disabled) {
        return;
      }
      _this.popInk();
    };

    _this.handleKeyUp = function (e) {
      if (!_this.props.disabled && (e.which || e.keyCode) === _keyCodes.TAB) {
        _this.createInk();
      }
    };

    _this.handleBlur = function () {
      if (!_this.props.disabled) {
        _this.popInk();
      }
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      inks: []
    };
    return _this;
  }

  _createClass(Ink, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addEventListeners();
    }

    /**
     * These had been injected in the React.cloneElement before as props,
     * but there was merging issues if there was a Tooltip involved as well.
     *
     * A _safer_ way of handling these events is to add multiple events with vanilla
     * so they aren't overridden.
     */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['className', 'children']);

      var child = _react2.default.Children.only(children);

      return _react2.default.cloneElement(child, child.props, [_react2.default.createElement(
        _reactAddonsTransitionGroup2.default,
        _extends({
          key: 'inks',
          ref: 'container',
          className: (0, _classnames2.default)('md-ink-container', className)
        }, props),
        this.state.inks.map(function (ink) {
          return _react2.default.createElement(_InkTransition2.default, _extends({ key: ink.time.getTime() }, ink));
        })
      ), child.props.children]);
    }
  }]);

  return Ink;
}(_react.Component);

Ink.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.element,
  disabled: _react.PropTypes.bool
};
exports.default = Ink;
module.exports = exports['default'];