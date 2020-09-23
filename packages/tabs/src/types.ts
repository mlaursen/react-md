import { CSSProperties, ReactNode } from "react";

/**
 * The supported types of alignments for the tabs.
 */
export type TabsAlignment = "left" | "center" | "right";

export interface TabsConfig {
  /**
   * The alignment to use for the tabs.
   */
  align?: TabsAlignment;

  /**
   * Boolean if the tab should automatically become active when the user
   * navigates to the tab with the arrow keys.
   *
   * @see https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus
   */
  automatic?: boolean;

  /**
   * The orientation for the tabs. When this is set to vertical, the keyboard
   * movement will be updated to use Up and Down arrow keys instead of Left and
   * Right.
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Boolean if you know that the tabs will be scrollable which will add some
   * additional padding before the first tab to help users know that there's
   * additional tabs.
   */
  padded?: boolean;
}

export interface TabConfig {
  /**
   * An optional id to use for the tab if the default generated ids are not to
   * your liking.
   */
  id?: string;

  /**
   * An optional style to apply to the tab.
   */
  style?: CSSProperties;

  /**
   * An optional className to apply to the tab.
   */
  className?: string;

  /**
   * An optional icon to render in the `Tab` along with the normal text. If you
   * want to have an icon only tab, you should not use this prop and instead
   * just provide the icon as the tab's children.
   */
  icon?: ReactNode;

  /**
   * Boolean if the icon should appear after the text instead of before. When
   * the `stacked` prop is also enabled, it will cause the icon to appear below
   * the text instead of above.
   */
  iconAfter?: boolean;

  /**
   * Boolean if the icon and text should be stacked instead of rendered inline.
   * This is only valid when the `icon` prop has been provided.
   */
  stacked?: boolean;

  /**
   * Boolean if the tab should be disabled.
   */
  disabled?: boolean;

  /**
   * An optional style to apply to the `<span>` surrounding the `children` of
   * the `Tab`. You _probably_ won't need to use this.
   */
  contentStyle?: CSSProperties;

  /**
   * An optional className to apply to the `<span>` surrounding the `children`
   * of the `Tab`. You _probably_ won't need to use this.
   */
  contentClassName?: string;

  /**
   * The children to display in the tab. This is required and should normally
   * just be text or an icon.
   */
  children?: ReactNode;
}
