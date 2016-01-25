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

var _TextFields = require('../TextFields');

var _TextFields2 = _interopRequireDefault(_TextFields);

var _Dialogs = require('../Dialogs');

var _Dialogs2 = _interopRequireDefault(_Dialogs);

var _Transitions = require('../Transitions');

var _Transitions2 = _interopRequireDefault(_Transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerContainer = function (_Component) {
  _inherits(PickerContainer, _Component);

  function PickerContainer(props) {
    _classCallCheck(this, PickerContainer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PickerContainer).call(this, props));

    _this.closeOnEsc = function (e) {
      if ((e.which || e.keyCode) === _keyCodes.ESC) {
        _this.handleCancelClick();
      }
    };

    _this.closeOnOutside = function (e) {
      var container = _this.refs.container;

      var target = e.target;
      while (target.parentNode) {
        if (target === container) {
          return;
        }
        target = target.parentNode;
      }

      _this.close();
    };

    _this.toggleOpen = function () {
      _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.close = function () {
      _this.setState({ isOpen: false });
    };

    _this.handleOkClick = function (e) {
      var _this$props = _this.props;
      var DateTimeFormat = _this$props.DateTimeFormat;
      var locales = _this$props.locales;
      var onChange = _this$props.onChange;

      var value = DateTimeFormat(locales).format(_this.state.calendarTempDate);
      if (typeof _this.props.value !== 'undefined' && onChange) {
        onChange(value, new Date(_this.state.calendarTempDate), e);
      }

      _this.setState({ value: value, isOpen: false });
    };

    _this.handleCancelClick = function () {
      _this.setState({ calendarTempDate: _this.state.calendarDate, isOpen: false });
    };

    _this.changeCalendarMode = function (calendarMode) {
      if (_this.state.calendarMode === calendarMode) {
        return;
      }

      _this.setState({ calendarMode: calendarMode });
    };

    _this.previousMonth = function () {
      var calendarDate = (0, _utils.subtractDate)(_this.state.calendarDate, 1, 'M');
      _this.setState({ calendarDate: calendarDate });
    };

    _this.nextMonth = function () {
      var calendarDate = (0, _utils.addDate)(_this.state.calendarDate, 1, 'M');
      _this.setState({ calendarDate: calendarDate });
    };

    _this.setCalendarTempDate = function (calendarTempDate) {
      var _this$props2 = _this.props;
      var autoOk = _this$props2.autoOk;
      var DateTimeFormat = _this$props2.DateTimeFormat;
      var locales = _this$props2.locales;
      var onChange = _this$props2.onChange;

      if (autoOk) {
        var value = DateTimeFormat(locales).format(calendarTempDate);
        if (onChange && typeof _this.props.value !== 'undefined') {
          onChange(value, new Date(calendarTempDate));
        }

        _this.setState({
          isOpen: false,
          value: value,
          calendarTempDate: calendarTempDate
        });
      } else {
        _this.setState({ calendarTempDate: calendarTempDate });
      }
    };

    _this.setCalendarTempYear = function (year) {
      var _this$state = _this.state;
      var calendarTempDate = _this$state.calendarTempDate;
      var calendarDate = _this$state.calendarDate;

      if (calendarTempDate.getFullYear() === year) {
        return;
      }

      var _this$props3 = _this.props;
      var minDate = _this$props3.minDate;
      var maxDate = _this$props3.maxDate;

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

      _this.setState({
        calendarDate: nextDate,
        calendarTempDate: nextTemp
      });
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    var date = props.defaultValue ? new Date(props.defaultValue) : new Date();
    _this.state = {
      isOpen: props.initiallyOpen,
      value: props.defaultValue,
      calendarDate: date,
      calendarTempDate: date,
      calendarMode: props.initialCalendarMode
    };
    return _this;
  }

  _createClass(PickerContainer, [{
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
      var type = _props.type;
      var inline = _props.inline;
      var displayMode = _props.displayMode;
      var component = _props.component;

      var props = _objectWithoutProperties(_props, ['label', 'floatingLabel', 'value', 'onChange', 'icon', 'type', 'inline', 'displayMode', 'component']);

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
        onCalendarYearClick: this.setCalendarTempYear
      });

      var picker = undefined;
      if (isOpen) {
        picker = _react2.default.createElement(component, pickerProps);
      }

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
          onChange: onChange
        }),
        inline ? _react2.default.createElement(
          _reactAddonsTransitionGroup2.default,
          null,
          isOpen && _react2.default.createElement(
            _Transitions2.default,
            { transitionEnterTimeout: 150, transitionLeaveTimeout: 150 },
            picker
          )
        ) : _react2.default.createElement(
          _Dialogs2.default,
          { isOpen: isOpen, close: this.close },
          isOpen && picker
        )
      );
    }
  }]);

  return PickerContainer;
}(_react.Component);

PickerContainer.propTypes = {
  component: _react.PropTypes.func.isRequired,
  defaultValue: _react.PropTypes.string,
  initiallyOpen: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  value: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  floatingLabel: _react.PropTypes.bool,
  DateTimeFormat: _react.PropTypes.func.isRequired,
  locales: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired,
  okLabel: _react.PropTypes.string.isRequired,
  okPrimary: _react.PropTypes.bool,
  cancelLabel: _react.PropTypes.string.isRequired,
  cancelPrimary: _react.PropTypes.bool,
  initialCalendarMode: _react.PropTypes.oneOf(['calendar', 'year', 'hour', 'minute']),
  previousIcon: _react.PropTypes.node.isRequired,
  nextIcon: _react.PropTypes.node.isRequired,
  minDate: _react.PropTypes.instanceOf(Date),
  maxDate: _react.PropTypes.instanceOf(Date),
  autoOk: _react.PropTypes.bool,
  icon: _react.PropTypes.node,
  type: _react.PropTypes.oneOf(['date', 'time']),
  initialYearsDisplayed: _react.PropTypes.number,
  inline: _react.PropTypes.bool,
  displayMode: _react.PropTypes.oneOf(['landscape', 'portrait'])
};
exports.default = PickerContainer;
module.exports = exports['default'];