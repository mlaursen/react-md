'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _keyCodes = require('../constants/keyCodes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INK_TRANSITION_TIME = 600;

var Ink = function (_Component) {
  _inherits(Ink, _Component);

  function Ink(props) {
    _classCallCheck(this, Ink);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ink).call(this, props));

    _this.calcR = function (a, b) {
      return Math.sqrt(a * a + b * b);
    };

    _this.createInk = function (pageX, pageY) {
      var container = _this.refs.container;

      var left = 0,
          top = 0;
      var size = undefined,
          x = undefined,
          y = undefined;
      if (typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
        var rect = container.getBoundingClientRect();
        var offset = {
          left: rect.left + document.body.scrollLeft,
          top: rect.top + document.body.scrollTop
        };

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

      var ink = document.createElement('span');
      ink.classList.add('md-ink');
      ink.style.cssText = 'left:' + left + 'px;top:' + top + 'px;width:' + size + 'px;height:' + size + 'px;';
      container.insertBefore(ink, container.firstChild);

      setTimeout(function () {
        return ink.classList.add('active');
      }, 25);
      _this.setState({ ink: ink, timestamp: Date.now(), mouseLeave: false, mouseDown: true });
    };

    _this.handleMouseDown = function (_ref) {
      var pageX = _ref.pageX;
      var pageY = _ref.pageY;
      var button = _ref.button;
      var ctrlKey = _ref.ctrlKey;
      var changedTouches = _ref.changedTouches;

      if (_this.props.disabled || !changedTouches && (button !== _keyCodes.LEFT_MOUSE || ctrlKey)) {
        return;
      }

      if (_this.props.onClick) {
        _this.props.onClick();
      }
      if (changedTouches) {
        _this.createInk(changedTouches[0].pageX, changedTouches[0].pageY);
      } else {
        _this.createInk(pageX, pageY);
      }
      _this.setState({ mouseLeave: false });
    };

    _this.handleMouseUp = function (_ref2) {
      var button = _ref2.button;
      var ctrlKey = _ref2.ctrlKey;
      var changedTouches = _ref2.changedTouches;

      var invalidKey = button !== _keyCodes.LEFT_MOUSE && !changedTouches || ctrlKey;
      if (_this.props.disabled || invalidKey || _this.state.mouseLeave) {
        return;
      }
      _this.removeInk();
      _this.setState({ mouseDown: false });
    };

    _this.handleMouseLeave = function () {
      if (_this.props.disabled || !_this.state.mouseDown || _this.state.mouseLeave) {
        return;
      }
      _this.removeInk();
      _this.setState({ mouseLeave: true });
    };

    _this.removeInk = function () {
      var _this$state = _this.state;
      var ink = _this$state.ink;
      var timestamp = _this$state.timestamp;

      if (!ink) {
        return;
      }

      ink.classList.add('leaving');
      var timeout = setTimeout(function () {
        _this.refs.container.removeChild(ink);

        var timeouts = Object.assign({}, _this.state.timeouts);
        delete timeouts[timestamp];
        _this.setState({ timeouts: timeouts });
      }, INK_TRANSITION_TIME);

      var timeouts = Object.assign({}, _this.state.timeouts);
      timeouts[timestamp] = timeout;
      _this.setState({ timeouts: timeouts });
    };

    _this.getEvents = function () {
      if (typeof window !== 'undefined' && ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch)) {
        return {
          onTouchStart: _this.handleMouseDown,
          onTouchEnd: _this.handleMouseUp,
          onTouchCancel: _this.handleMouseUp,
          onTouchLeave: _this.handleMouseLeave
        };
      } else {
        return {
          onMouseDown: _this.handleMouseDown,
          onMouseUp: _this.handleMouseUp,
          onMouseLeave: _this.handleMouseLeave
        };
      }
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { size: null, timeouts: {} };
    return _this;
  }

  _createClass(Ink, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.focused && nextProps.focused) {
        this.createInk();
      } else if (!nextProps.focused && this.props.focused) {
        this.handleMouseUp({ button: _keyCodes.LEFT_MOUSE });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var timeouts = this.state.timeouts;

      Object.keys(timeouts).forEach(function (k) {
        clearTimeout(timeouts[k]);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className;

      return _react2.default.createElement('div', _extends({
        ref: 'container',
        className: (0, _classnames2.default)('md-ink-container', className)
      }, this.getEvents()));
    }
  }]);

  return Ink;
}(_react.Component);

Ink.propTypes = {
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  onClick: _react.PropTypes.func,
  focused: _react.PropTypes.bool
};
exports.default = Ink;
module.exports = exports['default'];