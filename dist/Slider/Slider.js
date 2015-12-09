'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LEFT_MOUSE = 2;

var Slider = (function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

    _this.handleTrackClick = function (e) {
      if (e.button === LEFT_MOUSE) {
        return;
      }

      _this.setState({ value: _this.calculateBallMovedDistance(e) });
    };

    _this.calculateTrackWidth = function () {
      var _this$props = _this.props;
      var min = _this$props.min;
      var max = _this$props.max;
      var value = _this.state.value;

      if (value === min) {
        return 0;
      } else if (value === max) {
        return 100;
      } else {
        return (value - min) / (max - min) * 100;
      }
    };

    _this.getTrackLeft = function () {
      return _this.refs.track.getBoundingClientRect().left;
    };

    _this.calculateBallMovedDistance = function (e) {
      var _this$props2 = _this.props;
      var min = _this$props2.min;
      var max = _this$props2.max;
      var step = _this$props2.step;

      var trackWidth = _this.refs.track.clientWidth;
      var trackDistance = Math.min(trackWidth, Math.max(0, e.clientX - _this.getTrackLeft()));
      if (trackDistance === 0) {
        return min;
      } else if (trackDistance === trackWidth) {
        return max;
      }

      var ballMovedDistance = trackDistance / trackWidth * max;
      if (step) {
        return _this.calculateStepDistance(ballMovedDistance);
      } else {
        return ballMovedDistance;
      }
    };

    _this.calculateStep = function (ballMovedDistance) {
      var _this$props3 = _this.props;
      var min = _this$props3.min;
      var max = _this$props3.max;
      var step = _this$props3.step;
    };

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      value: typeof props.defaultValue === 'number' ? props.defaultValue : props.min
    };
    return _this;
  }

  _createClass(Slider, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var min = _props.min;
      var max = _props.max;
      var sliderLeft = _props.sliderLeft;
      var sliderRight = _props.sliderRight;
      var value = this.state.value;

      var width = this.calculateTrackWidth() + '%';

      return _react2.default.createElement(
        'div',
        { className: 'md-slider-container' },
        sliderLeft && _react2.default.createElement(
          'div',
          { className: 'md-slider-left' },
          sliderLeft
        ),
        _react2.default.createElement(
          'div',
          { className: 'md-slider' },
          _react2.default.createElement('input', { type: 'range', className: 'md-hidden-slider', readOnly: true, value: value, min: min, max: max }),
          _react2.default.createElement(
            'div',
            { className: 'md-slider-track', ref: 'track', onClick: this.handleTrackClick },
            _react2.default.createElement('div', { className: 'md-track' }),
            _react2.default.createElement('div', { className: 'md-track md-track-active', style: { width: width } })
          ),
          _react2.default.createElement(
            'div',
            { className: 'md-slider-ball', style: { left: width } },
            _react2.default.createElement('div', { className: 'md-ball' }),
            _react2.default.createElement(
              'div',
              { className: 'md-ball-value' },
              value
            )
          )
        ),
        sliderRight && _react2.default.createElement(
          'div',
          { className: 'md-slider-right' },
          sliderRight
        )
      );
    }

    /**
     * Calculates the slider's track current width by comparing the value
     * to the min and max values. It's width is the current value percentage
     */

    /**
     * Gets the current left position of the slider's track on the entire page
     */

  }]);

  return Slider;
})(_react.Component);

Slider.propTypes = {
  min: _react.PropTypes.number,
  max: _react.PropTypes.number,
  step: _react.PropTypes.number,
  onDragStart: _react.PropTypes.func,
  onDragEnd: _react.PropTypes.func,
  defaultValue: _react.PropTypes.number,
  snap: _react.PropTypes.bool,
  sliderLeft: _react.PropTypes.node,
  sliderRight: _react.PropTypes.node
};
Slider.defaultProps = {
  min: 0,
  max: 100
};
exports.default = Slider;
module.exports = exports['default'];
//# sourceMappingURL=Slider.js.map