import React, { ReactElement, ReactNode } from "react";
import cn from "classnames";
import { TextIconSpacing, TextIconSpacingProps } from "@react-md/icon";
import { bem } from "@react-md/utils";

export type ListItemAddonPosition = "top" | "middle" | "bottom";
export type ListItemAddonType = "icon" | "avatar" | "media" | "large-media";

export interface ListItemAddonProps
  extends Omit<TextIconSpacingProps, "icon" | "iconAfter" | "forceIconWrap"> {
  /**
   * The addon that should be rendered.
   */
  addon: ReactNode | ReactElement;

  /**
   * Boolean if the addon should appear after the `children`.
   */
  addonAfter?: boolean;

  /**
   * The addon type that is used to adjust the spacing styles.
   */
  type?: ListItemAddonType;

  /**
   * Boolean if the addon should be forced into a `<span>` with the class names
   * applied instead of attempting to clone into the provided icon. If the
   * `type` is set to `"media"` or `"large-media"`, this will default to `true`.
   */
  forceAddonWrap?: boolean;

  /**
   * The vertical position to use for the addon.
   */
  position?: ListItemAddonPosition;
}

const base = bem("rmd-list-item");

/**
 * The `ListItemAddon` is used to create an addon to the left or right of the
 * text/children of a `ListItem`.
 */
export function ListItemAddon({
  className,
  children,
  addon,
  addonAfter = false,
  type = "icon",
  position = "middle",
  forceAddonWrap,
  ...props
}: ListItemAddonProps): ReactElement {
  const isMedia = type === "media" || type === "large-media";
  const isAvatar = type === "avatar";

  return (
    <TextIconSpacing
      {...props}
      icon={addon}
      forceIconWrap={forceAddonWrap ?? isMedia}
      className={cn(
        base("addon", {
          [position]: position !== "middle",
          before: !addonAfter,
          "avatar-before": !addonAfter && isAvatar,
          media: isMedia,
          "media-large": type === "large-media",
        }),
        className
      )}
      iconAfter={addonAfter}
    >
      {children}
    </TextIconSpacing>
  );
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ListItemAddon.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      addon: PropTypes.node,
      addonAfter: PropTypes.bool,
      type: PropTypes.oneOf(["icon", "avatar", "media", "large-media"]),
      position: PropTypes.oneOf(["top", "middle", "bottom"]),
      forceAddonWrap: PropTypes.bool,
    };
  } catch (e) {}
}
