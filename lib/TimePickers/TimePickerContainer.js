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

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

var _Pickers = require('../Pickers');

var _TimePicker = require('./TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimePickerContainer = function (_Component) {
  _inherits(TimePickerContainer, _Component);

  function TimePickerContainer(props) {
    _classCallCheck(this, TimePickerContainer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimePickerContainer).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(TimePickerContainer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Pickers.PickerContainer, _extends({}, this.props, { type: 'time', component: _TimePicker2.default }));
    }
  }]);

  return TimePickerContainer;
}(_react.Component);

TimePickerContainer.propTypes = {
  className: _react.PropTypes.string
};
TimePickerContainer.defaultProps = {
  initiallyOpen: false,
  previousIcon: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'chevron_left'
  ),
  nextIcon: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'chevron_right'
  ),
  autoOk: false,
  icon: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'access_time'
  ),
  initialYearsDisplayed: 100,
  initialCalendarMode: 'hour',
  DateTimeFormat: _utils.DateTimeFormat,
  locales: navigator.language,
  okLabel: 'Ok',
  okPrimary: true,
  cancelLabel: 'Cancel',
  cancelPrimary: true
};
exports.default = TimePickerContainer;
module.exports = exports['default'];