/**
 * Set this to `"automatic"` to make it so focusing tabs with a keyboard
 * automatically selects them instead of requiring another click. Set this to
 * `"manual"` if it should require another click before selecting the tab.
 *
 * @since 6.0.0
 */
export type TabListActivationMode = "manual" | "automatic";

/**
 * Set this to `true` to always render buttons that can scroll forwards or
 * backwards (or upwards and downwards while vertical) within the tab list when
 * there is overflow.
 *
 * Set this to `"tablet-or-above"` to only render the buttons when the
 * app size is at least a tablet's width.
 *
 * Set this to `"auto"` to only render the buttons when there is overflow in
 * the tab list.
 *
 * Set this to `"auto-tablet-or-above"` to only render the buttons when there is
 * overflow in the tab list and the app size is at least a tablet's width
 *
 * @since 6.0.0
 */
export type TabListScrollButtonsBehavior =
  | boolean
  | "tablet-or-above"
  | "auto"
  | "auto-tablet-or-above";
