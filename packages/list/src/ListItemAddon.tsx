import type { TextIconSpacingProps } from "@react-md/icon";
import { TextIconSpacing } from "@react-md/icon";
import type { ReactElement, ReactNode } from "react";
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
   * @defaultValue `type === "media" || type === "large-media"`
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
    disableCenteredMedia = false,
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
        disableCenteredMedia,
      })}
      iconAfter={addonAfter}
    >
      {children}
    </TextIconSpacing>
  );
}
