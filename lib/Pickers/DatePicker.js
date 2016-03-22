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

var _PickerFooter = require('./PickerFooter');

var _PickerFooter2 = _interopRequireDefault(_PickerFooter);

var _DatePickerHeader = require('./DatePickerHeader');

var _DatePickerHeader2 = _interopRequireDefault(_DatePickerHeader);

var _DatePickerCalendar = require('./DatePickerCalendar');

var _DatePickerCalendar2 = _interopRequireDefault(_DatePickerCalendar);

var _YearPicker = require('./YearPicker');

var _YearPicker2 = _interopRequireDefault(_YearPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatePicker).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(DatePicker, [{
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
      var calendarTempDate = _props.calendarTempDate;
      var calendarMode = _props.calendarMode;
      var changeCalendarMode = _props.changeCalendarMode;
      var className = _props.className;

      var props = _objectWithoutProperties(_props, ['okLabel', 'okPrimary', 'onOkClick', 'cancelLabel', 'cancelPrimary', 'onCancelClick', 'DateTimeFormat', 'locales', 'calendarTempDate', 'calendarMode', 'changeCalendarMode', 'className']);

      return _react2.default.createElement(
        'div',
        { className: className + ' date-picker' },
        _react2.default.createElement(_DatePickerHeader2.default, {
          DateTimeFormat: DateTimeFormat,
          locales: locales,
          calendarTempDate: calendarTempDate,
          calendarMode: calendarMode,
          changeCalendarMode: changeCalendarMode
        }),
        _react2.default.createElement(
          'div',
          { className: 'md-picker-content-container' },
          calendarMode === 'calendar' ? _react2.default.createElement(_DatePickerCalendar2.default, _extends({}, props, {
            calendarTempDate: calendarTempDate,
            DateTimeFormat: DateTimeFormat,
            locales: locales
          })) : _react2.default.createElement(_YearPicker2.default, _extends({}, props, {
            calendarTempDate: calendarTempDate,
            DateTimeFormat: DateTimeFormat,
            locales: locales
          })),
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

  return DatePicker;
}(_react.Component);

DatePicker.propTypes = {
  className: _react.PropTypes.string.isRequired,
  okLabel: _react.PropTypes.string.isRequired,
  okPrimary: _react.PropTypes.bool.isRequired,
  onOkClick: _react.PropTypes.func.isRequired,
  cancelLabel: _react.PropTypes.string.isRequired,
  cancelPrimary: _react.PropTypes.bool.isRequired,
  onCancelClick: _react.PropTypes.func.isRequired,
  DateTimeFormat: _react.PropTypes.func.isRequired,
  locales: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired,
  calendarDate: _react.PropTypes.instanceOf(Date).isRequired,
  calendarTempDate: _react.PropTypes.instanceOf(Date).isRequired,
  calendarMode: _react.PropTypes.oneOf(['calendar', 'year']).isRequired,
  changeCalendarMode: _react.PropTypes.func.isRequired
};
exports.default = DatePicker;
module.exports = exports['default'];