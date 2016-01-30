'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Buttons = require('../Buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PickerFooter = function PickerFooter(_ref) {
  var okLabel = _ref.okLabel;
  var okPrimary = _ref.okPrimary;
  var onOkClick = _ref.onOkClick;
  var cancelLabel = _ref.cancelLabel;
  var cancelPrimary = _ref.cancelPrimary;
  var onCancelClick = _ref.onCancelClick;

  return _react2.default.createElement(
    'footer',
    { className: 'md-dialog-footer' },
    _react2.default.createElement(_Buttons.FlatButton, {
      primary: cancelPrimary,
      secondary: !cancelPrimary,
      label: cancelLabel,
      onClick: onCancelClick
    }),
    _react2.default.createElement(_Buttons.FlatButton, {
      primary: okPrimary,
      secondary: !okPrimary,
      label: okLabel,
      onClick: onOkClick
    })
  );
};

PickerFooter.propTypes = {
  okLabel: _react.PropTypes.string.isRequired,
  okPrimary: _react.PropTypes.bool.isRequired,
  onOkClick: _react.PropTypes.func.isRequired,
  cancelLabel: _react.PropTypes.string.isRequired,
  cancelPrimary: _react.PropTypes.bool.isRequired,
  onCancelClick: _react.PropTypes.func.isRequired
};

exports.default = PickerFooter;
module.exports = exports['default'];