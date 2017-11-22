import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { UP, DOWN, ESC, TAB, ZERO, NINE, KEYPAD_ZERO, KEYPAD_NINE } from '../constants/keyCodes';
import omit from '../utils/omit';
import isValued from '../utils/isValued';
import getField from '../utils/getField';
import isBetween from '../utils/NumberUtils/isBetween';
import handleKeyboardAccessibility from '../utils/EventUtils/handleKeyboardAccessibility';
import controlled from '../utils/PropTypes/controlled';
import FontIcon from '../FontIcons/FontIcon';
import anchorShape from '../Helpers/anchorShape';
import fixedToShape from '../Helpers/fixedToShape';
import positionShape from '../Helpers/positionShape';
import Menu from '../Menus/Menu';
import ListItem from '../Lists/ListItem';

import SelectFieldToggle from './SelectFieldToggle';

const MOBILE_LIST_PADDING = 8;
const ARIA_ACTIVE = 'aria-activedescendant';

export default class SelectField extends PureComponent {
  static HorizontalAnchors = Menu.HorizontalAnchors;
  static VerticalAnchors = Menu.VerticalAnchors;
  static Positions = Menu.Positions;

  static propTypes = {
    /**
     * An id to give the select field. This is required for accessibility.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * An optional name to give to the select field.
     */
    name: PropTypes.string,

    /**
     * An optional id to provide to the select field's menu. If this is omitted,
     * it will default to `${id}-menu`.
     */
    menuId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional id to provide to the select field's list.
     *
     * @see {@link #menuId}
     * @see {@link Menus/Menu#menuId}
     */
    listId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the select field's container (the menu).
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the select field's container (the menu).
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the menu's list.
     */
    listStyle: PropTypes.object,

    /**
     * An optional className to apply to the menu's list.
     */
    listClassName: PropTypes.string,

    /**
     * An optional style to apply to the select field's toggle.
     */
    toggleStyle: PropTypes.object,

    /**
     * An optional className to apply to the select field's toggle.
     */
    toggleClassName: PropTypes.string,

    /**
     * An optional style to apply to the `AccessibleFakeInkedButton` that is the trigger
     * for the select field.
     */
    inputStyle: PropTypes.object,

    /**
     * An optional className to apply to the `AccessibleFakeInkedButton` that is the trigger
     * for the select field.
     */
    inputClassName: PropTypes.string,

    /**
     * Boolean if the select field should be have the menu's list visible by default.
     */
    defaultVisible: PropTypes.bool.isRequired,

    /**
     * Boolean if the select field should have the menu's list visible. This will make
     * the select field controlled and require the `onVisibilityChange` prop to be defined,
     */
    visible: controlled(PropTypes.bool, 'onVisibilityChange', 'defaultVisible'),

    /**
     * An optional function to call when the select field's menu has it's visibility changed. The callback
     * will include the next visible state and the event that triggered it.
     */
    onVisibilityChange: PropTypes.func,

    /**
     * A list of `number`, `string`, or `object` that should be used to create `ListItem`
     * in the menu's list. When it is an `object`, it will use the `itemLabel` prop as the
     * `primaryText` and use the value of `itemValue`.
     *
     * @see {@link #itemLabel}
     * @see {@link #itemValue}
     */
    menuItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.element,
    ])).isRequired,

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
     * The key to use for extracting a menu item's value if the menu item is an object.
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
     * The key to use for extracting a menu item's function
     * to get additional `ListItem` props if the menu item is an object.
     *
     * Example:
     *
     * ```js
     * const item = { something: 'My Label', addProps: ({active}) => active ? {secondaryText: 'some text'} : null };
     * const itemLabel = 'something';
     * const itemProps = 'addProps';
     * ```
     *
     * @see {@link #getItemProps}
     */
    itemProps: PropTypes.string.isRequired,

    /**
     * An optional function to get additional `ListItem` props if the menu item is an object.
     *
     * An object with the following fields will be passed into the function:
     * - `index` - item's index
     * - `active` - whether item is active
     * - `disabled` - whether item is disabled
     * - `itemValue` - item's value
     * - `value` - current list value
     * - `props` - default `ListItem` props
     * - `item` - source item's data
     * - `field` - reference to the component instance
     */
    getItemProps: PropTypes.func,

    /**
     * The default value to use for the select field. If this is set, it should either match
     * one of the `number` or `string` in your `menuItems` list or be the empty string. If
     * the `menuItems` is a list of `object`, this value should match one of the menu item's
     * `itemValue` or be the empty string.
     *
     * ```js
     * const menuItems = [{ label: 'Something': value: 0 }, { label: 'Something else', value: 1 }];
     *
     * // both valid
     * defaultValue={0}
     * defaultValue=""
     * ```
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,

    /**
     * The value to use for the select field. If this is defined, it becomes a controlled component
     * and requires the `onChange` prop to be defined. See the `defaultValue` for more behavior info.
     *
     * @see {@link #defaultValue}
     */
    value: controlled(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]), 'onChange', 'defaultValue'),

    /**
     * An optional function to call when the select field's value has been changed either when the user
     * has click/touched/keyboard selected a value in the list, or the user has selected a value by typing
     * in the select field while the menu's list is closed.
     *
     * The callback will include the next text field value, the selected item's index, the event that
     * triggered the change, and the id, name, and value of the select field.
     *
     * ```js
     * onChange(value, index, event, { id, name, value });
     * ```
     */
    onChange: PropTypes.func,

    /**
     * An optional label to use with the select field. This will be a floating label as seen on the text field.
     */
    label: PropTypes.node,

    /**
     * An optional placeholder to use in the select field. This will only appear when no value has been selected.
     */
    placeholder: PropTypes.string,

    /**
     * Boolean if the select field should be disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Boolean if the select field is required. This will update the label and placeholder to include a `*` suffix.
     */
    required: PropTypes.bool,

    /**
     * Boolean if the select field is considered to be in an `error` state.
     *
     * @see {@link TextFields/TextField#error}
     */
    error: PropTypes.bool,

    /**
     * An optional text to display when the text select field is in an error state.
     *
     * @see {@link TextFields/TextField#errorText}
     */
    errorText: PropTypes.node,

    /**
     * An optional text to display below the select field to provide input help to the user.
     * This will only be displayed if the select field is not in an error state.
     *
     * @see {@link #helpOnFocus}
     * @see {@link TextFields/TextField#errorText}
     */
    helpText: PropTypes.node,

    /**
     * Boolean if the `helpText` should only appear on focus.
     *
     * @see {@link #helpText}
     * @see {@link TextFields/TextField#helpOnFocus}
     */
    helpOnFocus: PropTypes.bool,

    /**
     * An optional function to call when any element in the select field has been clicked.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the `keydown` event has been triggered anywhere in the
     * select field.
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional function to call when the select field's toggle has gained focus.
     */
    onFocus: PropTypes.func,

    /**
     * An optional function to call when the select field's toggle has been blurred. This
     * will be triggered if the user hits the up or down arrow keys to traverse the list
     * of items.
     */
    onBlur: PropTypes.func,

    /**
     * The icon to use to display the dropdown arrow.
     */
    dropdownIcon: PropTypes.element,

    /**
     * Boolean if the select field is in a toolbar. This should automatically be injected by the `Toolbar`
     * component if being used as a `titleMenu` or one of the `actions`.
     *
     * @see {@link Toolbars/Toolbar#titleMenu}
     * @see {@link Toolbars/Toolbar#actions}
     */
    toolbar: PropTypes.bool,

    /**
     * Boolean if the currently active item should be removed from the list of available `menuItems`.
     * If this is `undefined`, it will strip out the active one only when the
     * `position === SelectField.Positions.BELOW`.
     */
    stripActiveItem: PropTypes.bool,

    /**
     * The transition name to use when a new value has been selected. By default, it will have the
     * new item _drop_ into the select field's input location.
     */
    transitionName: PropTypes.string.isRequired,

    /**
     * The transition time to use when a new value has been selected. If this value is `0`, there
     * will be no transition.
     */
    transitionTime: PropTypes.number.isRequired,

    /**
     * This is how the menu's `List` gets anchored to the select field.
     *
     * @see {@link Helpers/Layover#anchor}
     */
    anchor: anchorShape,

    /**
     * This is the anchor to use when the `position` is set to `Autocomplete.Positions.BELOW`.
     *
     * @see {@link Helpers/Layover#belowAnchor}
     */
    belowAnchor: anchorShape,

    /**
     * This is the animation position for the list that appears.
     *
     * @see {@link Helpers/Layover#animationPosition}
     */
    position: positionShape,

    /**
     * This is how the menu's list will be "fixed" to the `toggle` component.
     *
     * @see {@link Helpers/Layover#fixedTo}
     */
    fixedTo: fixedToShape,

    /**
     * Boolean if the menu's list should appear horizontally instead of vertically.
     */
    listInline: PropTypes.bool,

    /**
     * The list's z-depth for applying box shadow. This should be a number from 0 to 5.
     */
    listZDepth: PropTypes.number,

    /**
     * Boolean if the list should have its height restricted to the `$md-menu-mobile-max-height`/
     * `$md-menu-desktop-max-height` values.
     *
     * @see [md-menu-mobile-max-height](/components/menus?tab=1#variable-md-menu-mobile-max-height)
     * @see [md-menu-desktop-max-height](/components/menus?tab=1#variable-md-menu-desktop-max-height)
     */
    listHeightRestricted: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#xThreshold}
     */
    xThreshold: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#yThreshold}
     */
    yThreshold: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#closeOnOutsideClick}
     */
    closeOnOutsideClick: PropTypes.bool,

    /**
     * An optional transition name to use for the list appearing/disappearing.
     *
     * @see {@link Menus/Menu#transitionName}
     */
    menuTransitionName: PropTypes.string,

    /**
     * @see {@link Helpers/Layover#transitionEnterTimeout}
     */
    menuTransitionEnterTimeout: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#transitionLeaveTimeout}
     */
    menuTransitionLeaveTimeout: PropTypes.number,

    /**
     * @see {@link Menus/Menu#block}
     */
    block: PropTypes.bool,

    /**
     * @see {@link Menus/Menu#fullWidth}
     */
    fullWidth: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#centered}
     */
    centered: Menu.propTypes.centered,

    /**
     * @see {@link Helpers/Layover#sameWidth}
     */
    sameWidth: Menu.propTypes.sameWidth,

    /**
     * Since the `menuItems` get mapped into `ListItem`, this prop is used to remove
     * any unnecessary props from the `ListItem` itself. This is where you
     * would remove parts of your object such as `description` or `__metadata__`.
     */
    deleteKeys: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ])),
    ]),

    /**
     * Boolean if the menu should automatically try to reposition itself to stay within
     * the viewport when the `fixedTo` element scrolls.
     *
     * @see {@link Helpers/Layover#repositionOnScroll}
     */
    repositionOnScroll: PropTypes.bool,

    /**
     * Boolean if the menu should automatically try to reposition itself to stay within
     * the viewport when the window resizes.
     *
     * @see {@link Helpers/Layover#repositionOnResize}
     */
    repositionOnResize: PropTypes.bool,

    /**
     * Boolean if the menu logic should be simplified without any viewport logic and position
     * based on the relative position of the menu. This will most like require some additional
     * styles applied to the menu.
     *
     * @see {@link Helpers/Layover#simplified}
     */
    simplifiedMenu: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#minLeft}
     */
    minLeft: Menu.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minRight}
     */
    minRight: Menu.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minBottom}
     */
    minBottom: Menu.propTypes.minBottom,

    /**
     * @see {@link Helpers/Layover#fillViewportWidth}
     */
    fillViewportWidth: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#fillViewportHeight}
     */
    fillViewportHeight: PropTypes.bool,

    /**
     * The direction that the underline should appear from.
     */
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']).isRequired,

    iconChildren: deprecated(PropTypes.node, 'Use `dropdownIcon` instead'),
    iconClassName: deprecated(PropTypes.string, 'Use `dropdownIcon` instead'),
    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
    defaultOpen: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
    initiallyOpen: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
    onMenuToggle: deprecated(PropTypes.func, 'Use `onVisibilityChange` instead'),
    stretchList: deprecated(
      PropTypes.bool,
      'No longer valid after the changes to the `Menu` component. Possibly use `sameWidth` instead'
    ),
    menuStyle: deprecated(PropTypes.object, 'Use `style` instead'),
    menuClassName: deprecated(PropTypes.string, 'Use `className` instead'),
    floatingLabel: deprecated(
      PropTypes.bool,
      'A select field can only have floating labels now. Only provide the `label` prop'
    ),
    noAutoAdjust: deprecated(PropTypes.bool, 'No longer valid to use since select fields are no longer text fields'),
    adjustMinWidth: deprecated(PropTypes.bool, 'No longer valid to use since select fields are no longer text fields'),
  };

  static defaultProps = {
    anchor: {
      x: SelectField.HorizontalAnchors.INNER_LEFT,
      y: SelectField.VerticalAnchors.OVERLAP,
    },
    fixedTo: Menu.defaultProps.fixedTo,
    position: SelectField.Positions.TOP_LEFT,
    itemLabel: 'label',
    itemValue: 'value',
    itemProps: 'getProps',
    dropdownIcon: <FontIcon>arrow_drop_down</FontIcon>,
    lineDirection: 'left',
    menuItems: [],
    defaultValue: '',
    defaultVisible: false,
    keyboardMatchingTimeout: 1000,
    transitionName: 'md-drop',
    transitionTime: 300,
    repositionOnScroll: true,
    repositionOnResize: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      active: false,
      ...this._getActive(props, { value: props.defaultValue }),
      listProps: {
        role: 'listbox',
        ref: this._scrollActiveIntoView,
        [ARIA_ACTIVE]: null,
      },
      match: null,
      lastSearch: null,
      value: props.defaultValue,
      visible: props.defaultVisible,
    };

    this._items = [];
    this._activeItem = null;
    this._deleteKeys = this._getDeleteKeys(props);
  }

  componentDidMount() {
    this._container = findDOMNode(this);
    this._field = this._container.querySelector('.md-select-field');
  }

  componentWillReceiveProps(nextProps) {
    const { itemLabel, itemValue, deleteKeys } = this.props;
    if (deleteKeys !== nextProps.deleteKeys || itemLabel !== nextProps.itemLabel || itemValue !== nextProps.itemValue) {
      this._deleteKeys = this._getDeleteKeys(nextProps);
    }

    if (this.props.value !== nextProps.value || this.props.menuItems !== nextProps.menuItems) {
      this.setState(this._getActive(nextProps, this.state));
    }
  }

  /**
   * Gets the current value from the select field. This is used when you have an uncontrolled
   * text field and simply need the value from a ref callback.
   *
   * @return {String} the select field's value
   */
  get value() {
    return getField(this.props, this.state, 'value');
  }

  _getItemPart(item, itemLabel, itemValue, preferLabel = false) {
    const type = typeof item;
    if (type === 'number' || type === 'string') {
      return item;
    } else if (type === 'object') {
      const key1 = preferLabel ? itemLabel : itemValue;
      const key2 = preferLabel ? itemValue : itemLabel;
      return typeof item[key1] !== 'undefined' ? item[key1] : item[key2];
    }

    return '';
  }

  _getDeleteKeys({ itemLabel, itemValue, itemProps, deleteKeys }) {
    const keys = [itemLabel, itemValue, itemProps];
    if (deleteKeys) {
      return keys.concat(Array.isArray(deleteKeys) ? deleteKeys : [deleteKeys]);
    }

    return keys;
  }

  _getActiveItemLabel = (item, value, itemLabel, itemValue) => {
    const v = this._getItemPart(item, itemLabel, itemValue);
    const label = this._getItemPart(item, itemLabel, itemValue, true);

    return v === value || v === parseInt(value, 10) ? label : '';
  };

  _getActive = (props, state) => {
    let activeLabel = '';
    let activeIndex = -1;
    const value = getField(props, state, 'value');
    if (isValued(value)) {
      const { menuItems, itemLabel, itemValue } = props;

      menuItems.some((item, index) => {
        activeLabel = this._getActiveItemLabel(item, value, itemLabel, itemValue);
        const found = isValued(activeLabel);
        if (found) {
          activeIndex = index;
        }

        return found;
      });
    }

    return { activeLabel, activeIndex };
  };

  _attemptItemFocus = (index) => {
    if (index === -1) {
      return;
    }

    const item = this._items[index];
    if (item) {
      item.focus();
    }
  };

  _setListItem = (item) => {
    if (!item) {
      return;
    }

    if (item.props.active) {
      this._activeItem = findDOMNode(item);
      item.focus();

      if (!this.state.listProps[ARIA_ACTIVE]) {
        this.setState({ listProps: { ...this.state.listProps, [ARIA_ACTIVE]: `${this.props.id}-options-active` } });
      }
    }

    this._items.push(item);
  };

  _scrollActiveIntoView = (listRef) => {
    if (listRef === null) {
      this._items = [];
      return;
    } else if (!this._activeItem) {
      return;
    }

    const list = findDOMNode(listRef);
    const { offsetTop } = this._activeItem;
    list.scrollTop = offsetTop > MOBILE_LIST_PADDING ? offsetTop : 0;
  };

  _toggle = (e) => {
    const { isOpen, onVisibilityChange, onMenuToggle } = this.props;
    const visible = !(typeof isOpen !== 'undefined' ? isOpen : getField(this.props, this.state, 'visible'));
    if (onMenuToggle || onVisibilityChange) {
      (onMenuToggle || onVisibilityChange)(visible, e);
    }

    let state;
    if (typeof isOpen === 'undefined' && typeof this.props.visible === 'undefined') {
      state = { visible };
    }

    if (state) {
      this.setState(state);
    }
  };

  _close = (e) => {
    if (this.props.onVisibilityChange) {
      this.props.onVisibilityChange(false, e);
    }

    if (e.type === 'keydown' && this._field) {
      this._field.focus();
    }

    let state;
    if (this.props.required && !getField(this.props, this.state, 'value')) {
      state = { error: true };
    }

    if (typeof this.props.visible === 'undefined') {
      state = state || {};
      state.visible = false;
    }

    if (state) {
      this.setState(state);
    }
  };

  _handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    const { isOpen } = this.props;
    const visible = typeof isOpen !== 'undefined' ? isOpen : getField(this.props, this.state, 'visible');
    if (visible && this._container) {
      let node = e.target;
      while (this._container.contains(node)) {
        if (node.dataset && typeof node.dataset.id !== 'undefined') {
          const { id, value } = node.dataset;
          this._selectItem(parseInt(id, 10), value, e);
          return;
        }

        node = node.parentNode;
      }
    }
  };

  _selectItem = (dataIndex, dataValue, e) => {
    const { required, menuItems, itemLabel, itemValue, onChange, id, name } = this.props;
    const value = this._getItemPart(menuItems[dataIndex], itemLabel, itemValue);
    const prevValue = getField(this.props, this.state, 'value');
    if (prevValue !== value && onChange) {
      onChange(value, dataIndex, e, { id, name, value });
    }

    const state = {
      ...this._getActive({ value, itemLabel, itemValue, menuItems }, {}),
      error: !!required && !value && value !== 0,
    };

    if (typeof this.props.value === 'undefined') {
      state.value = value;
    }

    this.setState(state);
  };

  _handleFocus = (e) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    this.setState({ active: true });
  };

  _handleBlur = (e) => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    let { error } = this.state;
    const { isOpen, required } = this.props;
    const visible = typeof isOpen !== 'undefined' ? isOpen : getField(this.props, this.state, 'visible');
    const value = getField(this.props, this.state, 'value');

    if (required && !visible) {
      error = !value;
    }

    this.setState({ active: false, error });
  };

  _handleKeyDown = (e) => {
    const { isOpen, onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(e);
    }

    const key = e.which || e.keyCode;
    const up = key === UP;
    const down = key === DOWN;
    const visible = typeof isOpen !== 'undefined' ? isOpen : getField(this.props, this.state, 'visible');

    if (up || down) {
      e.preventDefault();

      if (!visible) {
        this._toggle(e);
        return;
      }

      this._advanceFocus(up);
    } else if (!visible && handleKeyboardAccessibility(e, this._toggle, true, true)) {
      return;
    } else if (visible && (key === ESC || key === TAB)) {
      if (this._field && key === ESC) {
        this._field.focus();
      }

      this._close(e);
      return;
    } else {
      this._selectItemByLetter(key, e);
    }
  };

  _advanceFocus = (decrement) => {
    const { position, stripActiveItem } = this.props;
    const { activeIndex } = this.state;

    const below = position === SelectField.Positions.BELOW;
    const value = getField(this.props, this.state, 'value');
    const valued = isValued(value);
    const itemStripped = (typeof stripActiveItem !== 'undefined' ? stripActiveItem : below) && valued;

    // If the select field is positioned below and there is no value, need to increment the last index
    // by one since this select field removes the active item. Need to account for that here when there
    // is no value.
    const lastIndex = this._items.length - (itemStripped ? 0 : 1);
    if ((decrement && activeIndex <= 0) || (!decrement && activeIndex >= lastIndex)) {
      return;
    }

    const nextIndex = Math.max(-1, Math.min(lastIndex, activeIndex + (decrement ? -1 : 1)));
    if (nextIndex === activeIndex) {
      return;
    }

    this._attemptItemFocus(nextIndex - (itemStripped ? 1 : 0));
    this.setState({ activeIndex: nextIndex });
  };

  _selectItemByLetter = (key, e) => {
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
  };

  _selectFirstMatch = (letter, e) => {
    const { menuItems, itemLabel, itemValue, isOpen, onChange, id, name } = this.props;
    const { lastSearch } = this.state;
    let match = -1;
    const search = `${lastSearch || ''}${letter}`.toUpperCase();
    menuItems.some((item, index) => {
      if (item && typeof item === 'object' && item.disabled) {
        return false;
      }

      const label = String(this._getItemPart(item, itemLabel, itemValue, true));
      if (label && label.toUpperCase().replace(/\s/g, '').indexOf(search) === 0) {
        match = index;
      }

      return match > -1;
    });

    const state = {
      match,
      lastSearch: search,
    };

    if (match !== -1) {
      const activeItem = menuItems[match];
      state.activeLabel = this._getItemPart(activeItem, itemLabel, itemValue, true);
      state.activeIndex = match;

      const visible = typeof isOpen !== 'undefined' ? isOpen : getField(this.props, this.state, 'visible');
      if (visible) {
        if (state.match !== this.state.match) {
          this._attemptItemFocus(state.activeIndex);
        }
      } else {
        const value = this._getItemPart(activeItem, itemLabel, itemValue);
        const prevValue = getField(this.props, this.state, 'value');

        if (value !== prevValue && onChange) {
          onChange(value, match, e, { id, name, value });
        }

        if (typeof this.props.value === 'undefined') {
          state.value = value;
        }
      }
    }

    this.setState(state);
  };

  _reduceItems = (items, item, i) => {
    if (item === null) {
      return items;
    } else if (React.isValidElement(item)) {
      items.push(item);
      return items;
    }

    const { getItemProps, id, itemLabel, itemProps, itemValue, position, stripActiveItem } = this.props;
    const below = position === SelectField.Positions.BELOW;
    const value = getField(this.props, this.state, 'value');

    const dataValue = this._getItemPart(item, itemLabel, itemValue);
    const primaryText = this._getItemPart(item, itemLabel, itemValue, true);

    const active = dataValue === value || dataValue === parseInt(value, 10);
    const stripped = (typeof stripActiveItem !== 'undefined' ? stripActiveItem : below) && active;
    if (!stripped) {
      const objectType = typeof item === 'object';
      const props = objectType ? omit(item, this._deleteKeys) : {};
      const disabled = props.disabled || false;
      props.ref = disabled ? null : this._setListItem;
      props.id = active ? `${id}-options-active` : null;
      props.active = active;
      props.tabIndex = -1;
      props.primaryText = primaryText;
      props.key = item.key || dataValue;
      props.role = 'option';
      props['data-id'] = disabled ? null : i;
      props['data-value'] = disabled ? null : dataValue;

      const getProps = (objectType && item[itemProps]) || getItemProps;
      if (typeof getProps === 'function') {
        Object.assign(props, getProps({
          index: i,
          active,
          disabled,
          itemValue,
          value,
          props,
          item,
          field: this,
        }));
      }

      items.push(<ListItem {...props} />);
    }

    return items;
  };

  render() {
    const {
      id,
      style,
      className,
      listStyle,
      listClassName,
      toggleStyle,
      toggleClassName,
      menuItems,
      anchor,
      belowAnchor,
      fixedTo,
      position,
      xThreshold,
      yThreshold,
      listZDepth,
      listInline,
      listHeightRestricted,
      block,
      centered,
      sameWidth,
      fullWidth,
      repositionOnScroll,
      repositionOnResize,
      simplifiedMenu,
      minLeft,
      minRight,
      minBottom,
      fillViewportWidth,
      fillViewportHeight,
      menuTransitionName,
      menuTransitionEnterTimeout,
      menuTransitionLeaveTimeout,
      isOpen, // deprecated
      /* eslint-disable no-unused-vars */
      error: propError,
      menuId: propMenuId,
      visible: propVisible,
      itemLabel,
      itemValue,
      itemProps,
      getItemProps,
      defaultValue,
      defaultVisible,
      onClick,
      onKeyDown,
      onVisibilityChange,
      deleteKeys,
      stripActiveItem,
      keyboardMatchingTimeout,

      // Deprecated
      defaultOpen,
      initiallyOpen,
      onMenuToggle,
      stretchList,
      menuStyle,
      menuClassName,
      floatingLabel,
      noAutoAdjust,
      adjustMinWidth,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let { menuId, listId, error } = this.props;
    error = error || this.state.error;
    if (!menuId) {
      menuId = `${id}-menu`;
    }

    if (!listId) {
      listId = `${menuId}-options`;
    }

    const { listProps, active, activeLabel } = this.state;
    const below = position === SelectField.Positions.BELOW;
    const visible = typeof isOpen !== 'undefined' ? isOpen : getField(this.props, this.state, 'visible');
    const value = getField(this.props, this.state, 'value');
    const useSameWidth = typeof sameWidth !== 'undefined' ? sameWidth : below;

    const toggle = (
      <SelectFieldToggle
        {...props}
        id={id}
        style={toggleStyle}
        className={toggleClassName}
        visible={visible}
        value={value}
        below={below}
        error={error}
        active={active}
        activeLabel={activeLabel}
        onClick={this._toggle}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
      />
    );

    return (
      <Menu
        id={menuId}
        listId={listId}
        style={style}
        className={cn('md-menu--select-field', className)}
        listProps={listProps}
        listStyle={listStyle}
        listClassName={listClassName}
        toggle={toggle}
        visible={visible}
        onClose={this._close}
        onKeyDown={this._handleKeyDown}
        onClick={this._handleClick}
        simplified={simplifiedMenu}
        anchor={anchor}
        belowAnchor={belowAnchor}
        fixedTo={fixedTo}
        position={position}
        xThreshold={xThreshold}
        yThreshold={yThreshold}
        listZDepth={listZDepth}
        listInline={listInline}
        listHeightRestricted={listHeightRestricted}
        sameWidth={useSameWidth}
        block={block}
        centered={centered}
        fullWidth={fullWidth}
        minLeft={minLeft}
        minRight={minRight}
        minBottom={minBottom}
        fillViewportWidth={fillViewportWidth}
        fillViewportHeight={fillViewportHeight}
        repositionOnScroll={repositionOnScroll}
        repositionOnResize={repositionOnResize}
        transitionName={menuTransitionName}
        transitionEnterTimeout={menuTransitionEnterTimeout}
        transitionLeaveTimeout={menuTransitionLeaveTimeout}
      >
        {menuItems.reduce(this._reduceItems, [])}
      </Menu>
    );
  }
}
