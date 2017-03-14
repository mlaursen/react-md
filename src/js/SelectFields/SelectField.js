import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { UP, DOWN, ENTER, ESC, TAB, ZERO, NINE, KEYPAD_ZERO, KEYPAD_NINE } from '../constants/keyCodes';
import omit from '../utils/omit';
import getField from '../utils/getField';
import isBetween from '../utils/NumberUtils/isBetween';
import controlled from '../utils/PropTypes/controlled';
import Menu from '../Menus/Menu';
import ListItem from '../Lists/ListItem';

import SelectFieldToggle from './SelectFieldToggle';

const MOBILE_LIST_PADDING = 8;
const VALID_LIST_ITEM_PROPS = Object.keys(ListItem.propTypes);

export default class SelectField extends PureComponent {
  static Positions = Menu.Positions;
  static HorizontalAnchors = Menu.HorizontalAnchors;
  static VerticalAnchors = Menu.VerticalAnchors;

  static propTypes = {
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),
    listId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    menuId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    listStyle: PropTypes.object,
    listClassName: PropTypes.string,
    toggleStyle: PropTypes.object,
    toggleClassName: PropTypes.string,
    inputStyle: PropTypes.object,
    inputClassName: PropTypes.string,
    textFieldStyle: PropTypes.object,
    textFieldClassName: PropTypes.string,
    defaultVisible: PropTypes.bool.isRequired,
    visible: controlled(PropTypes.bool, 'onVisibilityChange', 'defaultVisible'),

    menuItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ])).isRequired,
    keyboardMatchingTimeout: PropTypes.number.isRequired,

    itemLabel: PropTypes.string.isRequired,
    itemValue: PropTypes.string.isRequired,

    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    value: controlled(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]), 'onChange', 'defaultValue'),

    onChange: PropTypes.func,
    onVisibilityChange: PropTypes.func,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.bool,
    errorText: PropTypes.node,
    helpText: PropTypes.node,
    helpOnFocus: PropTypes.bool,

    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,

    anchor: Menu.propTypes.anchor,
    fixedTo: Menu.propTypes.fixedTo,
    position: Menu.propTypes.position,
    xThreshold: PropTypes.number,
    yThreshold: PropTypes.number,
    listInline: PropTypes.bool,
    listZDepth: PropTypes.number,
    listHeightRestricted: PropTypes.bool,
    sameWidth: PropTypes.bool,
    fullWidth: PropTypes.bool,
    block: PropTypes.bool,
    centered: PropTypes.bool,

    transitionName: PropTypes.string.isRequired,
    transitionTime: PropTypes.number.isRequired,
    toolbar: PropTypes.bool,
    stripActiveItem: PropTypes.bool,

    iconChildren: PropTypes.node,
    iconClassName: PropTypes.string,

    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
    defaultOpen: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
    initiallyOpen: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
    onMenuToggle: deprecated(PropTypes.func, 'Use `onVisibilityChange` instead'),
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
    iconChildren: 'arrow_drop_down',
    menuItems: [],
    defaultValue: '',
    defaultVisible: false,
    keyboardMatchingTimeout: 1000,
    transitionName: 'md-drop',
    transitionTime: 300,
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
        'aria-activedescendant': null,
      },
      match: null,
      lastSearch: null,
      value: props.defaultValue,
      visible: props.defaultVisible,
    };

    this._items = [];
    this._activeItem = null;
  }

  componentDidMount() {
    this._container = findDOMNode(this);
    this._field = this._container.querySelector('.md-select-field');
  }

  componentWillReceiveProps(nextProps) {
    const { value, menuItems } = this.props;
    if (value !== nextProps.value || menuItems !== nextProps.menuItems) {
      this.setState(this._getActive(nextProps, this.state));
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { active, listProps } = nextState;
    if (this.state.active !== active) {
      this.setState({
        listProps: {
          ...listProps,
          'aria-activedescendant': active ? `${nextProps.id}-options-active` : null,
        },
      });
    }
  }

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

  _getActiveItemLabel = (item, value, itemLabel, itemValue) => {
    const v = this._getItemPart(item, itemLabel, itemValue);
    const label = this._getItemPart(item, itemLabel, itemValue, true);

    return v === value || v === parseInt(value, 10) ? label : '';
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

  _getActive = (props, state) => {
    let activeLabel = '';
    let activeIndex = -1;
    const value = getField(props, state, 'value');
    if (value || value === 0) {
      const { menuItems, itemLabel, itemValue } = props;

      menuItems.some((item, index) => {
        activeLabel = this._getActiveItemLabel(item, value, itemLabel, itemValue);
        const found = activeLabel || activeLabel === 0;
        if (found) {
          activeIndex = index;
        }

        return found;
      });
    }

    return { activeLabel, activeIndex };
  };

  _setListItem = (item) => {
    if (!item) {
      return;
    }

    if (item.props.active) {
      this._activeItem = findDOMNode(item);
      item.focus();
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

    const value = getField(this.props, this.state, 'value');
    let state;
    if (e.type === 'keydown' && !value && this.state.activeIndex === -1) {
      // When there is no value, need to change the default active index to 0 instead of -1
      // so that the next DOWN arrow increments correctly
      state = { activeIndex: 0 };
    }

    if (typeof isOpen === 'undefined' && typeof this.props.visible === 'undefined') {
      state = state || {};
      state.visible = visible;
    }

    if (state) {
      this.setState(state);
    }
  };

  _close = (e) => {
    if (this.props.onVisibilityChange) {
      this.props.onVisibilityChange(false, e);
    }

    if (typeof this.props.visible === 'undefined') {
      this.setState({ visible: false });
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
        if (typeof node.dataset.id !== 'undefined') {
          const { id, value } = node.dataset;
          this._selectItem(parseInt(id, 10), value, e);
          return;
        }

        node = node.parentNode;
      }
    }
  };

  _selectItem = (dataIndex, dataValue, e) => {
    const { required, menuItems, itemLabel, itemValue, onChange } = this.props;
    const value = this._getItemPart(menuItems[dataIndex], itemLabel, itemValue);
    const prevValue = getField(this.props, this.state, 'value');
    if (prevValue !== value && onChange) {
      onChange(value, dataIndex, e);
    }

    const state = {
      ...this._getActive({ value, itemLabel, itemValue, menuItems }, {}),
      error: !!required && !value && value !== 0,
    };

    if (typeof this.props.value === 'undefined') {
      state.value = value;
    }

    if (typeof this.props.isOpen === 'undefined' && typeof this.props.visible === 'undefined' && e.type !== 'click') {
      state.visible = false;
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

    const { isOpen, required } = this.props;
    const visible = typeof isOpen !== 'undefined' ? isOpen : getField(this.props, this.state, 'visible');
    const value = getField(this.props, this.state, 'value');

    this.setState({ active: false, error: required && !visible && !value });
  };

  _handleKeyDown = (e) => {
    const { isOpen, onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(e);
    }

    const key = e.which || e.keyCode;
    const up = key === UP;
    const down = key === DOWN;
    const enter = key === ENTER;
    const visible = typeof isOpen !== 'undefined' ? isOpen : getField(this.props, this.state, 'visible');

    if (up || down) {
      e.preventDefault();
    }

    if (!visible && (up || down || enter)) {
      this._toggle(e);
    } else if (visible && (key === ESC || key === TAB)) {
      if (this._field && key === ESC) {
        this._field.focus();
      }

      this._close(e);
    } else if (up || down) {
      this._advanceFocus(up);
    } else if (enter) {
      if (this._field) {
        this._field.focus();
      }

      this._handleClick(e);
    } else {
      this._selectItemByLetter(key, e);
    }
  };

  _advanceFocus = (decrement) => {
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
    const { menuItems, itemLabel, itemValue, isOpen, onChange } = this.props;
    const { lastSearch } = this.state;
    let match = -1;
    const search = `${lastSearch || ''}${letter}`.toUpperCase();
    menuItems.some((item, index) => {
      const label = String(this._getItemPart(item, itemLabel, itemValue, true));
      if (label && label.toUpperCase().indexOf(search) === 0) {
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
          onChange(value, match, e);
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
    }

    const { id, itemLabel, itemValue, position, stripActiveItem } = this.props;
    const below = position === SelectField.Positions.BELOW;
    const value = getField(this.props, this.state, 'value');
    const type = typeof item;

    let props;
    const dataValue = this._getItemPart(item, itemLabel, itemValue);
    const primaryText = this._getItemPart(item, itemLabel, itemValue, true);
    if (type === 'object') {
      props = omit(item, [itemLabel, itemValue, ...VALID_LIST_ITEM_PROPS]);
    }

    const active = dataValue === value || dataValue === parseInt(value, 10);
    const stripped = typeof stripActiveItem !== 'undefined' ? stripActiveItem : below && active;
    if (!stripped) {
      items.push(
        <ListItem
          {...props}
          ref={this._setListItem}
          id={active ? `${id}-options-active` : null}
          active={active}
          tabIndex={-1}
          primaryText={primaryText}
          key={item.key || dataValue}
          role="option"
          data-id={i}
          data-value={dataValue}
        />
      );
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
      isOpen, // deprecated
      /* eslint-disable no-unused-vars */
      error: propError,
      menuId: propMenuId,
      visible: propVisible,
      itemLabel,
      itemValue,
      defaultValue,
      defaultVisible,
      onClick,
      onKeyDown,
      stripActiveItem,
      keyboardMatchingTimeout,

      // Deprecated
      defaultOpen,
      initiallyOpen,
      onMenuToggle,
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
        anchor={anchor}
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
      >
        {menuItems.reduce(this._reduceItems, [])}
      </Menu>
    );
  }
}
