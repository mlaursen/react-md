'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Divider = function Divider(className) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  return _react2.default.createElement('hr', _extends({
    role: 'divider',
    className: (0, _classnames2.default)('md-divider', className, {
      'inset': (0, _utils.isPropEnabled)(props, 'inset'),
      'vertical': (0, _utils.isPropEnabled)(props, 'vertical')
    })
  }, props));
};

Divider.propTypes = {
  inset: _react.PropTypes.bool,
  vertical: _react.PropTypes.bool
};

exports.default = Divider;
module.exports = exports['default'];