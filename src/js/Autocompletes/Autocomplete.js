import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { ListItem } from '../Lists';
import Menu from '../Menus';
import TextField from '../TextFields';

import { UP, DOWN, TAB, ENTER, SPACE } from '../constants/keyCodes';
import { onOutsideClick } from '../utils';

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
  }

  static propTypes = {
    /**
     * An optional style to apply to the `Autocomplete`'s container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the `Autocomplete`'s container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the `Autocomplete`'s text field's container.
     */
    textFieldStyle: PropTypes.object,

    /**
     * An optional className to apply to the `Autocomplete`'s text field's container.
     */
    textFieldClassName: PropTypes.string,

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
     * Boolean if the label for the text field should be floating.
     */
    floatingLabel: PropTypes.bool.isRequired,

    /**
     * Boolean if the autocomplete is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * A label to display with the autocomplete.
     */
    label: PropTypes.string,

    /**
     * The default value for the autocomplete's text field.
     */
    defaultValue: PropTypes.string.isRequired,

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
     */
    data: (props, propName, component) => {
      const { dataLabel } = props;
      return PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
          [dataLabel]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]).isRequired,
        }),
      ])).isRequired(props, propName, component);
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
     * `onItemClick(suggestionIndex, suggestion[dataLabel] || suggestion);`
     */
    onItemClick: PropTypes.func,

    /**
     * An optional function to call when the `Autocomplete` suggestion menu opens.
     */
    onMenuOpen: PropTypes.func,

    /**
     * An optional function to call when the `Autocomplete` suggestion menu closes.
     */
    onMenuClose: PropTypes.func,
  };

  static defaultProps = {
    defaultValue: '',
    dataLabel: 'primaryText',
    floatingLabel: true,
    filter: Autocomplete.fuzzyFilter,
    findInlineSuggestion: Autocomplete.findIgnoreCase,
  };

  static caseInsensitiveFilter(hayStack, filterText, dataLabel) {
    const needle = filterText.toLowerCase();

    return hayStack.filter(hay => {
      let value;
      switch(typeof hay) {
        case 'string':
        case 'number':
          value = hay;
          break;
        default:
          value = hay[dataLabel];
      }

      return value && value.toLowerCase().indexOf(needle) !== -1;
    });
  }

  static fuzzyFilter(hayStack, needle, dataLabel) {
    const reg = new RegExp(needle.split('').join('\\w*').replace(/\W/, ''), 'i');

    return hayStack.filter(hay => {
      let value;
      switch(typeof hay) {
        case 'string':
        case 'number':
          value = hay;
          break;
        default:
          value = hay[dataLabel];
      }

      return value && value.match(reg);
    });
  }

  static findIgnoreCase(hayStack, value, dataLabel) {
    const needle = value ? value.toLowerCase() : '';

    if(!needle) { return needle; }

    let suggestion = '';
    hayStack.some(hay => {
      hay = typeof hay === 'object' ? hay[dataLabel] : hay;

      if(hay.toLowerCase().indexOf(needle) === 0) {
        suggestion = hay;
      }

      return suggestion;
    });

    return suggestion;
  }

  componentDidMount() {
    this._menu = findDOMNode(this.refs.menu);
    this._textField = findDOMNode(this.refs.textField).querySelector('input');

    if(this.props.inline) {
      this._updateFont();
      window.addEventListener('resize', this._updateFont);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.isOpen !== nextState.isOpen) {
      window[(nextState.isOpen ? 'add' : 'remove') + 'EventListener']('click', this._handleOutsideClick);

      const menuFn = nextProps[`onMenu${nextState.isOpen ? 'Open' : 'Close'}`];
      menuFn && menuFn();
    }

    if(this.props.inline !== nextProps.inline) {
      if(nextProps.inline) {
        this._updateFont();
        window.addEventListener('resize', this._updateFont);
      } else {
        window.removeEventListener('resize', this._updateFont);
      }
    }

    if(nextProps.data !== this.props.data) {
      const { data, filter, dataLabel } = nextProps;

      const matches = filter ? filter(data, nextState.value, dataLabel) : data;
      this.setState({
        matches,
        isOpen: !!matches.length,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.suggestion && !prevState.suggestion) {
      const msg = findDOMNode(this).querySelector('.md-text-field-message');
      if(msg) {
        const bottom = parseInt(window.getComputedStyle(this.refs.suggestion).getPropertyValue('bottom')) + msg.offsetHeight;

        this.setState({ suggestionStyle: Object.assign({}, this.state.suggestionStyle, { bottom }) }); // eslint-disable-line react/no-did-update-set-state
      }
    } else if(!this.state.suggestion && prevState.suggestion) {
      const suggestionStyle = Object.assign({}, this.state.suggestionStyle);
      delete suggestionStyle.bottom;

      this.setState({ suggestionStyle }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  componentWillUnmount() {
    if(this.props.inline) {
      window.removeEventListener('resize', this._updateFont);
    }
  }

  _updateFont = () => {
    const cs = window.getComputedStyle(this._textField);
    this.setState({
      fontSize: parseInt(cs.getPropertyValue('font-size')),
      font: cs.getPropertyValue('font'),
    });
  };

  _handleOutsideClick = (e) => {
    onOutsideClick(e, this._menu, () => {
      this.props.onBlur && this.props.onBlur();
      this.setState({ isOpen: false });
    });
  }

  _handleChange = (value, event) => {
    const { onChange, filter, findInlineSuggestion, data, dataLabel, inline } = this.props;

    if(onChange) {
      onChange(value, event);
    }

    if(inline) {
      // If findInlineSuggestion does not exist, assume that `onChange` will handle it.
      return findInlineSuggestion ? this._findInlineSuggestions(value) : null;
    }

    let matches = value ? this.state.matches : [];
    if(value && filter) {
      matches = filter(data, value, dataLabel);
    }

    this.setState({ matches, isOpen: !!matches.length, value });
  };

  _handleFocus = (e) => {
    this.props.onFocus && this.props.onFocus(e);
    this.setState({
      matchIndex: -1,
      isOpen: !this.state.manualFocus && !!this.state.matches.length,
      manualFocus: false,
      focus: true,
    });
  };

  _handleBlur = (e) => {
    if(this.props.inline) {
      this.props.onBlur && this.props.onBlur(e);
      this.setState({ focus: false });
    }
  };

  _handleTextFieldKeyDown = (e) => {
    const { inline, data, dataLabel, onKeyDown, onItemClick } = this.props;
    const { suggestionIndex } = this.state;

    const key = e.which || e.keyCode;
    onKeyDown && onKeyDown(e);

    if(inline && key === TAB && suggestionIndex !== -1) { // Autocomplete the text field
      e.preventDefault();

      let value = data[suggestionIndex];
      if(typeof value === 'object') {
        value = value[dataLabel];
      }

      onItemClick && onItemClick(value, suggestionIndex);
      this.setState({
        value,
        suggestion: '',
        suggestionIndex: -1,
        tabbed: true,
      });
    }
  };

  _handleMenuKeyDown = (e) => {
    const key = e.which || e.keyCode;
    if(key === TAB) {
      this.props.onBlur && this.props.onBlur();
      this.setState({ isOpen: false });
    } else if(key === UP || key === DOWN) {
      this._focusSuggestion(key === UP, e);
    } else if((key === ENTER || key === SPACE) && e.target.classList.contains('md-list-tile')) {
      this._handleItemClick(this.state.matchIndex);
    }
  };

  _handleClick = (e) => {
    let target = e.target;
    while(target && target.parentNode) {
      if(target.classList.contains('md-list-item')) {
        const items = Array.prototype.slice.call(target.parentNode.querySelectorAll('.md-list-item'));
        return this._handleItemClick(items.indexOf(target));
      }

      target = target.parentNode;
    }
  };

  _handleItemClick = (index) => {
    if(index === -1) { return; }

    const { matches } = this.state;
    const { data, dataLabel, filter } = this.props;
    let value = matches[index];
    if(typeof value === 'object') {
      value = value[dataLabel];
    }

    this.setState({
      isOpen: false,
      manualFocus: true,
      matches: filter ? filter(data, value, dataLabel) : matches,
      value,
    }, () => {
      this.props.onItemClick && this.props.onItemClick(value, index);
      this.refs.textField.focus();
    });
  };

  _focusSuggestion = (negative, e) => {
    e.preventDefault();
    const { matchIndex, matches } = this.state;
    const l = matches.length;

    let index;
    if(negative && matchIndex === -1 || !negative && matchIndex >= l) {
      return;
    } else if(negative) {
      index = Math.max(0, matchIndex - 1);
    } else {
      index = Math.min(l, matchIndex + 1);
    }

    const item = findDOMNode(this.refs.menu).querySelectorAll('.md-list-tile')[index];
    item && item.focus();

    this.setState({ matchIndex: index });
  };

  _findInlineSuggestions = (value) => {
    const { data, dataLabel, findInlineSuggestion } = this.props;
    const { font, fontSize } = this.state;
    let { suggestionStyle } = this.state;

    let suggestion = findInlineSuggestion(data, value, dataLabel);
    if(typeof suggestion === 'object') {
      throw new Error('`findInlineSuggestion` should return a string or a number, but got an object.', suggestion);
    }

    let suggestionIndex = -1;


    if(suggestion) {
      // Find index of suggestion
      data.some((datum, i) => {
        datum = typeof datum === 'object' ? datum[dataLabel] : datum;
        if(datum === suggestion) {
          suggestionIndex = i;
        }

        return suggestionIndex !== -1;
      });

      // Strip already used letters
      suggestion = (suggestion + '').substring(value.length, suggestion.length);

      // Calculate distance to move the suggestion to already existing text
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = font;

      // Update suggestion style to be offset and not expand past text field
      const left = context.measureText(value).width + (fontSize * 1.5);
      const width = this._textField.offsetWidth - left / 2;
      suggestionStyle = Object.assign({}, suggestionStyle, { left, width });
    }

    this.setState({ value, suggestion, suggestionIndex, suggestionStyle, tabbed: false });
  };

  /**
   * Converts a single match to a `ListItem` component.
   *
   * @param {String|Number|Object} match The match to convert
   * @return {Component} a `ListItem` version of the match.
   */
  _mapToListItem = (match) => {
    const { dataLabel, dataValue } = this.props;
    let props;
    switch(typeof match) {
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
    }

    return <ListItem tabIndex={-1} {...props} />;
  };

  render() {
    const { isOpen, matches, value, focus, tabbed, suggestionStyle } = this.state;
    const {
      fullWidth,
      block,
      style,
      className,
      listStyle,
      listClassName,
      textFieldStyle,
      textFieldClassName,
      inline,
      floatingLabel,
      ...props,
    } = this.props;
    delete props.dataLabel;
    delete props.dataValue;
    delete props.filter;
    delete props.data;
    delete props.onItemClick;
    delete props.onMenuOpen;
    delete props.onMenuClose;
    delete props.onBlur;
    delete props.findInlineSuggestion;

    const containerStyle = style;
    const containerClassName = classnames('md-autocomplete', className, {
      'full-width': fullWidth,
    });

    const autocomplete = (
      <TextField
        {...props}
        style={textFieldStyle}
        className={textFieldClassName}
        key="autocomplete"
        ref="textField"
        value={value}
        onKeyDown={this._handleTextFieldKeyDown}
        onChange={this._handleChange}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        fullWidth={fullWidth}
        block={block}
        floatingLabel={floatingLabel}
      />
    );

    if(inline) {
      let suggestion;
      if(this.state.suggestion && focus) {
        suggestion = (
          <span
            ref="suggestion"
            key="suggestion"
            style={suggestionStyle}
            className={classnames('md-autocomplete-suggestion', {
              'block': block,
              'single-line': !floatingLabel && !block,
              'floating': floatingLabel && !block,
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
          className={containerClassName}
          transitionName="opacity"
          transitionEnterTimeout={150}
          transitionLeave={!tabbed}
          transitionLeaveTimeout={150}
        >
          {autocomplete}
          {suggestion}
        </CSSTransitionGroup>
      );
    } else {
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
          className={containerClassName}
          listStyle={listStyle}
          listClassName={listClassName}
          limitHeight={true}
        >
          {matches.map(this._mapToListItem)}
        </Menu>
      );
    }
  }
}
