import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';
import deprecated from 'react-prop-types/lib/deprecated';

import Collapser from '../FontIcons/Collapser';
import Paper from '../Papers';
import Menu from '../Menus/Menu';
import Positions from '../Menus/Positions';
import List from '../Lists/List';
import ListItem from '../Lists/ListItem';
import { UP, DOWN, ENTER, TAB, ZERO, NINE, KEYPAD_ZERO, KEYPAD_NINE } from '../constants/keyCodes';
import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import isBetween from '../utils/NumberUtils/isBetween';

import SelectFieldInput from './SelectFieldInput';

const MOBILE_LIST_PADDING = 8;
const SelectFieldPositions = Object.assign({}, Positions);
delete SelectFieldPositions.BOTTOM_RIGHT;
delete SelectFieldPositions.BOTTOM_LEFt;

/* eslint-disable max-len */

/**
 * The `SelectField` is a component for a material design styled `select` component with
 * built-in accessibility. The [Listbox Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_listbox_role)
 * was used to create this component.
 */
export default class SelectField extends PureComponent {
  /* eslint-enable max-len */
  static Positions = SelectFieldPositions;
  static propTypes = {
    /**
     * An optional style to apply to the text field.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the text field.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the main `Menu` component.
     */
    menuStyle: PropTypes.object,

    /**
     * An optional className to apply to the main `Menu` component.
     */
    menuClassName: PropTypes.string,

    /**
     * Boolean if the text field in the select field should be displayed as a `block`.
     */
    block: PropTypes.bool,

    /**
     * An optional style to apply to the list that gets created when the `SelectField`
     * is open.
     */
    listStyle: PropTypes.object,

    /**
     * An optional className to apply to the list that gets created when the `SelectField`
     * is open.
     */
    listClassName: PropTypes.string,

    /**
     * An optional style to apply to the text field's input.
     */
    inputStyle: PropTypes.object,

    /**
     * An optional className to apply to the text field's input.
     */
    inputClassName: PropTypes.string,

    /**
     * An id to use for the select field. This is used for multiple parts of accessibility.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * An optional floating label to display with the `SelectField`. The `label` prop can not
     * be used when setting the `position` to `SelectField.Positions.BELOW`. You must use the
     * `placeholder` prop instead.
     */
    label: (props, propName, componentName, location, propFullName, ...args) => {
      const componentNameSafe = componentName || '<<anonymous>>';
      const propFullNameSafe = propFullName || propName;
      if (props.position === Positions.BELOW && typeof props[propName] !== 'undefined') {
        return new Error(
          `You provided a \`${propFullNameSafe}\` ${location} to the ${componentNameSafe} when ` +
          'the `position` was set to `SelectField.Positions.BELOW`. Only the `placeholder` ' +
          'prop may be used with this position.'
        );
      }

      return PropTypes.node(props, propName, componentName, location, propFullName, ...args);
    },

    /**
     * An optional placeholder to display with the `SelectField`.
     */
    placeholder: PropTypes.string,

    /**
     * An optional default value for the text field.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional value for the text field. This will make the `SelectField` controlled
     * and require the `onChange` prop to be defined.
     */
    value: controlled(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]), 'onChange'),

    /**
     * Boolean if the `SelectField` is open by default.
     */
    defaultOpen: PropTypes.bool,

    /**
     * An optional function to call when the select field's container is clicked.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the 'keydown' event is triggered anywhere
     * in the select field's container.
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional boolean if the select field is currently open and displaying the
     * menu items. If this prop is set, it makes the select field controlled and requires
     * the `onMenuToggle` prop to be defined.
     */
    isOpen: controlled(PropTypes.bool, 'onMenuToggle'),

    /**
     * An optional function to call when the select field's `isOpen` state changes.
     * The callback will include the next state of `isOpen` and a click event.
     *
     * ```js
     * onMenuToggle(true, event);
     * ```
     */
    onMenuToggle: PropTypes.func,

    /**
     * An optional function to call when the select field's value changes. This will
     * be triggered any time a user:
     * - clicks a menu item
     * - presses enter or space on a menu item
     * - presses a letter or number while the menu is closed and has focus
     *
     * The callback will include the selected value, the selected index, and the event.
     *
     * ```js
     * onChange(value, index, event);
     * ```
     */
    onChange: PropTypes.func,

    /**
     * An optional menu item key to use to extract the label/value to display in a `ListItem`.
     * This is only used if the `menuItem` is an object.
     */
    itemLabel: PropTypes.string,

    /**
     * A list of menu items to display when the select field is open.
     */
    menuItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ])).isRequired,

    /**
     * The position the menu appears from.
     */
    position: PropTypes.oneOf([
      SelectField.Positions.TOP_LEFT,
      SelectField.Positions.TOP_RIGHT,
      SelectField.Positions.BELOW,
    ]),

    /**
     * Boolean if the select field is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Any children used to display the icon in the select field.
     */
    iconChildren: PropTypes.node,

    /**
     * An optional icon className used to display the icon in the select field.
     */
    iconClassName: PropTypes.string,

    /**
     * An optional size for the select field's input tag.
     *
     * > Note: The size will automatically be determined if the `noAutoAdust` prop is not
     * false. However, this prop will have precendence over the automatic size calculation.
     */
    size: PropTypes.number,

    /**
     * The direction that the text field divider expands from when the text field
     * gains focus. If this is omitted, it will automatically match the direction
     * of the `position` prop so that the line expands from the same direction
     * as the menu.
     */
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * Boolean if the select field should not attempt to automatically calculate the best
     * size for the select field's text field.
     */
    noAutoAdjust: PropTypes.bool,

    /**
     * The amount of time(ms) that should be used before the matching of menu items is reset.
     * When using a keyboard, a user will be able to keep typing to get the best match of items.
     * When the user stops typing for this duration, the matching will be reset, and the user
     * can start matching with different letters.
     */
    keyboardMatchingTimeout: PropTypes.number.isRequired,

    /**
     * Boolean if the text field should be a padded block when the `block` prop is true.
     */
    paddedBlock: PropTypes.bool,

    /**
     * Boolean if the SelectField should span the entire width.
     */
    fullWidth: PropTypes.bool,

    initiallyOpen: deprecated(PropTypes.bool, 'Use `defaultOpen` instead'),
  };

  static defaultProps = {
    itemLabel: 'label',
    fullWidth: true,
    menuItems: [],
    keyboardMatchingTimeout: 1000,
    iconChildren: 'arrow_drop_down',
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      value: props.defaultValue || '',
      listStyle: null,
      activeIndex: this._getActiveIndex(props, { value: props.defaultValue }),
      match: -1,
      lastSearch: null,
    };

    this.focus = this.focus.bind(this);
    this._setMenu = this._setMenu.bind(this);
    this._setField = this._setField.bind(this);
    this._positionList = this._positionList.bind(this);
    this._setMenuItem = this._setMenuItem.bind(this);
    this._toggleMenu = this._toggleMenu.bind(this);
    this._selectItem = this._selectItem.bind(this);
    this._getSelectedValue = this._getSelectedValue.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._mapToListItem = this._mapToListItem.bind(this);
    this._highlightNextItem = this._highlightNextItem.bind(this);
    this._selectItemByLetter = this._selectItemByLetter.bind(this);
    this._selectFirstMatch = this._selectFirstMatch.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    const value = getField(this.props, this.state, 'value');
    const nextValue = getField(nextProps, nextState, 'value');

    if (value === nextValue) {
      return;
    }

    this._timeout = setTimeout(() => {
      this._timeout = setTimeout(() => {
        this._timeout = null;

        this.setState({ droppingClassName: null });
      }, 300);

      this.setState({ droppingClassName: 'md-drop-enter md-drop-enter-active' });
    }, 1);

    this.setState({
      activeIndex: this._getActiveIndex(nextProps, nextState),
      droppingClassName: 'md-drop-enter',
    });
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    if (this._matchingTimeout) {
      clearTimeout(this._matchingTimeout);
    }
  }

  /**
   * A simple function for focusing the `SelectField` via refs.
   *
   * ```js
   * <SelectField ref={field => field.focus(); } ... />
   * ```
   */
  focus() {
    if (this._field) {
      this._field.focus();
    }
  }

  /**
   * A list of `ListItem` that gets repopulated each time the menu items appear.
   * This is used so that the `focus` method can be accessed.
   */
  _items = [];

  /**
   * The current active item. This will either be the index of the active item (when
   * the position is below) or a ref to a `ListItem`. This will be set each time the
   * menu items appear.
   */
  _activeItem = null;

  /**
   * Finds the current active index for the select field by searching the `menuItems` for
   * a label that equals the current `value`. If there is no value or match, `-1` will be
   * returned.
   *
   * @param {Object} props - The props object to use.
   * @param {Object} state - The state object to use.
   * @return {number} the active index or -1.
   */
  _getActiveIndex(props, state) {
    const value = getField(props, state, 'value');
    if (!value) {
      return -1;
    }

    const { itemLabel, menuItems } = props;
    let index = -1;
    menuItems.some((item, i) => {
      const found = (typeof item === 'object' ? item[itemLabel] : item) === value;
      if (found) {
        index = i;
      }

      return found;
    });

    return index;
  }
  _setMenu(menu) {
    if (menu !== null) {
      this._menu = findDOMNode(menu);
    }
  }

  _setField(field) {
    if (field !== null) {
      // Since the field is in the `injectInk` HOC, we need to actually
      // get the field to access the `TextField.focus()` method.
      this._field = field.getComposedComponent();
    }
  }

  /**
   * This is called whenever the `List` component gets rendered or removed. When it
   * is rendered and there is currently a value for the select field, the scroll position
   * in the list will be set to be at the active item. If the menu is not positioned
   * below the text field, the positioning of the list itself will be modified so that
   * the current item is positioned over text field.
   */
  _positionList(listRef) {
    if (listRef === null) {
      this._items = [];
      return;
    } else if (!this._activeItem) {
      return;
    }

    const list = findDOMNode(listRef);

    const { position, menuItems } = this.props;
    if (position === SelectField.Positions.BELOW) { // only modify scroll distance when below
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

  /**
   * This is the ref callback for each `ListItem` in the menu items. When being mounted,
   * it will check if it is the currently active item and then focus itself and generate
   * some ink.
   *
   * It will also add itself to the `this._items` array so it can optionally be focused
   * via keypress.
   */
  _setMenuItem(item) {
    if (!item) {
      return;
    }

    const { primaryText } = item.props;
    if (getField(this.props, this.state, 'value') === primaryText) {
      this._activeItem = findDOMNode(item);
      item.focus();
    }

    this._items.push(item);
  }

  /**
   * Attempts to focus a `ListItem` based on an index.
   *
   * @param {number} index - the index of the item to focus.
   */
  _focusItem(index) {
    if (index === -1) {
      return;
    }

    const item = this._items[index];
    if (item) {
      item.focus();
    }
  }

  _toggleMenu(e) {
    const isOpen = !getField(this.props, this.state, 'isOpen');
    if (this.props.onMenuToggle) {
      this.props.onMenuToggle(isOpen, e);
    }

    if (typeof this.props.isOpen === 'undefined') {
      this.setState({ isOpen });
    }
  }

  _handleClose(e) {
    if (this.props.onMenuToggle) {
      this.props.onMenuToggle(false, e);
    }

    if (typeof this.props.isOpen === 'undefined') {
      this.setState({ isOpen: false });
    }
  }

  _getSelectedValue(index) {
    const { itemLabel } = this.props;
    const menuItems = this.props.menuItems.slice();
    if (typeof this._activeItem === 'number') {
      menuItems.splice(this._activeItem, 1);
    }

    const item = menuItems[index];

    return typeof item === 'object' && item ? item[itemLabel] : item;
  }

  /**
   * Highlights the next menu item when navigating with the up and down keyboard arrows.
   */
  _highlightNextItem(e, decrement) {
    // Prevent page scrolling
    e.preventDefault();

    const { activeIndex } = this.state;
    const lastItemIndex = this.props.menuItems.length - 1;

    if (decrement && activeIndex === -1 || !decrement && activeIndex >= lastItemIndex) {
      return;
    }

    const nextIndex = Math.max(0, Math.min(lastItemIndex, activeIndex + (decrement ? -1 : 1)));
    if (nextIndex !== this.state.activeIndex) {
      this._focusItem(nextIndex);
      this.setState({ activeIndex: nextIndex });
    }
  }

  _selectFirstMatch(e, letter) {
    const search = `${this.state.lastSearch || ''}${letter}`;
    const { menuItems, itemLabel } = this.props;
    let match = -1;
    menuItems.some((item, i) => {
      const value = String(typeof item === 'object' && item ? item[itemLabel] : item);
      if (value && value.toUpperCase().indexOf(search) === 0) {
        match = i;
      }

      return match > -1;
    });

    const state = {
      match,
      lastSearch: search,
      activeIndex: match,
    };

    if (getField(this.props, this.state, 'isOpen')) {
      if (state.match !== this.state.match) {
        this._focusItem(state.activeIndex);
      }
    } else {
      const value = this._getSelectedValue(state.activeIndex);
      if (this.props.onChange) {
        this.props.onChange(value, state.activeIndex, e);
      }

      if (typeof this.props.value === 'undefined') {
        state.value = value;
      }
    }

    this.setState(state);
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

    this._selectFirstMatch(e, letter);
  }

  _handleClick(e) {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    let node = e.target;
    while (node && node.parentNode) {
      const { className } = node;
      if (className.match(/md-text-field/)) {
        this._toggleMenu(e);
        return;
      } else if (className.match(/md-list-tile/)) {
        const items = Array.prototype.slice.call(this._menu.querySelectorAll('.md-list-tile'));
        this._selectItem(e, items.indexOf(node));
        return;
      }

      node = node.parentNode;
    }
  }

  _handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    const key = e.which || e.keyCode;
    switch (key) {
      case UP:
      case DOWN:
        this._highlightNextItem(e, key === UP);
        break;
      case ENTER:
        this._handleSelectionKeypress(e);
        break;
      case TAB:
        this._handleClose(e);
        break;
      default:
        this._selectItemByLetter(e, key);
    }
  }

  _handleSelectionKeypress(e) {
    const { classList } = e.target;
    if (classList.contains('md-text-field')) {
      this._toggleMenu(e);
    } else if (classList.contains('md-list-tile')) {
      this._selectItem(e, this.state.activeIndex);
    }
  }

  _selectItem(e, index) {
    const value = this._getSelectedValue(index);

    if (this.props.onChange) {
      this.props.onChange(value, index, e);
    }

    const state = { activeIndex: index };
    if (typeof this.props.isOpen === 'undefined' && e.type !== 'click') {
      state.isOpen = false;
    }

    if (typeof this.props.value === 'undefined') {
      state.value = value;
    }

    this.focus();
    this.setState(state);
  }

  _mapToListItem(item, i) {
    const { id, itemLabel, position } = this.props;
    const value = getField(this.props, this.state, 'value');

    const props = {};
    switch (typeof item) {
      case 'string':
      case 'number':
        props.primaryText = item;
        break;
      case 'object':
        props.primaryText = item[itemLabel];
        break;
      default:
        return null;
    }

    const active = value === props.primaryText;

    if (active && position === SelectField.Positions.BELOW) {
      this._activeItem = i;
      return null;
    }

    return (
      <ListItem
        {...props}
        ref={this._setMenuItem}
        active={active}
        tabIndex={-1}
        key={props.key || i}
        role="option"
        id={active && `${id}Active`}
      />
    );
  }

  render() {
    const { droppingClassName } = this.state;
    const {
      id,
      style,
      className,
      menuStyle,
      menuClassName,
      listStyle,
      listClassName,
      inputStyle,
      inputClassName,
      label,
      placeholder,
      disabled,
      position,
      menuItems,
      iconChildren,
      iconClassName,
      block,
      paddedBlock,
      fullWidth,
      size,
      ...props,
    } = this.props;
    delete props.value;
    delete props.defaultValue;
    delete props.defaultOpen;
    delete props.initiallyOpen;
    delete props.itemLabel;
    delete props.noAutoAdjust;
    delete props.lineDirection;
    delete props.keyboardMatchingTimeout;

    const below = position === SelectField.Positions.BELOW;
    const value = getField(this.props, this.state, 'value');
    const isOpen = getField(this.props, this.state, 'isOpen');

    let { lineDirection } = this.props;
    if (!lineDirection && !below) {
      lineDirection = SelectField.Positions.TOP_LEFT === position ? 'left' : 'right';
    }

    const toggle = (
      <SelectFieldInput
        id={id}
        size={size}
        ref={this._setField}
        key="select-field"
        label={label}
        placeholder={placeholder}
        block={block || below}
        paddedBlock={block && paddedBlock}
        value={value}
        disabled={disabled}
        inkDisabled={!below}
        style={style}
        className={cn('md-select-field-container', {
          'md-pointer--hover': !disabled,
          'md-select-field-container--below': below,
        }, className)}
        inputStyle={inputStyle}
        inputClassName={cn(droppingClassName, inputClassName)}
        fullWidth={fullWidth}
        inlineIndicator={
          <Collapser
            disabled={disabled}
            flipped={isOpen && below}
            iconClassName={iconClassName}
          >
            {iconChildren}
          </Collapser>
        }
      />
    );

    const listId = `${id}Listbox`;
    const items = menuItems.map(this._mapToListItem).filter(item => !!item);
    return (
      <Menu
        {...props}
        id={`${id}Menu`}
        listId={listId}
        component={Paper}
        zDepth={below && isOpen ? 2 : 0}
        ref={this._setMenu}
        style={menuStyle}
        className={menuClassName}
        isOpen={isOpen}
        onClose={this._handleClose}
        toggle={toggle}
        onClick={this._handleClick}
        onKeyDown={this._handleKeyDown}
        position={position}
        fullWidth={fullWidth}
        contained
      >
        <List
          id={listId}
          ref={this._positionList}
          role="listbox"
          aria-activedescendant={value ? `${id}Active` : null}
          style={Object.assign({}, listStyle, this.state.listStyle)}
          className={listClassName}
        >
          {items}
        </List>
      </Menu>
    );
  }
}
