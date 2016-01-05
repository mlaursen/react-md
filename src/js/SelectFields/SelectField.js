import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { isPropEnabled, isObject } from '../utils/PropUtils';
import { List, ListItem } from '../';
import SelectFieldButton from './SelectFieldButton';

const TILE_HEIGHT = 48;
const LIST_MARGIN = 8;

export default class SelectButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false, focused: false };
    if(typeof props.value === 'undefined') {
      this.state.selected = props.menuItems[0];
    }
  }

  static propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    menuItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
    ])).isRequired,
    itemLabel: PropTypes.string,
    itemValue: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.bool,
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']),
    editable: PropTypes.bool,
    segmented: PropTypes.bool,
    onChange: PropTypes.func,
    menuBelow: PropTypes.bool,
    expandRight: PropTypes.bool,
    itemsVisible: PropTypes.number,
  }

  static defaultProps = {
    itemLabel: 'label',
    itemValue: 'value',
    lineDirection: 'left',
    itemsVisible: 5,
  }

  componentWillUpdate(nextProps) {
    if(typeof nextProps.value === 'undefined' && typeof this.state.selected === 'undefined' && nextProps.menuItems.length) {
      this.setState({ selected: nextProps.menuItems[0] });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(isPropEnabled(this.props, 'below') || this.state.isOpen === prevState.isOpen || !this.state.isOpen) { return; }
    const menu = ReactDOM.findDOMNode(this).querySelector('.md-dropdown-menu');
    const items = Array.prototype.slice.call(menu.querySelectorAll('.md-list-tile'));
    const maxScrollDistance = menu.scrollHeight - menu.offsetHeight;
    let index = 0, maxWidth = 0;
    items.forEach((item, i) => {
      if(item.classList.contains('active')) {
        index = i;
      }

      maxWidth = Math.max(maxWidth, item.offsetWidth);
    });
    menu.style.width = `${maxWidth + 32}px`;

    const selected = items[index];
    const maxHeight = menu.offsetHeight - TILE_HEIGHT - LIST_MARGIN;

    const scrollTop = selected.offsetTop - TILE_HEIGHT - LIST_MARGIN;
    const scrollDiff = scrollTop - maxScrollDistance;
    const x = isPropEnabled(this.props, 'expandRight') ? '0px' : '100%';

    let top = Math.min(selected.offsetTop, maxHeight);
    if(index === items.length - 2) {
      top = maxHeight - TILE_HEIGHT;
    } else if(index > 0 && scrollDiff <= 0) {
      top = TILE_HEIGHT + LIST_MARGIN;
    } else if(index > 0 && items.length > this.props.itemsVisible && index < items.length - 2) {
      top = top - (scrollTop - (scrollTop - maxScrollDistance));
    }

    if(scrollTop > 0) {
      menu.scrollTop = scrollTop;
    }

    menu.style.top = `-${top}px`;
    // Expands/shrinks menu to center of button
    menu.style.transformOrigin = `${x} ${top + TILE_HEIGHT / 2}px`;
  }

  getSelected = (key) => {
    const { value } = this.props;
    if(typeof value !== 'undefined') {
      return value;
    }

    const { selected } = this.state;
    if(typeof selected === 'undefined') {
      return '';
    } else if(isObject(selected)) {
      return selected[key];
    } else {
      return selected;
    }
  }

  handleFocus = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ focused: true });
  }

  handleBlur = () => {
    this.setState({ focused: false });
  }

  selectItem = (item, index) => {
    const { value, onChange } = this.props;
    onChange && onChange(item, index);

    let nextState = { isOpen: false };
    if(typeof value === 'undefined') {
      nextState.selected = item;
    }

    this.setState(nextState);
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleKeyUp = (item, i, e) => {
    const key = e.which || e.keyCode;
    if(key === 13 || key === 32) {
      this.selectItem(item, i);
      e.preventDefault();
    }
  }

  render() {
    const { name, className, menuItems, error, lineDirection, itemLabel, itemValue, value, ...props } = this.props;
    const { focused, isOpen, selected } = this.state;

    const displayLabel = this.getSelected(itemLabel);
    const displayValue = this.getSelected(itemValue);
    const fieldClassName= classnames('md-select-field', {
      'focus': focused || isOpen,
      'segmented': isPropEnabled(props, 'segmented'),
    });
    return (
      <div className={classnames('md-dropdown-container', className)} {...props}>
        <SelectFieldButton
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          label={displayLabel}
          value={displayValue}
          onClick={this.toggleMenu}
          className={fieldClassName}
          name={name}
        />
        <CSSTransitionGroup
          transitionName="menu"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          >
          {isOpen &&
          <List
            className={classnames('md-dropdown-menu', {
              'menu-below': isPropEnabled(props, 'below'),
            })}
            >
            {menuItems.map((item, i) => {
              return (
                <ListItem
                  primaryText={isObject(item) ? item[itemLabel] : item}
                  key={item.key || i}
                  onClick={this.selectItem.bind(this, item, i)}
                  onKeyUp={this.handleKeyUp.bind(this, item, i)}
                  className={classnames({ 'active': item === value || item === selected })}
                />
              );
            })}
          </List>
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}
