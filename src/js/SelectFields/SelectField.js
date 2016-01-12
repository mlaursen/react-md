import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { isPropEnabled, isObject } from '../utils/PropUtils';
import { List, ListItem } from '../';
import SelectFieldButton from './SelectFieldButton';

const LIST_MARGIN = 8;

export default class SelectField extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false, focused: false };
    if(typeof props.value === 'undefined') {
      this.state.selected = props.defaultValue;
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
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    onChange: PropTypes.func,
    expandRight: PropTypes.bool,
    itemsVisible: PropTypes.number,
    textFieldPositioned: PropTypes.bool,
    defaultValue: PropTypes.string,
    menuBelow: PropTypes.bool,
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']),
    editable: PropTypes.bool,
    segmented: PropTypes.bool,
    error: PropTypes.bool,
  };

  static defaultProps = {
    itemLabel: 'label',
    itemValue: 'value',
    lineDirection: 'left',
    itemsVisible: 6,
    defaultValue: '',
  };

  componentWillUpdate(nextProps) {
    if(typeof nextProps.value === 'undefined' && typeof this.state.selected === 'undefined' && nextProps.menuItems.length) {
      this.setState({ selected: nextProps.menuItems[0] });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.isOpen === prevState.isOpen) { return; }
    if(!this.state.isOpen) {
      document.removeEventListener('click', this.closeMenuListener);
      this.closeMenuListener = null;
    } else if(!this.closeMenuListener) {
      this.closeMenuListener = this.handleClickOutside;
      document.addEventListener('click', this.closeMenuListener);
    }

    if(isPropEnabled(this.props, 'below') || !this.state.isOpen) { return; }

    const menu = ReactDOM.findDOMNode(this).querySelector('.md-dropdown-menu');
    const items = Array.prototype.slice.call(menu.querySelectorAll('.md-list-tile'));
    const maxScrollDistance = menu.scrollHeight - menu.offsetHeight;
    let index = 0;
    items.forEach((item, i) => {
      if(item.classList.contains('active')) {
        index = i;
      }
    });

    const tileHeight = items[0].offsetHeight - LIST_MARGIN;
    const selected = items[index];
    const maxHeight = menu.offsetHeight - tileHeight - LIST_MARGIN;
    const { itemsVisible } = this.props;

    const scrollTop = selected.offsetTop - tileHeight - LIST_MARGIN;
    const scrollDiff = scrollTop - maxScrollDistance;
    const x = isPropEnabled(this.props, 'expandRight') ? '0px' : '100%';

    let top = Math.min(selected.offsetTop - LIST_MARGIN + 12, maxHeight);
    if(items.length > 3 && index === items.length - 2) {
      top = maxHeight - tileHeight + LIST_MARGIN / 2;
    } else if(index > 0 && scrollDiff <= 0) {
      top = tileHeight + LIST_MARGIN + LIST_MARGIN / 2;
    } else if(index > 0 && items.length > itemsVisible && index < items.length - 2) {
      top = top - (items.length - 1 - index) * tileHeight + LIST_MARGIN / 2;
    }

    if(scrollTop > 0) {
      menu.scrollTop = scrollTop;
    }

    menu.style.top = `-${top}px`;
    // Expands/shrinks menu to center of button
    menu.style.transformOrigin = `${x} ${top + tileHeight / 2}px`;
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
  };

  handleFocus = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  selectItem = (item, index) => {
    const { value, onChange } = this.props;
    onChange && onChange(item, index);

    let nextState = { isOpen: false };
    if(typeof value === 'undefined') {
      nextState.selected = item;
    }

    this.setState(nextState);
  };

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleClickOutside = (e) => {
    const node = ReactDOM.findDOMNode(this);
    let target = e.target;
    while(target.parentNode) {
      if(target === node) { return; }
      target = target.parentNode;
    }

    this.setState({ isOpen: false });
  };

  handleKeyUp = (item, i, e) => {
    const key = e.which || e.keyCode;
    if(key === 13 || key === 32) {
      this.selectItem(item, i);
      e.preventDefault();
    }
  };

  render() {
    const { name, className, menuItems, error, lineDirection, itemLabel, itemValue, value, placeholder, ...props } = this.props;
    const { focused, isOpen, selected } = this.state;

    const isBelow = isPropEnabled(props, 'below');
    const displayLabel = this.getSelected(itemLabel);
    const displayValue = this.getSelected(itemValue);
    const fieldClassName= classnames('md-select-field', {
      'focus': focused || isOpen,
      'segmented': isPropEnabled(props, 'segmented'),
      'text-field-positioned': isPropEnabled(props, 'textFieldPositioned'),
      'placeholder': displayLabel === '' && placeholder,
    });

    return (
      <div className={classnames('md-dropdown-container', className)} {...props}>
        <SelectFieldButton
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          label={displayLabel || placeholder}
          value={displayValue}
          onClick={this.toggleMenu}
          className={fieldClassName}
          name={name}
          isOpen={isOpen}
          isBelow={isBelow}
        />
        <CSSTransitionGroup
          transitionName="menu"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          >
          {isOpen &&
          <List className={classnames('md-dropdown-menu', { 'menu-below': isBelow })}>
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
