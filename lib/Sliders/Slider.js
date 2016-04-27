'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keyCodes = require('../constants/keyCodes');

var _utils = require('../utils');

var _SliderTrack = require('./SliderTrack');

var _SliderTrack2 = _interopRequireDefault(_SliderTrack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

    _initialiseProps.call(_this);

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);

    var value = typeof props.defaultValue === 'number' ? props.defaultValue : props.min;
    var width = _this.calcValuePercent(value, props.min, props.max);
    _this.state = {
      value: value,
      width: width,
      active: false,
      dragging: false,
      moving: false,
      valued: width > 0,
      left: _this.calcLeft(width)
    };
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.active && !prevState.active) {
        window.addEventListener('click', this.handleClickOutside);
      } else if (!this.state.active && prevState.active) {
        window.removeEventListener('click', this.handleClickOutside);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.getValue();
      var _state = this.state;
      var active = _state.active;
      var valued = _state.valued;
      var width = _state.width;
      var left = _state.left;
      var dragging = _state.dragging;
      var _props = this.props;
      var min = _props.min;
      var max = _props.max;
      var step = _props.step;
      var disabled = _props.disabled;

      var discrete = typeof step !== 'undefined';
      return _react2.default.createElement(
        'div',
        { className: 'md-slider-container' },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('md-slider-track-container', { active: active, disabled: disabled }) },
          _react2.default.createElement('input', {
            type: 'range',
            className: 'md-slider',
            readOnly: true,
            value: value,
            min: min,
            max: max,
            disabled: disabled
          }),
          _react2.default.createElement(_SliderTrack2.default, {
            active: active,
            valued: valued,
            width: width,
            left: left,
            dragging: dragging,
            value: value,
            discrete: discrete,
            onClick: this.handleSliderTrackClick,
            onTouchStart: this.handleThumbStart,
            onMouseDown: this.handleThumbStart,
            onKeyDown: this.handleThumbKeydown
          })
        )
      );
    }
  }]);

  return Slider;
}(_react.Component);

