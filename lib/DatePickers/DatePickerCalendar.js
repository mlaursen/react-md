'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Buttons = require('../Buttons');

var _utils = require('../utils');

var _CalendarMonth = require('./CalendarMonth');

var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePickerCalendar = function DatePickerCalendar(props) {
  var previousIcon = props.previousIcon;
  var onPreviousClick = props.onPreviousClick;
  var nextIcon = props.nextIcon;
  var onNextClick = props.onNextClick;
  var calendarDate = props.calendarDate;
  var calendarTempDate = props.calendarTempDate;
  var onCalendarDateClick = props.onCalendarDateClick;
  var DateTimeFormat = props.DateTimeFormat;
  var locales = props.locales;
  var minDate = props.minDate;
  var maxDate = props.maxDate;

  var dows = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (dow, i) {
    return _react2.default.createElement(
      'h4',
      { className: 'dow', key: 'dow-' + dow + '-' + i },
      dow
    );
  });

  var isPreviousDisabled = (0, _utils.isMonthBefore)(minDate, calendarDate);
  var isNextDisabled = (0, _utils.isMonthBefore)(calendarDate, maxDate);
  return _react2.default.createElement(
    'section',
    { className: 'md-picker-content md-calendar' },
    _react2.default.createElement(
      'header',
      { className: 'md-calendar-header' },
      _react2.default.createElement(
        'div',
        { className: 'md-calendar-controls' },
        _react2.default.createElement(
          _Buttons.IconButton,
          { onClick: onPreviousClick, disabled: isPreviousDisabled },
          previousIcon
        ),
        _react2.default.createElement(
          'h4',
          { className: 'md-subtitle' },
          DateTimeFormat(locales, { month: 'long', year: 'numeric' }).format(calendarDate)
        ),
        _react2.default.createElement(
          _Buttons.IconButton,
          { onClick: onNextClick, disabled: isNextDisabled },
          nextIcon
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'md-dows' },
        dows
      )
    ),
    _react2.default.createElement(_CalendarMonth2.default, {
      key: DateTimeFormat(locales).format(calendarDate),
      calendarDate: calendarDate,
      calendarTempDate: calendarTempDate,
      onCalendarDateClick: onCalendarDateClick,
      minDate: minDate,
      maxDate: maxDate,
      DateTimeFormat: DateTimeFormat,
      locales: locales
    })
  );
};

DatePickerCalendar.propTypes = {
  previousIcon: _react.PropTypes.node.isRequired,
  onPreviousClick: _react.PropTypes.func.isRequired,
  nextIcon: _react.PropTypes.node.isRequired,
  onNextClick: _react.PropTypes.func.isRequired,
  onCalendarDateClick: _react.PropTypes.func.isRequired,
  calendarDate: _react.PropTypes.instanceOf(Date).isRequired,
  calendarTempDate: _react.PropTypes.instanceOf(Date).isRequired,
  DateTimeFormat: _react.PropTypes.func.isRequired,
  locales: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired,
  minDate: _react.PropTypes.instanceOf(Date),
  maxDate: _react.PropTypes.instanceOf(Date)
};

exports.default = DatePickerCalendar;
module.exports = exports['default'];