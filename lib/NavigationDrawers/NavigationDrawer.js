'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

var _Dividers = require('../Dividers');

var _Dividers2 = _interopRequireDefault(_Dividers);

var _Lists = require('../Lists');

var _Subheaders = require('../Subheaders');

var _Subheaders2 = _interopRequireDefault(_Subheaders);

var _NavigationDrawerHeader = require('./NavigationDrawerHeader');

var _NavigationDrawerHeader2 = _interopRequireDefault(_NavigationDrawerHeader);

var _NavigationDrawerToolbar = require('./NavigationDrawerToolbar');

var _NavigationDrawerToolbar2 = _interopRequireDefault(_NavigationDrawerToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationDrawer = function (_Component) {
  _inherits(NavigationDrawer, _Component);

  function NavigationDrawer(props) {
    _classCallCheck(this, NavigationDrawer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NavigationDrawer).call(this, props));

    _initialiseProps.call(_this);

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(NavigationDrawer, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.isOpen === this.props.isOpen && nextProps.drawerType === this.props.drawerType) {
        return;
      }

      var temps = [NavigationDrawer.DrawerType.TEMPORARY, NavigationDrawer.DrawerType.TEMPORARY_MINI];

      var isNextTemp = temps.indexOf(nextProps.drawerType) !== -1;
      var isCurrTemp = temps.indexOf(this.props.drawerType) !== -1;
      if (isCurrTemp && !isNextTemp || !isCurrTemp && !isNextTemp) {
        (0, _utils.setOverflow)(false);
      } else {
        (0, _utils.setOverflow)(nextProps.isOpen);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var isOpen = _props.isOpen;
      var title = _props.title;
      var toolbarTitle = _props.toolbarTitle;
      var containerClassName = _props.containerClassName;
      var className = _props.className;
      var contentClassName = _props.contentClassName;
      var toolbarClassName = _props.toolbarClassName;
      var menuIconClassName = _props.menuIconClassName;
      var menuIconChildren = _props.menuIconChildren;
      var children = _props.children;
      var openDrawer = _props.openDrawer;
      var closeDrawer = _props.closeDrawer;
      var closeIconClassName = _props.closeIconClassName;
      var closeIconChildren = _props.closeIconChildren;
      var navItems = _props.navItems;
      var drawerType = _props.drawerType;
      var toolbarChildren = _props.toolbarChildren;
      var navHeader = _props.navHeader;
      var navHeaderChildren = _props.navHeaderChildren;
      var _NavigationDrawer$Dra = NavigationDrawer.DrawerType;
      var PERSISTENT = _NavigationDrawer$Dra.PERSISTENT;
      var PERSISTENT_MINI = _NavigationDrawer$Dra.PERSISTENT_MINI;
      var TEMPORARY = _NavigationDrawer$Dra.TEMPORARY;
      var TEMPORARY_MINI = _NavigationDrawer$Dra.TEMPORARY_MINI;


      var mini = drawerType === PERSISTENT_MINI || drawerType === TEMPORARY_MINI;
      var persistent = drawerType === PERSISTENT_MINI || drawerType === PERSISTENT;
      var temporary = drawerType === TEMPORARY || drawerType === TEMPORARY_MINI;
      var active = isOpen || !temporary && !persistent && !_utils.isMobile;

      var nav = void 0;
      if (active || mini) {
        var navigationItems = navItems.map(this.mapItemsToComponents.bind(this, mini, active));

        nav = _react2.default.createElement(
          _Lists.List,
          null,
          navigationItems
        );
      }

      var header = void 0;
      if (navHeader) {
        header = _react2.default.cloneElement(navHeader, { persistent: persistent });
      } else if (active && mini || !mini) {
        header = _react2.default.createElement(_NavigationDrawerHeader2.default, {
          title: title,
          closeDrawer: closeDrawer,
          closeIconChildren: closeIconChildren,
          closeIconClassName: closeIconClassName,
          persistent: persistent,
          children: navHeaderChildren
        });
      }

      var conditionalClassNames = { active: active };

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('md-navigation-drawer-container', containerClassName, conditionalClassNames) },
        _react2.default.createElement(
          'nav',
          { className: (0, _classnames2.default)('md-navigation-drawer', className, drawerType, conditionalClassNames) },
          header,
          nav
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('md-navigation-drawer-content', contentClassName, drawerType, conditionalClassNames) },
          _react2.default.createElement(_NavigationDrawerToolbar2.default, {
            className: (0, _classnames2.default)(toolbarClassName, drawerType, conditionalClassNames),
            temporary: temporary,
            isOpen: isOpen,
            openDrawer: openDrawer,
            menuIconClassName: menuIconClassName,
            menuIconChildren: menuIconChildren,
            title: toolbarTitle,
            children: toolbarChildren
          }),
          children,
          _react2.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            { transitionName: 'md-overlay', transitionEnterTimeout: 150, transitionLeaveTimeout: 150 },
            isOpen && _react2.default.createElement('div', { key: 'overlay', className: 'md-navigation-drawer-overlay', onClick: closeDrawer })
          )
        )
      );
    }
  }]);

  return NavigationDrawer;
}(_react.Component);

