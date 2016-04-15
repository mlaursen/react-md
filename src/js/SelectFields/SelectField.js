import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isObject } from '../utils';
import { SPACE, ENTER } from '../constants/keyCodes';

import { ListItem } from '../Lists';
import FontIcon from '../FontIcons';
import Menu from '../Menus';
import SelectFieldControl from './SelectFieldControl';

const LIST_PADDING = 8;

/**
 * A SelectField is a material design inspired `<select>` component.
 */
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
    BELOW: Menu.Positions.BELOW,
  };

  static propTypes = {
    /**
     * An optional className to apply to the text field in the select field.
     */
    className: PropTypes.string,

    /**
     * An optional className to apply to the menu list.
     */
    listClassName: PropTypes.string,

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
    position: PropTypes.oneOf(Object.keys(SelectField.Positions).map(key => SelectField.Positions[key])),

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
    const { position, noAutoAdjust } = this.props;
    const { open } = this.state;
    if(this.getValue(prevProps, prevState) !== this.getValue(this.props, this.state)) {
      this.animateNewValue();
    }

    if(open === prevState.open || noAutoAdjust) { return; }
    const node = ReactDOM.findDOMNode(this);
    const item = this.getListItem();
    if(open) {
      item.focus();
    } else {
      node.querySelector('.md-text-field').focus();
    }

    if(!open) { return; }
    if(SelectField.Positions.BELOW === position) {
      const list = node.querySelector('.md-list');
      const scroll = this.getListItem().offsetTop;
      list.scrollTop = scroll <= LIST_PADDING ? 0 : scroll;
    } else {
      this.calcMenuPosition();
    }
  }

  componentWillUnmount() {
    this.state.timeout && clearTimeout(this.state.timeout);
  }

  /**
   * Gets the first active list item or the first list item if there are no active items.
   *
   * @return a list item element.
   */
  getListItem = () => {
    const node = ReactDOM.findDOMNode(this);

    return (node.querySelector('.md-list-tile.active') || node.querySelector('.md-list-tile')).parentNode;
  };

  animateNewValue = () => {
    this.setState({
      droppingClassName: 'drop-enter',
      timeout: setTimeout(() => {
        this.setState({
          droppingClassName: 'drop-enter drop-enter-active',
          timeout: setTimeout(() => {
            this.setState({ droppingClassName: null, timeout: null });
          }, 300),
        });
      }, 1),
    });
  };

  /**
   * Finds the longest menu item value to use as the text field's size.to that value.
   * If there is a floating label, it also checks against the label's size so that
   * the floating label won't be clipped
   */
  calcSize = ({ menuItems, itemLabel, label } = this.props) => {
    const items = menuItems.slice();
    if(label) {
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

    const item = this.getListItem();

    // The height changes based on screen size and if floating label or not.
    const height = node.offsetHeight;
    const diff = item.offsetTop - item.offsetHeight;

    const paddingTop = parseInt(window.getComputedStyle(menu).getPropertyValue('padding-top'));

    const { position } = this.props;
    let transformOrigin, top;
    if(SelectField.Positions.BELOW !== position) {
      const x = SelectField.Positions.TOP_LEFT === position ? '0' : '100%';
      const y = (diff < 0 ? 0 : height) + (height / 2) + paddingTop;
      transformOrigin = `${x} ${y}px`;
    }

    // padding top for mobile (desktop is 4)
    if(diff > LIST_PADDING) {
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
    // Prevents IE for toggling twice for some reason.
    e.preventDefault();
    this.props.onClick && this.props.onClick(e);
    if(this.props.disabled) { return; }

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
    const { open, size, listStyle, droppingClassName } = this.state;
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
      disabled,
      ...props,
    } = this.props;

    const displayLabel = this.getValue();
    const below = Menu.Positions.BELOW === position;

    const toggle = (
      <SelectFieldControl
        className={classnames(className, droppingClassName)}
        label={label}
        value={displayLabel}
        floatingLabel={floatingLabel}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        rightIcon={<FontIcon iconClassName={iconClassName}>{iconChildren}</FontIcon>}
        size={size}
        disabled={disabled}
        open={open}
        below={below}
        inkDisabled={!below}
      />
    );

    return (
      <Menu
        isOpen={open}
        close={this.close}
        toggle={toggle}
        listStyle={listStyle}
        className={classnames('md-select-field-menu-container', menuClassName)}
        listClassName={classnames('md-select-field-menu', listClassName, {
          'single-line': !floatingLabel,
        })}
        position={position}
        below={SelectField.Positions.BELOW === position}
        {...props}
      >
        {menuItems.map((item, i) => {
          return (
            <ListItem
              tabIndex={0}
              primaryText={isObject(item) ? item[itemLabel] : item}
              key={item.key || i}
              onClick={this.selectItem.bind(this, item)}
              onKeyDown={this.handleItemKeyDown.bind(this, item)}
              tileClassName={classnames({
                'active': this.isActive(item, displayLabel),
                'select-field-btn-tile': below,
              })}
            />
          );
        })}
      </Menu>
    );
  }
}
