import { type ReactElement, type ReactNode } from "react";

import {
  TextIconSpacing,
  type TextIconSpacingProps,
} from "../icon/TextIconSpacing.js";
import {
  type ListItemAddonClassNameOptions,
  listItemAddon,
} from "./listItemStyles.js";

export interface ListItemAddonProps
  extends Omit<TextIconSpacingProps, "icon" | "iconAfter" | "forceIconWrap">,
    ListItemAddonClassNameOptions {
  /**
   * The addon that should be rendered.
   */
  addon: ReactNode;

  /**
   * @defaultValue `type === "media" || type === "large-media"`
   */
  forceAddonWrap?: boolean;
}

/**
 * The `ListItemAddon` is used to create an addon to the left or right of the
 * text/children of a `ListItem`.
 *
 * @internal
 */
export function ListItemAddon(props: ListItemAddonProps): ReactElement {
  const {
    className,
    children,
    addon,
    addonAfter,
    type = "icon",
    position,
    forceAddonWrap,
    disableCenteredMedia,
    disableBeforeSpacing,
    ...remaining
  } = props;

  const isMedia = type === "media" || type === "large-media";

  return (
    <TextIconSpacing
      {...remaining}
      icon={addon}
      forceIconWrap={forceAddonWrap ?? isMedia}
      className={listItemAddon({
        type,
        position,
        className,
        addonAfter,
        disableBeforeSpacing,
        disableCenteredMedia,
      })}
      iconAfter={addonAfter}
    >
      {children}
    </TextIconSpacing>
  );
}
