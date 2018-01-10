import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import themeColors from '../utils/themeColors';
import getCollapserStyles from '../utils/getCollapserStyles';
import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import { TAB } from '../constants/keyCodes';
import anchorShape from '../Helpers/anchorShape';
import fixedToShape from '../Helpers/fixedToShape';
import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';
import Collapse from '../Helpers/Collapse';
import FontIcon from '../FontIcons/FontIcon';
import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
import TileAddon from './TileAddon';
import ListItemText from './ListItemText';
import List from './List';
import Menu from '../Menus/Menu';

/**
 * The `ListItem` component is used for rendering a `li` tag with text and optional
 * icons/avatars.
 */
export default class ListItem extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the `li` tag.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the `li` tag.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the `.md-list-tile`.
     *
     * @see {@link #component}
     */
    tileStyle: PropTypes.object,

    /**
     * An optional className to apply to the `.md-list-tile`.
     *
     * @see {@link #component}
     */
    tileClassName: PropTypes.string,

    /**
     * An optional style to apply to the div that surrounds the `primaryText` and `secondaryText`
     * nodes.
     */
    contentStyle: PropTypes.object,

    /**
     * An optional className to apply to the div that surrounds the `primaryText` and `secondaryText`
     * nodes.
     */
    contentClassName: PropTypes.string,

    /**
     * An optional style to apply to the element that is rendered before content node.
     */
    leftNodeStyle: PropTypes.object,

    /**
     * An optional className to apply to the element that is rendered before content node.
     */
    leftNodeClassName: PropTypes.string,

    /**
     * An optional style to apply to the element that is rendered after content node.
     */
    rightNodeStyle: PropTypes.object,

    /**
     * An optional className to apply to the element that is rendered after content node.
     */
    rightNodeClassName: PropTypes.string,

    /**
     * An optional style to apply to the div surrounding the `primaryText`.
     */
    primaryTextStyle: PropTypes.object,

    /**
     * An optional className to apply to the div surrounding the `primaryText`.
     */
    primaryTextClassName: PropTypes.string,

    /**
     * An optional style to apply to the div surrounding the `secondaryText`.
     */
    secondaryTextStyle: PropTypes.object,

    /**
     * An optional className to apply to the div surrounding the `secondaryText`.
     */
    secondaryTextClassName: PropTypes.string,

    /**
     * An optional style to apply to the nested `List` that gets created when using `nestedItems`.
     */
    nestedListStyle: PropTypes.object,

    /**
     * An optional className to apply to the nested `List` that gets created when using `nestedItems`.
     */
    nestedListClassName: PropTypes.string,

    /**
     * Boolean if the nested `List` in a cascading menu should be restricted.
     */
    nestedListHeightRestricted: PropTypes.bool,

    /**
     * Any additional children to display in the `.md-list-tile`. If you use this prop,
     * you will most likely need to override the `height` for the `.md-list-tile--icon`,
     * `.md-list-tile--avatar`, `.md-list-tile--two-lines`, and/or `.md-list-tile--three-lines`
     * to get it to display correctly unless the children are positioned `absolute`.
     */
    children: PropTypes.node,

    /**
     * Boolean if the `ListItem` is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional tab index for the `.md-list-tile`. If omitted, it will default to the
     * `AccessibleFakeButton`'s `tabIndex` default prop value.
     */
    tabIndex: PropTypes.number,

    /**
     * The primary text to display. This will only be rendered as a single line. Any overflown
     * text will be converted to ellipsis.
     */
    primaryText: PropTypes.node.isRequired,

    /**
     * An optional secondary text to display below the `primaryText`. This can be an additional
     * one or two lines. Like the `primaryText`, and overflown text will be converted to ellipsis.
     *
     * You must set the `threeLines` prop to `true` if you want this to be displayed as two lines.
     */
    secondaryText: PropTypes.node,

    /**
     * An optional `FontIcon` to display to the left of the text.
     */
    leftIcon: PropTypes.node,

    /**
     * An optional `Avatar` to display to the left of the text. If you have a mixed `List` of
     * `FontIcon` and `Avatar`, it is recommended to set the `iconSized` prop on the `Avatar` to
     * `true` so that the `Avatar` will be scaled down to the `FontIcon` size.
     */
    leftAvatar: PropTypes.node,

    /**
     * An optional `FontIcon` to display to the right of the text.
     */
    rightIcon: PropTypes.node,

    /**
     * An optional `Avatar` to display to the right of the text. If you have a mixed `List` of
     * `FontIcon` and `Avatar`, it is recommended to set the `iconSized` prop on the `Avatar` to
     * `true` so that the `Avatar` will be scaled down to the `FontIcon` size.
     */
    rightAvatar: PropTypes.node,

    /**
     * Boolean if the list item should be inset as if there is a `leftIcon` or a `leftAvatar`.
     * This is used for some lists where only a parent contains the icon.
     */
    inset: PropTypes.bool,

    /**
     * Boolean if the `secondaryText` should span two lines instead of one. This will include
     * three lines of text in total when including the `primaryText`.
     */
    threeLines: PropTypes.bool,

    /**
     * The component to render the `.md-list-tile` as. This is mostly useful if you
     * want to use the `ListItem` for navigation and working with the `react-router`'s `Link`
     * component.
     *
     * This prop is **not** the top-most element of the `ListItem` component. To change the
     * top-most element, see the `itemComponent` prop.
     *
     * @see {@link #itemComponent}
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,

    /**
     * The component to render the top-most element of the `ListItem` component. This is the
     * `.md-list-item` and defaults to the `<li>` element.
     *
     * @see {@link #component}
     * @see {@link #itemProps}
     */
    itemComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,

    /**
     * An optional ref callback to get reference to the top-most element of the `ListItem` component.
     * Just like other refs, this will provide null when it unmounts.
     */
    itemRef: PropTypes.func,

    /**
     * An optional list of `ListItem`, `ListItemControl`, `Divider`, or `Subheader` components
     * to render in a nested list. This will inject an expander icon to the right of the text
     * in the `.md-list-tile` that rotates 180 degrees when open.
     *
     * The nested items will be visible once the user clicks on the `ListItem`.
     *
     * @see {@link #visible}
     */
    nestedItems: PropTypes.arrayOf(PropTypes.node),

    /**
     * An optional parameter determining whether `nestedItems` should be placed before or after `ListItemText`
     */
    prependNested: PropTypes.bool,

    /**
     * Boolean if the `nestedItems` are visible by default.
     */
    defaultVisible: PropTypes.bool,

    /**
     * Boolean if the `nestedItems` are visible. This will make the `nestedItems` controlled
     * and require the `onClick` function to be defined.
     *
     * @see {@link #defaultVisible}
     */
    visible: controlled(PropTypes.bool, 'onClick', 'defaultVisible'),

    /**
     * An icon to use for the expander icon when there are nested items.
     */
    expanderIcon: PropTypes.element,

    /**
     * Boolean if the expander icon should appear as the left icon instead of the right.
     */
    expanderLeft: PropTypes.bool,

    /**
     * An optional function to call when the `.md-list-tile` is clicked. This is required if the
     * `visible` prop is defined.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the `.md-list-tile` triggers the `mouseover` event.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call when the `.md-list-tile` triggers the `mouseleave` event.
     */
    onMouseLeave: PropTypes.func,

    /**
     * An optional function to call when the `.md-list-tile` triggers the `touchstart` event.
     */
    onTouchStart: PropTypes.func,

    /**
     * An optional function to call when the `.md-list-tile` triggers the `touchend` event.
     */
    onTouchEnd: PropTypes.func,

    /**
     * An optional function to call when the `.md-list-tile` triggers the `keydown` event.
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional function to call when the `.md-list-tile` triggers the `keyup` event.
     */
    onKeyUp: PropTypes.func,

    /**
     * Boolean if the `ListItem` is currently active. This will apply the `activeClassName` prop
     * to the `leftIcon`, `rightIcon`, and the `primaryText`.
     */
    active: PropTypes.bool,

    /**
     * The className to apply to the `leftIcon`, `rightIcon`, and `primaryText` when the `active`
     * prop is `true`.
     */
    activeClassName: PropTypes.string,

    /**
     * An optional style to apply to the top-most element of the `ListItem` component (`.md-list-item`)
     * when the `active` prop is `true`.
     */
    activeBoxStyle: PropTypes.object,

    /**
     * The className to apply to the top-most element of the `ListItem` component (`.md-list-item`)
     * when the `active` prop is `true`.
     */
    activeBoxClassName: PropTypes.string,

    /**
     * Boolean if the nested items should animate when they appear or disappear.
     */
    animateNestedItems: PropTypes.bool,

    /**
     * Defines the number of items in the list. This is only required when all items in the
     * list are not present in the DOM.
     *
     * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-setsize
     */
    'aria-setsize': PropTypes.number,

    /**
     * Defines the items position in the list. This is only required when all items in the list
     * are not present in the DOM. The custom validation just requires this prop if the `aria-setsize`
     * prop is defined as a helpful reminder.
     *
     * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-posinset
     */
    'aria-posinset': (props, propName, ...args) => {
      let validator = PropTypes.number;
      if (typeof props['aria-setsize'] !== 'undefined') {
        validator = validator.isRequired;
      }

      return validator(props, propName, ...args);
    },

    /**
     * Any additional props you would like to supply to the surrounding `<li>` tag for the `ListItem`.
     * By default, all props will be provided to the inner `AccessibleFakeButton`. If the `passPropsToItem`
     * prop is enabled, the remaining props will be provided to the `<li>` tag instead and this prop
     * is probably useless.
     */
    itemProps: PropTypes.object,

    /**
     * Any additional props you would like to add to the inner `AccessibleFakeButton`. By default, all the
     * remaining props will be provided to the `AccessibleFakeButton`, so this prop is probably useless.
     * Enabling the `passPropsToItem` prop will change the default behavior so that the remaining props
     * are provided to the surrounding `<li>` node instead and this prop becomes useful.
     */
    tileProps: PropTypes.object,

    /**
     * All the remaining props should be passed to the surrounding `<li>` node instead of the `AccessibleFakeButton`.
     *
     * > NOTE: This will most likely become the default in the next *major* release. Migration warnings will be added
     * if that is the case.
     */
    passPropsToItem: PropTypes.bool,
    expanderIconChildren: deprecated(PropTypes.node, 'Use `expanderIcon` instead'),
    expanderIconClassName: deprecated(PropTypes.string, 'Use `expanderIcon` instead'),
    initiallyOpen: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
    defaultOpen: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
  };

  static defaultProps = {
    animateNestedItems: true,
    activeClassName: 'md-text--theme-primary',
    component: 'div',
    itemComponent: 'li',
    expanderIcon: <FontIcon>keyboard_arrow_down</FontIcon>,
  };

  static contextTypes = {
    cascadingId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    cascadingMenu: PropTypes.bool,
    cascadingAnchor: anchorShape,
    cascadingFixedTo: fixedToShape,
  };

  constructor(props) {
    super(props);

    this.state = { active: false };

    if (typeof props.isOpen === 'undefined' && typeof props.visible === 'undefined') {
      const defined = v => typeof v !== 'undefined';
      const { initiallyOpen, defaultOpen, defaultVisible } = this.props;
      let visible = defined(initiallyOpen) ? initiallyOpen : defaultVisible;
      visible = defined(defaultOpen) ? defaultOpen : visible;
      visible = !!visible;

      this.state.visible = visible;
    }
  }

  componentWillUnmount() {
    if (this.state.active) {
      window.removeEventListener('click', this._handleOutsideClick);
    }

    if (this._touchTimeout) {
      clearTimeout(this._touchTimeout);
    }
  }

  /**
   * A utility function to focus the `AccessibleFakeInkedButton` in the `ListItem` and also
   * inject an ink to indicate focus.
   */
  focus = () => {
    if (this._tile) {
      this._tile.focus();
    }
  };

  /**
   * A utility function to blur the `AccessibleFakeInkedButton` in the `ListItem`.
   */
  blur = () => {
    if (this._tile) {
      this._tile.blur();
    }
  };

  _setTile = (tile) => {
    if (tile) {
      this._tile = tile;
      this._tileNode = findDOMNode(tile);
    }
  };

  _setContainer = (container) => {
    const { itemRef } = this.props;
    if (container) {
      this._container = findDOMNode(container);
    }
    if (itemRef) {
      itemRef(container ? this._container : null);
    }
  };

  _handleOutsideClick = (e) => {
    if (this._container && !this._container.contains(e.target)) {
      window.removeEventListener('click', this._handleOutsideClick);
      this.setState({ active: false });
    }
  };

  _handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (typeof this.state.visible !== 'undefined') {
      this.setState({ visible: !this.state.visible });
    }
  };

  _handleMouseOver = (e) => {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    if (!this.props.disabled) {
      this.setState({ active: true });
    }
  };

  _handleMouseLeave = (e) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (!this.props.disabled) {
      this.setState({ active: false });
    }
  };

  _handleTouchStart = (e) => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    this._touched = true;

    this.setState({ active: true, touchedAt: Date.now() });
  };

  _handleTouchEnd = (e) => {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    const time = Date.now() - this.state.touchedAt;
    this._touchTimeout = setTimeout(() => {
      this._touchTimeout = null;

      this.setState({ active: false });
    }, time > 450 ? 0 : 450 - time);
  };

  _handleKeyUp = (e) => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }

    if ((e.which || e.keyCode) === TAB) {
      window.addEventListener('click', this._handleOutsideClick);
      this.setState({ active: true });
    }
  };

  _handleKeyDown = (e) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if ((e.which || e.keyCode) === TAB) {
      window.removeEventListener('click', this._handleOutsideClick);
      this.setState({ active: false });
    }
  };

  render() {
    const {
      style,
      className,
      tileStyle,
      tileClassName,
      contentStyle,
      contentClassName,
      leftNodeStyle,
      leftNodeClassName,
      rightNodeStyle,
      rightNodeClassName,
      primaryTextStyle,
      primaryTextClassName,
      secondaryTextStyle,
      secondaryTextClassName,
      nestedListStyle,
      nestedListClassName,
      nestedListHeightRestricted,
      disabled,
      leftIcon,
      leftAvatar,
      inset,
      rightIcon,
      rightAvatar,
      primaryText,
      secondaryText,
      threeLines,
      children,
      nestedItems,
      prependNested,
      active,
      activeClassName,
      activeBoxStyle,
      activeBoxClassName,
      animateNestedItems,
      expanderIcon,
      expanderLeft,
      component,
      itemComponent: ItemComponent,
      itemProps,
      tileProps,
      passPropsToItem,
      'aria-setsize': ariaSize,
      'aria-posinset': ariaPos,

      // deprecated
      isOpen,
      expanderIconChildren,
      expanderIconClassName,
      /* eslint-disable no-unused-vars */
      visible: propVisible,
      defaultVisible,
      itemRef,

      // deprecated
      defaultOpen,
      initiallyOpen,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const { cascadingId, cascadingMenu, cascadingAnchor, cascadingFixedTo } = this.context;
    let visible = getField(this.props, this.state, 'visible');
    if (typeof isOpen !== 'undefined') {
      visible = isOpen;
    }

    let leftNode = (
      <TileAddon
        key="left-addon"
        style={leftNodeStyle}
        className={leftNodeClassName}
        active={active}
        activeClassName={activeClassName}
        icon={leftIcon}
        avatar={leftAvatar}
      />
    );

    let rightNode = (
      <TileAddon
        key="right-addon"
        style={rightNodeStyle}
        className={rightNodeClassName}
        active={active}
        activeClassName={activeClassName}
        icon={rightIcon}
        avatar={rightAvatar}
      />
    );

    let nestedList;
    if (nestedItems) {
      if (!cascadingMenu) {
        nestedList = (
          <Collapse collapsed={!visible} animate={animateNestedItems}>
            <List style={nestedListStyle} className={nestedListClassName}>{nestedItems}</List>
          </Collapse>
        );
      }

      const icon = React.Children.only(getDeprecatedIcon(expanderIconClassName, expanderIconChildren, expanderIcon));
      const collapser = (
        <TileAddon
          key="expander-addon"
          icon={React.cloneElement(icon, {
            className: getCollapserStyles({ flipped: visible }, icon.props.className),
          })}
          avatar={null}
        />
      );

      if (expanderLeft) {
        if (!leftIcon && !leftAvatar) {
          leftNode = collapser;
        }
      } else if (!rightIcon && !rightAvatar) {
        rightNode = collapser;
      }
    }

    const icond = !!leftIcon || !!rightIcon || !!nestedItems;
    const avatard = !!leftAvatar || !!rightAvatar;

    const tile = (
      <AccessibleFakeInkedButton
        {...tileProps}
        {...(passPropsToItem ? undefined : props)}
        component={component}
        __SUPER_SECRET_REF__={this._setTile}
        key="tile"
        onClick={this._handleClick}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}
        onKeyDown={this._handleKeyDown}
        onKeyUp={this._handleKeyUp}
        disabled={disabled}
        style={tileStyle}
        className={cn('md-list-tile', {
          'md-list-tile--active': this.state.active && !this._touched,
          'md-list-tile--icon': !secondaryText && icond && !avatard,
          'md-list-tile--avatar': !secondaryText && avatard,
          'md-list-tile--two-lines': secondaryText && !threeLines,
          'md-list-tile--three-lines': secondaryText && threeLines,
          'md-list-item--inset': inset && !leftIcon && !leftAvatar,
        }, themeColors({ disabled, text: true }), tileClassName)}
        aria-expanded={nestedList && !cascadingMenu ? visible : null}
      >
        {leftNode}
        <ListItemText
          active={active}
          activeClassName={activeClassName}
          disabled={disabled}
          primaryText={primaryText}
          secondaryText={secondaryText}
          threeLines={threeLines}
          style={contentStyle}
          className={cn({
            'md-tile-content--left-icon': leftIcon || expanderLeft && nestedItems,
            'md-tile-content--left-avatar': leftAvatar,
            'md-tile-content--right-padding': rightIcon || rightAvatar,
          }, contentClassName)}
          primaryTextStyle={primaryTextStyle}
          primaryTextClassName={primaryTextClassName}
          secondaryTextStyle={secondaryTextStyle}
          secondaryTextClassName={secondaryTextClassName}
        />
        {rightNode}
        {children}
      </AccessibleFakeInkedButton>
    );

    const sharedProps = {
      ...itemProps,
      ...(passPropsToItem ? props : undefined),
      style: Object.assign({}, style, active ? activeBoxStyle : null),
      className: cn('md-list-item', {
        'md-list-item--nested-container': nestedItems,
        [activeBoxClassName]: activeBoxClassName && active,
      }, className),
      'aria-setsize': ariaSize,
      'aria-posinset': ariaPos,
      ref: this._setContainer,
    };
    if (cascadingMenu && nestedItems) {
      return (
        <Menu
          id={cascadingId}
          visible={visible}
          onClose={this._handleClick}
          toggle={tile}
          block
          simplified={false}
          anchor={cascadingAnchor}
          belowAnchor={null}
          position={Menu.Positions.BELOW}
          component={ItemComponent}
          listStyle={nestedListStyle}
          listClassName={nestedListClassName}
          listHeightRestricted={nestedListHeightRestricted}
          {...sharedProps}
          fixedTo={cascadingFixedTo}
        >
          {nestedItems}
        </Menu>
      );
    }

    return (
      <ItemComponent {...sharedProps}>
        {prependNested ? nestedList : null}
        {tile}
        {prependNested ? null : nestedList}
      </ItemComponent>
    );
  }
}
