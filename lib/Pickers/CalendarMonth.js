'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarMonth = function CalendarMonth(_ref) {
  var calendarDate = _ref.calendarDate;
  var calendarTempDate = _ref.calendarTempDate;
  var onCalendarDateClick = _ref.onCalendarDateClick;
  var minDate = _ref.minDate;
  var maxDate = _ref.maxDate;
  var DateTimeFormat = _ref.DateTimeFormat;
  var locales = _ref.locales;

  var days = [];
  var currentDate = (0, _utils.stripTime)((0, _utils.getDayOfWeek)(new Date(calendarDate).setDate(1), 0));
  var endDate = (0, _utils.stripTime)((0, _utils.getDayOfWeek)((0, _utils.getLastDay)(calendarDate), 6));
  var activeDate = (0, _utils.stripTime)(new Date(calendarTempDate));
  var today = (0, _utils.stripTime)(new Date());

  while (currentDate <= endDate) {
    var key = DateTimeFormat(locales).format(currentDate);
    var date = void 0;
    if (currentDate.getMonth() === calendarDate.getMonth()) {
      var isMinDateDisabled = minDate && minDate.getTime() > currentDate.getTime();
      var isMaxDateDisbaled = maxDate && maxDate.getTime() < currentDate.getTime();
      date = _react2.default.createElement(
        'button',
        {
          type: 'button',
          key: key,
          className: (0, _classnames2.default)('md-calendar-date', {
            'today': currentDate.getTime() === today.getTime(),
            'active': currentDate.getTime() === activeDate.getTime()
          }),
          onClick: onCalendarDateClick.bind(undefined, new Date(currentDate)),
          disabled: isMinDateDisabled || isMaxDateDisbaled
        },
        _react2.default.createElement(
          'span',
          { className: 'date' },
          DateTimeFormat(locales, { day: 'numeric' }).format(currentDate)
        )
      );
    } else {
      date = _react2.default.createElement('div', { key: key, className: 'md-calendar-date-placeholder' });
    }

    days.push(date);
    currentDate = (0, _utils.addDate)(currentDate, 1, 'D');
  }

  return _react2.default.createElement(
    'section',
    { className: 'md-calendar-month' },
    days
  );
};

CalendarMonth.propTypes = {
  calendarDate: _react.PropTypes.instanceOf(Date).isRequired,
  calendarTempDate: _react.PropTypes.instanceOf(Date).isRequired,
  minDate: _react.PropTypes.instanceOf(Date),
  maxDate: _react.PropTypes.instanceOf(Date),
  onCalendarDateClick: _react.PropTypes.func.isRequired,
  DateTimeFormat: _react.PropTypes.func.isRequired,
  locales: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired
};

exports.default = CalendarMonth;
module.exports = exports['default'];