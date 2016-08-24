import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { isObject, isBetween } from '../utils';
import { SPACE, TAB, ENTER, UP, DOWN, ZERO, NINE, KEYPAD_ZERO, KEYPAD_NINE } from '../constants/keyCodes';

import ListItem from '../Lists/ListItem';
import FontIcon from '../FontIcons';
import Menu from '../Menus';
import SelectFieldControl from './SelectFieldControl';

const LIST_PADDING = 8;

/**
 * A SelectField is a material design inspired `<select>` component.
 */
export default class SelectField extends PureComponent {
  static Positions = {
    TOP_LEFT: Menu.Positions.TOP_LEFT,
    TOP_RIGHT: Menu.Positions.TOP_RIGHT,
    BELOW: Menu.Positions.BELOW,
  };

  static propTypes = {
    /**
     * An optional style to apply to the text field's input in the select field.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the text field's input in the select field.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the menu list.
     */
    listStyle: PropTypes.object,

    /**
     * An optional className to apply to the menu list.
     */
    listClassName: PropTypes.string,

    /**
     * An optional style to apply to the menuc ontainer that holds the list
     * of menu items.
     */
    menuStyle: PropTypes.object,

    /**
     * An optional className to apply to the menu container that holds
     * the list of menu items.
     */
    menuClassName: PropTypes.string,

    /**
     * A boolean if the select field is open by default.
     */
    initiallyOpen: PropTypes.bool,

    /**
     * A boolean if the text field should have a floating label instead of
     * an inline label.
     */
    floatingLabel: PropTypes.bool,

    /**
     * The label to apply to the text field.
     */
    label: PropTypes.string,

    /**
     * An optional key to use to extract a `menuItem`'s label if the
     * `menuItems` prop is an array of objects.
     */
    itemLabel: PropTypes.string,

    /**
     * An optional value to convert the select field into a controlled component.
     * This will be the displayed value in the text field.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    /**
     * The defaultValue for the select field.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    /**
     * A list of items to display in the opened menu. When a new value is clicked,
     * the entire menuItem will be returned. If the menu item is an object, you will
     * need to define the correct `itemLabel` so it displays correctly in the menu.
     */
    menuItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ])).isRequired,

    /**
     * An optional function to call select field change. It is called with `(newlySelectedMenuItem, changeEvent)`.
     * If this a controlled component, you will manually need to convert the `newlySelectedMenuItem`'s value if
     * it is an object so that the `value` prop is a string or number.
     */
    onChange: PropTypes.func,

    /**
     * An optional function to call when the text field is clicked.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the text field has focus and a key is pressed.
     */
    onKeyDown: PropTypes.func,

    /**
     * The position that the menu should appear from. This should be one of:
     *
     * ```js
     * SelectField.Positions.TOP_LEFT,
     * SelectField.Positions.TOP_RIGHT,
     * SelectField.Positions.BELOW
     * ```
     */
    position: PropTypes.oneOf([
      SelectField.Positions.TOP_LEFT,
      SelectField.Positions.TOP_RIGHT,
      SelectField.Positions.BELOW,
    ]),

    /**
     * Boolean if the drop down menu should not automatically attempt to change the top position to match a
     * selected item. This should really just be used if the opened menu expands past the top of the screen.
     */
    noAutoAdjust: PropTypes.bool,

    /**
     * Boolean if the select field is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * The icon className for the dropdown indicator.
     */
    iconClassName: PropTypes.string.isRequired,

    /**
     * The icon children to use for the dropdown indicator.
     */
    iconChildren: PropTypes.node,

    /**
     * Boolean if the this select field should span the full width of a parent
     */
    fullWidth: PropTypes.bool,

    /**
     * Boolean if the select field should automatically increase it's text field's
     * min width to the max size of it's label or placeholder text.
     */
    adjustMinWidth: PropTypes.bool,
  };

  static defaultProps = {
    initiallyOpen: false,
    floatingLabel: false,
    itemLabel: 'label',
    defaultValue: '',
    menuItems: [],
    iconClassName: 'material-icons',
    iconChildren: 'arrow_drop_down',
    noAutoAdjust: false,
    adjustMinWidth: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: props.initiallyOpen,
      focused: props.initiallyOpen,
      value: props.defaultValue,
      size: this._calcSize(props),
      activeIndex: this._getActiveIndex(props, { value: props.defaultValue }),
    };

    this._close = this._close.bind(this);
    this._focus = this._focus.bind(this);
    this._toggle = this._toggle.bind(this);
    this._selectItem = this._selectItem.bind(this);
    this._getListItem = this._getListItem.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleItemClick = this._handleItemClick.bind(this);
    this._handleItemIncrement = this._handleItemIncrement.bind(this);
    this._handleContainerClick = this._handleContainerClick.bind(this);
    this._getActiveIndex = this._getActiveIndex.bind(this);
    this._getAnimatedNewValueState = this._getAnimatedNewValueState.bind(this);
    this._attemptCodeFocus = this._attemptCodeFocus.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    let state;
    if (this._getValue(this.props, this.state) !== this._getValue(nextProps, nextState)) {
      state = this.state.open && !nextState.open ? this._getAnimatedNewValueState() : {};
      state.activeIndex = this._getActiveIndex(nextProps, nextState);
    }

    const { menuItems } = this.props;
    if (menuItems !== nextProps.menuItems || menuItems.length !== nextProps.menuItems.length) {
      state = state || {};
      state.size = this._calcSize(nextProps);
    }

    if (state) {
      this.setState(state);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { position, noAutoAdjust } = this.props;
    const { open } = this.state;
    if (!open || open === prevState.open || noAutoAdjust) { return; }

    if (SelectField.Positions.BELOW === position) {
      const list = findDOMNode(this).querySelector('.md-list');
      const scroll = this._getListItem().offsetTop;
      list.scrollTop = scroll <= LIST_PADDING ? 0 : scroll;
    } else {
      this._calcMenuPosition();
    }
  }

  componentWillUnmount() {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
  }

  /**
   * Finds the longest menu item value to use as the text field's size.to that value.
   * If there is a floating label, it also checks against the label's size so that
   * the floating label won't be clipped
   *
   * @param {Object} props? the props to use
   * @return {Number} the size to use for the text field
   */
  _calcSize({ menuItems, itemLabel, label }) {
    const items = menuItems.slice();
    if (label) {
      items.push(label);
    }

    return items.reduce((prev, curr) => {
      const len = (isObject(curr) ? curr[itemLabel] : curr.toString()).length;
      return Math.max(prev, len);
    }, 0);
  }

  /**
   * Gets the current value for the select field. If the component is controlled,
   * props.value will be returned. Otherwise, it will return the state.value. If the
   * state.value is an object, it will return value[itemLabel].
   *
   * @param {Object} props? the props to use
   * @param {Object} state? the state to use
   * @return {String} the current value to use for the select field.
   */
  _getValue(props, state) {
    if (typeof props.value !== 'undefined') {
      return props.value;
    }

    const { value } = state;
    if (typeof value === 'undefined') {
      return '';
    } else if (isObject(value)) {
      return value[props.itemLabel];
    } else {
      return value;
    }
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
  _selectItem(index, event) {
    const { onChange, menuItems, value, itemLabel } = this.props;
    const item = menuItems[index];
    if (onChange) {
      onChange(item, index, event);
    }

    if (typeof value === 'undefined') {
      return isObject(item) ? item[itemLabel] : item;
    }

    return undefined;
  }

  /**
   * Creates a state object to drop a new value into the text field.
   * @return {Object} a state object with timeouts for animating the new value.
   */
  _getAnimatedNewValueState() {
    return {
      droppingClassName: 'drop-enter',
      timeout: setTimeout(() => {
        this.setState({
          droppingClassName: 'drop-enter drop-enter-active',
          timeout: setTimeout(() => {
            this.setState({ droppingClassName: null, timeout: null });
          }, 300),
        });
      }, 1),
    };
  }

  /**
   * Gets the current activeIndex for the given props and state.
   *
   * @param {Object} props? the props to use
   * @param {Object} state? the state to use
   * @return the activeIndex or -1
   */
  _getActiveIndex(props, state) {
    const value = this._getValue(props, state);
    if (!value) {
      return -1;
    }

    const { itemLabel, menuItems } = props;
    let i = 0;
    menuItems.some((item, j) => {
      const found = (isObject(item) ? item[itemLabel] : item) === value;
      if (found) {
        i = j;
      }

      return found;
    });

    return i;
  }

  /**
   * Gets the first active list item or the first list item if there are no active items.
   *
   * @return {Object} a list item element.
   */
  _getListItem() {
    const node = findDOMNode(this);

    const item = node.querySelector('.md-list-tile.active') || node.querySelector('.md-list-tile');
    if (item) {
      return item.parentNode;
    } else {
      // Isn't found in jest?
      return {};
    }
  }

  /**
   * Sets the transform-origin for the dropdown menu so that the menu will appear
   * from the text field's baseline.
   *
   * Sets the top position to be one list item down if the first item is not selected.
   *
   * Scrolls the current item into view
   */
  _calcMenuPosition() {
    const node = findDOMNode(this);
    const menu = node.querySelector('.md-menu');

    const item = this._getListItem();

    // The height changes based on screen size and if floating label or not.
    const height = node.offsetHeight;
    const diff = item.offsetTop - item.offsetHeight;

    const paddingTop = parseInt(window.getComputedStyle(menu).getPropertyValue('padding-top'), 10);

    const { position } = this.props;
    let transformOrigin;
    let top;
    if (SelectField.Positions.BELOW !== position) {
      const x = SelectField.Positions.TOP_LEFT === position ? '0' : '100%';
      const y = (diff < 0 ? 0 : height) + (height / 2) + paddingTop;
      transformOrigin = `${x} ${y}px`;
    }

    // padding top for mobile (desktop is 4)
    if (diff > LIST_PADDING) {
      menu.scrollTop = diff;
    }

    if (diff > 0) {
      // close enough. It is off by 4px for floating label on desktop
      top = -(item.offsetHeight + paddingTop - (height - item.offsetHeight));
    }

    this.setState({
      listStyle: {
        msTransformOrigin: transformOrigin,
        WebkitTransformOrigin: transformOrigin,
        transformOrigin,
        top,
      },
    });
  }

  _toggle() {
    this.setState({ open: !this.state.open });
  }

  _close() {
    this.setState({ open: false });
  }

  /**
   * Attempts to focus an item with the given index. If the index is not -1
   * or the open list contains that index, the item will be focused.
   */
  _focus(index) {
    if (index === -1) {
      return;
    }

    const item = findDOMNode(this).querySelectorAll('.md-list-tile')[index];
    if (item) {
      item.focus();
    }
  }

  /**
   * Searches the menuItems for an item that starts with the given code. If there is an
   * item that matches, the item will be focused. If the previous code is equal, the
   * next match will be found. If there are no more matches, the first item will be focused
   * again.
   *
   * @param {String} code the number pressed or the capitalized letter pressed.
   * @param {Object} event the keydown event to pass to onChange
   */
  _attemptCodeFocus(code, event) {
    const { menuItems, itemLabel } = this.props;
    const { lastCode, minMatchIndex, maxMatchIndex, activeIndex } = this.state;
    if (code === lastCode) {
      if (minMatchIndex === maxMatchIndex || minMatchIndex === -1 || maxMatchIndex === -1) { return; }
      let index = activeIndex + 1;
      if (index > maxMatchIndex) {
        index = minMatchIndex;
      }

      this._focus(index);
      this.setState({ activeIndex: index, value: this._selectItem(index, event) });
    } else {
      const matches = menuItems.filter(i => {
        const item = `${(isObject(i) ? i[itemLabel] : i)}`;
        return item && item.length ? item.charAt(0).toUpperCase() === code : false;
      });

      const state = {
        lastMatches: matches,
        lastCode: code,
        minMatchIndex: -1,
        maxMatchIndex: -1,
      };

      if (matches.length) {
        state.minMatchIndex = menuItems.indexOf(matches[0]);
        state.maxMatchIndex = menuItems.indexOf(matches[matches.length - 1]);
        state.activeIndex = state.minMatchIndex;

        this._focus(state.activeIndex);
        state.value = this._selectItem(state.activeIndex, event);
      }

      this.setState(state);
    }
  }

  /**
   * Attempts to increment the activeIndex by 1 or -1.
   *
   * @param {Boolean} negative boolean if it should be a decrement
   * @param {Object} event the keydown event
   */
  _handleItemIncrement(negative, event) {
    event.preventDefault();
    const { activeIndex } = this.state;
    const length = this.props.menuItems.length - 1;
    let index;
    if (negative && activeIndex === -1 || !negative && activeIndex >= length) {
      return;
    } else if (negative) {
      index = Math.max(0, activeIndex - 1);
    } else {
      index = Math.min(length, activeIndex + 1);
    }

    this._focus(index);
    this.setState({
      activeIndex: index,
      value: this._selectItem(index, event),
    });
  }

  /**
   * Listens to all key down events in the menu-container. This will improve memory management
   * if there are a ridiculous amount of menu items. One keydown listener vs 10000.
   *
   * @param {Object} e the keydown event
   */
  _handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    const key = e.which || e.keyCode;
    const code = String.fromCharCode(key);
    if (key === UP || key === DOWN) {
      this._handleItemIncrement(key === UP, e);
    } else if (key === TAB) {
      this._close();
    } else if (key === ENTER || key === SPACE) {
      const classList = e.target.classList;
      if (classList.contains('md-text-field')) {
        this._toggle();
      } else if (classList.contains('md-list-tile')) {
        this._handleItemClick(this.state.activeIndex, e);
      }
    } else if (code && code.match(/[A-Z]/)) {
      this._attemptCodeFocus(code, e);
    } else if (isBetween(key, ZERO, NINE) || isBetween(key, KEYPAD_ZERO, KEYPAD_NINE)) {
      const num = key - (isBetween(key, ZERO, NINE) ? ZERO : KEYPAD_ZERO);
      this._attemptCodeFocus(String(num), e);
    }
  }


  /**
   * Closes the menu and calls the onChange function. If it is an
   * uncontrolled component, updates the value in the state.
   */
  _handleItemClick(i, e) {
    this.setState({
      open: false,
      value: this._selectItem(i, e),
    });
  }

  /**
   * Listens to all click events on the menu container. If it is one of the menu items,
   * the item is selected. If the target is the text field, the menu will be toggled.
   *
   * The single event listener is for better performance on giant lists.
   * @param {Object} e the click event.
   */
  _handleContainerClick(e) {
    let node = e.target;
    while (node && node.parentNode) {
      const { className } = node;
      if (className.match(/md-text-field/)) {
        e.preventDefault(); // stops a double click from being triggered. No idea why
        this._toggle();
        return;
      } else if (className.match(/md-list-tile/)) {
        const tiles = Array.prototype.slice.call(findDOMNode(this).querySelectorAll('.md-list-tile'));
        this._handleItemClick(tiles.indexOf(node), e);
        return;
      }

      node = node.parentNode;
    }
  }

  render() {
    const { open, size, activeIndex, listStyle, droppingClassName } = this.state;
    const {
      label,
      floatingLabel,
      menuItems,
      itemLabel,
      position,
      style,
      className,
      listClassName,
      menuClassName,
      iconClassName,
      iconChildren,
      disabled,
      fullWidth,
      adjustMinWidth,
      ...props,
    } = this.props;
    delete props.value;
    delete props.defaultValue;
    delete props.noAutoAdjust;
    delete props.initiallyOpen;

    const displayLabel = this._getValue(this.props, this.state);
    const below = Menu.Positions.BELOW === position;

    const toggle = (
      <SelectFieldControl
        inputStyle={style}
        inputClassName={cn(className, droppingClassName)}
        label={label}
        value={displayLabel}
        floatingLabel={floatingLabel}
        rightIcon={<FontIcon iconClassName={iconClassName}>{iconChildren}</FontIcon>}
        size={size}
        disabled={disabled}
        open={open}
        below={below}
        inkDisabled={!below}
        fullWidth={fullWidth}
        adjustMinWidth={adjustMinWidth}
      />
    );

    let items;
    if (open) {
      items = menuItems.map((item, i) => (
        <ListItem
          tabIndex={-1}
          primaryText={isObject(item) ? item[itemLabel] : item}
          key={item.key || i}
          tileClassName={cn({
            'active': i === activeIndex,
            'select-field-btn-tile': below,
          })}
        />
      ));
    }

    const menuProps = {
      isOpen: open,
      close: this._close,
      className: cn('md-select-field-menu-container', menuClassName, {
        'full-width': fullWidth,
      }),
      listClassName: cn('md-select-field-menu', listClassName, {
        'single-line': !floatingLabel,
        'full-width': fullWidth,
      }),
      toggle,
      listStyle,
      position,
      ...props,
    };

    if (!disabled) {
      menuProps.onClick = this._handleContainerClick;
      menuProps.onKeyDown = this._handleKeyDown;
    }

    return (
      <Menu {...menuProps}>
        {items}
      </Menu>
    );
  }
}
