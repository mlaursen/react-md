import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isObject } from '../utils';
import { SPACE, ENTER } from '../constants/keyCodes';

import { ListItem } from '../Lists';
import FontIcon from '../FontIcons';
import TextField from '../TextFields';
import Menu from '../Menus';

export default class SelectField extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      open: props.initiallyOpen,
      focused: props.initiallyOpen,
      value: props.defaultValue,
      size: this.calcSize(props),
    };
  }

  static Positions = {
    TOP_LEFT: Menu.Positions.TOP_LEFT,
    TOP_RIGHT: Menu.Positions.TOP_RIGHT,
    BOTTOM: 'below',
  };

  static propTypes = {
    className: PropTypes.string,
    listClassName: PropTypes.string,
    menuClassName: PropTypes.string,
    initiallyOpen: PropTypes.bool,
    floatingLabel: PropTypes.bool,
    label: PropTypes.string,
    itemLabel: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    menuItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ])).isRequired,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    position: PropTypes.oneOf(Object.keys(SelectField.Positions).map(key => SelectField.Positions[key])),
    noAutoAdjust: PropTypes.bool,
    iconClassName: PropTypes.string.isRequired,
    iconChildren: PropTypes.node.isRequired,
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
  };

  componentWillUpdate(nextProps) {
    const { menuItems } = this.props;
    if(menuItems !== nextProps.menuItems || menuItems.length !== nextProps.menuItems.length) {
      this.setState({ size: this.calcSize(nextProps) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { noAutoAdjust } = this.props;
    const { open } = this.state;
    if(open === prevState.open || noAutoAdjust) { return; }
    const node = ReactDOM.findDOMNode(this);
    if(open) {
      (node.querySelector('.md-list-tile.active') || node.querySelector('.md-list-tile')).focus();
    } else {
      node.querySelector('.md-text-field').focus();
    }

    if(open) {
      this.calcMenuPosition();
    }
  }

  /**
   * Finds the longest menu item value to use as the text field's size.to that value.
   * If there is a floating label, it also checks against the label's size so that
   * the floating label won't be clipped
   */
  calcSize = ({ menuItems, itemLabel, label, floatingLabel } = this.props) => {
    const items = menuItems.slice();
    if(label && floatingLabel) {
      items.push(label);
    }

    return items.reduce((prev, curr) => {
      const len = (isObject(curr) ? curr[itemLabel] : curr.toString()).length;
      return Math.max(prev, len);
    }, 0);
  };

  /**
   * Sets the transform-origin for the dropdown menu so that the menu will appear
   * from the text field's baseline.
   *
   * Sets the top position to be one list item down if the first item is not selected.
   *
   * Scrolls the current item into view
   */
  calcMenuPosition = () => {
    const node = ReactDOM.findDOMNode(this);
    const menu = node.querySelector('.md-menu');

    // the item will be the first active one (if valued) otherwise, set the transform-origin as first list item
    const item = menu.querySelector('.md-list-tile.active') || menu.querySelector('.md-list-tile');

    // The height changes based on screen size and if floating label or not.
    const height = node.offsetHeight;
    const diff = item.offsetTop - item.offsetHeight;

    const paddingTop = parseInt(window.getComputedStyle(menu).getPropertyValue('padding-top'));

    const { position } = this.props;
    let transformOrigin, top;
    if(SelectField.Positions.BOTTOM !== position) {
      const x = SelectField.Positions.TOP_LEFT === position ? '0' : '100%';
      const y = (diff < 0 ? 0 : height) + (height / 2) + paddingTop;
      transformOrigin = `${x} ${y}px`;
    }

    // padding top for mobile (desktop is 4)
    if(diff > 8) {
      menu.scrollTop = diff;
    }

    if(diff > 0) {
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
  };

  getValue = (props = this.props, state = this.state) => {
    if(typeof props.value !== 'undefined') {
      return props.value;
    }

    const { value } = state;
    if(typeof value === 'undefined') {
      return '';
    } else if(isObject(value)) {
      return value[props.itemLabel];
    } else {
      return value;
    }
  };

  isActive = (item, displayLabel) => {
    if(typeof item === 'string' || typeof item === 'number') {
      return item === displayLabel;
    } else {
      return item[this.props.itemLabel] === displayLabel;
    }
  };

  selectItem = (item, e) => {
    const { onChange, itemLabel } = this.props;
    onChange && onChange(item, e);

    this.setState({
      open: false,
      value: isObject(item) ? item[itemLabel] : item,
    });
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  close = () => {
    this.setState({ open: false });
  };

  handleClick = (e) => {
    this.props.onClick && this.props.onClick(e);
    this.toggle();
  };

  handleKeyDown = (e) => {
    this.props.onKeyDown && this.props.onKeyDown(e);

    const key = e.which || e.keyCode;
    if(key !== SPACE && key !== ENTER) { return; }

    // prevents scrolling for spacebar
    e.preventDefault();
    this.setState({ open: true });
  };

  handleItemKeyDown = (item, e) => {
    const key = e.which || e.keyCode;
    if(key !== SPACE && key !== ENTER) { return; }

    // prevents scrolling for spacebar
    e.preventDefault();
    this.selectItem(item, e);
  };

  render() {
    const { open, size, listStyle } = this.state;
    const {
      label,
      floatingLabel,
      menuItems,
      itemLabel,
      position,
      className,
      listClassName,
      menuClassName,
      iconClassName,
      iconChildren,
      ...props,
    } = this.props;

    const displayLabel = this.getValue();

    const toggle = (
      <TextField
        className={classnames('md-select-field', className)}
        containerClassName="md-select-field-container"
        readOnly={true}
        value={displayLabel}
        label={label}
        floatingLabel={floatingLabel}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        rightIcon={<FontIcon iconClassName={iconClassName}>{iconChildren}</FontIcon>}
        size={size}
      />
    );
    return (
      <Menu
        isOpen={open}
        close={this.close}
        toggle={toggle}
        listStyle={listStyle}
        className={menuClassName}
        listClassName={classnames('md-select-field-menu', listClassName, { 'single-line': !floatingLabel })}
        position={position}
        {...props}
      >
        {menuItems.map((item, i) => {
          return (
            <ListItem
              primaryText={isObject(item) ? item[itemLabel] : item}
              key={item.key || i}
              onClick={this.selectItem.bind(this, item)}
              onKeyDown={this.handleItemKeyDown.bind(this, item)}
              className={classnames({ 'active': this.isActive(item, displayLabel) })}
            />
          );
        })}
      </Menu>
    );
  }
}
