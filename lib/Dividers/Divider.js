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

var Divider = function Divider(_ref) {
  var className = _ref.className;
  var inset = _ref.inset;
  var vertical = _ref.vertical;

  var props = _objectWithoutProperties(_ref, ['className', 'inset', 'vertical']);

  return _react2.default.createElement('hr', _extends({
    role: 'divider',
    className: (0, _classnames2.default)('md-divider', className, { inset: inset, vertical: vertical })
  }, props));
};

Divider.propTypes = {
  className: _react.PropTypes.string,
  inset: _react.PropTypes.bool,
  vertical: _react.PropTypes.bool
};

exports.default = Divider;
module.exports = exports['default'];