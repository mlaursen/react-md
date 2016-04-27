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
      size: _this.calcSize(props),
      activeIndex: _this.getActiveIndex(props, { value: props.defaultValue })
    };
    return _this;
  }

  _createClass(SelectField, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var state = void 0;
      if (this.getValue(this.props, this.state) !== this.getValue(nextProps, nextState)) {
        state = this.state.open && !nextState.open ? this.getAnimatedNewValueState() : {};
        state.activeIndex = this.getActiveIndex(nextProps, nextState);
      }

      var menuItems = this.props.menuItems;

      if (menuItems !== nextProps.menuItems || menuItems.length !== nextProps.menuItems.length) {
        state = state || {};
        state.size = this.calcSize(nextProps);
      }

      if (state) {
        this.setState(state);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props;
      var position = _props.position;
      var noAutoAdjust = _props.noAutoAdjust;
      var open = this.state.open;

      if (!open || open === prevState.open || noAutoAdjust) {
        return;
      }
      if (SelectField.Positions.BELOW === position) {
        var list = _reactDom2.default.findDOMNode(this).querySelector('.md-list');
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
     * Selects a new item with the given index and event.
     * If there is an onChange event, the newly selected item, new index, and
     * event will be called with onChange.
     *
     * If this is an uncontrolled component, it will return the new value to be used.
     *
     * @param {Number} index the newly selected item index
     * @param {Object} event the event to pass to onChange
     * @return {String} an optional new value to return if it is an uncontrolled component.
     */


    /**
     * Creates a state object to drop a new value into the text field.
     * @return {Object} a state object with timeouts for animating the new value.
     */


    /**
     * Gets the current activeIndex for the given props and state.
     *
     * @param {Object} props? the props to use
     * @param {Object} state? the state to use
     * @return the activeIndex or -1
     */


    /**
     * Gets the first active list item or the first list item if there are no active items.
     *
     * @return {Object} a list item element.
     */


    /**
     * Finds the longest menu item value to use as the text field's size.to that value.
     * If there is a floating label, it also checks against the label's size so that
     * the floating label won't be clipped
     *
     * @param {Object} props? the props to use
     * @return {Number} the size to use for the text field
     */


    /**
     * Sets the transform-origin for the dropdown menu so that the menu will appear
     * from the text field's baseline.
     *
     * Sets the top position to be one list item down if the first item is not selected.
     *
     * Scrolls the current item into view
     */


    /**
     * Gets the current value for the select field. If the component is controlled,
     * props.value will be returned. Otherwise, it will return the state.value. If the
     * state.value is an object, it will return value[itemLabel].
     *
     * @param {Object} props? the props to use
     * @param {Object} state? the state to use
     * @return {String} the current value to use for the select field.
     */


    /**
     * Attempts to focus an item with the given index. If the index is not -1
     * or the open list contains that index, the item will be focused.
     */


    /**
     * Searches the menuItems for an item that starts with the given code. If there is an
     * item that matches, the item will be focused. If the previous code is equal, the
     * next match will be found. If there are no more matches, the first item will be focused
     * again.
     *
     * @param {String} code the number pressed or the capitalized letter pressed.
     * @param {Object} event the keydown event to pass to onChange
     */


    /**
     * Attempts to increment the activeIndex by 1 or -1.
     *
     * @param {Boolean} negative boolean if it should be a decrement
     * @param {Object} event the keydown event
     */


    /**
     * Listens to all key down events in the menu-container. This will improve memory management
     * if there are a ridiculous amount of menu items. One keydown listener vs 10000.
     *
     * @param {Object} e the keydown event
     */


    /**
     * Closes the menu and calls the onChange function. If it is an
     * uncontrolled component, updates the value in the state.
     */


    /**
     * Listens to all click events on the menu container. If it is one of the menu items,
     * the item is selected. If the target is the text field, the menu will be toggled.
     *
     * The single event listener is for better performance on giant lists.
     * @param {Object} e the click event.
     */

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var open = _state.open;
      var size = _state.size;
      var activeIndex = _state.activeIndex;
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

      var items = void 0;
      if (open) {
        items = menuItems.map(function (item, i) {
          return _react2.default.createElement(_Lists.ListItem, {
            tabIndex: -1,
            primaryText: (0, _utils.isObject)(item) ? item[itemLabel] : item,
            key: item.key || i,
            tileClassName: (0, _classnames2.default)({
              'active': i === activeIndex,
              'select-field-btn-tile': below
            })
          });
        });
      }

      var menuProps = _extends({
        isOpen: open,
        close: this.close,
        className: (0, _classnames2.default)('md-select-field-menu-container', menuClassName),
        listClassName: (0, _classnames2.default)('md-select-field-menu', listClassName, {
          'single-line': !floatingLabel
        }),
        toggle: toggle,
        listStyle: listStyle,
        position: position
      }, props);

      if (!disabled) {
        menuProps.onClick = this.handleContainerClick;
        menuProps.onKeyDown = this.handleKeyDown;
      }

      return _react2.default.createElement(
        _Menus2.default,
        menuProps,
        items
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
  var _this2 = this;

  this.selectItem = function (index, event) {
    var _props3 = _this2.props;
    var onChange = _props3.onChange;
    var menuItems = _props3.menuItems;
    var value = _props3.value;
    var itemLabel = _props3.itemLabel;

    var item = menuItems[index];
    onChange && onChange(item, index, event);

    if (typeof value === 'undefined') {
      return (0, _utils.isObject)(item) ? item[itemLabel] : item;
    }
  };

  this.getAnimatedNewValueState = function () {
    return {
      droppingClassName: 'drop-enter',
      timeout: setTimeout(function () {
        _this2.setState({
          droppingClassName: 'drop-enter drop-enter-active',
          timeout: setTimeout(function () {
            _this2.setState({ droppingClassName: null, timeout: null });
          }, 300)
        });
      }, 1)
    };
  };

  this.getActiveIndex = function () {
    var props = arguments.length <= 0 || arguments[0] === undefined ? _this2.props : arguments[0];
    var state = arguments.length <= 1 || arguments[1] === undefined ? _this2.state : arguments[1];

    var value = _this2.getValue(props, state);
    if (!value) {
      return -1;
    }

    var itemLabel = props.itemLabel;
    var menuItems = props.menuItems;

    var i = 0;
    menuItems.some(function (item, j) {
      var found = ((0, _utils.isObject)(item) ? item[itemLabel] : item) === value;
      if (found) {
        i = j;
      }

      return found;
    });

    return i;
  };

  this.getListItem = function () {
    var node = _reactDom2.default.findDOMNode(_this2);

    return (node.querySelector('.md-list-tile.active') || node.querySelector('.md-list-tile')).parentNode;
  };

  this.calcSize = function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? _this2.props : arguments[0];

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
    var node = _reactDom2.default.findDOMNode(_this2);
    var menu = node.querySelector('.md-menu');

    var item = _this2.getListItem();

    // The height changes based on screen size and if floating label or not.
    var height = node.offsetHeight;
    var diff = item.offsetTop - item.offsetHeight;

    var paddingTop = parseInt(window.getComputedStyle(menu).getPropertyValue('padding-top'));

    var position = _this2.props.position;

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

    _this2.setState({
      listStyle: {
        msTransformOrigin: transformOrigin,
        WebkitTransformOrigin: transformOrigin,
        transformOrigin: transformOrigin,
        top: top
      }
    });
  };

  this.getValue = function () {
    var props = arguments.length <= 0 || arguments[0] === undefined ? _this2.props : arguments[0];
    var state = arguments.length <= 1 || arguments[1] === undefined ? _this2.state : arguments[1];

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

  this.toggle = function () {
    _this2.setState({ open: !_this2.state.open });
  };

  this.close = function () {
    _this2.setState({ open: false });
  };

  this.focus = function (index) {
    if (index === -1) {
      return;
    }

    var item = _reactDom2.default.findDOMNode(_this2).querySelectorAll('.md-list-tile')[index];
    item && item.focus();
  };

  this.attemptCodeFocus = function (code, event) {
    var _props4 = _this2.props;
    var menuItems = _props4.menuItems;
    var itemLabel = _props4.itemLabel;
    var _state2 = _this2.state;
    var lastCode = _state2.lastCode;
    var minMatchIndex = _state2.minMatchIndex;
    var maxMatchIndex = _state2.maxMatchIndex;
    var activeIndex = _state2.activeIndex;

    if (code === lastCode) {
      if (minMatchIndex === maxMatchIndex || minMatchIndex === -1 || maxMatchIndex === -1) {
        return;
      }
      var index = activeIndex + 1;
      if (index > maxMatchIndex) {
        index = minMatchIndex;
      }

      _this2.focus(index);
      _this2.setState({ activeIndex: index, value: _this2.selectItem(index, event) });
    } else {
      var matches = menuItems.filter(function (i) {
        var item = ((0, _utils.isObject)(i) ? i[itemLabel] : i) + '';
        return item && item.length ? item.charAt(0).toUpperCase() === code : false;
      });

      var state = {
        lastMatches: matches,
        lastCode: code,
        minMatchIndex: -1,
        maxMatchIndex: -1
      };

      if (matches.length) {
        state.minMatchIndex = menuItems.indexOf(matches[0]);
        state.maxMatchIndex = menuItems.indexOf(matches[matches.length - 1]);
        state.activeIndex = state.minMatchIndex;

        _this2.focus(state.activeIndex);
        state.value = _this2.selectItem(state.activeIndex, event);
      }

      _this2.setState(state);
    }
  };

  this.handleItemIncrement = function (negative, event) {
    event.preventDefault();
    var activeIndex = _this2.state.activeIndex;

    var length = _this2.props.menuItems.length - 1;
    var index = void 0;
    if (negative && activeIndex === -1 || !negative && activeIndex >= length) {
      return;
    } else if (negative) {
      index = Math.max(0, activeIndex - 1);
    } else {
      index = Math.min(length, activeIndex + 1);
    }

    _this2.focus(index);
    _this2.setState({
      activeIndex: index,
      value: _this2.selectItem(index, event)
    });
  };

  this.handleKeyDown = function (e) {
    _this2.props.onKeyDown && _this2.props.onKeyDown(e);

    var key = e.which || e.keyCode;
    var code = String.fromCharCode(key);
    if (key === _keyCodes.UP || key === _keyCodes.DOWN) {
      _this2.handleItemIncrement(key === _keyCodes.UP, e);
    } else if (key === _keyCodes.TAB) {
      _this2.close();
    } else if (key === _keyCodes.ENTER || key === _keyCodes.SPACE) {
      var classList = e.target.classList;
      if (classList.contains('md-text-field')) {
        _this2.toggle();
      } else if (classList.contains('md-list-tile')) {
        _this2.handleItemClick(_this2.state.activeIndex, e);
      }
    } else if (code && code.match(/[A-Z]/)) {
      _this2.attemptCodeFocus(code, e);
    } else if ((0, _utils.isBetween)(key, _keyCodes.ZERO, _keyCodes.NINE) || (0, _utils.isBetween)(key, _keyCodes.KEYPAD_ZERO, _keyCodes.KEYPAD_NINE)) {
      var num = key - ((0, _utils.isBetween)(key, _keyCodes.ZERO, _keyCodes.NINE) ? _keyCodes.ZERO : _keyCodes.KEYPAD_ZERO);
      _this2.attemptCodeFocus(String(num), e);
    }
  };

  this.handleItemClick = function (i, e) {
    _this2.setState({
      open: false,
      value: _this2.selectItem(i, e)
    });
  };

  this.handleContainerClick = function (e) {
    var node = e.target;
    while (node) {
      var classList = node.classList;
      if (classList.contains('md-text-field')) {
        _this2.toggle();
        return;
      } else if (classList.contains('md-list-tile')) {
        var tiles = Array.prototype.slice.call(_reactDom2.default.findDOMNode(_this2).querySelectorAll('.md-list-tile'));
        _this2.handleItemClick(tiles.indexOf(node), e);
        return;
      }

      node = node.parentNode;
    }
  };
};

exports.default = SelectField;
module.exports = exports['default'];