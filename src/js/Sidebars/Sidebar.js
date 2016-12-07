import React, { PureComponent, PropTypes } from 'react';

import Drawer from '../Drawers/Drawer';
import componentDeprecated from '../utils/PropTypes/componentDeprecated';

export default class Sidebar extends PureComponent {
  static propTypes = {
    deprecated: componentDeprecated(
      'All the functionality and responsiveness of a `Sidebar` can be handled by the `Drawer` instead.' +
      ' Switch to the `Drawer` component instead.'
    ),

    /**
     * Boolean if the overlay should appear when opened.
     */
    overlay: PropTypes.bool,

    /**
     * Boolean if the sidebar is visible and open.
     */
    isOpen: PropTypes.bool,

    /**
     * Boolean if the sidebar is fixed to the side of the page.
     */
    fixed: PropTypes.bool,

    /**
     * Boolean if sidebar should be responsive.
     */
    responsive: PropTypes.bool,

    /**
     * An optional header to display above the children or list items.
     */
    header: PropTypes.node,

    /**
     * Any children to display after the generated list of items.
     */
    children: PropTypes.node,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The transition name to use for the overlay.
     */
    transitionName: PropTypes.string,

    /**
     * The enter timeout for the overlay transition.
     */
    transitionEnterTimeout: PropTypes.number,

    /**
     * The leave timeout for the overlay transition.
     */
    transitionLeaveTimeout: PropTypes.number,

    /**
     * An optional function to call when the overlay is clicked.
     * This should normally close the sidebar.
     */
    onOverlayClick: PropTypes.func,

    /**
     * The position to align the sidebar of the screen to.
     */
    align: PropTypes.oneOf(['left', 'right']),

    /**
     * A list of item props to convert into `ListItem`, `Divider`, or
     * `Subheader` components.
     *
     * ##### Item Descriptions
     */
    items: PropTypes.arrayOf(PropTypes.shape({
      /**
       * Boolean if this item is a divider.
       */
      divider: PropTypes.bool,

      /**
       * Boolean if this item is a subheader.
       */
      subheader: PropTypes.bool,

      /**
       * The primary text to display in a `ListItem` or a `Subheader`.
       */
      primaryText: PropTypes.string,
    })),
  };

  static defaultProps = {
    align: 'left',
  };

  render() {
    const {
      isOpen,
      header,
      overlay,
      children,
      onOverlayClick,
      align,
      items,
      fixed,
      ...props
    } = this.props;
    delete props.responsive;

    return (
      <Drawer
        {...props}
        visible={isOpen}
        onVisibilityChange={onOverlayClick}
        navItems={items}
        position={align}
        overflay={overlay}
        header={header}
        inline={!fixed}
      >
        {children}
      </Drawer>
    );
  }
}
