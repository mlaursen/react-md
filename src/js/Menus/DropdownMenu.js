import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import controlled from '../utils/PropTypes/controlled';
import mapToListParts from '../utils/mapToListParts';
import getField from '../utils/getField';
import anchorShape from '../Helpers/anchorShape';
import fixedToShape from '../Helpers/fixedToShape';
import positionShape from '../Helpers/positionShape';
import Menu from './Menu';

/**
 * The `DropdownMenu` is just a simple wrapper to the `Menu` component. The main differences
 * is that the `toggle` component will now be the children and the list of items to display
 * will be the `menuItems` prop.
 *
 * The dropdown menu is mostly used to control the state of the menu and render a single element
 * as the toggle.
 */
export default class DropdownMenu extends PureComponent {
  static Positions = Menu.Positions;
  static HorizontalAnchors = Menu.HorizontalAnchors;
  static VerticalAnchors = Menu.VerticalAnchors;
  static propTypes = {
    /**
     * An id to use for the menu. This is required for accessibility.
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
     * An optional style to apply to the menu.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the menu.
     */
    className: PropTypes.string,

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
     */
    onClick: PropTypes.func,

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
     * @see {@link Menus/Menu#toggle}
     */
    children: PropTypes.element.isRequired,

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
    minLeft: Menu.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minRight}
     */
    minRight: Menu.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minBottom}
     */
    minBottom: Menu.propTypes.minBottom,

    /**
     * @see {@link Helpers/Layover#fillViewportWidth}
     */
    fillViewportWidth: PropTypes.bool,

    /**
     * @see {@link Helpers/Layover#fillViewportHeight}
     */
    fillViewportHeight: PropTypes.bool,
  };

  static defaultProps = {
    defaultVisible: false,
    repositionOnScroll: true,
    repositionOnResize: false,
  };

  constructor(props) {
    super(props);

    this.state = {};
    if (typeof props.visible === 'undefined') {
      this.state.visible = props.defaultVisible;
    }
  }

  _handleClick = (e) => {
    const { onVisibilityChange, children } = this.props;
    const visible = !getField(this.props, this.state, 'visible');
    if (onVisibilityChange) {
      onVisibilityChange(visible, e);
    }

    const toggle = React.Children.only(children);
    if (toggle.props.onClick) {
      toggle.props.onClick(e);
    }

    if (typeof this.props.visible === 'undefined') {
      this.setState({ visible });
    }
  };

  _handleClose = (e) => {
    const { onVisibilityChange } = this.props;
    const visible = false;
    if (onVisibilityChange) {
      onVisibilityChange(visible, e);
    }

    if (typeof this.props.visible === 'undefined') {
      this.setState({ visible });
    }
  };

  render() {
    const {
      id,
      listId,
      menuItems,
      children: propChildren,
      simplifiedMenu,
      /* eslint-disable no-unused-vars */
      visible: propVisible,
      onVisibilityChange,
      defaultVisible,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const visible = getField(this.props, this.state, 'visible');

    const children = React.Children.only(propChildren);
    const toggle = React.cloneElement(children, {
      id: children.props.id || `${id}-toggle`,
      onClick: this._handleClick,
    });

    let items;
    if (!Array.isArray(menuItems)) {
      items = mapToListParts(menuItems);
    } else {
      items = menuItems.map(mapToListParts);
    }

    return (
      <Menu
        {...props}
        simplified={simplifiedMenu}
        id={id}
        listId={listId}
        toggle={toggle}
        visible={visible}
        onClose={this._handleClose}
      >
        {items}
      </Menu>
    );
  }
}
