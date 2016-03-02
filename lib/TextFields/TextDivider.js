'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextDivider = function TextDivider(_ref) {
  var lineDirection = _ref.lineDirection;
  var active = _ref.active;
  var error = _ref.error;
  var icon = _ref.icon;

  return _react2.default.createElement('div', {
    className: (0, _classnames2.default)('md-text-divider', 'from-' + lineDirection, {
      active: active,
      error: error,
      'icon-offset': icon
    })
  });
};

TextDivider.propTypes = {
  lineDirection: _react.PropTypes.oneOf(['left', 'center', 'right']).isRequired,
  active: _react.PropTypes.bool.isRequired,
  error: _react.PropTypes.bool.isRequired,
  icon: _react.PropTypes.bool.isRequired
};

exports.default = TextDivider;
module.exports = exports['default'];