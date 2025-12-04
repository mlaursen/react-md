import type { ListItemChildrenProps, ListItemHeight } from "./types.js";

/**
 * @since 6.0.0
 * @internal
 */
export interface ListItemHeightOptions extends Pick<
  ListItemChildrenProps,
  | "leftAddon"
  | "rightAddon"
  | "leftAddonType"
  | "rightAddonType"
  | "secondaryText"
> {
  /**
   * @see {@link ListItemHeight}
   */
  height?: ListItemHeight;
}

/**
 * Gets the expected height for the `ListItem` based on the addons and
 * `secondaryText` props.
 *
 * @see {@link ListItemHeight}
 * @internal
 */
export function getListItemHeight(
  options: ListItemHeightOptions = {}
): ListItemHeight {
  const {
    height,
    leftAddon,
    leftAddonType = "icon",
    rightAddon,
    rightAddonType = "icon",
    secondaryText,
  } = options;

  if (height) {
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
