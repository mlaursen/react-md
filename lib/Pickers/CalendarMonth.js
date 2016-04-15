'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = require('../utils/dates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarMonth = function (_Component) {
  _inherits(CalendarMonth, _Component);

  function CalendarMonth(props) {
    _classCallCheck(this, CalendarMonth);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CalendarMonth).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(CalendarMonth, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var calendarDate = _props.calendarDate;
      var calendarTempDate = _props.calendarTempDate;
      var onCalendarDateClick = _props.onCalendarDateClick;
      var minDate = _props.minDate;
      var maxDate = _props.maxDate;
      var DateTimeFormat = _props.DateTimeFormat;
      var locales = _props.locales;
      var className = _props.className;

      var props = _objectWithoutProperties(_props, ['calendarDate', 'calendarTempDate', 'onCalendarDateClick', 'minDate', 'maxDate', 'DateTimeFormat', 'locales', 'className']);

      var days = [];
      var currentDate = (0, _dates.stripTime)((0, _dates.getDayOfWeek)(new Date(calendarDate).setDate(1), 0));
      var endDate = (0, _dates.stripTime)((0, _dates.getDayOfWeek)((0, _dates.getLastDay)(calendarDate), 6));
      var activeDate = (0, _dates.stripTime)(new Date(calendarTempDate));
      var today = (0, _dates.stripTime)(new Date());

      while (currentDate <= endDate) {
        var key = DateTimeFormat(locales).format(currentDate);
        var date = undefined;
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
              onClick: onCalendarDateClick.bind(this, new Date(currentDate)),
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
        currentDate = (0, _dates.addDate)(currentDate, 1, 'D');
      }

      return _react2.default.createElement(
        'div',
        _extends({ className: (0, _classnames2.default)('md-calendar-month', className) }, props),
        days
      );
    }
  }]);

  return CalendarMonth;
}(_react.Component);

CalendarMonth.propTypes = {
  className: _react.PropTypes.string,
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