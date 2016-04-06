'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SliderThumb = function SliderThumb(_ref) {
  var active = _ref.active;
  var value = _ref.value;
  var valued = _ref.valued;
  var left = _ref.left;
  var dragging = _ref.dragging;
  var discrete = _ref.discrete;

  var props = _objectWithoutProperties(_ref, ['active', 'value', 'valued', 'left', 'dragging', 'discrete']);

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)('md-slider-thumb', {
        active: active,
        valued: valued,
        dragging: dragging,
        'zeroed': !valued,
        'md-discrete-slider-thumb': discrete,
        'md-continuous-slider-thumb': !discrete
      }),
      style: { left: left }
    },
    _react2.default.createElement(
      'button',
      _extends({}, props, { className: 'md-thumb-control' }),
      discrete && active && _react2.default.createElement(
        'span',
        { className: 'md-slider-discrete-value' },
        value
      )
    )
  );
};

SliderThumb.propTypes = {
  onTouchStart: _react.PropTypes.func.isRequired,
  onMouseDown: _react.PropTypes.func.isRequired,
  onKeyDown: _react.PropTypes.func.isRequired,
  left: _react.PropTypes.string,
  active: _react.PropTypes.bool.isRequired,
  valued: _react.PropTypes.bool.isRequired,
  dragging: _react.PropTypes.bool.isRequired,
  value: _react.PropTypes.number.isRequired,
  discrete: _react.PropTypes.bool
};

exports.default = SliderThumb;
module.exports = exports['default'];