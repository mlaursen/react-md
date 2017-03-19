import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import { findDOMNode } from 'react-dom';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { UP, DOWN, ESC, ENTER, TAB, ZERO, NINE, KEYPAD_ZERO, KEYPAD_NINE } from '../constants/keyCodes';
import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import isBetween from '../utils/NumberUtils/isBetween';
import addSuffix from '../utils/StringUtils/addSuffix';
import List from '../Lists/List';
import ListItem from '../Lists/ListItem';
import Menu from '../Menus/Menu';
import Positions from '../Menus/Positions';
import FloatingLabel from '../TextFields/FloatingLabel';
import TextFieldMessage from '../TextFields/TextFieldMessage';
import Field from './Field';

const VALID_LIST_ITEM_PROPS = Object.keys(ListItem.propTypes);

const MOBILE_LIST_PADDING = 8;
const SelectFieldPositions = Object.assign({}, Positions);
delete SelectFieldPositions.BOTTOM_RIGHT;
delete SelectFieldPositions.BOTTOM_LEFt;

export default class SelectField extends PureComponent {
  static Positions = SelectFieldPositions;
  static propTypes = {
    /**
     * An id to use for the select field. This is required for a11y. If the `menuId` and
     * `listId` are not given, this will be used to create their ids for a11y.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * An optional name to give the select field's input.
     */
    name: PropTypes.string,

    /**
     * An id to give the menu containing the select field. If this is omitted, the `id` prop
     * will be used to make this id. `${id}Menu`.
     */
    menuId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An id to give the list that appears once the menu is open. If this is omitted, the `id` prop
     * will be used to make this id. `${id}Values`.
     */
    listId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the select field's container. This is the `Menu` component.
     */
    style: PropTypes.object,

    /**
     * An optional style to apply to the select field's container. This is the `Menu` component.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the select field's list of items that appear when opened.
     */
    listStyle: PropTypes.object,

    /**
     * An optional className to apply to the select field's list of items that appear when opened.
     */
    listClassName: PropTypes.string,

    /**
     * An optional style to apply to the select field itself.
     */
    inputStyle: PropTypes.object,

    /**
     * An optional className to apply to the select field itself.
     */
    inputClassName: PropTypes.string,

    /**
     * An optional value for the select field. This will require the `onChange` prop
     * to be defined since it will be a controlled component.
     */
    value: controlled(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]), 'onChange'),

    /**
     * The default value for an uncontrolled select field.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,

    /**
     * Boolean if the select field is open by default.
     */
    defaultOpen: PropTypes.bool,

    /**
     * An optional boolean if the select field is currently open. This will make the component
     * controlled and require the `onMenuToggle` prop to be defined.
     */
    isOpen: controlled(PropTypes.bool, 'onMenuToggle', 'defaultOpen'),

    /**
     * An optional function to call when the menu's open state changes. The callback will include
     * the next open state and the event that driggered it.
     *
     * ```js
     * onMenuToggle(isOpen, event);
     * ```
     */
    onMenuToggle: PropTypes.func,

    /**
     * An optional function to call when the value for the select field changes. The callback will
     * include the new value, the index of the menu item that was selected, and the event that
     * triggered the change.
     *
     * ```js
     * onChange(newValue, newActiveIndex, event);
     * ```
     */
    onChange: PropTypes.func,

    /**
     * A list of items to select from. This can be a mixed list of number, string,
     * or object. If the item is an object, make sure the `itemLabel` and `itemValue`
     * props match the keys in the object for the label and value.
     */
    menuItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ])),

    /**
     * An optional floating label to display with the text field. This is invalid
     * if the `position` is set to `SelectField.Positions.BELOW`.
     */
    label: PropTypes.string,

    /**
     * An optional placeholder to display in the select field.
     */
    placeholder: PropTypes.string,

    /**
     * Boolean if the select field is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * The key to use for extracting a menu item's label if the menu item is an object.
     *
     * Example:
     *
     * ```js
     * const item = { something: 'My Label', somethingElse: 'value' };
     * const itemLabel = 'something';
     * const itemValue = 'somethingElse';
     * ```
     */
    itemLabel: PropTypes.string.isRequired,

    /**
     * The key to use for extracting a menu item'value label if the menu item is an object.
     *
     * Example:
     *
     * ```js
     * const item = { something: 'My Label', somethingElse: 'value' };
     * const itemLabel = 'something';
     * const itemValue = 'somethingElse';
     * ```
     */
    itemValue: PropTypes.string.isRequired,

    /**
     * Any children used to display the select field's drop down icon.
     */
    iconChildren: PropTypes.node,

    /**
     * The icon class name to use to display the select field's drop down icon.
     */
    iconClassName: PropTypes.string,

    /*
     * An optional function to call when the menu is clicked.
     */
    onClick: PropTypes.func,

    /**
     * The position that the select field's options should appear from. If the position is
     * set to `BELOW`, the select field will be displayed as a button with ink instead of
     * a text field.
     */
    position: PropTypes.oneOf([
      SelectField.Positions.TOP_LEFT,
      SelectField.Positions.TOP_RIGHT,
      SelectField.Positions.BELOW,
    ]).isRequired,

    /*
     * The direction that the select field's focus indicator should grow from.
     */
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']).isRequired,

    /**
     * An optional function to call when the select field is focused.
     */
    onFocus: PropTypes.func,

    /**
     * An optional function to call when the select field is blurred. This
     * will also be triggered when a user selects a new item or keyboard navigates
     * through the list items.
     */
    onBlur: PropTypes.func,

    /**
     * The amount of time that a list of letters should be used when finding a menu item
     * while typing. Since a user can select items by typing multiple letters in a row,
     * this will be used as the timeout for clearing those letters.
     *
     * For example:
     * - User types `g`
     *
     * Full match is now `'g'`.
     *
     * - User delays 200ms and types `u`
     *
     * Full match is now `'gu'`
     *
     * - User delays 1000ms and types `a`.
     *
     * Full match is now `'a'`
     */
    keyboardMatchingTimeout: PropTypes.number.isRequired,

    /**
     * Boolean if the select field's list of menu items should stretch to at least
     * be the width of the select field.
     */
    stretchList: PropTypes.bool,

    /**
     * Boolean if there has been an error for the select field. This will display
     * the `errorText`. And style the floating label and focus indicator with the
     * error color.
     */
    error: PropTypes.bool,

    /**
     * An optional error text to display when the `error` prop is true.
     */
    errorText: PropTypes.node,

    /**
     * An optional help text to display below the select field.
     */
    helpText: PropTypes.node,

    /**
     * Boolean if the help text should only be displayed when the select field
     * has focus.
     */
    helpOnFocus: PropTypes.bool,

    /**
     * Boolean if the select field is required. This will updated the label or placeholder
     * to include an asterisk.
     */
    required: PropTypes.bool,

    /**
     * Boolean if the select field is in a toolbar. This will automatically be injected if the select field
     * is passed in as the `menuTitle` prop.
     */
    toolbar: PropTypes.bool,

    /**
     * Boolean if the menu surrounding the select field should be full width or not.
     */
    fullWidth: PropTypes.bool,

    menuStyle: deprecated(PropTypes.object, 'Use `style` instead'),
    menuClassName: deprecated(PropTypes.string, 'Use `className` instead'),
    initiallyOpen: deprecated(PropTypes.bool, 'Use `defaultOpen` instead'),
    floatingLabel: deprecated(
      PropTypes.bool,
      'A select field can only have floating labels now. Only provide the `label` prop'
    ),
    noAutoAdjust: deprecated(PropTypes.bool, 'No longer valid to use since select fields are no longer text fields'),
    adjustMinWidth: deprecated(PropTypes.bool, 'No longer valid to use since select fields are no longer text fields'),
  };

  static defaultProps = {
    defaultValue: '',
    itemLabel: 'label',
    itemValue: 'value',
    iconChildren: 'arrow_drop_down',
    position: SelectField.Positions.TOP_LEFT,
    lineDirection: 'left',
    keyboardMatchingTimeout: 1000,
    stretchList: true,
    menuItems: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      activeIndex: this._getActiveIndex(props, { value: props.defaultValue }),
      isOpen: typeof props.initiallyOpen !== 'undefined' ? props.initiallyOpen : !!props.defaultOpen,
      activeLabel: this._getActiveLabel(props, typeof props.value !== 'undefined' ? props.value : props.defaultValue),
      match: null,
      lastSearch: null,
      error: false,
    };

    if (typeof props.value === 'undefined') {
      this.state.value = props.defaultValue;
    }

    this._setMenu = this._setMenu.bind(this);
    this._setField = this._setField.bind(this);
    this._positionList = this._positionList.bind(this);
    this._toggleOpen = this._toggleOpen.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleOpen = this._handleOpen.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._getActiveLabel = this._getActiveLabel.bind(this);
    this._mapToListItem = this._mapToListItem.bind(this);
    this._handleItemSelect = this._handleItemSelect.bind(this);
    this._handleContainerClick = this._handleContainerClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._setMenuItem = this._setMenuItem.bind(this);
    this._getActiveIndex = this._getActiveIndex.bind(this);
    this._advanceFocus = this._advanceFocus.bind(this);
    this._attemptItemFocus = this._attemptItemFocus.bind(this);
    this._selectItemByLetter = this._selectItemByLetter.bind(this);
    this._selectFirstMatch = this._selectFirstMatch.bind(this);

    this._items = [];
    this._activeItem = null;
  }

  componentWillUpdate(nextProps, nextState) {
    const prevValue = getField(this.props, this.state, 'value');
    const value = getField(nextProps, nextState, 'value');
    const error = getField(nextProps, nextState, 'error');
    const isOpen = getField(nextProps, nextState, 'isOpen');
    const valued = !getField(nextProps, nextState, 'value');

    let state;
    if (prevValue !== value || this.props.menuItems !== nextProps.menuItems) {
      state = {
        activeLabel: this._getActiveLabel(nextProps, value),
      };
    }

    if (nextProps.required && !isOpen && error !== valued) {
      state = state || {};
      state.error = valued;
    }

    if (state) {
      this.setState(state);
    }
  }

  componentWillUnmount() {
    if (this._matchingTimeout) {
      clearTimeout(this._matchingTimeout);
    }
  }

  _attemptItemFocus(index) {
    if (index === -1) {
      return;
    }

    const item = this._items[index];
    if (item) {
      item.focus();
    }
  }

  _getActiveLabel({ menuItems, itemLabel, itemValue }, value) {
    let activeLabel = '';
    menuItems.some(item => {
      activeLabel = this._getActiveLabelFromItem(item, value, itemLabel, itemValue);
      return activeLabel;
    });

    return activeLabel;
  }

  _getActiveLabelFromItem(item, value, itemLabel, itemValue) {
    switch (typeof item) {
      case 'number':
      case 'string':
        if (item === value || item === parseInt(value, 10)) {
          return item;
        }

        break;
      case 'object':
        if (item[itemValue] === value || item[itemValue] === parseInt(value, 10)) {
          return item[itemLabel];
        }

        break;
      default:
    }

    return '';
  }

  _getActiveIndex(props, state) {
    const value = getField(props, state, 'value');
    if (!value) {
      return -1;
    }

    const { itemLabel, itemValue, menuItems } = props;
    let index = -1;
    menuItems.some((item, i) => {
      const found = this._getActiveLabelFromItem(item, value, itemLabel, itemValue);
      if (found) {
        index = i;
      }

      return found;
    });

    return index;
  }

  _setMenu(menu) {
    this._menu = findDOMNode(menu);
  }

  _setField(field) {
    this._field = findDOMNode(field);
  }

  _positionList(listRef) {
    if (listRef === null) {
      this._items = [];
    } else if (!this._activeItem) {
      return;
    }

    const list = findDOMNode(listRef);
    const { position, menuItems, toolbar } = this.props;
    if (position === SelectField.Positions.BELOW || toolbar) { // only modify scroll distance when below
      const activeIndex = Math.min(this._activeItem, menuItems.length - 2);
      const { offsetTop: itemTop } = list.querySelectorAll('.md-list-tile')[activeIndex];
      list.scrollTop = itemTop > MOBILE_LIST_PADDING ? itemTop : 0;
      return;
    }

    const { offsetTop: itemTop, offsetHeight: itemHeight } = this._activeItem;

    const { offsetHeight: menuHeight } = this._menu;
    const itemPosition = Math.max(0, itemTop - itemHeight);
    const listPadding = parseInt(window.getComputedStyle(list).getPropertyValue('padding-top'), 10);

    // Basically calculates where the current item is in the list, and attempts to make the menu
    // originate from that position.
    const x = SelectField.Positions.TOP_LEFT === position ? '0' : '100%';
    const y = (itemPosition === 0 ? 0 : menuHeight) + (menuHeight / 2) + listPadding;
    const transformOrigin = `${x} ${y}px`;

    let top;
    if (itemPosition > 0) {
      // close enough. It is off by 4px for floating label on desktop
      top = -(itemHeight + listPadding - (menuHeight - itemHeight));
    }

    if (itemPosition > 0) {
      list.scrollTop = itemPosition;
    }

    this.setState({
      listStyle: {
        top,
        transformOrigin,
      },
    });
  }

  _handleFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    this.setState({ active: true });
  }

  _handleBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    const isOpen = getField(this.props, this.state, 'isOpen');
    const value = getField(this.props, this.state, 'value');

    this.setState({
      active: false,
      error: this.props.required && !isOpen && !value,
    });
  }

  _handleItemSelect(index, v, e) {
    const { required, menuItems, itemLabel, itemValue, onChange, position } = this.props;
    const number = typeof menuItems[index] === 'number' || typeof menuItems[index][itemValue] === 'number';
    const value = number ? Number(v) : v;

    const below = position === SelectField.Positions.BELOW;
    if (getField(this.props, this.state, 'value') !== value && onChange) {
      onChange(value, index, e);
    }

    const state = {
      activeIndex: below ? 0 : index,
      activeLabel: this._getActiveLabelFromItem(menuItems[index], value, itemLabel, itemValue),
      error: required && !value,
    };

    if (typeof this.props.value === 'undefined') {
      state.value = value;
    }

    if (typeof this.props.isOpen === 'undefined' && e.type !== 'click') {
      state.isOpen = false;
    }

    this.setState(state);
  }

  _handleContainerClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    let { target } = e;
    while (this._menu && this._menu.contains(target)) {
      if (target.dataset.id) {
        this._handleItemSelect(parseInt(target.dataset.id, 10), target.dataset.value, e);
        return;
      }

      target = target.parentNode;
    }
  }

  /**
   * This function is only called when the user _clicks_ or _touches_ the select field. Since
   * clicking it can either open or close it, this is actually toggled.
   */
  _toggleOpen(e) {
    const isOpen = !getField(this.props, this.state, 'isOpen');
    if (this.props.onMenuToggle) {
      this.props.onMenuToggle(isOpen, e);
    }

    if (typeof this.props.isOpen === 'undefined') {
      this.setState({ isOpen });
    }
  }

  /**
   * Ths function is used for opening the select field with keyboard input.
   */
  _handleOpen(e) {
    if (this.props.onMenuToggle) {
      this.props.onMenuToggle(true, e);
    }

    let state;
    if (!getField(this.props, this.state, 'value') && this.state.activeIndex === -1) {
      // When there is no value, need to change the default active index to 0 instead of -1
      // so that the next DOWN arrow increments correctly
      state = { activeIndex: 0 };
    }

    if (typeof this.props.isOpen === 'undefined') {
      state = state || {};
      state.isOpen = true;
    }

    if (state) {
      this.setState(state);
    }
  }

  _handleClose(e) {
    if (this.props.onMenuToggle) {
      this.props.onMenuToggle(false, e);
    }

    let state;
    if (this.props.position === SelectField.Positions.BELOW) {
      // Set the active index back to 0 since the active item will be spliced out
      // of the menu items
      state = { activeIndex: 0 };
    }

    if (typeof this.props.isOpen === 'undefined') {
      state = state || {};
      state.isOpen = false;
    }

    if (state) {
      this.setState(state);
    }
  }

  _mapToListItem(item, i) {
    const { id, itemLabel, itemValue: itemValueKey, position } = this.props;
    const below = position === SelectField.Positions.BELOW;
    const value = getField(this.props, this.state, 'value');

    let primaryText = '';
    let itemValue = '';
    let props;
    switch (typeof item) {
      case 'number':
      case 'string':
        primaryText = item;
        itemValue = item;
        break;
      case 'object':
        primaryText = item[itemLabel];
        itemValue = typeof item[itemValueKey] !== 'undefined' ? item[itemValueKey] : item[itemLabel];
        props = Object.keys(item).reduce((validProps, key) => {
          if (key !== itemLabel && key !== itemValueKey && key !== 'primaryText'
            && VALID_LIST_ITEM_PROPS.indexOf(key) !== -1
          ) {
            validProps[key] = item[key];
          }

          return validProps;
        }, {});
        break;
      default:
    }

    const active = itemValue === value || itemValue === parseInt(value, 10);
    if (below && active) {
      return null;
    }

    return (
      <ListItem
        {...props}
        ref={this._setMenuItem}
        active={active}
        tabIndex={-1}
        primaryText={primaryText}
        key={item.key || i}
        role="option"
        id={active ? `${id}Active` : null}
        data-id={i}
        data-value={itemValue}
        tileStyle={below ? { paddingLeft: 24 } : undefined}
      />
    );
  }

  _setMenuItem(item) {
    if (!item) {
      return;
    }

    if (item.props.active) {
      this._activeItem = findDOMNode(item);
      item.focus();
    }

    this._items.push(item);
  }

  _handleKeyDown(e) {
    const key = e.which || e.keyCode;
    const isOpen = getField(this.props, this.state, 'isOpen');

    if (key === UP || key === DOWN) {
      e.preventDefault();
    }

    if (!isOpen && (key === DOWN || key === UP || key === ENTER)) {
      this._handleOpen(e);
      return;
    } else if (isOpen && (key === ESC || key === TAB)) {
      if (this._field && key === ESC) {
        this._field.focus();
      }

      this._handleClose(e);
      return;
    }

    switch (key) {
      case UP:
      case DOWN:
        this._advanceFocus(key === UP, e);
        break;
      case ENTER:
        if (this._field) {
          this._field.focus();
        }

        this._handleContainerClick(e);
        break;
      default:
        this._selectItemByLetter(e, key);
    }
  }

  _advanceFocus(decrement) {
    const { menuItems, position } = this.props;
    const { activeIndex } = this.state;

    const below = position === SelectField.Positions.BELOW;

    // If the select field is positioned below and there is no value, need to increment the last index
    // by one since this select field removes the active item. Need to account for that here when there
    // is no value.
    const lastIndex = menuItems.length - (below && !getField(this.props, this.state, 'value') ? 0 : 1);
    if ((decrement && activeIndex <= 0) || (!decrement && activeIndex >= lastIndex)) {
      return;
    }

    const nextIndex = Math.max(-1, Math.min(lastIndex, activeIndex + (decrement ? -1 : 1)));
    if (nextIndex === activeIndex) {
      return;
    }

    this._attemptItemFocus(nextIndex - (below ? 1 : 0));
    if (below && decrement && nextIndex === 0) {
      return;
    }

    this.setState({ activeIndex: nextIndex });
  }

  _selectItemByLetter(e, key) {
    const charCode = String.fromCharCode(key);
    const isLetter = charCode && charCode.match(/[A-Za-z0-9-_ ]/);
    const isKeypad = isBetween(key, KEYPAD_ZERO, KEYPAD_NINE);
    if (!isBetween(key, ZERO, NINE) && !isKeypad && !isLetter) {
      return;
    }

    const letter = isLetter ? charCode : String(key - (isKeypad ? KEYPAD_ZERO : ZERO));

    if (this._matchingTimeout) {
      clearTimeout(this._matchingTimeout);
    }

    this._matchingTimeout = setTimeout(() => {
      this._matchingTimeout = null;

      this.setState({ match: null, lastSearch: null });
    }, this.props.keyboardMatchingTimeout);

    this._selectFirstMatch(letter, e);
  }

  _selectFirstMatch(letter, e) {
    const { menuItems, itemLabel, itemValue } = this.props;

    const search = `${this.state.lastSearch || ''}${letter}`;
    let match = -1;
    menuItems.some((item, i) => {
      const value = String(typeof item === 'object' && item ? item[itemLabel] : item);
      if (value && value.toUpperCase().indexOf(search) === 0) {
        match = i;
      }

      return match > -1;
    });

    const activeItem = menuItems[match];

    const state = {
      match,
      lastSearch: search,
    };

    if (match === -1) {
      this.setState(state);
      return;
    }

    state.activeLabel = typeof activeItem === 'object' ? activeItem[itemLabel] : activeItem;
    state.activeIndex = match;

    if (getField(this.props, this.state, 'isOpen')) {
      if (state.match !== this.state.match) {
        this._attemptItemFocus(state.activeIndex);
      }
    } else {
      const value = typeof activeItem === 'object' ? activeItem[itemValue] : activeItem;
      state.error = !value;

      if (getField(this.props, this.state, 'value') !== value && this.props.onChange) {
        this.props.onChange(value, state.activeIndex, e);
      }

      if (typeof this.props.value === 'undefined') {
        state.value = value;
      }
    }

    this.setState(state);
  }

  render() {
    const { activeLabel, active } = this.state;
    const {
      id,
      style,
      className,
      listStyle,
      listClassName,
      inputStyle,
      inputClassName,
      disabled,
      menuItems,
      position,
      stretchList,
      errorText,
      helpText,
      helpOnFocus,
      required,
      fullWidth,
      ...props
    } = this.props;
    delete props.error;
    delete props.itemLabel;
    delete props.itemValue;
    delete props.menuId;
    delete props.listId;
    delete props.defaultValue;
    delete props.value;
    delete props.isOpen;
    delete props.defaultOpen;
    delete props.keyboardMatchingTimeout;
    delete props.onMenuToggle;

    // delete deprecated
    delete props.menuStyle;
    delete props.menuClassName;
    delete props.initiallyOpen;
    delete props.floatingLabel;
    delete props.noAutoAdjust;
    delete props.adjustMinWidth;

    let { menuId, listId, placeholder, label, error } = this.props;
    error = error || this.state.error;
    const value = getField(this.props, this.state, 'value');
    const isOpen = getField(this.props, this.state, 'isOpen');
    const below = position === SelectField.Positions.BELOW;

    if (!menuId) {
      menuId = `${id}Menu`;
    }

    if (!listId) {
      listId = `${id}Values`;
    }

    if (required) {
      if (label) {
        label = addSuffix(label, '*');
      }

      if (placeholder && !label) {
        placeholder = addSuffix(placeholder, '*');
      }
    }

    const toggle = [
      <FloatingLabel
        key="floating-label"
        label={label}
        htmlFor={id}
        active={active || isOpen}
        error={error}
        floating={!!activeLabel || active || isOpen}
        disabled={disabled}
      />,
      <Field
        {...props}
        id={id}
        ref={this._setField}
        key="select-field"
        style={inputStyle}
        className={inputClassName}
        activeLabel={activeLabel}
        required={required}
        disabled={disabled}
        active={active || isOpen}
        below={below}
        value={value}
        label={label}
        error={error}
        placeholder={placeholder}
        onClick={this._toggleOpen}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
      />,
      <TextFieldMessage
        key="message"
        active={active || isOpen}
        error={error}
        errorText={errorText}
        helpText={helpText}
        helpOnFocus={helpOnFocus}
        leftIcon={false}
        rightIcon={false}
      />,
    ];

    return (
      <Menu
        id={menuId}
        position={position}
        isOpen={isOpen}
        onClose={this._handleClose}
        onClick={this._handleContainerClick}
        onKeyDown={this._handleKeyDown}
        toggle={toggle}
        style={style}
        className={cn('md-select-field-menu', {
          'md-select-field-menu--stretch': stretchList,
        }, className)}
        ref={this._setMenu}
        fullWidth={fullWidth}
      >
        <List
          id={listId}
          role="listbox"
          ref={this._positionList}
          aria-activedescendant={value ? `${id}Active` : null}
          style={{ ...listStyle, ...this.state.listStyle }}
          className={listClassName}
        >
          {menuItems.map(this._mapToListItem).filter(item => item !== null)}
        </List>
      </Menu>
    );
  }
}
