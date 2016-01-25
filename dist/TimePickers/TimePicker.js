'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _Pickers = require('../Pickers');

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
      var calendarTempDate = _props.calendarTempDate;
      var className = _props.className;
      var changeCalendarMode = _props.changeCalendarMode;
      var calendarMode = _props.calendarMode;

      var props = _objectWithoutProperties(_props, ['okLabel', 'okPrimary', 'onOkClick', 'cancelLabel', 'cancelPrimary', 'onCancelClick', 'DateTimeFormat', 'locales', 'calendarTempDate', 'className', 'changeCalendarMode', 'calendarMode']);

      return _react2.default.createElement(
        'div',
        { className: className + ' time-picker' },
        _react2.default.createElement(_TimePickerHeader2.default, {
          DateTimeFormat: DateTimeFormat,
          locales: locales,
          calendarTempDate: calendarTempDate,
          calendarMode: calendarMode,
          changeCalendarMode: changeCalendarMode
        }),
        _react2.default.createElement(
          'div',
          { className: 'md-picker-content-container' },
          _react2.default.createElement(
            'div',
            { className: 'md-picker-content clock' },
            _react2.default.createElement('div', { className: 'md-clock' })
          ),
          _react2.default.createElement(_Pickers.PickerFooter, {
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
  calendarDate: _react.PropTypes.instanceOf(Date).isRequired,
  calendarTempDate: _react.PropTypes.instanceOf(Date).isRequired,
  changeCalendarMode: _react.PropTypes.func.isRequired,
  calendarMode: _react.PropTypes.oneOf(['hour', 'minute']).isRequired
};
exports.default = TimePicker;
module.exports = exports['default'];