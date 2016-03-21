'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

var _keyCodes = require('../constants/keyCodes');

var _Lists = require('../Lists');

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

var _TextFields = require('../TextFields');

var _TextFields2 = _interopRequireDefault(_TextFields);

var _Menus = require('../Menus');

var _Menus2 = _interopRequireDefault(_Menus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectField = function (_Component) {
  _inherits(SelectField, _Component);

  function SelectField(props) {
    _classCallCheck(this, SelectField);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectField).call(this, props));

    _initialiseProps.call(_this);

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.state = {
      open: props.initiallyOpen,
      focused: props.initiallyOpen,
      value: props.defaultValue,
      size: _this.calcSize(props)
    };
    return _this;
  }

  _createClass(SelectField, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var menuItems = this.props.menuItems;

      if (menuItems !== nextProps.menuItems || menuItems.length !== nextProps.menuItems.length) {
        this.setState({ size: this.calcSize(nextProps) });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var noAutoAdjust = this.props.noAutoAdjust;
      var open = this.state.open;

      if (open === prevState.open || noAutoAdjust) {
        return;
      }
      var node = _reactDom2.default.findDOMNode(this);
      if (open) {
        (node.querySelector('.md-list-tile.active') || node.querySelector('.md-list-tile')).focus();
      } else {
        node.querySelector('.md-text-field').focus();
      }

      if (open) {
        this.calcMenuPosition();
      }
    }

    /**
     * Finds the longest menu item value to use as the text field's size.to that value.
     * If there is a floating label, it also checks against the label's size so that
     * the floating label won't be clipped
     */


    /**
     * Sets the transform-origin for the dropdown menu so that the menu will appear
     * from the text field's baseline.
     *
     * Sets the top position to be one list item down if the first item is not selected.
     *
     * Scrolls the current item into view
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var open = _state.open;
      var size = _state.size;
      var listStyle = _state.listStyle;
      var _props = this.props;
      var label = _props.label;
      var floatingLabel = _props.floatingLabel;
      var menuItems = _props.menuItems;
      var itemLabel = _props.itemLabel;
      var position = _props.position;
      var className = _props.className;
      var listClassName = _props.listClassName;
      var menuClassName = _props.menuClassName;
      var iconClassName = _props.iconClassName;
      var iconChildren = _props.iconChildren;

      var props = _objectWithoutProperties(_props, ['label', 'floatingLabel', 'menuItems', 'itemLabel', 'position', 'className', 'listClassName', 'menuClassName', 'iconClassName', 'iconChildren']);

      var displayLabel = this.getValue();

      var toggle = _react2.default.createElement(_TextFields2.default, {
        className: (0, _classnames2.default)('md-select-field', className),
        containerClassName: 'md-select-field-container',
        readOnly: true,
        value: displayLabel,
        label: label,
        floatingLabel: floatingLabel,
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        rightIcon: _react2.default.createElement(
          _FontIcons2.default,
          { iconClassName: iconClassName },
          iconChildren
        ),
        size: size
      });
      return _react2.default.createElement(
        _Menus2.default,
        _extends({
          isOpen: open,
          close: this.close,
          toggle: toggle,
          listStyle: listStyle,
          className: menuClassName,
          listClassName: (0, _classnames2.default)('md-select-field-menu', listClassName, { 'single-line': !floatingLabel }),
          position: position
        }, props),
        menuItems.map(function (item, i) {
          return _react2.default.createElement(_Lists.ListItem, {
            primaryText: (0, _utils.isObject)(item) ? item[itemLabel] : item,
            key: item.key || i,
            onClick: _this2.selectItem.bind(_this2, item),
            onKeyDown: _this2.handleItemKeyDown.bind(_this2, item),
            className: (0, _classnames2.default)({ 'active': _this2.isActive(item, displayLabel) })
          });
        })
      );
    }
  }]);

  return SelectField;
}(_react.Component);

SelectField.Positions = {
  TOP_LEFT: _Menus2.default.Positions.TOP_LEFT,
  TOP_RIGHT: _Menus2.default.Positions.TOP_RIGHT,
  BOTTOM: 'below'
};
SelectField.propTypes = {
  className: _react.PropTypes.string,
  listClassName: _react.PropTypes.string,
  menuClassName: _react.PropTypes.string,
  initiallyOpen: _react.PropTypes.bool,
  floatingLabel: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  itemLabel: _react.PropTypes.string,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  menuItems: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.object])).isRequired,
  onChange: _react.PropTypes.func,
  onClick: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  position: _react.PropTypes.oneOf(Object.keys(SelectField.Positions).map(function (key) {
    return SelectField.Positions[key];
  })),
  noAutoAdjust: _react.PropTypes.bool,
  iconClassName: _react.PropTypes.string.isRequired,
  iconChildren: _react.PropTypes.node.isRequired
};
SelectField.defaultProps = {
  initiallyOpen: false,
  floatingLabel: false,
  itemLabel: 'label',
  defaultValue: '',
  menuItems: [],
  iconClassName: 'material-icons',
  iconChildren: 'arrow_drop_down',
  noAutoAdjust: false
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.calcSize = function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? _this3.props : arguments[0];

    var menuItems = _ref.menuItems;
    var itemLabel = _ref.itemLabel;
    var label = _ref.label;
    var floatingLabel = _ref.floatingLabel;

    var items = menuItems.slice();
    if (label && floatingLabel) {
      items.push(label);
    }

    return items.reduce(function (prev, curr) {
      var len = ((0, _utils.isObject)(curr) ? curr[itemLabel] : curr.toString()).length;
      return Math.max(prev, len);
    }, 0);
  };

  this.calcMenuPosition = function () {
    var node = _reactDom2.default.findDOMNode(_this3);
    var menu = node.querySelector('.md-menu');

    // the item will be the first active one (if valued) otherwise, set the transform-origin as first list item
    var item = menu.querySelector('.md-list-tile.active') || menu.querySelector('.md-list-tile');

    // The height changes based on screen size and if floating label or not.
    var height = node.offsetHeight;
    var diff = item.offsetTop - item.offsetHeight;

    var paddingTop = parseInt(window.getComputedStyle(menu).getPropertyValue('padding-top'));

    var position = _this3.props.position;

    var transformOrigin = void 0,
        top = void 0;
    if (SelectField.Positions.BOTTOM !== position) {
      var x = SelectField.Positions.TOP_LEFT === position ? '0' : '100%';
      var y = (diff < 0 ? 0 : height) + height / 2 + paddingTop;
      transformOrigin = x + ' ' + y + 'px';
    }

    // padding top for mobile (desktop is 4)
    if (diff > 8) {
      menu.scrollTop = diff;
    }

    if (diff > 0) {
      // close enough. It is off by 4px for floating label on desktop
      top = -(item.offsetHeight + paddingTop - (height - item.offsetHeight));
    }

    _this3.setState({
      listStyle: {
        msTransformOrigin: transformOrigin,
        WebkitTransformOrigin: transformOrigin,
        transformOrigin: transformOrigin,
        top: top
      }
    });
  };

  this.getValue = function () {
    var props = arguments.length <= 0 || arguments[0] === undefined ? _this3.props : arguments[0];
    var state = arguments.length <= 1 || arguments[1] === undefined ? _this3.state : arguments[1];

    if (typeof props.value !== 'undefined') {
      return props.value;
    }

    var value = state.value;

    if (typeof value === 'undefined') {
      return '';
    } else if ((0, _utils.isObject)(value)) {
      return value[props.itemLabel];
    } else {
      return value;
    }
  };

  this.isActive = function (item, displayLabel) {
    if (typeof item === 'string' || typeof item === 'number') {
      return item === displayLabel;
    } else {
      return item[_this3.props.itemLabel] === displayLabel;
    }
  };

  this.selectItem = function (item, e) {
    var _props2 = _this3.props;
    var onChange = _props2.onChange;
    var itemLabel = _props2.itemLabel;

    onChange && onChange(item, e);

    _this3.setState({
      open: false,
      value: (0, _utils.isObject)(item) ? item[itemLabel] : item
    });
  };

  this.toggle = function () {
    _this3.setState({ open: !_this3.state.open });
  };

  this.close = function () {
    _this3.setState({ open: false });
  };

  this.handleClick = function (e) {
    _this3.props.onClick && _this3.props.onClick(e);
    _this3.toggle();
  };

  this.handleKeyDown = function (e) {
    _this3.props.onKeyDown && _this3.props.onKeyDown(e);

    var key = e.which || e.keyCode;
    if (key !== _keyCodes.SPACE && key !== _keyCodes.ENTER) {
      return;
    }

    // prevents scrolling for spacebar
    e.preventDefault();
    _this3.setState({ open: true });
  };

  this.handleItemKeyDown = function (item, e) {
    var key = e.which || e.keyCode;
    if (key !== _keyCodes.SPACE && key !== _keyCodes.ENTER) {
      return;
    }

    // prevents scrolling for spacebar
    e.preventDefault();
    _this3.selectItem(item, e);
  };
};

exports.default = SelectField;
module.exports = exports['default'];