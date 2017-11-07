import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import deprecated from 'react-prop-types/lib/deprecated';

import controlled from '../utils/PropTypes/controlled';
import anchorShape from '../Helpers/anchorShape';
import fixedToShape from '../Helpers/fixedToShape';
import positionShape from '../Helpers/positionShape';
import Button from '../Buttons/Button';
import DropdownMenu from './DropdownMenu';

/**
 * The `MenuButton` is a simple wrapper / combination of the `Button` and the `Menu`
 * components that can be uncontrolled.
 */
export default class MenuButton extends PureComponent {
  static Positions = DropdownMenu.Positions;
  static HorizontalAnchors = DropdownMenu.HorizontalAnchors;
  static VerticalAnchors = DropdownMenu.VerticalAnchors;
  static propTypes = {
    /**
     * An id to use for the menu button. This is required for accessibility.
     *
     * @see {@link Menus/Menu#id}
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

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
     * An optional id to provide to the button. If this is omitted, the button will automatically
     * gain an id of `${id}-toggle`.
     */
    buttonId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the button.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the button.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the surrounding menu.
     */
    menuStyle: PropTypes.object,

    /**
     * An optional className to apply to the surrounding menu.
     */
    menuClassName: PropTypes.string,

    /**
     * An optional style to apply to the list.
     */
    listStyle: PropTypes.object,

    /**
     * An optional class name to apply to the list.
     */
    listClassName: PropTypes.string,

    /**
     * Any additional props to provide to the list.
     *
     * @see {@link Menus/Menu#listProps}
     */
    listProps: PropTypes.object,

    /**
     * The z-depth to use for the list.
     *
     * @see {@link Menus/Menu/listZDepth}
     */
    listZDepth: PropTypes.number,

    /**
     * Boolean if the list should be displayed inline.
     *
     * @see {@link Lists/List#inline}
     */
    listInline: PropTypes.bool,

    /**
     * Boolean if the list's height should be restricted.
     *
     * @see {@link Menus/Menu#listHeightRestricted}
     */
    listHeightRestricted: PropTypes.bool,

    /**
     * Boolean if the menu's list is currently visible. If this is defined, it will
     * require the `onVisibilityChange` function to be defined since it will become
     * a controlled component.
     */
    visible: controlled(PropTypes.bool, 'onVisibilityChange', 'defaultVisible'),

    /**
     * Boolean if the menu's list should be visible by default.
     */
    defaultVisible: PropTypes.bool.isRequired,

    /**
     * An optional function to call when the button is clicked.
     *
     * @see {@link #onMenuClick}
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the `mousedown` event is triggered by the button.
     *
     * @see {@link #onMenuMouseDown}
     */
    onMouseDown: PropTypes.func,

    /**
     * An optional function to call when the `mouseup` event is triggered by the button.
     *
     * @see {@link #onMenuMouseUp}
     */
    onMouseUp: PropTypes.func,

    /**
     * An optional function to call when the `mouseenter` event is triggered by the button.
     *
     * @see {@link #onMenuMouseEnter}
     */
    onMouseEnter: PropTypes.func,

    /**
     * An optional function to call when the `mousemove` event is triggered by the button.
     *
     * @see {@link #onMenuMouseMove}
     */
    onMouseMove: PropTypes.func,

    /**
     * An optional function to call when the `mouseleave` event is triggered by the button.
     *
     * @see {@link #onMenuMouseLeave}
     */
    onMouseLeave: PropTypes.func,

    /**
     * An optional function to call when the `touchstart` event is triggered by the button.
     *
     * @see {@link #onMenuTouchStart}
     */
    onTouchStart: PropTypes.func,

    /**
     * An optional function to call when the `touchmove` event is triggered by the button.
     *
     * @see {@link #onMenuTouchMove}
     */
    onTouchMove: PropTypes.func,

    /**
     * An optional function to call when the `touchend` event is triggered by the button.
     *
     * @see {@link #onMenuTouchEnd}
     */
    onTouchEnd: PropTypes.func,

    /**
     * An optional function to call when the `touchcancel` event is triggered by the button.
     *
     * @see {@link #onMenuTouchCancel}
     */
    onTouchCancel: PropTypes.func,

    /**
     * An optional function to call when the `focus` event is triggered by the button.
     *
     * @see {@link #onMenuFocus}
     */
    onFocus: PropTypes.func,

    /**
     * An optional function to call when the `blur` event is triggered by the button.
     *
     * @see {@link #onMenuBlur}
     */
    onBlur: PropTypes.func,

    /**
     * An optional function to call when the `keydown` event is triggered by the button.
     *
     * @see {@link #onMenuKeyDown}
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional function to call when the `keyup` event is triggered by the button.
     *
     * @see {@link #onMenuKeyUp}
     */
    onKeyUp: PropTypes.func,

    /**
     * An optional function to call when any element in the entire `MenuButton` is clicked. This can be triggered
     * by clicking the button or any list item that appears in the menu list.
     *
     * @see {@link #onClick}
     */
    onMenuClick: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `mousedown` event.
     *
     * @see {@link #onMouseDown}
     */
    onMenuMouseDown: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `mouseup` event.
     *
     * @see {@link #onMouseUp}
     */
    onMenuMouseUp: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `mouseenter` event.
     *
     * @see {@link #onMouseEnter}
     */
    onMenuMouseEnter: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `mousemove` event.
     *
     * @see {@link #onMouseMove}
     */
    onMenuMouseMove: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `mouseleave` event.
     *
     * @see {@link #onMouseLeave}
     */
    onMenuMouseLeave: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `touchstart` event.
     *
     * @see {@link @onTouchStart}
     */
    onMenuTouchStart: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `touchmove` event.
     *
     * @see {@link @onTouchMove}
     */
    onMenuTouchMove: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `touchend` event.
     *
     * @see {@link @onTouchEnd}
     */
    onMenuTouchEnd: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `touchcancel` event.
     *
     * @see {@link @onTouchCancel}
     */
    onMenuTouchCancel: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `focus` event.
     *
     * @see {@link #onFocus}
     */
    onMenuFocus: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `blur` event.
     *
     * @see {@link #onBlur}
     */
    onMenuBlur: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `keydown` event.
     *
     * @see {@link #onKeyDown}
     */
    onMenuKeyDown: PropTypes.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `keyup` event.
     *
     * @see {@link #onKeyUp}
     */
    onMenuKeyUp: PropTypes.func,

    /**
     * An optional function to call when the visibility changes for the menu. The callback will
     * include the next visibility state and the event that triggered the change.
     *
     * ```js
     * onVisibilityChange(visible, event);
     * ```
     */
    onVisibilityChange: PropTypes.func,

    /**
     * This is a 0 to many relationship of `ListItem` to display in the menu's `List`. If the type
     * of the item is a number or string, it will be passed to the `ListItem` as the `primaryText`.
     * If it is an object, it should be the shape of the `ListItem` props. If it is a node, it will
     * just be rendered in the `List`.
     *
     * @see {@link Lists/ListItem}
     * @see {@link Menus/Menu#children}
     */
    menuItems: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.node,
      ])),
    ]),

    /**
     * This should be the children to use in the `Button` that gets created as the menu's toggle.
     *
     * @see {@link Buttons/Button}
     * @see {@link Menus/Menu#toggle}
     */
    children: PropTypes.node,

    /**
     * The anchor position of the menu's list.
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
     * This is how the menu's list is fixed to the toggle.
     *
     * @see {@link Menus/Menu#fixedTo}
     */
    fixedTo: fixedToShape,

    /**
     * This is the animation position for the menu's list.
     *
     * @see {@link Menus/Menu#position}
     */
    position: positionShape,

    /**
     * Boolean if the menu's list should gain the cascading styles.
     *
     * @see {@link Menus/Menu#cascading}
     */
    cascading: PropTypes.bool,

    /**
     * The zDepth to use for the lists that appear in cascading menus.
     *
     * @see {@link Menus/Menu#cascadingZDepth}
     */
    cascadingZDepth: PropTypes.number,

    /**
     * The anchor position for the cascading lists.
     *
     * @see {@link Menus/Menu#cascadingAnchor}
     */
    cascadingAnchor: anchorShape,

    /**
     * Boolean if the menu should display as a full width container. This will *not* update the button
     * to be full width as well.
     *
     * @see {@link Menus/Menu#fullWidth}
     */
    fullWidth: PropTypes.bool,

    /**
     * Boolean if the menu's container should display as `block` instead of `inline-block`.
     *
     * @see {@link Menus/Menu#block}
     */
    block: PropTypes.bool,

    /**
     * Boolean if the list should appear centered related to the button.
     *
     * @see {@link Menus/Menu#centered}
     */
    centered: PropTypes.bool,

    /**
     * Boolean if the menu's list should be the same width as the button.
     *
     * @see {@link Menus/Menu#sameWidth}
     */
    sameWidth: PropTypes.bool,

    /**
     * @see {@link Menus/Menu#xThreshold}
     */
    xThreshold: PropTypes.number,

    /**
     * @see {@link Menus/Menu#yThreshold}
     */
    yThreshold: PropTypes.number,

    /**
     * Boolean if the menu's list should be closed when an element outside of the menu has been clicked.
     *
     * @see {@link Menus/Menu#closeOnOutsideClick}
     */
    closeOnOutsideClick: PropTypes.bool,

    /**
     * The transition name to use for the menu's list visibility changes.
     *
     * @see {@link Menus/Menu#transitionName}
     */
    transitionName: PropTypes.string,

    /**
     * The transition name to use when the menu's list gains visibility.
     *
     * @see {@link Menus/Menu#transitionEnterTimeout}
     */
    transitionEnterTimeout: PropTypes.number,

    /**
     * The transition timeout to use when the menu's list loses visibility.
     *
     * @see {@link Menus/Menu#transitionLeaveTimeout}
     */
    transitionLeaveTimeout: PropTypes.number,

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
    minLeft: DropdownMenu.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minRight}
     */
    minRight: DropdownMenu.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minBottom}
     */
    minBottom: DropdownMenu.propTypes.minBottom,

    /**
     * @see {@link Helpers/Layover#fillViewportWidth}
     */
    fillViewportWidth: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#fillViewportHeight}
     */
    fillViewportHeight: PropTypes.bool,

    buttonChildren: deprecated(
      PropTypes.node,
      'To build a button, put any elements in the `children`. The `ListItem` have been moved to the `menuItems` prop'
    ),
    onMenuToggle: deprecated(PropTypes.bool, 'Use `onVisibilityChange` instead'),
    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
    defaultOpen: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
  };

  static defaultProps = {
    defaultVisible: false,
    repositionOnScroll: true,
    repositionOnResize: false,
  };

  render() {
    const {
      id,
      listId,
      buttonId,
      menuStyle,
      menuClassName,
      listStyle,
      listClassName,
      listProps,
      listZDepth,
      listInline,
      listHeightRestricted,
      menuItems,
      buttonChildren,
      children,
      anchor,
      belowAnchor,
      fixedTo,
      position,
      cascading,
      cascadingAnchor,
      cascadingZDepth,
      fullWidth,
      block,
      centered,
      sameWidth,
      repositionOnScroll,
      repositionOnResize,
      xThreshold,
      yThreshold,
      closeOnOutsideClick,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      visible,
      defaultVisible,
      onVisibilityChange,
      simplifiedMenu,
      minLeft,
      minRight,
      minBottom,
      fillViewportWidth,
      fillViewportHeight,
      onMenuClick,
      onMenuMouseDown,
      onMenuMouseUp,
      onMenuMouseEnter,
      onMenuMouseMove,
      onMenuMouseLeave,
      onMenuTouchStart,
      onMenuTouchMove,
      onMenuTouchCancel,
      onMenuTouchEnd,
      onMenuFocus,
      onMenuBlur,
      onMenuKeyDown,
      onMenuKeyUp,
      isOpen, // deprecated
      defaultOpen, // deprecated
      onMenuToggle, // deprecated
      ...props
    } = this.props;

    let items = children;
    let toggleChildren = buttonChildren;
    if (typeof menuItems !== 'undefined') {
      toggleChildren = children;
      items = menuItems;
    }

    return (
      <DropdownMenu
        id={id}
        listId={listId}
        style={menuStyle}
        className={menuClassName}
        listStyle={listStyle}
        listClassName={listClassName}
        listProps={listProps}
        listInline={listInline}
        listZDepth={listZDepth}
        listHeightRestricted={listHeightRestricted}
        visible={typeof isOpen !== 'undefined' ? isOpen : visible}
        defaultVisible={typeof defaultOpen !== 'undefined' ? defaultOpen : defaultVisible}
        menuItems={items}
        simplifiedMenu={simplifiedMenu}
        anchor={anchor}
        belowAnchor={belowAnchor}
        fixedTo={fixedTo}
        position={position}
        cascading={cascading}
        cascadingAnchor={cascadingAnchor}
        cascadingZDepth={cascadingZDepth}
        fullWidth={fullWidth}
        block={block}
        centered={centered}
        sameWidth={sameWidth}
        minLeft={minLeft}
        minRight={minRight}
        minBottom={minBottom}
        fillViewportWidth={fillViewportWidth}
        fillViewportHeight={fillViewportHeight}
        repositionOnScroll={repositionOnScroll}
        repositionOnResize={repositionOnResize}
        xThreshold={xThreshold}
        yThreshold={yThreshold}
        closeOnOutsideClick={closeOnOutsideClick}
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
        onVisibilityChange={onMenuToggle || onVisibilityChange}
        onClick={onMenuClick}
        onMouseDown={onMenuMouseDown}
        onMouseUp={onMenuMouseUp}
        onMouseEnter={onMenuMouseEnter}
        onMouseMove={onMenuMouseMove}
        onMouseLeave={onMenuMouseLeave}
        onTouchStart={onMenuTouchStart}
        onTouchMove={onMenuTouchMove}
        onTouchCancel={onMenuTouchCancel}
        onTouchEnd={onMenuTouchEnd}
        onFocus={onMenuFocus}
        onBlur={onMenuBlur}
        onKeyDown={onMenuKeyDown}
        onKeyUp={onMenuKeyUp}
      >
        <Button {...props} id={buttonId}>
          {toggleChildren}
        </Button>
      </DropdownMenu>
    );
  }
}
