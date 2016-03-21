'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Buttons = require('../Buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavigationDrawerToolbar = function NavigationDrawerToolbar(props) {
  var className = props.className;
  var isOpen = props.isOpen;
  var temporary = props.temporary;
  var openDrawer = props.openDrawer;
  var menuIconClassName = props.menuIconClassName;
  var menuIconChildren = props.menuIconChildren;
  var title = props.title;
  var children = props.children;


  return _react2.default.createElement(
    'header',
    { className: (0, _classnames2.default)('md-navigation-drawer-toolbar', className) },
    _react2.default.createElement(_Buttons.IconButton, {
      className: (0, _classnames2.default)('md-navigation-drawer-btn', { 'hidden': isOpen && !temporary }),
      onClick: openDrawer,
      iconClassName: menuIconClassName,
      children: menuIconChildren
    }),
    title && _react2.default.createElement(
      'h3',
      { className: 'md-title' },
      title
    ),
    children
  );
};

NavigationDrawerToolbar.propTypes = {
  className: _react.PropTypes.string,
  isOpen: _react.PropTypes.bool.isRequired,
  temporary: _react.PropTypes.bool.isRequired,
  openDrawer: _react.PropTypes.func,
  menuIconClassName: _react.PropTypes.string,
  menuIconChildren: _react.PropTypes.node,
  title: _react.PropTypes.string,
  children: _react.PropTypes.node
};

exports.default = NavigationDrawerToolbar;
module.exports = exports['default'];