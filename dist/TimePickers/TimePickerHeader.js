'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Pickers = require('../Pickers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var DatePickerHeader = function DatePickerHeader(_ref) {
  var DateTimeFormat = _ref.DateTimeFormat;
  var locales = _ref.locales;
  var changeCalendarMode = _ref.changeCalendarMode;
  var calendarMode = _ref.calendarMode;
  var calendarTempDate = _ref.calendarTempDate;

  var time = new DateTimeFormat(locales, { hour: 'numeric', minute: '2-digit' }).format(calendarTempDate);

  var _time$split = time.split(/(?=[^0-9])/);

  var _time$split2 = _toArray(_time$split);

  var hour = _time$split2[0];
  var minute = _time$split2[1];

  var others = _time$split2.slice(2);

  var timePeriod = undefined;
  if (others.length) {
    timePeriod = others.join('').trim();
  }
  return _react2.default.createElement(
    'header',
    { className: 'md-picker-header' },
    _react2.default.createElement(
      _Pickers.PickerControl,
      { onClick: changeCalendarMode.bind(undefined, 'hour'), active: calendarMode === 'hour' },
      _react2.default.createElement(
        'h4',
        { className: 'md-display-3' },
        hour
      )
    ),
    _react2.default.createElement(
      _Pickers.PickerControl,
      { onClick: changeCalendarMode.bind(undefined, 'minute'), active: calendarMode === 'minute' },
      _react2.default.createElement(
        'h4',
        { className: 'md-display-3' },
        minute
      )
    ),
    timePeriod && _react2.default.createElement(
      'div',
      { className: 'md-time-periods' },
      _react2.default.createElement(
        _Pickers.PickerControl,
        { onClick: function onClick() {}, active: timePeriod === 'AM' },
        _react2.default.createElement(
          'h6',
          { className: 'md-subtitle' },
          'AM'
        )
      ),
      _react2.default.createElement(
        _Pickers.PickerControl,
        { onClick: function onClick() {}, active: timePeriod === 'PM' },
        _react2.default.createElement(
          'h6',
          { className: 'md-subtitle' },
          'PM'
        )
      )
    )
  );
};

DatePickerHeader.propTypes = {
  DateTimeFormat: _react.PropTypes.func.isRequired,
  locales: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired,
  calendarTempDate: _react.PropTypes.instanceOf(Date).isRequired,
  calendarMode: _react.PropTypes.oneOf(['hour', 'minute']).isRequired,
  changeCalendarMode: _react.PropTypes.func.isRequired
};

exports.default = DatePickerHeader;
module.exports = exports['default'];