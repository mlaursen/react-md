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

var TextFieldMessage = function TextFieldMessage(_ref) {
  var value = _ref.value;
  var message = _ref.message;
  var maxLength = _ref.maxLength;
  var error = _ref.error;
  var active = _ref.active;
  var helpOnFocus = _ref.helpOnFocus;
  var className = _ref.className;

  var isMessageVisible = !!message && (!helpOnFocus || active);
  return _react2.default.createElement(
    _reactAddonsCssTransitionGroup2.default,
    {
      component: 'div',
      transitionName: 'opacity',
      transitionEnterTimeout: 150,
      transitionLeaveTimeout: 150,
      className: (0, _classnames2.default)('md-text-field-message', className, {
        error: error,
        'count-only': !message || !isMessageVisible
      })
    },
    isMessageVisible && _react2.default.createElement(
      'span',
      { key: 'message' },
      message
    ),
    maxLength && _react2.default.createElement(
      'span',
      { className: 'md-text-field-counter' },
      value.length + ' / ' + maxLength
    )
  );
};

TextFieldMessage.propTypes = {
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  message: _react.PropTypes.string,
  maxLength: _react.PropTypes.number,
  error: _react.PropTypes.bool.isRequired,
  active: _react.PropTypes.bool.isRequired,
  helpOnFocus: _react.PropTypes.bool,
  className: _react.PropTypes.string
};

exports.default = TextFieldMessage;
module.exports = exports['default'];