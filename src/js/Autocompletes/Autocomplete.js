import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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
    };
  }

  static propTypes = {
    /**
     * An optional style to apply to the text field's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the text field's container.
     */
    className: PropTypes.string,

    /**
     * An optional className to apply to the input field iteself.
     */
    inputClassName: PropTypes.string,

    /**
     * An optional style to apply to the text field input itself.
     */
    inputStyle: PropTypes.object,

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
     * An optional style to apply to the surrounding `Menu` component if the
     * `Autocomplete` is not using `inline` suggestions.
     */
    menuStyle: PropTypes.object,

    /**
     * An optional className to apply to the surrounding `Menu` component if the
     * `Autocomplete` is not using `inline` suggestions.
     */
    menuClassName: PropTypes.string,

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

  componentDidMount() {
    this._menu = findDOMNode(this.refs.menu);
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.isOpen !== nextState.isOpen) {
      window[(nextState.isOpen ? 'add' : 'remove') + 'EventListener']('click', this._handleOutsideClick);

      const menuFn = nextProps[`onMenu${nextState.isOpen ? 'Open' : 'Close'}`];
      menuFn && menuFn();
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

  _handleOutsideClick = (e) => {
    onOutsideClick(e, this._menu, () => {
      this.props.onBlur && this.props.onBlur();
      this.setState({ isOpen: false });
    });
  }

  _handleChange = (value, event) => {
    const { onChange, filter, data, dataLabel } = this.props;

    if(onChange) {
      onChange(value, event);
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
    });
  };

  _handleTab = (e) => {
    this.props.onBlur && this.props.onBlur(e);

    this.setState({ isOpen: false });
    //const { matches, value, isOpen } = this.state;

    //const nextState = {};
    //if(isOpen && matches.length) {
    //  let [match] = matches;
    //  if(typeof match === 'object') {
    //    match = match[this.props.dataLabel];
    //  }

    //  if(value !== match) {
    //    e.preventDefault();
    //    nextState.value = match;
    //  } else {
    //    nextState.isOpen = false;
    //  }
    //} else {
    //  nextState.isOpen = false;
    //}

    //this.setState(nextState);
  };

  _handleKeyDown = (e) => {
    const key = e.which || e.keyCode;
    if(key === TAB) {
      this._handleTab(e);
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
    const { isOpen, matches, value } = this.state;
    const {
      fullWidth,
      block,
      menuStyle,
      menuClassName,
      listStyle,
      listClassName,
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

    const autocomplete = (
      <TextField
        {...props}
        key="autocomplete"
        ref="textField"
        value={value}
        onChange={this._handleChange}
        onFocus={this._handleFocus}
        fullWidth={fullWidth}
        block={block}
      />
    );

    return (
      <Menu
        ref="menu"
        toggle={autocomplete}
        isOpen={isOpen}
        onClick={this._handleClick}
        onKeyDown={this._handleKeyDown}
        position={Menu.Positions.BELOW}
        fullWidth={fullWidth}
        style={menuStyle}
        className={menuClassName}
        listStyle={listStyle}
        listClassName={listClassName}
        limitHeight={true}
      >
        {matches.map(this._mapToListItem)}
      </Menu>
    );
  }
}
