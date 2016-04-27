'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var CLOCK_PADDING = 4;

var ClockTime = function (_Component) {
  _inherits(ClockTime, _Component);

  function ClockTime(props) {
    _classCallCheck(this, ClockTime);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClockTime).call(this, props));

    _this.calcPos = function (r, inner, isTop) {
      var radius = _this.props.radius;
      var size = _this.state.size;


      var outerR = radius - size;
      var innerR = outerR - CLOCK_PADDING;
      if (inner) {
        innerR = outerR - size * 2 - CLOCK_PADDING;
      }

      if (isTop) {
        return outerR - innerR * Math.sin(r);
      } else {
        return outerR + innerR * Math.cos(r);
      }
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      // default size in scss
      size: 18
    };
    return _this;
  }

  _createClass(ClockTime, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var offsetWidth = this.refs.time.offsetWidth;

      this.setState({ size: offsetWidth / 2 }); // eslint-disable-line react/no-did-mount-set-state
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var time = _props.time;
      var active = _props.active;
      var index = _props.index;


      var r = Math.PI / 2 - index * (Math.PI / 6);
      var inner = index > 12;
      return _react2.default.createElement(
        'div',
        {
          ref: 'time',
          className: (0, _classnames2.default)('md-clock-time', { active: active }),
          style: {
            top: this.calcPos(r, inner, true),
            left: this.calcPos(r, inner, false)
          }
        },
        _react2.default.createElement(
          'span',
          { className: 'md-clock-time-value' },
          time
        )
      );
    }
  }]);

  return ClockTime;
}(_react.Component);

ClockTime.propTypes = {
  index: _react.PropTypes.number.isRequired,
  time: _react.PropTypes.number.isRequired,
  active: _react.PropTypes.bool.isRequired,
  radius: _react.PropTypes.number.isRequired,
  minutes: _react.PropTypes.bool.isRequired
};
exports.default = ClockTime;
module.exports = exports['default'];