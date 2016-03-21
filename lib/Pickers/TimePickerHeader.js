'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PickerControl = require('./PickerControl');

var _PickerControl2 = _interopRequireDefault(_PickerControl);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimePickerHeader = function TimePickerHeader(_ref) {
  var setTimeMode = _ref.setTimeMode;
  var setTempTime = _ref.setTempTime;
  var timeMode = _ref.timeMode;
  var tempTime = _ref.tempTime;
  var hour = _ref.hour;
  var minute = _ref.minute;
  var timePeriod = _ref.timePeriod;

  return _react2.default.createElement(
    'header',
    { className: 'md-picker-header' },
    _react2.default.createElement(
      _PickerControl2.default,
      { onClick: setTimeMode.bind(undefined, 'hour'), active: timeMode === 'hour' },
      _react2.default.createElement(
        'h4',
        { className: 'md-display-3' },
        hour
      )
    ),
    _react2.default.createElement(
      _PickerControl2.default,
      { onClick: setTimeMode.bind(undefined, 'minute'), active: timeMode === 'minute' },
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
        _PickerControl2.default,
        { onClick: function onClick() {
            return setTempTime((0, _utils.addHours)(tempTime, 12));
          }, active: timePeriod === 'AM' },
        _react2.default.createElement(
          'h6',
          { className: 'md-subtitle' },
          'AM'
        )
      ),
      _react2.default.createElement(
        _PickerControl2.default,
        { onClick: function onClick() {
            return setTempTime((0, _utils.subtractHours)(tempTime, 12));
          }, active: timePeriod === 'PM' },
        _react2.default.createElement(
          'h6',
          { className: 'md-subtitle' },
          'PM'
        )
      )
    )
  );
};

TimePickerHeader.propTypes = {
  tempTime: _react.PropTypes.instanceOf(Date).isRequired,
  timeMode: _react.PropTypes.oneOf(['hour', 'minute']).isRequired,
  setTimeMode: _react.PropTypes.func.isRequired,
  setTempTime: _react.PropTypes.func.isRequired,
  hour: _react.PropTypes.string.isRequired,
  minute: _react.PropTypes.string.isRequired,
  timePeriod: _react.PropTypes.string
};

exports.default = TimePickerHeader;
module.exports = exports['default'];