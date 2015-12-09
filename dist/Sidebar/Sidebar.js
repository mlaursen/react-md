'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Lists = require('../Lists');

var _PropUtils = require('../utils/PropUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = (function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sidebar).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(Sidebar, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var isOpen = _props.isOpen;
      var header = _props.header;
      var overlay = _props.overlay;
      var items = _props.items;
      var responsive = _props.responsive;
      var className = _props.className;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['isOpen', 'header', 'overlay', 'items', 'responsive', 'className', 'children']);

      return _react2.default.createElement(
        'div',
        _extends({ className: (0, _classnames2.default)('md-sidebar-container', className, { 'fixed': (0, _PropUtils.isPropEnabled)(props, 'fixed'), 'md-sidebar-responsive': responsive }) }, props),
        _react2.default.createElement(
          'nav',
          { className: (0, _classnames2.default)('md-sidebar', { 'active': isOpen }) },
          header,
          _react2.default.createElement(
            _Lists.List,
            null,
            items.map(function (item) {
              if (item.divider) {
                return _react2.default.createElement(_Lists.ListDivider, item);
              } else if (item.subheader) {
                return _react2.default.createElement(_Lists.ListSubheader, item);
              } else {
                return _react2.default.createElement(_Lists.ListItem, item);
              }
            })
          )
        )
      );
    }
  }]);

  return Sidebar;
})(_react.Component);

Sidebar.propTypes = {
  overlay: _react.PropTypes.bool,
  isOpen: _react.PropTypes.bool,
  fixed: _react.PropTypes.bool,
  responsive: _react.PropTypes.bool,
  items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    divider: _react.PropTypes.bool,
    subheader: _react.PropTypes.bool,
    component: _react.PropTypes.func,
    primaryText: _react.PropTypes.string
  })),
  header: _react.PropTypes.node,
  children: _react.PropTypes.node,
  className: _react.PropTypes.string
};
Sidebar.defaultProps = {
  responsive: true
};
exports.default = Sidebar;
module.exports = exports['default'];
//# sourceMappingURL=Sidebar.js.map