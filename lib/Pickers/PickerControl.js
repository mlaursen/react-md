'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PickerControl = function PickerControl(_ref) {
  var active = _ref.active;
  var onClick = _ref.onClick;
  var children = _ref.children;

  return _react2.default.createElement(
    'button',
    {
      type: 'button',
      className: (0, _classnames2.default)('md-picker-control', { active: active }),
      onClick: onClick
    },
    children
  );
};

PickerControl.propTypes = {
  active: _react.PropTypes.bool.isRequired,
  children: _react.PropTypes.node.isRequired,
  onClick: _react.PropTypes.func.isRequired
};

exports.default = PickerControl;
module.exports = exports['default'];