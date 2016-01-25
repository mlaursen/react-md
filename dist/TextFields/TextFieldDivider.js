'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var lineDirection = _ref.lineDirection;
  var active = _ref.active;
  var isError = _ref.isError;

  return _react2.default.createElement('div', {
    className: (0, _classnames2.default)('md-text-field-divider', 'from-' + lineDirection, {
      'active': active,
      'error': isError
    })
  });
};

module.exports = exports['default'];