/** @module Drawers/DrawerTypes */

/**
 * An enum for all the different type of drawers.
 *
 * @readonly
 * @enum {string}
 */
const DrawerTypes = {
  // Permanent drawers
  /**
   * This is the default drawer type. It will always be on the screen and takes
   * up the entire height. This is very helpful for main navigation on desktops
   * when you do not need an expandable workspace.
   */
  FULL_HEIGHT: 'full-height',

  /**
   * This drawer type will always be on the screen, but it will appear under the
   * main toolbar.
   */
  CLIPPED: 'clipped',

  /**
   * This drawer type will always be on the screen, but it will appear under the
   * main toolbar and have a transparent background. This is useful if you want
   * a persistent drawer on desktop screens, but do not want the main focus to be
   * the drawer.
   */
  FLOATING: 'floating',

  // Persistent drawers
  /**
   * A persistent drawer changes between being hidden and being fixed on the page like
   * a permanent drawer. When it is visible, it will take up the same amount of room
   * as a permanent drawer, and will not go away until closed.
   *
   * This drawer type is helpful when you need to have a dynamic workspace size.
   */
  PERSISTENT: 'persistent',

  /**
   * This is a modification of the persistent drawer. It will behave as the persistent drawer
   * but it will always have a "mini" drawer visible. This is helpful when you want to have
   * a dynamic workspace size and keep certain actions available at all times.
   */
  PERSISTENT_MINI: 'persistent-mini',

  // Temporary
  /**
   * A temporary drawer will not be visible by default. When it is visible, it will overlay
   * the page to get the main focus on the drawer. When the user touches the overlay or
   * one of the navigation items, the drawer will be closed. The overlay can be disabled on
   * desktop and tablets.
   */
  TEMPORARY: 'temporary',

  /**
   * This is a modification of the temporary drawer. It will behave like a temporary drawer,
   * but it will always have a "mini" drawer visible. Just like the `PERSISTENT_MINI` drawer
   * type, this is useful when certain actions should be available at all times but additional
   * actions are available when the drawer is visible.
   */
  TEMPORARY_MINI: 'temporary-mini',
};

export default DrawerTypes;
