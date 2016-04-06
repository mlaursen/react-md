'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _keyCodes = require('../constants/keyCodes');

var _dates = require('../utils/dates');

var _TextFields = require('../TextFields');

var _TextFields2 = _interopRequireDefault(_TextFields);

var _Dialogs = require('../Dialogs');

var _Dialogs2 = _interopRequireDefault(_Dialogs);

var _Transitions = require('../Transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePickerContainer = function (_Component) {
  _inherits(DatePickerContainer, _Component);

  function DatePickerContainer(props) {
    _classCallCheck(this, DatePickerContainer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatePickerContainer).call(this, props));

    _initialiseProps.call(_this);

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);

    var date = void 0,
        value = void 0;
    var defaultValue = props.defaultValue;
    var DateTimeFormat = props.DateTimeFormat;
    var locales = props.locales;

    if (defaultValue) {
      date = typeof defaultValue === 'string' ? new Date(defaultValue) : defaultValue;
      value = typeof defaultValue === 'string' ? defaultValue : DateTimeFormat(locales).format(defaultValue);
    } else {
      date = new Date();
    }

    _this.state = {
      value: value,
      isOpen: props.initiallyOpen,
      calendarDate: date,
      calendarTempDate: date,
      calendarMode: props.initialCalendarMode,
      transitionName: 'md-swipe-left'
    };
    return _this;
  }

  _createClass(DatePickerContainer, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
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

      var calendarDate = this.state.calendarDate;

      if (calendarDate === nextState.calendarDate) {
        return;
      }

      this.setState({ transitionName: 'md-swipe-' + (calendarDate < nextState.calendarDate ? 'left' : 'right') });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.isOpen) {
        if (this.props.inline) {
          window.removeEventListener('click', this.closeOnOutside);
        }

        window.removeEventListener('keydown', this.closeOnEsc);
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
        onCancelClick: this.handleCancelClick,
        onOkClick: this.handleOkClick,
        changeCalendarMode: this.changeCalendarMode,
        onPreviousClick: this.previousMonth,
        onNextClick: this.nextMonth,
        onCalendarDateClick: this.setCalendarTempDate,
        onCalendarYearClick: this.setCalendarTempYear,
        onSwipeChange: this.handleSwipeChange
      });

      var textFieldValue = typeof value === 'undefined' ? state.value : value;
      if (isOpen && inline) {
        textFieldValue = new props.DateTimeFormat(props.locale).format(state.calendarTempDate);
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
          onChange: onChange,
          readOnly: true
        }),
        inline ? _react2.default.createElement(
          _reactAddonsTransitionGroup2.default,
          null,
          isOpen && _react2.default.createElement(
            _Transitions.Height,
            { transitionEnterTimeout: 150, transitionLeaveTimeout: 150 },
            _react2.default.createElement(_DatePicker2.default, pickerProps)
          )
        ) : _react2.default.createElement(
          _Dialogs2.default,
          { isOpen: isOpen, close: this.close },
          isOpen && _react2.default.createElement(_DatePicker2.default, pickerProps)
        )
      );
    }
  }]);

  return DatePickerContainer;
}(_react.Component);

