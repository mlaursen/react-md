import { HTMLAttributes } from "react";
import { ListItemChildrenProps } from "./ListItemChildren";

export type ListItemHeight =
  | "auto"
  | "normal"
  | "medium"
  | "large"
  | "extra-large";

export interface SimpleListItemProps
  extends ListItemChildrenProps,
    HTMLAttributes<HTMLLIElement> {
  /**
   * This prop shouldn't really be used other than a pass-down value from the
   * ListItem component.
   */
  disabled?: boolean;

  /**
   * Boolean if the list item should be updated to use the clickable styles to
   * the item. This is really just a pass-down value for the main `ListItem`
   * component and shouldn't really be used unless you are implementing your own
   * clickable `ListItem` component.
   */
  clickable?: boolean;

  /**
   * Boolean if the list item should be considered "three-lines" in height. This
   * will update the `secondaryText` to span 2 lines instead of one, but it will
   * not correctly applied the trailing ellipsis overflow due to browser
   * compatibility of `line-clamp`. If you would still like the ellipsis to
   * show, it is recommended to use javascript to add them yourself.
   */
  threeLines?: boolean;

  /**
   * The height to apply to the list item.
   *
   * Conversions:
   *
   * - height !== "auto" -> height
   * - secondaryText or left/right addon is media/media-large  -> "extra-large"
   * - left/right addon is avatar -> "large"
   * - left/right addon is icon -> "medium"
   * - no addons and no secondary text -> "normal"
   */
  height?: ListItemHeight;
}

/**
 * Gets the expected height for the `ListItem` or `SimpleListItem` based on the
 * addons and `secondaryText` props.
 *
 * Conversions:
 *
 * - height !== "auto" -> height
 * - secondaryText or left/right addon is media/media-large  -> "extra-large"
 * - left/right addon is avatar -> "large"
 * - left/right addon is icon -> "medium"
 * - no addons and no secondary text -> "normal"
 *
 * @private
 */
export default function getListItemHeight({
  height = "auto",
  leftAddon,
  leftAddonType = "icon",
  rightAddon,
  rightAddonType = "icon",
  secondaryText,
}: SimpleListItemProps): ListItemHeight {
  if (height !== "auto") {
    return height;
  }

  const isIcon =
    (leftAddon && leftAddonType === "icon") ||
    (rightAddon && rightAddonType === "icon");
  const isAvatar =
    (leftAddon && leftAddonType === "avatar") ||
    (rightAddon && rightAddonType === "avatar");
  const isGraphic =
    (leftAddon &&
      (leftAddonType === "media" || leftAddonType === "large-media")) ||
    (rightAddon &&
      (rightAddonType === "media" || rightAddonType === "large-media"));

  // secondary text will always be extra large due to the default `line-height`
  if (isGraphic || secondaryText) {
    return "extra-large";
  }

  if (isAvatar) {
    return "large";
  }

  if (isIcon) {
    return "medium";
  }

  return "normal";
}
