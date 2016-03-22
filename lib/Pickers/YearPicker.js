'use strict';

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearPicker = function (_Component) {
  _inherits(YearPicker, _Component);

  function YearPicker(props) {
    _classCallCheck(this, YearPicker);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(YearPicker).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);

    var year = props.calendarTempDate.getFullYear();
    var halfed = parseInt(props.initialYearsDisplayed / 2);
    _this.state = {
      startYear: props.minDate ? props.minDate.getFullYear() : year - halfed,
      endYear: props.maxDate ? props.maxDate.getFullYear() : year + halfed
    };
    return _this;
  }

  _createClass(YearPicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var container = this.refs.container;

      var active = container.querySelector('.md-year.active');

      var scrollTop = container.scrollHeight - active.offsetTop - active.offsetHeight / 2;
      if (container.offsetHeight < container.offsetWidth) {
        // landscape
        scrollTop -= container.offsetHeight / 2;
      }

      container.scrollTop = scrollTop;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var startYear = _state.startYear;
      var endYear = _state.endYear;

      var currentYear = this.props.calendarTempDate.getFullYear();
      var years = [];
      for (var year = startYear; year <= endYear; year++) {
        years.push(_react2.default.createElement(
          'button',
          {
            type: 'button',
            key: 'year-' + year,
            className: (0, _classnames2.default)('md-year', { 'active': year === currentYear }),
            onClick: this.props.onCalendarYearClick.bind(this, year)
          },
          year
        ));
      }
      return _react2.default.createElement(
        'section',
        { className: 'md-picker-content md-year-picker', ref: 'container' },
        _react2.default.createElement(
          'ol',
          { className: 'md-years' },
          years
        )
      );
    }
  }]);

  return YearPicker;
}(_react.Component);

YearPicker.propTypes = {
  calendarTempDate: _react.PropTypes.instanceOf(Date).isRequired,
  onCalendarYearClick: _react.PropTypes.func.isRequired,
  initialYearsDisplayed: _react.PropTypes.number.isRequired,
  minDate: _react.PropTypes.instanceOf(Date),
  maxDate: _react.PropTypes.instanceOf(Date)
};
exports.default = YearPicker;
module.exports = exports['default'];