DatePickerContainer.propTypes = {
  className: _react.PropTypes.string,
  icon: _react.PropTypes.node,
  initiallyOpen: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.instanceOf(Date)]),
  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.instanceOf(Date)]),
  onChange: _react.PropTypes.func,
  floatingLabel: _react.PropTypes.bool,
  DateTimeFormat: _react.PropTypes.func.isRequired,
  locales: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired,
  okLabel: _react.PropTypes.string.isRequired,
  okPrimary: _react.PropTypes.bool,
  cancelLabel: _react.PropTypes.string.isRequired,
  cancelPrimary: _react.PropTypes.bool,
  initialCalendarMode: _react.PropTypes.oneOf(['calendar', 'year']),
  previousIcon: _react.PropTypes.node.isRequired,
  nextIcon: _react.PropTypes.node.isRequired,
  minDate: _react.PropTypes.instanceOf(Date),
  maxDate: _react.PropTypes.instanceOf(Date),
  autoOk: _react.PropTypes.bool,
  initialYearsDisplayed: _react.PropTypes.number,
  inline: _react.PropTypes.bool,
  displayMode: _react.PropTypes.oneOf(['landscape', 'portrait'])
};
DatePickerContainer.defaultProps = {
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
    'date_range'
  ),
  initialYearsDisplayed: 100,
  initialCalendarMode: 'calendar',
  DateTimeFormat: _dates.DateTimeFormat,
  locales: window.navigator.userLanguage || window.navigator.language,
  okLabel: 'Ok',
  okPrimary: true,
  cancelLabel: 'Cancel',
  cancelPrimary: true
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.closeOnEsc = function (e) {
    if ((e.which || e.keyCode) === _keyCodes.ESC) {
      _this2.handleCancelClick();
    }
  };

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

  this.toggleOpen = function () {
    _this2.setState({ isOpen: !_this2.state.isOpen });
  };

  this.close = function () {
    _this2.setState({ isOpen: false });
  };

  this.handleOkClick = function (e) {
    var _props2 = _this2.props;
    var DateTimeFormat = _props2.DateTimeFormat;
    var locales = _props2.locales;
    var onChange = _props2.onChange;

    var value = DateTimeFormat(locales).format(_this2.state.calendarTempDate);
    if (typeof _this2.props.value !== 'undefined' && onChange) {
      onChange(value, new Date(_this2.state.calendarTempDate), e);
    }

    _this2.setState({ value: value, isOpen: false });
  };

  this.handleCancelClick = function () {
    _this2.setState({ calendarTempDate: _this2.state.calendarDate, isOpen: false });
  };

  this.changeCalendarMode = function (calendarMode) {
    if (_this2.state.calendarMode === calendarMode) {
      return;
    }

    _this2.setState({ calendarMode: calendarMode });
  };

  this.previousMonth = function () {
    var calendarDate = (0, _dates.subtractDate)(_this2.state.calendarDate, 1, 'M');
    _this2.setState({ calendarDate: calendarDate });
  };

  this.nextMonth = function () {
    var calendarDate = (0, _dates.addDate)(_this2.state.calendarDate, 1, 'M');
    _this2.setState({ calendarDate: calendarDate });
  };

  this.setCalendarTempDate = function (calendarTempDate) {
    var _props3 = _this2.props;
    var autoOk = _props3.autoOk;
    var DateTimeFormat = _props3.DateTimeFormat;
    var locales = _props3.locales;
    var onChange = _props3.onChange;


    if (autoOk) {
      var value = DateTimeFormat(locales).format(calendarTempDate);
      if (onChange && typeof _this2.props.value !== 'undefined') {
        onChange(value, new Date(calendarTempDate));
      }

      _this2.setState({
        value: value,
        calendarTempDate: calendarTempDate,
        // wait for date to be picked then hide
        timeout: setTimeout(function () {
          _this2.setState({ timeout: null, isOpen: false });
        }, 300)
      });
    } else {
      _this2.setState({ calendarTempDate: calendarTempDate });
    }
  };

  this.setCalendarTempYear = function (year) {
    var _state2 = _this2.state;
    var calendarTempDate = _state2.calendarTempDate;
    var calendarDate = _state2.calendarDate;

    if (calendarTempDate.getFullYear() === year) {
      return;
    }

    var _props4 = _this2.props;
    var minDate = _props4.minDate;
    var maxDate = _props4.maxDate;

    var nextDate = new Date(calendarDate.setFullYear(year));
    var nextTemp = new Date(calendarTempDate.setFullYear(year));

    if (minDate && nextTemp < minDate) {
      nextDate = new Date(minDate);
      nextTemp = new Date(minDate);
    }

    if (maxDate && nextTemp > maxDate) {
      nextDate = new Date(maxDate);
      nextTemp = new Date(maxDate);
    }

    _this2.setState({
      calendarDate: nextDate,
      calendarTempDate: nextTemp
    });
  };

  this.handleSwipeChange = function (index, distance) {
    var _props5 = _this2.props;
    var minDate = _props5.minDate;
    var maxDate = _props5.maxDate;
    var calendarDate = _this2.state.calendarDate;

    var isPreviousDisabled = (0, _dates.isMonthBefore)(minDate, calendarDate);
    var isNextDisabled = (0, _dates.isMonthBefore)(calendarDate, maxDate);

    if (distance === 0) {
      return;
    } else if (!isPreviousDisabled && distance < 0) {
      _this2.previousMonth();
    } else if (!isNextDisabled && distance > 0) {
      _this2.nextMonth();
    }
  };
};

exports.default = DatePickerContainer;
module.exports = exports['default'];