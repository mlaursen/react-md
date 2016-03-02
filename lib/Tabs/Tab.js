'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Tab = function Tab(_ref) {
  var className = _ref.className;
  var icon = _ref.icon;
  var label = _ref.label;
  var label2 = _ref.label2;
  var checked = _ref.checked;
  var value = _ref.value;
  var onChange = _ref.onChange;

  var props = _objectWithoutProperties(_ref, ['className', 'icon', 'label', 'label2', 'checked', 'value', 'onChange']);

  return _react2.default.createElement(
    'div',
    _extends({
      className: (0, _classnames2.default)('md-tab', className, { 'active': checked })
    }, props),
    _react2.default.createElement(
      'label',
      {
        className: (0, _classnames2.default)('md-tab-label', {
          'multiline': !!label && !!label2,
          'with-icon': !!label && !!icon
        })
      },
      icon,
      label && _react2.default.createElement(
        'div',
        null,
        label
      ),
      label2 && _react2.default.createElement(
        'div',
        null,
        label2
      ),
      _react2.default.createElement('input', {
        type: 'radio',
        className: 'md-tab-control',
        checked: checked,
        value: value,
        onChange: onChange
      })
    )
  );
};

Tab.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node.isRequired,
  icon: _react.PropTypes.node,
  label: _react.PropTypes.string,
  label2: _react.PropTypes.string,
  checked: _react.PropTypes.bool,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  onChange: _react.PropTypes.func
};

exports.default = Tab;
module.exports = exports['default'];