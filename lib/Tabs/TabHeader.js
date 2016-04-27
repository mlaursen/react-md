'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TabHeader = function TabHeader(_ref) {
  var indicatorStyle = _ref.indicatorStyle;
  var children = _ref.children;
  var className = _ref.className;
  var scrolling = _ref.scrolling;
  var fixedWidth = _ref.fixedWidth;
  var centered = _ref.centered;

  var props = _objectWithoutProperties(_ref, ['indicatorStyle', 'children', 'className', 'scrolling', 'fixedWidth', 'centered']);

  return _react2.default.createElement(
    'header',
    { className: className },
    _react2.default.createElement(
      'ul',
      _extends({
        className: (0, _classnames2.default)('md-tabs', {
          'fixed-width': fixedWidth,
          'tabs-centered': centered,
          scrolling: scrolling
        })
      }, props),
      children,
      _react2.default.createElement('span', { className: 'md-tab-indicator', style: indicatorStyle })
    )
  );
};

TabHeader.propTypes = {
  indicatorStyle: _react.PropTypes.object.isRequired,
  children: _react.PropTypes.node.isRequired,
  className: _react.PropTypes.string.isRequired,
  onTouchStart: _react.PropTypes.func.isRequired,
  onTouchEnd: _react.PropTypes.func.isRequired,
  onTouchMove: _react.PropTypes.func.isRequired,
  style: _react.PropTypes.object.isRequired,
  scrolling: _react.PropTypes.bool.isRequired,
  fixedWidth: _react.PropTypes.bool.isRequired,
  centered: _react.PropTypes.bool.isRequired
};

exports.default = TabHeader;
module.exports = exports['default'];