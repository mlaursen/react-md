'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Pickers = require('../Pickers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePickerHeader = function DatePickerHeader(_ref) {
  var DateTimeFormat = _ref.DateTimeFormat;
  var locales = _ref.locales;
  var changeCalendarMode = _ref.changeCalendarMode;
  var calendarMode = _ref.calendarMode;
  var calendarTempDate = _ref.calendarTempDate;

  return _react2.default.createElement(
    'header',
    { className: 'md-picker-header' },
    _react2.default.createElement(
      _Pickers.PickerControl,
      { onClick: changeCalendarMode.bind(undefined, 'year'), active: calendarMode === 'year' },
      _react2.default.createElement(
        'h6',
        { className: 'md-subtitle' },
        DateTimeFormat(locales, { year: 'numeric' }).format(calendarTempDate)
      )
    ),
    _react2.default.createElement(
      _Pickers.PickerControl,
      { onClick: changeCalendarMode.bind(undefined, 'calendar'), active: calendarMode === 'calendar' },
      _react2.default.createElement(
        'h4',
        { className: 'md-display-1' },
        DateTimeFormat(locales, { weekday: 'short' }).format(calendarTempDate),
        ', '
      ),
      _react2.default.createElement(
        'h4',
        { className: 'md-display-1' },
        DateTimeFormat(locales, { month: 'short', day: '2-digit' }).format(calendarTempDate)
      )
    )
  );
};

DatePickerHeader.propTypes = {
  DateTimeFormat: _react.PropTypes.func.isRequired,
  locales: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired,
  calendarTempDate: _react.PropTypes.instanceOf(Date).isRequired,
  calendarMode: _react.PropTypes.oneOf(['calendar', 'year']).isRequired,
  changeCalendarMode: _react.PropTypes.func.isRequired
};

exports.default = DatePickerHeader;
module.exports = exports['default'];