NavigationDrawer.DrawerType = {
  FULL_HEIGHT: 'full-height',
  CLIPPED: 'clipped',
  FLOATING: 'floating',
  PERSISTENT: 'persistent',
  PERSISTENT_MINI: 'mini',
  TEMPORARY: 'temporary',
  // want styles of temporary and mini. Little hacky.
  TEMPORARY_MINI: 'temporary mini'
};
NavigationDrawer.propTypes = {
  isOpen: _react.PropTypes.bool.isRequired,
  title: _react.PropTypes.string,
  containerClassName: _react.PropTypes.string,
  className: _react.PropTypes.string,
  contentClassName: _react.PropTypes.string,
  toolbarClassName: _react.PropTypes.string,
  children: _react.PropTypes.node,
  menuIconClassName: _react.PropTypes.string,
  menuIconChildren: _react.PropTypes.node,
  closeIconClassName: _react.PropTypes.string,
  closeIconChildren: _react.PropTypes.node,
  openDrawer: _react.PropTypes.func,
  closeDrawer: _react.PropTypes.func,
  navItems: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.shape({
    divider: _react.PropTypes.bool,
    subheader: _react.PropTypes.bool,
    component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
    primaryText: _react.PropTypes.string
  })])).isRequired,
  drawerType: _react.PropTypes.oneOf(Object.keys(NavigationDrawer.DrawerType).map(function (k) {
    return NavigationDrawer.DrawerType[k];
  })),
  toolbarChildren: _react.PropTypes.node,
  toolbarTitle: _react.PropTypes.string,
  navHeader: _react.PropTypes.node,
  navHeaderChildren: _react.PropTypes.node,
  customValidation: function customValidation(props) {
    var _NavigationDrawer$Dra2 = NavigationDrawer.DrawerType;
    var PERSISTENT = _NavigationDrawer$Dra2.PERSISTENT;
    var PERSISTENT_MINI = _NavigationDrawer$Dra2.PERSISTENT_MINI;
    var drawerType = props.drawerType;

    if (drawerType !== PERSISTENT && drawerType !== PERSISTENT_MINI) {
      return;
    }

    var closeDrawer = props.closeDrawer;
    var closeIconChildren = props.closeIconChildren;
    var closeIconClassName = props.closeIconClassName;

    if (typeof closeDrawer !== 'function') {
      return new Error('Prop \'closeDrawer\' is missing.');
    } else if (!closeIconChildren && !closeIconClassName) {
      return new Error('Need at least one of closeIconChildren or closeIconClassName');
    }
  }
};
NavigationDrawer.defaultProps = {
  drawerType: NavigationDrawer.DrawerType.FULL_HEIGHT,
  menuIconChildren: 'menu',
  closeIconChildren: 'keyboard_arrow_left'
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.mapItemsToComponents = function (mini, active, item, key) {
    if (_react2.default.isValidElement(item)) {
      return item;
    }

    var divider = item.divider;
    var subheader = item.subheader;
    var primaryText = item.primaryText;
    var nestedItems = item.nestedItems;

    var itemProps = _objectWithoutProperties(item, ['divider', 'subheader', 'primaryText', 'nestedItems']);

    var component = void 0;
    if (divider) {
      component = _Dividers2.default;
    } else if (subheader) {
      component = _Subheaders2.default;
    } else {
      component = _Lists.ListItem;
    }

    var props = Object.assign({}, itemProps, {
      key: item.key || key,
      nestedItems: nestedItems && nestedItems.map(_this2.mapItemsToComponents.bind(_this2, mini, active))
    });
    if (!mini || mini && active) {
      props.primaryText = primaryText;
    }

    return _react2.default.createElement(component, props);
  };
};

exports.default = NavigationDrawer;
module.exports = exports['default'];