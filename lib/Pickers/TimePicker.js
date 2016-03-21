'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _PickerFooter = require('./PickerFooter');

var _PickerFooter2 = _interopRequireDefault(_PickerFooter);

var _ClockFace = require('./ClockFace');

var _ClockFace2 = _interopRequireDefault(_ClockFace);

var _TimePickerHeader = require('./TimePickerHeader');

var _TimePickerHeader2 = _interopRequireDefault(_TimePickerHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimePicker = function (_Component) {
  _inherits(TimePicker, _Component);

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimePicker).call(this, props));

    _this.updateTime = function (timePart) {
      var _this$props = _this.props;
      var tempTime = _this$props.tempTime;
      var setTempTime = _this$props.setTempTime;
      var timeMode = _this$props.timeMode;
      var timePeriod = _this$props.timePeriod;

      var time = new Date(tempTime);
      if (timeMode === 'hour') {
        if (timePeriod && timePeriod === 'PM') {
          timePart += 12;
        }

        time.setHours(timePart);
      } else {
        time.setMinutes(timePart);
      }

      setTempTime(time);
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(TimePicker, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var okLabel = _props.okLabel;
      var okPrimary = _props.okPrimary;
      var onOkClick = _props.onOkClick;
      var cancelLabel = _props.cancelLabel;
      var cancelPrimary = _props.cancelPrimary;
      var onCancelClick = _props.onCancelClick;
      var DateTimeFormat = _props.DateTimeFormat;
      var locales = _props.locales;
      var className = _props.className;
      var setTimeMode = _props.setTimeMode;
      var setTempTime = _props.setTempTime;
      var timeMode = _props.timeMode;
      var tempTime = _props.tempTime;
      var hour = _props.hour;
      var minute = _props.minute;
      var timePeriod = _props.timePeriod;

      var props = _objectWithoutProperties(_props, ['okLabel', 'okPrimary', 'onOkClick', 'cancelLabel', 'cancelPrimary', 'onCancelClick', 'DateTimeFormat', 'locales', 'className', 'setTimeMode', 'setTempTime', 'timeMode', 'tempTime', 'hour', 'minute', 'timePeriod']);

      var hourInt = parseInt(hour);
      var minuteInt = parseInt(minute.replace(/[^0-9]/g, ''));

      return _react2.default.createElement(
        'div',
        { className: className + ' time-picker' },
        _react2.default.createElement(_TimePickerHeader2.default, {
          tempTime: tempTime,
          timeMode: timeMode,
          setTimeMode: setTimeMode,
          setTempTime: setTempTime,
          hour: hour,
          minute: minute,
          timePeriod: timePeriod
        }),
        _react2.default.createElement(
          'div',
          { className: 'md-picker-content-container' },
          _react2.default.createElement(
            'div',
            { className: 'md-picker-content clock' },
            _react2.default.createElement(_ClockFace2.default, {
              time: timeMode === 'hour' ? hourInt : minuteInt,
              minutes: timeMode === 'minute',
              onClick: this.updateTime,
              timePeriod: timePeriod
            })
          ),
          _react2.default.createElement(_PickerFooter2.default, {
            okLabel: okLabel,
            okPrimary: okPrimary,
            onOkClick: onOkClick,
            cancelLabel: cancelLabel,
            cancelPrimary: cancelPrimary,
            onCancelClick: onCancelClick
          })
        )
      );
    }
  }]);

  return TimePicker;
}(_react.Component);

TimePicker.propTypes = {
  className: _react.PropTypes.string.isRequired,
  okLabel: _react.PropTypes.string.isRequired,
  okPrimary: _react.PropTypes.bool.isRequired,
  onOkClick: _react.PropTypes.func.isRequired,
  cancelLabel: _react.PropTypes.string.isRequired,
  cancelPrimary: _react.PropTypes.bool.isRequired,
  onCancelClick: _react.PropTypes.func.isRequired,
  DateTimeFormat: _react.PropTypes.func.isRequired,
  locales: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired,
  setTimeMode: _react.PropTypes.func.isRequired,
  setTempTime: _react.PropTypes.func.isRequired,
  timeMode: _react.PropTypes.oneOf(['hour', 'minute']).isRequired,
  tempTime: _react.PropTypes.instanceOf(Date).isRequired,
  hour: _react.PropTypes.string.isRequired,
  minute: _react.PropTypes.string.isRequired,
  timePeriod: _react.PropTypes.string
};
exports.default = TimePicker;
module.exports = exports['default'];