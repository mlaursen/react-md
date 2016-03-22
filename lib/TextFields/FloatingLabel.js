'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FloatingLabel = function FloatingLabel(_ref) {
  var active = _ref.active;
  var error = _ref.error;
  var label = _ref.label;
  var required = _ref.required;
  var value = _ref.value;

  if (required && label.indexOf('*') === -1) {
    label = label.trim() + ' *';
  }

  return _react2.default.createElement(
    'span',
    {
      className: (0, _classnames2.default)('md-floating-label', {
        'active': active || !!value,
        'focus': active,
        error: error
      })
    },
    label
  );
};

FloatingLabel.propTypes = {
  active: _react.PropTypes.bool.isRequired,
  error: _react.PropTypes.bool.isRequired,
  label: _react.PropTypes.string.isRequired,
  required: _react.PropTypes.bool,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};

exports.default = FloatingLabel;
module.exports = exports['default'];