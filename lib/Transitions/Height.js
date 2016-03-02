'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Height = function (_Component) {
  _inherits(Height, _Component);

  function Height(props) {
    _classCallCheck(this, Height);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Height).call(this, props));

    _this.init = function (done) {
      var isEnter = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var el = _reactDom2.default.findDOMNode(_this);
      var fullHeight = el.offsetHeight;
      var elStyle = window.getComputedStyle(el);
      var paddingTop = parseInt(elStyle.paddingTop);

      var _this$props = _this.props;
      var increment = _this$props.increment;
      var transitionEnterTimeout = _this$props.transitionEnterTimeout;
      var transitionLeaveTimeout = _this$props.transitionLeaveTimeout;

      var transitionTime = isEnter ? transitionEnterTimeout : transitionLeaveTimeout;
      var intervals = transitionTime / increment;

      var ptTime = Math.ceil(intervals * paddingTop / fullHeight) * increment;
      var hTime = transitionTime - ptTime;

      el.style.overflow = 'hidden';
      el.style.paddingBottom = 0;
      if (isEnter) {
        el.style.paddingTop = 0;
        el.style.height = 0;

        _this.animatePadding(el, 0, _this.linearIncrement(paddingTop, ptTime / increment), 'paddingTop', 0, ptTime, increment, function () {
          (0, _utils.animate)(el, increment, ptTime, hTime, 'height', 0, paddingTop, fullHeight, done);
        });
      } else {
        el.style.paddingTop = paddingTop + 'px';
        el.style.height = fullHeight + 'px';
        (0, _utils.animate)(el, increment, 0, hTime, 'height', fullHeight - paddingTop, fullHeight, -fullHeight, function () {
          _this.animatePadding(el, paddingTop, -_this.linearIncrement(paddingTop, ptTime / increment), 'paddingTop', 0, ptTime, increment, done);
        });
      }
    };

    _this.linearIncrement = function (value, time) {
      return value / time;
    };

    _this.animatePadding = function (el, padding, paddingIncrement, name, elapsedTime, transitionTime, increment, next) {
      elapsedTime += increment;
      padding += paddingIncrement;
      el.style[name] = padding + 'px';
      if (elapsedTime < transitionTime) {
        setTimeout(function () {
          _this.animatePadding(el, padding, paddingIncrement, name, elapsedTime, transitionTime, increment, next);
        }, increment);
      } else {
        el.style[name] = Math.floor(padding) + 'px';
        next();
      }
    };

    _this.componentWillEnter = function (done) {
      _this.init(done, true);
    };

    _this.componentDidEnter = function () {
      var el = _reactDom2.default.findDOMNode(_this);
      el.style.height = null;
      el.style.paddingTop = null;
      el.style.paddingBottom = null;
      el.style.overflow = null;
    };

    _this.componentWillLeave = function (done) {
      _this.init(done, false);
    };

    return _this;
  }

  _createClass(Height, [{
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return Height;
}(_react.Component);

Height.propTypes = {
  children: _react.PropTypes.node,
  transitionEnterTimeout: _react.PropTypes.number.isRequired,
  transitionLeaveTimeout: _react.PropTypes.number.isRequired,
  increment: _react.PropTypes.number.isRequired
};
Height.defaultProps = {
  transitionEnterTimeout: 150,
  transitionLeaveTimeout: 150,
  increment: 15
};
exports.default = Height;
module.exports = exports['default'];