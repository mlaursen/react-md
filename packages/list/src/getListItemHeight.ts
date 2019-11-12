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
   * This prop shouldn't really be used other than a pass-down value from the ListItem component.
   */
  disabled?: boolean;

  /**
   * Boolean if the list item should be updated to use the clickable styles to the item. This
   * is really just a pass-down value for the main `ListItem` component and shouldn't really be
   * used unless you are implementing your own clickable `ListItem` component.
   */
  clickable?: boolean;

  /**
   * Boolean if the list item should be considered "three-lines" in height. This will update
   * the `secondaryText` to span 2 lines instead of one, but it will not correctly applied
   * the trailing ellipsis overflow due to browser compatibility of `line-clamp`. If you
   * would still like the ellipsis to show, it is recommended to use javascript to add
   * them yourself.
   */
  threeLines?: boolean;

  /**
   * The height to apply to the list item. When it is set to `"auto"`, it will use:
   * - `"medium"` if a `leftIcon` or `rightIcon` is applied with no secondary text
   * - `"large"` if no `leftIcon` or `rightIcon` is applied but has secondary text
   * - `"extra-large"` if there is both a `leftIcon` or `rightIcon` with secondary text
   */
  height?: ListItemHeight;
}

export default function getListItemHeight({
  height = "auto",
  leftIcon,
  rightIcon,
  leftAvatar,
  rightAvatar,
  leftMedia,
  rightMedia,
  leftMediaLarge,
  rightMediaLarge,
  secondaryText,
}: SimpleListItemProps): ListItemHeight {
  if (height !== "auto") {
    return height;
  }

  const isIcon = leftIcon || rightIcon;
  const isAvatar = leftAvatar || rightAvatar;
  const isGraphic =
    leftMedia || rightMedia || leftMediaLarge || rightMediaLarge;
  if (isGraphic || (secondaryText && (isIcon || isAvatar))) {
    return "extra-large";
  }
  if (isAvatar || (secondaryText && !isIcon)) {
    return "large";
  }
  if (isIcon) {
    return "medium";
  }

  return "normal";
}
