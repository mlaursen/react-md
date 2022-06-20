import type { ReactElement, ReactNode } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/core";
import type { TextIconSpacingProps } from "@react-md/icon";
import { TextIconSpacing } from "@react-md/icon";
import { ListItemAddonPosition, ListItemAddonType } from "./types";
import type { ListItemAddonClassNameOptions } from "./styles";
import { getListItemAddonClassName } from "./styles";

export interface ListItemAddonProps
  extends Omit<TextIconSpacingProps, "icon" | "iconAfter" | "forceIconWrap">,
    ListItemAddonClassNameOptions {
  /**
   * The addon that should be rendered.
   */
  addon: ReactNode;

  /**
   * Boolean if the addon should be forced into a `<span>` with the class names
   * applied instead of attempting to clone into the provided icon. If the
   * `type` is set to `"media"` or `"large-media"`, this will default to `true`.
   *
   * @defaultValue `false`
   */
  forceAddonWrap?: boolean;
}

/**
 * The `ListItemAddon` is used to create an addon to the left or right of the
 * text/children of a `ListItem`.
 */
export function ListItemAddon(props: ListItemAddonProps): ReactElement {
  const {
    className,
    children,
    addon,
    addonAfter = false,
    type = "icon",
    position = "middle",
    forceAddonWrap,
    ...remaining
  } = props;

  const isMedia = type === "media" || type === "large-media";

  return (
    <TextIconSpacing
      {...remaining}
      icon={addon}
      forceIconWrap={forceAddonWrap ?? isMedia}
      className={getListItemAddonClassName({
        type,
        position,
        className,
        addonAfter,
      })}
      iconAfter={addonAfter}
    >
      {children}
    </TextIconSpacing>
  );
}
