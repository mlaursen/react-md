'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Buttons = require('../Buttons');

var _Dividers = require('../Dividers');

var _Dividers2 = _interopRequireDefault(_Dividers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavigationDrawerHeader = function NavigationDrawerHeader(props) {
  var className = props.className;
  var children = props.children;
  var persistent = props.persistent;
  var title = props.title;
  var closeDrawer = props.closeDrawer;
  var closeIconChildren = props.closeIconChildren;
  var closeIconClassName = props.closeIconClassName;

  var closeButton = undefined;
  if (persistent && closeDrawer && (closeIconChildren || closeIconClassName)) {
    closeButton = _react2.default.createElement(_Buttons.IconButton, {
      className: 'md-navigation-drawer-btn md-navigation-drawer-toggle',
      onClick: closeDrawer,
      iconClassName: closeIconClassName,
      children: closeIconChildren
    });
  }
  return _react2.default.createElement(
    'header',
    { className: (0, _classnames2.default)('md-drawer-header', className) },
    title && _react2.default.createElement(
      'h3',
      { className: 'md-title' },
      title
    ),
    children,
    closeButton,
    _react2.default.createElement(_Dividers2.default, null)
  );
};

NavigationDrawerHeader.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  persistent: _react.PropTypes.bool.isRequired,
  title: _react.PropTypes.string,
  closeDrawer: _react.PropTypes.func,
  closeIconClassName: _react.PropTypes.string,
  closeIconChildren: _react.PropTypes.node
};

exports.default = NavigationDrawerHeader;
module.exports = exports['default'];