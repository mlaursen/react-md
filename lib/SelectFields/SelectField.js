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

var _Menus = require('../Menus');

var _Menus2 = _interopRequireDefault(_Menus);

var _SelectFieldControl = require('./SelectFieldControl');

var _SelectFieldControl2 = _interopRequireDefault(_SelectFieldControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LIST_PADDING = 8;

/**
 * A SelectField is a material design inspired `<select>` component.
 */

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
      var _props = this.props;
      var position = _props.position;
      var noAutoAdjust = _props.noAutoAdjust;
      var open = this.state.open;

      if (this.getValue(prevProps, prevState) !== this.getValue(this.props, this.state)) {
        this.animateNewValue();
      }

      if (open === prevState.open || noAutoAdjust) {
        return;
      }
      var node = _reactDom2.default.findDOMNode(this);
      var item = this.getListItem();
      if (open) {
        item.focus();
      } else {
        node.querySelector('.md-text-field').focus();
      }

      if (!open) {
        return;
      }
      if (SelectField.Positions.BELOW === position) {
        var list = node.querySelector('.md-list');
        var scroll = this.getListItem().offsetTop;
        list.scrollTop = scroll <= LIST_PADDING ? 0 : scroll;
      } else {
        this.calcMenuPosition();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.state.timeout && clearTimeout(this.state.timeout);
    }

    /**
     * Gets the first active list item or the first list item if there are no active items.
     *
     * @return a list item element.
     */


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
      var droppingClassName = _state.droppingClassName;
      var _props2 = this.props;
      var label = _props2.label;
      var floatingLabel = _props2.floatingLabel;
      var menuItems = _props2.menuItems;
      var itemLabel = _props2.itemLabel;
      var position = _props2.position;
      var className = _props2.className;
      var listClassName = _props2.listClassName;
      var menuClassName = _props2.menuClassName;
      var iconClassName = _props2.iconClassName;
      var iconChildren = _props2.iconChildren;
      var disabled = _props2.disabled;

      var props = _objectWithoutProperties(_props2, ['label', 'floatingLabel', 'menuItems', 'itemLabel', 'position', 'className', 'listClassName', 'menuClassName', 'iconClassName', 'iconChildren', 'disabled']);

      var displayLabel = this.getValue();
      var below = _Menus2.default.Positions.BELOW === position;

      var toggle = _react2.default.createElement(_SelectFieldControl2.default, {
        className: (0, _classnames2.default)(className, droppingClassName),
        label: label,
        value: displayLabel,
        floatingLabel: floatingLabel,
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        rightIcon: _react2.default.createElement(
          _FontIcons2.default,
          { iconClassName: iconClassName },
          iconChildren
        ),
        size: size,
        disabled: disabled,
        open: open,
        below: below,
        inkDisabled: !below
      });

      return _react2.default.createElement(
        _Menus2.default,
        _extends({
          isOpen: open,
          close: this.close,
          toggle: toggle,
          listStyle: listStyle,
          className: (0, _classnames2.default)('md-select-field-menu-container', menuClassName),
          listClassName: (0, _classnames2.default)('md-select-field-menu', listClassName, {
            'single-line': !floatingLabel
          }),
          position: position,
          below: SelectField.Positions.BELOW === position
        }, props),
        menuItems.map(function (item, i) {
          return _react2.default.createElement(_Lists.ListItem, {
            tabIndex: 0,
            primaryText: (0, _utils.isObject)(item) ? item[itemLabel] : item,
            key: item.key || i,
            onClick: _this2.selectItem.bind(_this2, item),
            onKeyDown: _this2.handleItemKeyDown.bind(_this2, item),
            className: (0, _classnames2.default)({
              'active': _this2.isActive(item, displayLabel),
              'select-field-btn-tile': below
            })
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
  BELOW: _Menus2.default.Positions.BELOW
};
SelectField.propTypes = {
  /**
   * An optional className to apply to the text field in the select field.
   */
  className: _react.PropTypes.string,

  /**
   * An optional className to apply to the menu list.
   */
  listClassName: _react.PropTypes.string,

  /**
   * An optional className to apply to the menu container that holds
   * the list of menu items.
   */
  menuClassName: _react.PropTypes.string,

  /**
   * A boolean if the select field is open by default.
   */
  initiallyOpen: _react.PropTypes.bool,

  /**
   * A boolean if the text field should have a floating label instead of
   * an inline label.
   */
  floatingLabel: _react.PropTypes.bool,

  /**
   * The label to apply to the text field.
   */
  label: _react.PropTypes.string,

  /**
   * An optional key to use to extract a `menuItem`'s label if the
   * `menuItems` prop is an array of objects.
   */
  itemLabel: _react.PropTypes.string,

  /**
   * An optional value to convert the select field into a controlled component.
   * This will be the displayed value in the text field.
   */
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),

  /**
   * The defaultValue for the select field.
   */
  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),

  /**
   * A list of items to display in the opened menu. When a new value is clicked,
   * the entire menuItem will be returned. If the menu item is an object, you will
   * need to define the correct `itemLabel` so it displays correctly in the menu.
   */
  menuItems: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.object])).isRequired,

  /**
   * An optional function to call select field change. It is called with `(newlySelectedMenuItem, changeEvent)`.
   * If this a controlled component, you will manually need to convert the `newlySelectedMenuItem`'s value if
   * it is an object so that the `value` prop is a string or number.
   */
  onChange: _react.PropTypes.func,

  /**
   * An optional function to call when the text field is clicked.
   */
  onClick: _react.PropTypes.func,

  /**
   * An optional function to call when the text field has focus and a key is pressed.
   */
  onKeyDown: _react.PropTypes.func,

  /**
   * The position that the menu should appear from. This should be one of:
   *
   * ```js
   * SelectField.Positions.TOP_LEFT,
   * SelectField.Positions.TOP_RIGHT,
   * SelectField.Positions.BELOW
   * ```
   */
  position: _react.PropTypes.oneOf(Object.keys(SelectField.Positions).map(function (key) {
    return SelectField.Positions[key];
  })),

  /**
   * Boolean if the drop down menu should not automatically attempt to change the top position to match a
   * selected item. This should really just be used if the opened menu expands past the top of the screen.
   */
  noAutoAdjust: _react.PropTypes.bool,

  /**
   * Boolean if the select field is disabled.
   */
  disabled: _react.PropTypes.bool,

  /**
   * The icon className for the dropdown indicator.
   */
  iconClassName: _react.PropTypes.string.isRequired,

  /**
   * The icon children to use for the dropdown indicator.
   */
  iconChildren: _react.PropTypes.node
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

  this.getListItem = function () {
    var node = _reactDom2.default.findDOMNode(_this3);

    return (node.querySelector('.md-list-tile.active') || node.querySelector('.md-list-tile')).parentNode;
  };

  this.animateNewValue = function () {
    _this3.setState({
      droppingClassName: 'drop-enter',
      timeout: setTimeout(function () {
        _this3.setState({
          droppingClassName: 'drop-enter drop-enter-active',
          timeout: setTimeout(function () {
            _this3.setState({ droppingClassName: null, timeout: null });
          }, 300)
        });
      }, 1)
    });
  };

  this.calcSize = function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? _this3.props : arguments[0];

    var menuItems = _ref.menuItems;
    var itemLabel = _ref.itemLabel;
    var label = _ref.label;

    var items = menuItems.slice();
    if (label) {
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

    var item = _this3.getListItem();

    // The height changes based on screen size and if floating label or not.
    var height = node.offsetHeight;
    var diff = item.offsetTop - item.offsetHeight;

    var paddingTop = parseInt(window.getComputedStyle(menu).getPropertyValue('padding-top'));

    var position = _this3.props.position;

    var transformOrigin = void 0,
        top = void 0;
    if (SelectField.Positions.BELOW !== position) {
      var x = SelectField.Positions.TOP_LEFT === position ? '0' : '100%';
      var y = (diff < 0 ? 0 : height) + height / 2 + paddingTop;
      transformOrigin = x + ' ' + y + 'px';
    }

    // padding top for mobile (desktop is 4)
    if (diff > LIST_PADDING) {
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
    var _props3 = _this3.props;
    var onChange = _props3.onChange;
    var itemLabel = _props3.itemLabel;

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
    // Prevents IE for toggling twice for some reason.
    e.preventDefault();
    _this3.props.onClick && _this3.props.onClick(e);
    if (_this3.props.disabled) {
      return;
    }

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