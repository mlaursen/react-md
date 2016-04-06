'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _keyCodes = require('../constants/keyCodes');

var _utils = require('../utils');

var _ClockTime = require('./ClockTime');

var _ClockTime2 = _interopRequireDefault(_ClockTime);

var _ClockHand = require('./ClockHand');

var _ClockHand2 = _interopRequireDefault(_ClockHand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClockFace = function (_Component) {
  _inherits(ClockFace, _Component);

  function ClockFace(props) {
    _classCallCheck(this, ClockFace);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClockFace).call(this, props));

    _this.updateRadius = function () {
      var offsetWidth = _this.refs.clockFace.offsetWidth;


      _this.setState({ radius: offsetWidth / 2 });
    };

    _this.handleMouseDown = function (e) {
      if (e.button !== _keyCodes.LEFT_MOUSE || e.ctrlKey) {
        return;
      }
      _this.refs.clockFace.addEventListener('mousemove', _this.handleMouseMove);
    };

    _this.handleMouseMove = function (e) {
      e.preventDefault();
      var offsetX = e.offsetX;
      var offsetY = e.offsetY;

      if (typeof offsetX === 'undefined' || typeof offsetY === 'undefined') {
        var offset = (0, _utils.getTouchOffset)(e);

        offsetX = offset.offsetX;
        offsetY = offset.offsetY;
      }

      _this.calcNewTime(offsetX, offsetY);
    };

    _this.handleMouseUp = function (e) {
      if (e.button !== _keyCodes.LEFT_MOUSE || e.ctrlKey) {
        return;
      }
      _this.refs.clockFace.removeEventListener('mousemove', _this.handleMouseMove);
      var offsetX = e.offsetX;
      var offsetY = e.offsetY;

      if (typeof offsetX === 'undefined' || typeof offsetY === 'undefined') {
        var offset = (0, _utils.getTouchOffset)(e);

        offsetX = offset.offsetX;
        offsetY = offset.offsetY;
      }

      _this.calcNewTime(offsetX, offsetY);
    };

    _this.handleTouchMove = function (e) {
      e.preventDefault();
      var _e$changedTouches$ = e.changedTouches[0];
      var offsetX = _e$changedTouches$.offsetX;
      var offsetY = _e$changedTouches$.offsetY;

      if (typeof offsetX === 'undefined' || typeof offsetY === 'undefined') {
        var offset = (0, _utils.getTouchOffset)(e);

        offsetX = offset.offsetX;
        offsetY = offset.offsetY;
      }

      _this.calcNewTime(offsetX, offsetY);
    };

    _this.handleTouchEnd = function (e) {
      var _e$changedTouches$2 = e.changedTouches[0];
      var offsetX = _e$changedTouches$2.offsetX;
      var offsetY = _e$changedTouches$2.offsetY;

      if (typeof offsetX === 'undefined' || typeof offsetY === 'undefined') {
        var offset = (0, _utils.getTouchOffset)(e);

        offsetX = offset.offsetX;
        offsetY = offset.offsetY;
      }

      _this.calcNewTime(offsetX, offsetY);
    };

    _this.calcNewTime = function (x, y) {
      var radius = _this.state.radius;

      var sectors = _this.props.minutes ? 60 : 12;
      var sectorSize = 360 / sectors;
      var atan = Math.atan2(y - radius, x - radius);
      var degrees = atan * (180 / Math.PI);
      var time = Math.round(degrees / sectorSize);

      // time will be a negative number if it is the top half of the circle
      time += _this.props.minutes ? 15 : 3;
      if (time < 0) {
        time += sectors;
      }

      if (!_this.props.timePeriod) {
        var isInCircle = (0, _utils.isPointInCircle)(radius, radius, radius - 48, x, y);
        if (isInCircle && time !== 0 || !isInCircle && time === 0) {
          time += 12;
        }
      }

      _this.props.onClick(time);
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { radius: 136 };
    return _this;
  }

  _createClass(ClockFace, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateRadius();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var time = _props.time;
      var minutes = _props.minutes;
      var timePeriod = _props.timePeriod;
      var radius = this.state.radius;

      var size = !minutes && !timePeriod ? 24 : 12;
      var times = Array.apply(null, new Array(size)).map(function (_, i) {
        var clockTime = i + 1;
        if (minutes) {
          clockTime = clockTime * 5 % 60;
        } else {
          clockTime %= 24;
        }

        return _react2.default.createElement(_ClockTime2.default, {
          key: 'time-' + i,
          index: i + 1,
          time: clockTime,
          active: clockTime === time,
          radius: radius,
          minutes: minutes
        });
      });
      return _react2.default.createElement(
        'div',
        {
          className: 'md-clock-face',
          ref: 'clockFace',
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onTouchMove: this.handleTouchMove,
          onTouchEnd: this.handleTouchStart
        },
        times,
        _react2.default.createElement(_ClockHand2.default, { time: time, coords: radius, minutes: minutes })
      );
    }
  }]);

  return ClockFace;
}(_react.Component);

ClockFace.propTypes = {
  time: _react.PropTypes.number.isRequired,
  minutes: _react.PropTypes.bool.isRequired,
  onClick: _react.PropTypes.func.isRequired,
  timePeriod: _react.PropTypes.string
};
exports.default = ClockFace;
module.exports = exports['default'];