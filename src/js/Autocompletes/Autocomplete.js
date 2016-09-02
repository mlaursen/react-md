import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';

import { ListItem } from '../Lists';
import Menu from '../Menus';
import TextField from '../TextFields';

import { UP, DOWN, TAB, ENTER, SPACE } from '../constants/keyCodes';
import { onOutsideClick } from '../utils';

/**
 * The `Autocomplete` component is useful for presenting real-time suggestions, completions,
 * or filtering.
 */
export default class Autocomplete extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the `Autocomplete`'s text field's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the `Autocomplete`'s text field's container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the `Autocomplete`'s container.
     */
    containerStyle: PropTypes.object,

    /**
     * An optional className to apply to the `Autocomplete`'s container.
     */
    containerClassName: PropTypes.string,

    /**
     * An optional style to apply to the `Autocomplete`'s text field input itself.
     */
    inputStyle: PropTypes.object,

    /**
     * An optional className to apply to the `Autocomplete`'s input field iteself.
     */
    inputClassName: PropTypes.string,

    /**
     * The optional className to apply to the opened menu List if the
     * `Autocomplete` is not using `inline` suggestions.
     */
    listClassName: PropTypes.string,

    /**
     * The optional style to apply to the opened menu List if the
     * `Autocomplete` is not using `inline` suggestions.
     */
    listStyle: PropTypes.object,

    /**
     * Boolean if the autocomplete is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * A label to display with the autocomplete.
     */
    label: PropTypes.string,

    /**
     * An optional value to use for the text field. This will force this component
     * to be controlled and require the `onChange` function.
     */
    value: (props, propName, component, ...others) => {
      let err;
      if (typeof props[propName] !== 'undefined') {
        err = PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ])(props, propName, component, ...others);

        if (!err) {
          err = PropTypes.func.isRequired(props, 'onChange', component, ...others);
        }
      }

      return err;
    },

    /**
     * The default value for the autocomplete's text field.
     */
    defaultValue: PropTypes.string,

    /**
     * An object key to use to extract the text to be compared for filtering.
     * This will only be applied if the the given `data` prop is an array of objects.
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
     * ```js
     * PropTypes.shape({
     *   [dataLabel]: PropTypes.oneOfType([
     *     PropTypes.string,
     *     PropTypes.number,
     *   ]).isRequired,
     * }),
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
          ]).isRequired,
        }),
      ])).isRequired(props, propName, component, ...others);
    },

    /**
     * An optional function to use to filter the `data`. If you have a sexy backend
     * using solr or some other seach/indexer, it is recommended to set this prop to
     * `null` or `false`-ish.
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
     * `onAutocomplete(suggestion[dataLabel] || suggestion, suggestionIndex, matches);`
     */
    onAutocomplete: PropTypes.func,

    /**
     * A boolean if the text field's value should be reset to the empty string when
     * an item is auto-completed. This is usefull if you do not want a fully controlled
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
     * Boolean if the autocomplete should automatically increase it's text field's
     * min width to the max size of it's label or placeholder text.
     */
    adjustMinWidth: PropTypes.bool,
  };

  static defaultProps = {
    dataLabel: 'primaryText',
    filter: Autocomplete.fuzzyFilter,
    findInlineSuggestion: Autocomplete.findIgnoreCase,
  };

  /**
   * This function does a simple ignore case search of some `filterText` for every
   * item in a `haystack`. It will only include items that are:
   *  - not null or undefined
   *  - valid React Components
   *  - a number or string that contains each letter/number in exact order ignoring case
   *  - an object's `dataLabel` value that contains each letter/number in exact order ignoring case.
   *
   * Example:
   * ```js
   * const haystack = ['Apple', 'Banana', 'Orange'];
   * caseInsensitiveFilter(haystack, 'An') // ['Banana', 'Orange'];
   * caseInsensitiveFilter(haystack, 'ae') // []
   * ```
   *
   * @param {Array.<string|number|Object|function>} haystack - the haystack to search
   * @param {string} filterText - the filter text to use.
   * @param {string=} dataLabel - the data label to use if the element is an object.
   *
   * @return {Array.<string|number|Object|function>} a filtered list.
   */
  static caseInsensitiveFilter(haystack, filterText, dataLabel) {
    const needle = filterText.toLowerCase();

    return haystack.filter(hay => {
      if (hay === null || typeof hay === 'undefined') {
        return false;
      } else if (React.isValidElement(hay)) {
        return true;
      }

      let value;
      switch (typeof hay) {
        case 'string':
        case 'number':
          value = hay.toString();
          break;
        default:
          value = hay[dataLabel];
      }

      return value && value.toLowerCase().indexOf(needle) !== -1;
    });
  }


  /**
   * This function does a simple fuzzy search of some `needle` for every
   * item in a `haystack`. It will only include items that are:
   *  - not null or undefined
   *  - valid React Components
   *  - a number or string that contains each letter/number in order ignoring case
   *  - an object's `dataLabel` value that contains each letter/number in order ignoring case.
   *
   * Example:
   * ```js
   * const haystack = ['Apple', 'Banana', 'Orange'];
   * fuzzyFilter(haystack, 'An') // ['Banana', 'Orange'];
   * fuzzyFilter(haystack, 'ae') // ['Apple']
   * ```
   *
   * @param {Array.<string|number|Object|function>} haystack - the haystack to search
   * @param {string} needle - the filter text to use.
   * @param {string=} dataLabel - the data label to use if the element is an object.
   *
   * @return {Array.<string|number|Object|function>} a filtered list.
   */
  static fuzzyFilter(haystack, needle, dataLabel) {
    // Create an amazing regex that matches the letters in order
    // and escapes any strings that could be part of a regex.
    const reg = new RegExp(
      needle.split('')
        .join('\\w*')
        .replace(/(\(|\||\)|\\(?!w\*)|\[|\]|\-|\.|\^|\+|\$|\?|^(?!w)\*)/g, '\\$1')
        // Couldn't get the matching of two '*' working, so replace them here..
        .replace(/\*\*/g, '*\\*'),
      'i'
    );

    return haystack.filter(hay => {
      if (hay === null || typeof hay === 'undefined') {
        return false;
      } else if (React.isValidElement(hay)) {
        return true;
      }

      let value;
      switch (typeof hay) {
        case 'string':
        case 'number':
          value = hay.toString();
          break;
        default:
          value = hay[dataLabel];
      }

      return value && value.match(reg);
    });
  }

  /**
   * This function finds the first item in a `haystack` that starts with every
   * letter of the `value` in order. It will ignore:
   *  - null or undefined
   *  - valid React components
   *
   * @param {Array.<string|number|Object|function>} haystack - the haystack to search.
   * @param {string} value - the current value to use.
   * @param {string=} dataLabel - the object key to use to extract the comparing value.
   *
   * @return {string} the found element or the empty string.
   */
  static findIgnoreCase(haystack, value, dataLabel) {
    const needle = value ? value.toLowerCase() : '';

    if (!needle) { return needle; }

    let suggestion = '';
    haystack.some(hay => {
      if (hay === null || typeof hay === 'undefined' || React.isValidElement(hay)) {
        return false;
      }

      const hayStr = typeof hay === 'object' ? hay[dataLabel] : hay.toString();

      if (hayStr.toLowerCase().indexOf(needle) === 0) {
        suggestion = hayStr;
      }

      return suggestion;
    });

    return suggestion;
  }

  constructor(props) {
    super(props);

    const {
      defaultValue,
      data,
      dataLabel,
      filter,
    } = props;

    this.state = {
      value: defaultValue,
      matches: defaultValue && filter ? filter(data, defaultValue, dataLabel) : [],
      isOpen: false,
      matchIndex: -1,
      manualFocus: false,
      suggestionIndex: -1,
    };

    this._updateFont = this._updateFont.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleItemClick = this._handleItemClick.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._handleMenuKeyDown = this._handleMenuKeyDown.bind(this);
    this._handleTextFieldKeyDown = this._handleTextFieldKeyDown.bind(this);
    this._focusSuggestion = this._focusSuggestion.bind(this);
    this._findInlineSuggestions = this._findInlineSuggestions.bind(this);
    this._mapToListItem = this._mapToListItem.bind(this);
    this._toggleMenu = this._toggleMenu.bind(this);
    this._updateSuggestionStyle = this._updateSuggestionStyle.bind(this);
  }


  componentDidMount() {
    this._menu = findDOMNode(this.refs.menu);
    this._textField = findDOMNode(this.refs.textField).querySelector('input');

    if (this.props.inline) {
      this._updateFont();
      window.addEventListener('resize', this._updateFont);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.isOpen !== nextState.isOpen) {
      const key = `${nextState.isOpen ? 'add' : 'remove'}EventListener`;
      window[key]('click', this._handleOutsideClick);

      const menuFn = nextProps[`onMenu${nextState.isOpen ? 'Open' : 'Close'}`];
      if (menuFn) {
        menuFn();
      }
    }

    if (this.props.inline !== nextProps.inline) {
      if (nextProps.inline) {
        this._updateFont();
        window.addEventListener('resize', this._updateFont);
      } else {
        window.removeEventListener('resize', this._updateFont);
      }
    }

    if (nextProps.data !== this.props.data) {
      const { data, filter, dataLabel } = nextProps;

      const matches = filter ? filter(data, nextState.value, dataLabel) : data;
      const next = { matches };
      if (nextState.focus && matches.length) {
        next.isOpen = true;
      }

      this.setState(next);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { suggestion } = this.state;
    this._updateSuggestionStyle(
      suggestion && !prevState.suggestion,
      !suggestion && prevState.suggestion
    );
  }

  componentWillUnmount() {
    if (this.props.inline) {
      window.removeEventListener('resize', this._updateFont);
    }
  }

  _getValue(props, state) {
    return typeof props.value === 'undefined' ? state.value : props.value;
  }

  _updateSuggestionStyle(isNew, isDeleted) {
    if (isNew) {
      const msg = findDOMNode(this).querySelector('.md-text-field-message');

      if (msg) {
        const cs = window.getComputedStyle(this.refs.suggestion);
        const bottom = parseInt(cs.getPropertyValue('bottom'), 10) + msg.offsetHeight;

        this.setState({
          suggestionStyle: Object.assign({}, this.state.suggestionStyle, { bottom }),
        });
      }
    } else if (isDeleted) {
      const suggestionStyle = Object.assign({}, this.state.suggestionStyle);
      delete suggestionStyle.bottom;

      this.setState({ suggestionStyle });
    }
  }

  _updateFont() {
    const cs = window.getComputedStyle(this._textField);
    this.setState({
      fontSize: parseInt(cs.getPropertyValue('font-size'), 10),
      font: cs.getPropertyValue('font'),
    });
  }

  _handleOutsideClick(e) {
    onOutsideClick(e, this._menu, () => {
      if (this.props.onBlur) {
        this.props.onBlur();
      }

      this.setState({ isOpen: false });
    });
  }

  _handleChange(value, event) {
    const { onChange, filter, findInlineSuggestion, data, dataLabel, inline } = this.props;

    if (onChange) {
      onChange(value, event);
    }

    if (inline) {
      // If findInlineSuggestion does not exist, assume that `onChange` will handle it.
      return findInlineSuggestion ? this._findInlineSuggestions(value) : null;
    }

    let matches = value ? this.state.matches : [];
    if (value && filter) {
      matches = filter(data, value, dataLabel);
    }

    return this.setState({ matches, isOpen: !!matches.length, value });
  }

  _handleFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    this.setState({
      matchIndex: -1,
      isOpen: !this.state.manualFocus && !!this.state.matches.length,
      manualFocus: false,
      focus: true,
    });
  }

  _handleBlur(e) {
    if (this.props.inline) {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }

      this.setState({ focus: false });
    }
  }

  _handleTextFieldKeyDown(e) {
    const { inline, data, dataLabel, onKeyDown, onAutocomplete } = this.props;
    const { suggestionIndex } = this.state;

    const key = e.which || e.keyCode;
    if (onKeyDown) {
      onKeyDown(e);
    }

    if (inline && key === TAB && suggestionIndex !== -1) { // Autocomplete the text field
      e.preventDefault();

      let value = data[suggestionIndex];
      if (typeof value === 'object') {
        value = value[dataLabel];
      }

      if (onAutocomplete) {
        onAutocomplete(value, suggestionIndex, this.state.matches);
      }

      this.setState({
        value,
        suggestion: '',
        suggestionIndex: -1,
        tabbed: true,
      });
    }
  }

  _handleMenuKeyDown(e) {
    const key = e.which || e.keyCode;
    if (key === TAB) {
      if (this.props.onBlur) {
        this.props.onBlur();
      }

      this.setState({ isOpen: false });
    } else if (key === UP || key === DOWN) {
      this._focusSuggestion(key === UP, e);
    } else if ((key === ENTER || key === SPACE) && e.target.classList.contains('md-list-tile')) {
      this._handleItemClick(this.state.matchIndex);
    }
  }

  /**
   * Just check if the click target is in a list item.. if it is, autocomplete the text field
   * with that item.
   */
  _handleClick(e) {
    let target = e.target;
    while (target && target.parentNode) {
      if (target.classList.contains('md-list-item')) {
        let items = target.parentNode.querySelectorAll('.md-list-item');
        items = Array.prototype.slice.call(items);

        return this._handleItemClick(items.indexOf(target));
      }

      target = target.parentNode;
    }

    return null;
  }

  _handleItemClick(index) {
    if (index === -1) { return; }

    const { matches } = this.state;
    const { data, dataLabel, filter, onAutocomplete, clearOnAutocomplete } = this.props;
    let value = matches.filter(m => !React.isValidElement(m))[index];
    if (typeof value === 'object') {
      value = value[dataLabel];
    }

    if (onAutocomplete) {
      onAutocomplete(value, index, matches);
    }

    value = clearOnAutocomplete ? '' : value;
    this.setState({
      isOpen: false,
      manualFocus: true,
      matches: filter ? filter(data, value, dataLabel) : matches,
      value,
    }, () => {
      this.refs.textField.focus();
    });
  }

  _focusSuggestion(negative, e) {
    e.preventDefault();
    const { matchIndex, matches } = this.state;
    const l = matches.length;

    let index;
    if (negative && matchIndex === -1 || !negative && matchIndex >= l) {
      return;
    } else if (negative) {
      index = matchIndex - 1;
      if (index === -1) {
        this.refs.textField.focus();
      }
    } else {
      index = Math.min(l, matchIndex + 1);
    }

    if (index !== -1 && index !== matchIndex) {
      const item = findDOMNode(this.refs.menu).querySelectorAll('.md-list-tile')[index];
      if (item) {
        item.focus();
      }
    }

    this.setState({ matchIndex: index });
  }

  _findInlineSuggestions(value) {
    const { data, dataLabel, findInlineSuggestion } = this.props;
    const { font, fontSize } = this.state;
    let { suggestionStyle } = this.state;

    let suggestion = findInlineSuggestion(data, value, dataLabel);
    if (typeof suggestion === 'object') {
      throw new Error(
        '`findInlineSuggestion` should return a string or a number, but got an object.',
        suggestion
      );
    }

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

      // Calculate distance to move the suggestion to already existing text
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (context) { // context doesn't exist in jsdom with jest
        context.font = font;

        // Update suggestion style to be offset and not expand past text field
        const left = context.measureText(value).width + (fontSize * 1.5);
        const width = this._textField.offsetWidth - left / 2;
        suggestionStyle = Object.assign({}, suggestionStyle, { left, width });
      }
    }

    this.setState({ value, suggestion, suggestionIndex, suggestionStyle, tabbed: false });
  }

  _mapToListItem(match) {
    if (React.isValidElement(match)) { return match; }

    const { dataLabel, dataValue, deleteKeys } = this.props;
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
        props = {
          ...match,
          key: match.key || (dataValue && match[dataValue]) || match[dataLabel],
          primaryText: match[dataLabel],
        };

        if (typeof deleteKeys === 'string') {
          delete props[deleteKeys];
        } else if (Array.isArray(deleteKeys)) {
          deleteKeys.forEach(key => {
            delete props[key];
          });
        }

    }

    // Allows focus, but does not let tab focus. This is so up and down keys work.
    return <ListItem tabIndex={-1} {...props} />;
  }

  /**
   * The `mousedown` event is used instead of `click` because of the order
   * of the `mousedown`, `focus`, and `click` events.
   */
  _toggleMenu(e) {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }

    if (!this.props.inline && this.state.matches.length) {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  /**
   * Allows touch devices to autocomplete the inline view by tapping:
   * - the suggestion text
   * - the text field IF there is a suggestion visible
   */
  _handleTouchStart(e) {
    const { target } = e;
    const { data, dataLabel, onAutocomplete } = this.props;
    const { suggestionIndex, suggestion } = this.state;
    if (target.classList.contains('md-autocomplete-suggestion') || suggestion) {
      let value = data[suggestionIndex];
      if (typeof value === 'object') {
        value = value[dataLabel];
      }

      if (onAutocomplete) {
        onAutocomplete(value, suggestionIndex, data);
      }

      this.setState({
        value,
        suggestion: '',
        suggestionIndex: -1,
        tabbed: true,
      });
    }
  }

  render() {
    const { isOpen, matches, focus, tabbed, suggestionStyle } = this.state;
    const {
      fullWidth,
      block,
      listStyle,
      listClassName,
      containerStyle,
      containerClassName,
      inline,
      ...props,
    } = this.props;
    delete props.value;
    delete props.dataLabel;
    delete props.dataValue;
    delete props.filter;
    delete props.data;
    delete props.onAutocomplete;
    delete props.onMenuOpen;
    delete props.onMenuClose;
    delete props.onBlur;
    delete props.onFocus;
    delete props.onKeyDown;
    delete props.onMouseDown;
    delete props.onChange;
    delete props.findInlineSuggestion;
    delete props.clearOnAutocomplete;
    delete props.deleteKeys;

    const value = this._getValue(this.props, this.state);

    const mergedClassName = cn('md-autocomplete', containerClassName);

    const autocomplete = (
      <TextField
        {...props}
        key="autocomplete"
        ref="textField"
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
      if (this.state.suggestion && focus) {
        suggestion = (
          <span
            ref="suggestion"
            key="suggestion"
            style={suggestionStyle}
            className={cn('md-autocomplete-suggestion', {
              block,
              'single-line': !props.label && !block,
              'floating': props.label && !block,
            })}
          >
            {this.state.suggestion}
          </span>
        );
      }

      return (
        <CSSTransitionGroup
          component="div"
          style={containerStyle}
          className={cn(mergedClassName, { 'full-width': fullWidth })}
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
        ref="menu"
        toggle={autocomplete}
        isOpen={isOpen}
        onClick={this._handleClick}
        onKeyDown={this._handleMenuKeyDown}
        position={Menu.Positions.BELOW}
        fullWidth={fullWidth}
        style={containerStyle}
        className={mergedClassName}
        listStyle={listStyle}
        listClassName={listClassName}
        limitHeight
      >
        {matches.map(this._mapToListItem)}
      </Menu>
    );
  }
}
