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

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keyCodes = require('../constants/keyCodes');

var _utils = require('../utils');

var _Dialogs = require('../Dialogs');

var _Dialogs2 = _interopRequireDefault(_Dialogs);

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

var _Transitions = require('../Transitions');

var _Transitions2 = _interopRequireDefault(_Transitions);

var _TextFields = require('../TextFields');

var _TextFields2 = _interopRequireDefault(_TextFields);

var _TimePicker = require('./TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimePickerContainer = function (_Component) {
  _inherits(TimePickerContainer, _Component);

  function TimePickerContainer(props) {
    _classCallCheck(this, TimePickerContainer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimePickerContainer).call(this, props));

    _initialiseProps.call(_this);

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);

    var date = props.defaultValue ? new Date(props.defaultValue) : new Date();

    _this.state = _extends({}, _this.getTimeParts(date, props), {
      value: props.defaultValue,
      isOpen: props.initiallyOpen,
      time: date,
      timeMode: props.initialTimeMode,
      tempTime: date
    });
    return _this;
  }

  _createClass(TimePickerContainer, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.getValue() !== this.getValue(nextProps, nextState)) {
        this.setState(this.getTimeParts(this.getValue(nextProps, nextState), nextProps));
      } else if (this.state.tempValue !== nextState.tempTime) {
        this.setState(this.getTimeParts(nextState.tempTime, nextProps));
      }

      if (this.state.isOpen && !nextState.isOpen) {
        if (nextProps.inline) {
          window.removeEventListener('click', this.closeOnOutside);
        }

        window.removeEventListener('keydown', this.closeOnEsc);
      } else if (!this.state.isOpen && nextState.isOpen) {
        if (nextProps.inline) {
          window.addEventListener('click', this.closeOnOutside);
        }

        window.addEventListener('keydown', this.closeOnEsc);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var label = _props.label;
      var floatingLabel = _props.floatingLabel;
      var value = _props.value;
      var onChange = _props.onChange;
      var icon = _props.icon;
      var inline = _props.inline;
      var displayMode = _props.displayMode;

      var props = _objectWithoutProperties(_props, ['label', 'floatingLabel', 'value', 'onChange', 'icon', 'inline', 'displayMode']);

      var _state = this.state;
      var isOpen = _state.isOpen;

      var state = _objectWithoutProperties(_state, ['isOpen']);

      var pickerProps = _extends({}, state, props, {
        className: (0, _classnames2.default)('md-picker', displayMode, { inline: inline, 'with-icon': inline && icon }),
        onOkClick: this.handleOkClick,
        onCancelClick: this.handleCancelClick,
        setTimeMode: this.setTimeMode,
        setTempTime: this.setTempTime
      });

      var textFieldValue = typeof value === 'undefined' ? state.value : value;
      if (isOpen && inline) {
        textFieldValue = this.getValue(this.props, this.state);
      }

      if (textFieldValue) {
        textFieldValue = (0, _utils.getTimeString)(props.DateTimeFormat, props.locales, textFieldValue);
      }

      return _react2.default.createElement(
        'div',
        { className: 'md-picker-container', ref: 'container' },
        _react2.default.createElement(_TextFields2.default, {
          icon: icon,
          onClick: this.toggleOpen,
          label: label,
          floatingLabel: floatingLabel,
          value: textFieldValue,
          onChange: onChange
        }),
        inline ? _react2.default.createElement(
          _reactAddonsTransitionGroup2.default,
          null,
          isOpen && _react2.default.createElement(
            _Transitions2.default,
            { transitionEnterTimeout: 150, transitionLeaveTimeout: 150 },
            _react2.default.createElement(_TimePicker2.default, pickerProps)
          )
        ) : _react2.default.createElement(
          _Dialogs2.default,
          { isOpen: isOpen, close: this.close },
          isOpen && _react2.default.createElement(_TimePicker2.default, pickerProps)
        )
      );
    }
  }]);

  return TimePickerContainer;
}(_react.Component);

TimePickerContainer.propTypes = {
  className: _react.PropTypes.string,
  icon: _react.PropTypes.node,
  defaultValue: _react.PropTypes.instanceOf(Date),
  value: _react.PropTypes.instanceOf(Date),
  initiallyOpen: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  floatingLabel: _react.PropTypes.bool,
  DateTimeFormat: _react.PropTypes.func.isRequired,
  locales: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired,
  okLabel: _react.PropTypes.string.isRequired,
  okPrimary: _react.PropTypes.bool,
  cancelLabel: _react.PropTypes.string.isRequired,
  cancelPrimary: _react.PropTypes.bool,
  initialTimeMode: _react.PropTypes.oneOf(['hour', 'minute']),
  inline: _react.PropTypes.bool,
  displayMode: _react.PropTypes.oneOf(['landscape', 'portrait'])
};
TimePickerContainer.defaultProps = {
  initiallyOpen: false,
  initialTimeMode: 'hour',
  icon: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'access_time'
  ),
  DateTimeFormat: _utils.DateTimeFormat,
  locales: window.navigator.userLanguage || window.navigator.language,
  okLabel: 'Ok',
  okPrimary: true,
  cancelLabel: 'Cancel',
  cancelPrimary: true
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.closeOnOutside = function (e) {
    var container = _this2.refs.container;

    var target = e.target;
    while (target.parentNode) {
      if (target === container) {
        return;
      }
      target = target.parentNode;
    }

    _this2.close();
  };

  this.closeOnEsc = function (e) {
    if ((e.which || e.keyCode) === _keyCodes.ESC) {
      _this2.handleCancelClick();
    }
  };

  this.getValue = function () {
    var props = arguments.length <= 0 || arguments[0] === undefined ? _this2.props : arguments[0];
    var state = arguments.length <= 1 || arguments[1] === undefined ? _this2.state : arguments[1];

    return typeof props.value === 'undefined' ? state.value : props.value;
  };

  this.getTimeParts = function (date) {
    var props = arguments.length <= 1 || arguments[1] === undefined ? _this2.props : arguments[1];

    var time = (0, _utils.getTimeString)(props.DateTimeFormat, props.locales, date);

    var _time$split = time.split(/(?=[^0-9])/);

    var _time$split2 = _toArray(_time$split);

    var hour = _time$split2[0];
    var minute = _time$split2[1];

    var others = _time$split2.slice(2);

    var timePeriod = undefined;
    if (others.length) {
      timePeriod = others.join('').trim();
    }

    return {
      hour: hour,
      minute: minute,
      timePeriod: timePeriod
    };
  };

  this.toggleOpen = function () {
    _this2.setState({ isOpen: !_this2.state.isOpen });
  };

  this.close = function () {
    _this2.setState({ isOpen: false });
  };

  this.setTimeMode = function (timeMode) {
    if (_this2.state.timeMode === timeMode) {
      return;
    }

    _this2.setState({ timeMode: timeMode });
  };

  this.setTempTime = function (time) {
    if (_this2.state.tempTime === time) {
      return;
    }

    _this2.setState({ tempTime: time });
  };

  this.handleOkClick = function (e) {
    var _props2 = _this2.props;
    var onChange = _props2.onChange;
    var DateTimeFormat = _props2.DateTimeFormat;
    var locales = _props2.locales;

    var value = new Date(_this2.state.tempTime);
    if (onChange) {
      onChange(value, (0, _utils.getTimeString)(DateTimeFormat, locales, value), e);
    }

    _this2.setState({ value: value, isOpen: false });
  };

  this.handleCancelClick = function () {
    _this2.setState({ isOpen: false, tempTime: _this2.state.time });
  };
};

exports.default = TimePickerContainer;
module.exports = exports['default'];