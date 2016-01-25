'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ControlButton = require('./ControlButton');

var _ControlButton2 = _interopRequireDefault(_ControlButton);

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Checkbox(props) {
  return _react2.default.createElement(_ControlButton2.default, _extends({}, props, { type: 'checkbox' }));
}

Checkbox.defaultProps = {
  defaultChecked: false,
  checkedIcon: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'check_box'
  ),
  uncheckedIcon: _react2.default.createElement(
    _FontIcons2.default,
    null,
    'check_box_outline_blank'
  )
};

Checkbox.propTypes = _ControlButton2.default.propTypes;

exports.default = Checkbox;
module.exports = exports['default'];