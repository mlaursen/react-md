import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import cn from 'classnames';

import getField from '../utils/getField';
import omit from '../utils/omit';
import findIgnoreCase from '../utils/findIgnoreCase';
import fuzzyFilter from '../utils/fuzzyFilter';
import caseInsensitiveFilter from '../utils/caseInsensitiveFilter';
import getTextWidth from '../utils/Positioning/getTextWidth';
import oneRequiredForA11y from '../utils/PropTypes/oneRequiredForA11y';
import controlled from '../utils/PropTypes/controlled';
import invalidIf from '../utils/PropTypes/invalidIf';
import { UP, DOWN, TAB } from '../constants/keyCodes';
import anchorShape from '../Helpers/anchorShape';
import fixedToShape from '../Helpers/fixedToShape';
import positionShape from '../Helpers/positionShape';

import ListItem from '../Lists/ListItem';
import Menu from '../Menus/Menu';
import TextField from '../TextFields/TextField';

/**
 * The `Autocomplete` component is useful for presenting real-time suggestions, completions,
 * or filtering.
 */
export default class Autocomplete extends PureComponent {
  static HorizontalAnchors = Menu.HorizontalAnchors;
  static VerticalAnchors = Menu.VerticalAnchors;
  static Positions = Menu.Positions;
  static fuzzyFilter = fuzzyFilter;
  static caseInsensitiveFilter = caseInsensitiveFilter;
  static findIgnoreCase = findIgnoreCase;
  static propTypes = {
    /**
     * An id to give the autocomplete. Either this or the `menuId` is required for accessibility.
     *
     * @see {@link #menuId}
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * The menu id to provide to the autocomplete. Either this prop or the `id` prop is required. If
     * this props is omitted, the menuId will become: `${id}-menu`
     */
    menuId: oneRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]), 'id'),

    /**
     * An optional id to provide to the menu's list.
     *
     * @see {@link Menus/Menu#listId}
     */
    listId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the menu that contains the autocomplete.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the menu that contains the autocomplete.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the autocomplete's text field.
     */
    textFieldStyle: PropTypes.object,

    /**
     * An optional className to apply to the autocomplete's text field.
     */
    textFieldClassName: PropTypes.string,

    /**
     * An optional style to apply to the autocomplete's text field input itself.
     */
    inputStyle: PropTypes.object,

    /**
     * An optional className to apply to the autocomplete's input field itself.
     */
    inputClassName: PropTypes.string,

    /**
     * The optional style to apply to the opened menu List if the
     * `Autocomplete` is not using `inline` suggestions.
     */
    listStyle: PropTypes.object,

    /**
     * The optional className to apply to the opened menu List if the
     * `Autocomplete` is not using `inline` suggestions.
     */
    listClassName: PropTypes.string,

    /**
     * An optional style to apply to the inline suggestion when using `inline` mode.
     */
    inlineSuggestionStyle: PropTypes.object,

    /**
     * An optional className to apply to the inline suggestion when using `inline` mode.
     */
    inlineSuggestionClassName: PropTypes.string,

    /**
     * Boolean if the autocomplete is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * A label to display with the autocomplete.
     */
    label: PropTypes.node,

    /**
     * An optional value to use for the text field. This will force this component
     * to be controlled and require the `onChange` function.
     */
    value: controlled(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]), 'onChange'),

    /**
     * The default value for the autocomplete's text field.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    /**
     * An object key to use to extract the text to be compared for filtering.
     * This will only be applied if the given `data` prop is an array of objects.
     */
    dataLabel: PropTypes.string.isRequired,

    /**
     * An optional object key to use to extract the `value` of the given `data` prop.
     * This is really only used with generating a unique react key. The unique react
     * key with either be:
     * - the datum if it is a string or number
     * - the `key` attribute of the datum object
     * - the `datum[dataValue]`
     * - or the `datum[dataLabel]`
     */
    dataValue: PropTypes.string,

    /**
     * A single key or an array of keys to delete from your data object before passing
     * to the `ListItem` component.
     */
    deleteKeys: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),

    /**
     * The data that will be used for autocomplete suggestions. This can either be
     * an array of string, number, or object. If it is an array of objects, the key
     * `dataLabel` is required.
     *
     * ```docgen
     * PropTypes.arrayOf(PropTypes.oneOfType([
     *   PropTypes.element,
     *   PropTypes.string,
     *   PropTypes.number,
     *   PropTypes.shape({
     *     [dataLabel]: PropTypes.oneOfType([
     *       PropTypes.string,
     *       PropTypes.number,
     *       PropTypes.node,
     *     ]).isRequired,
     *   }),
     * ])).isRequired
     * ```
     */
    data: (props, propName, component, ...others) => {
      const { dataLabel } = props;
      return PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
          [dataLabel]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.node,
          ]).isRequired,
        }),
      ])).isRequired(props, propName, component, ...others);
    },

    /**
     * An optional number representing the total number of results in the `data` prop.
     * This should really only be used when the data is paginated. When this is set,
     * each item in the suggestion menu will be updated with the `aria-setsize` and
     * `aria-posinset`.
     *
     * @see {@link #offset}
     */
    total: invalidIf(PropTypes.number, 'inline'),

    /**
     * An optional number representing the data's offset if the results were paginated.
     * This is used for accessibility with the `aria-posinset` attribute.
     *
     * @see {@link #total}
     */
    offset: PropTypes.number.isRequired,

    /**
     * An optional function to use to filter the `data`. If you have a sexy backend
     * using solr or some other search/indexer, it is recommended to set this prop to
     * `null`.
     */
    filter: PropTypes.func,

    /**
     * An optional function to call when the `Autocomplete`'s text field has a `keydown` event.
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional function to call when the `Autocomplete`'s text field has a `mousedown` event.
     */
    onMouseDown: PropTypes.func,

    /**
     * An optional function to call when the `Autocomplete`'s text field value changes.
     * The callback will be given the new value and the change event.
     *
     * `onChange(textFeldValue, event)`
     */
    onChange: PropTypes.func,

    /**
     * An optional function to call when the `Autocomplete`'s text field is focused.
     */
    onFocus: PropTypes.func,

    /**
     * An optional function to call when the entire `Autocomplete` component is blurred.
     * This will be triggered when the window is clicked or when a user tabs away from
     * the autocomplete.
     */
    onBlur: PropTypes.func,

    /**
     * Boolean if this text field should be styled as a full width text field.
     * Floating labels and the text field indicator will be removed automatically.
     */
    block: PropTypes.bool,

    /**
     * Boolean if the autocomplete should span the entire width.
     */
    fullWidth: PropTypes.bool,

    /**
     * Boolean if the `Autocomplete` should display suggestions inline instead
     * of in a `Menu`.
     */
    inline: PropTypes.bool,

    /**
     * The amount of padding to use between the current text and the inline suggestion text.
     */
    inlineSuggestionPadding: PropTypes.number.isRequired,

    /**
     * The function to call to find a suggestion for an inline autocomplete. This function
     * expects to return a single result of a number or a string.
     *
     * ```js
     * @param {Array<Object|String|Number>} data - The data prop to search.
     * @param {String} value - The current value to use for searching.
     * @param {String} dataLabel - The `dataLabel` prop to use if a datum is an object.
     * @return {String|Number} the found suggestion or false-ish
     * ```
     */
    findInlineSuggestion: PropTypes.func,

    /**
     * An optional function to call when an autocomplete suggestion is clicked either
     * by using the mouse, the enter/space key, or touch. The match index and current
     * `dataLabel` will be given back.
     *
     * `onAutocomplete(suggestion, suggestionIndex, matches);`
     *
     * @see {@link #autocompleteWithLabel}
     */
    onAutocomplete: PropTypes.func,

    /**
     * Boolean if the `onAutocomplete` should attempt send the `suggestion[dataLabel]` instead
     * of `suggestion[dataValue]` when the data is an object.
     *
     * @see {@link #onAutocomplete}
     */
    autocompleteWithLabel: PropTypes.bool,

    /**
     * A boolean if the text field's value should be reset to the empty string when
     * an item is auto-completed. This is useful if you do not want a fully controlled
     * component and the values are stored outside of the `TextField`. (like `Chips`).
     */
    clearOnAutocomplete: PropTypes.bool,

    /**
     * An optional function to call when the `Autocomplete` suggestion menu opens.
     */
    onMenuOpen: PropTypes.func,

    /**
     * An optional function to call when the `Autocomplete` suggestion menu closes.
     */
    onMenuClose: PropTypes.func,

    /**
     * This prop is used for disabling the browser's default autocomplete suggestions
     * of previously typed values in the text field. By default, this is disabled.
     */
    autoComplete: PropTypes.oneOf(['on', 'off']),

    /**
     * Boolean if the `input` should be focused again after a suggestion was clicked.
     *
     * This is really only added for keyboard support and the fact that each of suggestions
     * are focusable.
     */
    focusInputOnAutocomplete: PropTypes.bool,

    /**
     * This is how the menu's `List` gets anchored to the `toggle` element.
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
     * @see [md-menu-mobile-max-height](/components/menus?tab=2#variable-md-menu-mobile-max-height)
     * @see [md-menu-desktop-max-height](/components/menus?tab=2#variable-md-menu-desktop-max-height)
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
     * @see {@link Helpers/Layover#transitionName}
     */
    transitionName: PropTypes.string,

    /**
     * @see {@link Helpers/Layover#transitionEnterTimeout}
     */
    transitionEnterTimeout: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#transitionLeaveTimeout}
     */
    transitionLeaveTimeout: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#centered}
     */
    centered: Menu.propTypes.centered,

    /**
     * @see {@link Helpers/Layover#sameWidth}
     */
    sameWidth: Menu.propTypes.sameWidth,

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
    minLeft: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#minRight}
     */
    minRight: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#minBottom}
     */
    minBottom: PropTypes.number,

    /**
     * @see {@link Helpers/Layover#fillViewportWidth}
     */
    fillViewportWidth: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#fillViewportHeight}
     */
    fillViewportHeight: PropTypes.bool,

    /**
     * @see {@link TextFields#toolbar}
     */
    toolbar: PropTypes.bool,
  };

  static defaultProps = {
    autocompleteWithLabel: false,
    position: Menu.Positions.BELOW,
    sameWidth: true,
    offset: 0,
    fullWidth: true,
    defaultValue: '',
    dataLabel: 'primaryText',
    filter: Autocomplete.fuzzyFilter,
    findInlineSuggestion: Autocomplete.findIgnoreCase,
    autoComplete: 'off',
    repositionOnScroll: true,
    repositionOnResize: true,
    inlineSuggestionPadding: 6,
  };

  constructor(props) {
    super(props);

    const {
      defaultValue,
      data,
      dataLabel,
      filter,
    } = props;

    let matches = [];
    if (defaultValue && filter) {
      matches = filter(data, defaultValue, dataLabel);
    } else if (!filter) {
      matches = data;
    }

    this.state = {
      value: defaultValue,
      matches,
      visible: false,
      matchIndex: -1,
      manualFocus: false,
      suggestion: '',
      suggestionIndex: -1,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value: nextValue, data, filter, dataLabel } = nextProps;
    const dataDiff = data !== this.props.data;
    if (nextValue !== this.props.value || dataDiff) {
      let { visible, matches } = this.state;
      const value = getField(nextProps, this.state, 'value');

      if (filter) {
        matches = filter(data, value, dataLabel);
      } else if (dataDiff) {
        matches = data;
      }

      if (this.state.focus) {
        visible = !!matches.length;
      }

      this.setState({ matches, visible });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.visible !== nextState.visible) {
      const menuFn = nextProps[`onMenu${nextState.visible ? 'Open' : 'Close'}`];
      if (menuFn) {
        menuFn();
      }
    }
  }

  /**
   * Gets the current value from the text field. This is used when you have an uncontrolled
   * text field and simply need the value from a ref callback.
   *
   * @return {String} the text field's value
   */
  get value() {
    return getField(this.props, this.state, 'value');
  }

  _close = (e) => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    this.setState({ visible: false });
  };

  _handleChange = (value, event) => {
    const { onChange, filter, findInlineSuggestion, data, dataLabel, inline } = this.props;

    if (onChange) {
      onChange(value, event);
    }

    if (inline) {
      // If findInlineSuggestion does not exist, assume that `onChange` will handle it.
      return findInlineSuggestion ? this._findInlineSuggestions(value) : null;
    }

    let { visible } = this.state;
    let matches = value || !filter ? this.state.matches : [];
    if (value && filter) {
      matches = filter(data, value, dataLabel);
    }

    if (filter) {
      visible = !!matches.length;
    }

    return this.setState({ matches, visible, value });
  }

  _handleFocus = (e) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    const { value } = e.target;
    if (this.props.inline && value) {
      if (this.props.findInlineSuggestion) {
        this._findInlineSuggestions(value);
      }

      return;
    }

    this.setState({
      matchIndex: -1,
      visible: !this.state.manualFocus && !!value && !!this.state.matches.length,
      manualFocus: false,
      focus: true,
    });
  };

  _handleBlur = (e) => {
    if (this.props.inline || !this.state.matches.length) {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }

    this.setState({ focus: false });
  };

  _handleInlineAutocomplete = () => {
    const { suggestionIndex, matches } = this.state;
    if (suggestionIndex === -1) {
      return;
    }

    const {
      data,
      dataLabel,
      dataValue,
      autocompleteWithLabel: label,
      onAutocomplete,
    } = this.props;

    let value = data[suggestionIndex];
    if (onAutocomplete) {
      let v = value;
      if (typeof value === 'object') {
        if (!label) {
          v = value[dataValue];
        } else {
          v = value[dataLabel];
        }
      }

      onAutocomplete(v, suggestionIndex, matches);
    }

    if (typeof value === 'object') {
      value = value[dataLabel];
    }

    this.setState({
      value,
      suggestion: '',
      suggestionIndex: -1,
      tabbed: true,
    });
  };

  _handleTextFieldKeyDown = (e) => {
    const { inline, onKeyDown } = this.props;
    const { suggestionIndex } = this.state;

    const key = e.which || e.keyCode;
    if (onKeyDown) {
      onKeyDown(e);
    }

    if (inline && key === TAB && suggestionIndex !== -1) { // Autocomplete the text field
      e.preventDefault();
      this._handleInlineAutocomplete();
    }
  };

  _handleMenuKeyDown = (e) => {
    const key = e.which || e.keyCode;
    if (key === TAB) {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }

      this.setState({ visible: false });
    } else if (key === UP || key === DOWN) {
      this._focusSuggestion(key === UP, e);
    }
  };

  /**
   * Just check if the click target is in a list item.. if it is, autocomplete the text field
   * with that item.
   */
  _handleClick = (e) => {
    let target = e.target;
    while (this._menu && this._menu.contains(target)) {
      if (target.classList.contains('md-list-item')) {
        let items = target.parentNode.querySelectorAll('.md-list-item');
        items = Array.prototype.slice.call(items);

        return this._handleItemClick(items.indexOf(target));
      }

      target = target.parentNode;
    }

    return null;
  };

  _handleItemClick = (index) => {
    if (index === -1) { return; }

    const { matches } = this.state;
    const {
      data,
      dataLabel,
      dataValue,
      filter,
      onAutocomplete,
      clearOnAutocomplete,
      focusInputOnAutocomplete,
      autocompleteWithLabel: label,
    } = this.props;

    let value = matches.filter(m => !React.isValidElement(m))[index];
    if (onAutocomplete) {
      let v = value;
      if (typeof v === 'object') {
        if (!label) {
          v = value[dataValue];
        } else {
          v = value[dataLabel];
        }
      }

      onAutocomplete(v, index, matches);
    }

    if (typeof value === 'object') {
      value = value[dataLabel];
    }

    value = clearOnAutocomplete ? '' : value;
    let callback;
    if (focusInputOnAutocomplete) {
      callback = () => {
        this._field.focus();
      };
    }

    this.setState({
      visible: false,
      manualFocus: focusInputOnAutocomplete,
      matches: filter ? filter(data, value, dataLabel) : matches,
      value,
    }, callback);
  };

  _focusSuggestion = (negative, e) => {
    e.preventDefault();
    const { matchIndex, matches } = this.state;
    const l = matches.length;

    let index;
    if (negative && matchIndex === -1 || !negative && matchIndex >= l) {
      return;
    } else if (negative) {
      index = matchIndex - 1;
      if (index === -1) {
        this._field.focus();
      }
    } else {
      index = Math.min(l, matchIndex + 1);
    }

    if (index !== -1 && index !== matchIndex) {
      const item = this._menu.querySelectorAll('.md-list-tile')[index];
      if (item) {
        item.focus();
      }
    }

    this.setState({ matchIndex: index });
  };

  _findInlineSuggestions = (value) => {
    const { data, dataLabel, findInlineSuggestion, inlineSuggestionPadding } = this.props;

    let suggestion = findInlineSuggestion(data, value, dataLabel);
    if (typeof suggestion === 'object') {
      throw new Error(
        '`findInlineSuggestion` should return a string or a number, but got an object.',
        suggestion
      );
    }

    let { suggestionStyle } = this.state;
    let suggestionIndex = -1;
    if (suggestion) {
      // Find index of suggestion
      data.some((datum, i) => {
        const d = typeof dataum === 'object' ? datum[dataLabel] : datum;
        if (d === suggestion) {
          suggestionIndex = i;
        }

        return suggestionIndex !== -1;
      });

      // Strip already used letters
      suggestion = suggestion.toString().substring(value.length, suggestion.length);

      // Position the inline suggestion next to the text
      let width = getTextWidth(value, this._field);
      if (width !== null) {
        width += inlineSuggestionPadding;
      }

      if (width !== null && (!suggestionStyle || suggestionStyle.left !== width)) {
        suggestionStyle = { left: width };
      }
    }

    this.setState({
      value,
      suggestion,
      suggestionIndex,
      suggestionStyle,
      tabbed: false,
      focus: true,
    });
  };

  _mapToListItem = (match, i) => {
    if (React.isValidElement(match)) { return match; }

    const { dataLabel, dataValue, deleteKeys, total, offset, data } = this.props;
    let props;
    switch (typeof match) {
      case 'string':
      case 'number':
        props = {
          key: match,
          primaryText: match,
        };
        break;
      default:
        if (deleteKeys) {
          props = omit(match, typeof deleteKeys === 'string' ? [deleteKeys] : deleteKeys);
        } else {
          props = match;
        }

        props = {
          ...props,
          key: match.key || (dataValue && match[dataValue]) || match[dataLabel],
          primaryText: match[dataLabel],
        };
    }

    if (typeof total !== 'undefined' && data.length < total) {
      props['aria-setsize'] = total;
      props['aria-posinset'] = i + 1 + offset;
    }

    // Allows focus, but does not let tab focus. This is so up and down keys work.
    return <ListItem tabIndex={-1} {...props} />;
  };

  /**
   * The `mousedown` event is used instead of `click` because of the order
   * of the `mousedown`, `focus`, and `click` events.
   */
  _toggleMenu = (e) => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }

    if (!this.props.inline && this.state.matches.length && getField(this.props, this.state, 'value')) {
      this.setState({ visible: !this.state.visible });
    }
  };

  /**
   * Allows touch devices to autocomplete the inline view by tapping:
   * - the suggestion text
   * - the text field IF there is a suggestion visible
   */
  _handleTouchStart = (e) => {
    const { target } = e;
    const { suggestion } = this.state;
    if (target.classList.contains('md-autocomplete-suggestion') && suggestion) {
      this._handleInlineAutocomplete();
    }
  };

  _setField = (field) => {
    if (field) {
      this._field = field.getField();
    }
  };

  _setMenu = (menu) => {
    this._menu = findDOMNode(menu);
  };

  render() {
    const { visible, matches, tabbed, focus, suggestionStyle } = this.state;
    const {
      fullWidth,
      block,
      style,
      className,
      listStyle,
      listClassName,
      textFieldStyle,
      textFieldClassName,
      inlineSuggestionStyle,
      inlineSuggestionClassName,
      menuId,
      inline,
      anchor,
      belowAnchor,
      position,
      fixedTo,
      listId,
      listInline,
      listZDepth,
      listHeightRestricted,
      xThreshold,
      yThreshold,
      closeOnOutsideClick,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      centered,
      sameWidth,
      repositionOnScroll,
      repositionOnResize,
      simplifiedMenu,
      minLeft,
      minRight,
      minBottom,
      fillViewportWidth,
      fillViewportHeight,
      /* eslint-disable no-unused-vars */
      value: propValue,
      total,
      offset,
      filter,
      data,
      dataLabel,
      dataValue,
      deleteKeys,
      defaultValue,
      clearOnAutocomplete,
      autocompleteWithLabel,
      findInlineSuggestion,
      inlineSuggestionPadding,
      onAutocomplete,
      onMenuOpen,
      onMenuClose,
      onBlur,
      onFocus,
      onKeyDown,
      onMouseDown,
      onChange,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;
    delete props.focusInputOnAutocomplete;

    const value = getField(this.props, this.state, 'value');

    const autocomplete = (
      <TextField
        {...props}
        aria-autocomplete={inline ? 'inline' : 'list'}
        style={textFieldStyle}
        className={cn('md-autocomplete', textFieldClassName)}
        key="autocomplete"
        ref={this._setField}
        value={value}
        onKeyDown={this._handleTextFieldKeyDown}
        onMouseDown={this._toggleMenu}
        onChange={this._handleChange}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        fullWidth={fullWidth}
        block={block}
      />
    );

    if (inline) {
      let suggestion;
      if (focus && this.state.suggestion) {
        suggestion = (
          <span
            key="suggestion"
            style={{ ...suggestionStyle, ...inlineSuggestionStyle }}
            className={cn('md-autocomplete-suggestion', {
              'md-autocomplete-suggestion--floating': props.label,
              'md-autocomplete-suggestion--block': block,
            }, inlineSuggestionClassName)}
          >
            {this.state.suggestion}
          </span>
        );
      }

      return (
        <CSSTransitionGroup
          component="div"
          style={style}
          className={cn('md-menu-container md-autocomplete-container', className, {
            'md-full-width': fullWidth || block,
          })}
          transitionName="opacity"
          transitionEnterTimeout={150}
          transitionLeave={!tabbed}
          transitionLeaveTimeout={150}
          onTouchStart={this._handleTouchStart}
        >
          {autocomplete}
          {suggestion}
        </CSSTransitionGroup>
      );
    }

    return (
      <Menu
        id={menuId || `${props.id}-menu`}
        listId={listId}
        ref={this._setMenu}
        toggle={autocomplete}
        visible={visible}
        onClick={this._handleClick}
        onClose={this._close}
        onKeyDown={this._handleMenuKeyDown}
        simplified={simplifiedMenu}
        sameWidth={sameWidth}
        centered={centered}
        anchor={anchor}
        belowAnchor={belowAnchor}
        position={position}
        fixedTo={fixedTo}
        listInline={listInline}
        listZDepth={listZDepth}
        listHeightRestricted={listHeightRestricted}
        xThreshold={xThreshold}
        yThreshold={yThreshold}
        closeOnOutsideClick={closeOnOutsideClick}
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
        fullWidth={fullWidth || block}
        style={style}
        className={cn('md-autocomplete-container', className)}
        listStyle={listStyle}
        listClassName={cn('md-autocomplete-list', listClassName)}
        repositionOnScroll={repositionOnScroll}
        repositionOnResize={repositionOnResize}
        minLeft={minLeft}
        minRight={minRight}
        minBottom={minBottom}
        fillViewportWidth={fillViewportWidth}
        fillViewportHeight={fillViewportHeight}
      >
        {matches.map(this._mapToListItem)}
      </Menu>
    );
  }
}
