'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var value = _ref.value;
  var text = _ref.text;
  var maxLength = _ref.maxLength;
  var isError = _ref.isError;
  var active = _ref.active;
  var isHelpOnFocus = _ref.isHelpOnFocus;

  var isTextVisible = !!text && (!isHelpOnFocus || active);
  return _react2.default.createElement(
    _reactAddonsCssTransitionGroup2.default,
    {
      component: 'div',
      transitionName: 'opacity',
      transitionEnterTimeout: 150,
      transitionLeaveTimeout: 150,
      className: (0, _classnames2.default)('md-text-field-info', {
        'error': isError,
        'count-only': !text || !isTextVisible
      })
    },
    isTextVisible && _react2.default.createElement(
      'span',
      { key: 'text' },
      text
    ),
    maxLength && _react2.default.createElement(
      'span',
      { className: 'md-text-field-count' },
      value.length + ' / ' + maxLength
    )
  );
};

module.exports = exports['default'];