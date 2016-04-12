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

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

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

/**
 * Takes any component and injects an ink container along with event
 * listeners for handling those inks. It also injects a prop
 * named `ink` which needs to be added to the ComposedComponent.
 *
 * @param ComposedComponent the component to compose with the ink functionality.
 * @return the ComposedComponent with inks.
 */

exports.default = function (ComposedComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(Ink, _Component);

    function Ink(props) {
      _classCallCheck(this, Ink);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ink).call(this, props));

      _this.calcR = function (a, b) {
        return Math.sqrt(a * a + b * b);
      };

      _this.invalidClickEvent = function (_ref) {
        var button = _ref.button;
        var ctrlKey = _ref.ctrlKey;

        return button !== _keyCodes.LEFT_MOUSE || ctrlKey;
      };

      _this.createInk = function (pageX, pageY) {
        var container = _reactDom2.default.findDOMNode(_this).querySelector('.md-ink-container');

        var left = 0,
            top = 0;
        var size = void 0,
            x = void 0,
            y = void 0;
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

      _this.disabled = function () {
        return _this.props.disabled || _this.props.inkDisabled;
      };

      _this.handleMouseDown = function (e) {
        if (_utils.isTouchDevice || _this.invalidClickEvent(e)) {
          return;
        }
        e.stopPropagation();

        _this.createInk(e.pageX, e.pageY);
        _this.setState({
          skipMouseUp: false
        });
      };

      _this.handleMouseLeave = function (e) {
        _this.props.onMouseLeave && _this.props.onMouseLeave(e);
        if (_utils.isTouchDevice) {
          return;
        }

        _this.popInk();
        _this.setState({
          skipMouseUp: true
        });
      };

      _this.handleMouseUp = function (e) {
        _this.props.onMouseUp && _this.props.onMouseUp(e);
        if (_this.invalidClickEvent(e) || _utils.isTouchDevice || _this.state.skipMouseUp) {
          return;
        }
        _this.popInk();
      };

      _this.handleTouchStart = function (e) {
        _this.props.onTouchStart && _this.props.onTouchStart(e);

        e.stopPropagation();
        var _e$changedTouches$ = e.changedTouches[0];
        var pageX = _e$changedTouches$.pageX;
        var pageY = _e$changedTouches$.pageY;

        _this.createInk(pageX, pageY);
      };

      _this.handleTouchEnd = function (e) {
        _this.props.onTouchEnd && _this.props.onTouchEnd(e);
        _this.popInk();
      };

      _this.handleKeyUp = function (e) {
        _this.props.onKeyUp && _this.props.onKeyUp(e);
        if ((e.which || e.keyCode) !== _keyCodes.TAB) {
          return;
        }
        _this.createInk();
      };

      _this.handleBlur = function (e) {
        _this.props.onBlur && _this.props.onBlur(e);
        _this.popInk();
      };

      _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
      _this.state = {
        inks: []
      };
      return _this;
    }

    _createClass(Ink, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var children = _props.children;
        var inkDisabled = _props.inkDisabled;

        var props = _objectWithoutProperties(_props, ['children', 'inkDisabled']);

        // Don't inject ink and new props if disabled


        if (this.disabled()) {
          return _react2.default.createElement(ComposedComponent, _extends({}, props, { children: children }));
        }

        var ink = _react2.default.createElement(
          _reactAddonsTransitionGroup2.default,
          { className: 'md-ink-container', key: 'ink-container' },
          this.state.inks.map(function (ink) {
            return _react2.default.createElement(_InkTransition2.default, _extends({ key: ink.time.getTime() }, ink));
          })
        );

        return _react2.default.createElement(
          ComposedComponent,
          _extends({}, props, {
            onMouseUp: this.handleMouseUp,
            onMouseDown: this.handleMouseDown,
            onMouseLeave: this.handleMouseLeave,
            onKeyUp: this.handleKeyUp,
            onBlur: this.handleBlur,
            onTouchStart: this.handleTouchStart,
            onTouchCancel: this.handleTouchEnd,
            onTouchEnd: this.handleTouchEnd,
            ink: ink
          }),
          children
        );
      }
    }]);

    return Ink;
  }(_react.Component), _class.propTypes = {
    onMouseUp: _react.PropTypes.func,
    onMouseDown: _react.PropTypes.func,
    onMouseLeave: _react.PropTypes.func,
    onKeyUp: _react.PropTypes.func,
    onBlur: _react.PropTypes.func,
    onTouchStart: _react.PropTypes.func,
    onTouchEnd: _react.PropTypes.func,
    disabled: _react.PropTypes.bool,
    children: _react.PropTypes.node,
    inkDisabled: _react.PropTypes.bool
  }, _temp;
};

module.exports = exports['default'];