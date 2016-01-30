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
  var active = _ref.active;
  var value = _ref.value;
  var isError = _ref.isError;
  var label = _ref.label;
  var required = _ref.required;

  if (required && label.indexOf('*') === -1) {
    label = label.trim() + ' *';
  }

  return _react2.default.createElement(
    'span',
    {
      className: (0, _classnames2.default)('md-text-field-label', {
        'active': active || !!value,
        'focus': active,
        'error': isError
      }) },
    label
  );
};

module.exports = exports['default'];