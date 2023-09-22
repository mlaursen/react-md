import { type ReactElement, type ReactNode } from "react";
import {
  TextIconSpacing,
  type TextIconSpacingProps,
} from "../icon/TextIconSpacing.js";
import {
  listItemAddon,
  type ListItemAddonClassNameOptions,
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
 * **Server Component**
 *
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
    addonAfter = false,
    type = "icon",
    position = "middle",
    forceAddonWrap,
    disableCenteredMedia = false,
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
        disableCenteredMedia,
      })}
      iconAfter={addonAfter}
    >
      {children}
    </TextIconSpacing>
  );
}