Slider.propTypes = {
  className: _react.PropTypes.string,
  value: _react.PropTypes.number,
  defaultValue: _react.PropTypes.number,
  min: _react.PropTypes.number.isRequired,
  max: _react.PropTypes.number.isRequired,
  step: _react.PropTypes.number,
  stepPrecision: _react.PropTypes.number.isRequired,
  onChange: _react.PropTypes.func,
  onDragChange: _react.PropTypes.func,
  disabled: _react.PropTypes.bool
};
Slider.defaultProps = {
  min: 0,
  max: 100,
  stepPrecision: 2
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.calcValuePercent = function (value, min, max) {
    if (value === min) {
      return 0;
    } else if (value === max) {
      return 100;
    } else {
      return Math.min(100, Math.max(0, (value - min) / (max - min) * 100));
    }
  };

  this.calcLeft = function (width) {
    return 'calc(' + width + '% - 7px)';
  };

  this.handleSliderTrackClick = function (e) {
    var clientX = e.clientX;
    var changedTouches = e.changedTouches;
    var _props2 = _this2.props;
    var min = _props2.min;
    var max = _props2.max;
    var step = _props2.step;
    var onChange = _props2.onChange;
    var onDragChange = _props2.onDragChange;
    var disabled = _props2.disabled;

    if (disabled) {
      return;
    }
    if (changedTouches) {
      clientX = changedTouches[0].clientX;
    }

    var track = _reactDom2.default.findDOMNode(_this2).querySelector('.md-slider-track');
    var distance = clientX - track.getBoundingClientRect().left;
    var clientWidth = track.clientWidth;

    if (distance < 0) {
      distance = 0;
    } else if (distance > clientWidth) {
      distance = clientWidth;
    }

    var value = 0;
    if (distance !== 0 && distance !== clientWidth) {
      var calcedValue = distance / clientWidth * max;
      if (step) {
        value = _this2.updateValueWithStep(calcedValue);
      } else {
        value = Math.round(calcedValue);
      }
    } else if (distance === 0) {
      value = min;
    } else if (distance === clientWidth) {
      value = max;
    }

    value = Math.min(max, Math.max(min, value));
    var dragging = _this2.state.dragging;

    if (dragging && onDragChange) {
      onDragChange(value, e);
    } else if (!dragging && onChange) {
      onChange(value, e);
    }

    var width = _this2.calcValuePercent(value, min, max);
    _this2.setState({
      valued: value > min,
      left: _this2.calcLeft(width),
      width: width,
      value: value,
      active: true
    });
  };

  this.handleClickOutside = function (e) {
    return (0, _utils.onOutsideClick)(e, _reactDom2.default.findDOMNode(_this2), function () {
      return _this2.setState({ active: false });
    });
  };

  this.handleThumbStart = function (e) {
    if (_this2.props.disabled) {
      return;
    }
    var changedTouches = e.changedTouches;
    var button = e.button;
    var ctrlKey = e.ctrlKey;

    if (!changedTouches && (button !== _keyCodes.LEFT_MOUSE || ctrlKey)) {
      return;
    }

    document.addEventListener('mousemove', _this2.handleDragMove);
    document.addEventListener('mouseup', _this2.handleDragEnd);
    document.addEventListener('touchmove', _this2.handleDragMove);
    document.addEventListener('touchend', _this2.handleDragEnd);

    _this2.setState({ dragging: true });
  };

  this.handleDragMove = function (e) {
    if (_this2.state.dragMoving || _this2.props.disabled) {
      return;
    }

    requestAnimationFrame(function () {
      _this2.handleSliderTrackClick(e);
      _this2.setState({ dragMoving: false });
    });
    _this2.setState({ dragMoving: true });
  };

  this.handleDragEnd = function (e) {
    document.removeEventListener('mousemove', _this2.handleDragMove);
    document.removeEventListener('mouseup', _this2.handleDragEnd);
    document.removeEventListener('touchmove', _this2.handleDragMove);
    document.removeEventListener('touchend', _this2.handleDragEnd);

    if (_this2.props.onChange) {
      _this2.props.onChange(_this2.state.value, e);
    }

    _this2.setState({ dragging: false });
  };

  this.handleThumbKeydown = function (e) {
    var key = e.which || e.keyCode;
    if (key !== _keyCodes.LEFT && key !== _keyCodes.RIGHT) {
      return;
    }

    var _props3 = _this2.props;
    var min = _props3.min;
    var max = _props3.max;
    var step = _props3.step;
    var onChange = _props3.onChange;

    var stepAmt = step || max / (max - min);
    var value = _this2.getValue();
    if (key === _keyCodes.LEFT) {
      value = Math.max(value - stepAmt, min);
    } else {
      value = Math.min(value + stepAmt, max);
    }

    if (step) {
      value = _this2.updateValueWithStep(value);
    }

    var width = _this2.calcValuePercent(value, min, max);
    if (onChange) {
      onChange(value, e);
    }

    _this2.setState({
      value: value,
      width: width,
      valued: value > min,
      left: _this2.calcLeft(width),
      active: true
    });
  };

  this.getValue = function () {
    return typeof _this2.props.value === 'undefined' ? _this2.state.value : _this2.props.value;
  };

  this.updateValueWithStep = function (value) {
    var _props4 = _this2.props;
    var step = _props4.step;
    var stepPrecision = _props4.stepPrecision;

    var stepScale = 100 / (100 * step);
    var updatedValue = (Math.round(value * stepScale) / stepScale).toFixed(stepPrecision);
    if (updatedValue.split('\.')[1] === '00') {
      return parseInt(updatedValue);
    } else {
      return parseFloat(updatedValue);
    }
  };
};

exports.default = Slider;
module.exports = exports['default'];