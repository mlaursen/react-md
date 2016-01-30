'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SliderThumb = require('./SliderThumb');

var _SliderThumb2 = _interopRequireDefault(_SliderThumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SliderTrack = function SliderTrack(_ref) {
  var width = _ref.width;
  var onClick = _ref.onClick;

  var props = _objectWithoutProperties(_ref, ['width', 'onClick']);

  return _react2.default.createElement(
    'div',
    {
      className: 'md-slider-track',
      onClick: onClick
    },
    _react2.default.createElement('span', {
      className: (0, _classnames2.default)('md-track-fill', {
        'dragging': props.dragging,
        'discrete': props.discrete
      }),
      style: { width: width + '%' }
    }),
    _react2.default.createElement(_SliderThumb2.default, props)
  );
};

SliderTrack.propTypes = {
  width: _react.PropTypes.number.isRequired,
  onClick: _react.PropTypes.func.isRequired,
  valued: _react.PropTypes.bool.isRequired,
  onMouseDown: _react.PropTypes.func.isRequired,
  onKeyDown: _react.PropTypes.func.isRequired,
  onTouchStart: _react.PropTypes.func.isRequired,
  dragging: _react.PropTypes.bool.isRequired,
  value: _react.PropTypes.number.isRequired,
  discrete: _react.PropTypes.bool
};

exports.default = SliderTrack;
module.exports = exports['default'];