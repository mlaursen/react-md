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

var ClockHand = function (_Component) {
  _inherits(ClockHand, _Component);

  function ClockHand(props) {
    _classCallCheck(this, ClockHand);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClockHand).call(this, props));

    _this.calcCurrentDegrees = function () {
      var _this$props = _this.props;
      var time = _this$props.time;
      var minutes = _this$props.minutes;

      var timeAt0Deg = minutes ? 15 : 3;
      var sectors = minutes ? 60 : 12;
      return (time % sectors - timeAt0Deg) * (360 / sectors);
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = { active: false };
    return _this;
  }

  _createClass(ClockHand, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (this.props.minutes !== nextProps.minutes) {
        if (this.state.timeout) {
          clearTimeout(this.state.timeout);
        }

        this.setState({
          active: true,
          timeout: setTimeout(function () {
            return _this2.setState({ active: false, timeout: null });
          }, 150)
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var coords = _props.coords;
      var time = _props.time;
      var minutes = _props.minutes;

      var degrees = this.calcCurrentDegrees();
      var invisibleMinute = false;
      if (minutes) {
        invisibleMinute = degrees % (360 / 12) !== 0;
      }

      var rotateTransform = 'rotate3d(0, 0, 1, ' + degrees + 'deg)';
      return _react2.default.createElement('div', {
        className: (0, _classnames2.default)('md-clock-hand', {
          'active': this.state.active,
          'invisible-minute': invisibleMinute,
          'inner-hour': !minutes && (time > 12 || time === 0)
        }),
        style: {
          left: coords,
          top: coords,
          transform: rotateTransform,
          msTransform: rotateTransform,
          WebkitTransform: rotateTransform,
          MozTransform: rotateTransform
        }
      });
    }
  }]);

  return ClockHand;
}(_react.Component);

ClockHand.propTypes = {
  coords: _react.PropTypes.number,
  time: _react.PropTypes.number.isRequired,
  minutes: _react.PropTypes.bool.isRequired
};
exports.default = ClockHand;
module.exports = exports['default'];