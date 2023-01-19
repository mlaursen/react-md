import type { ReactElement } from "react";

import { ListItemAddon } from "./ListItemAddon";
import { ListItemText } from "./ListItemText";
import type { ListItemChildrenProps } from "./types";

/**
 * The `ListItemChildren` component is used to create a styled list item that
 * can have optional addons to the left or right of the children in the form of
 * icons, avatars, or media. The `children` can be replaced by the `primaryText`
 * and `secondaryText` props to create stacked text spanning two or more lines
 * with the default behavior of using `line-clamp` at three lines.
 *
 * Note: This will return a `React.Fragment` of the children and does not wrap
 * in a DOM node for styling. The parent component should normally have
 * `display: flex` for the styling to work.
 *
 * @example
 * Custom Component Usage
 * ```tsx
 * import { ListItemChildren } from "@react-md/core";
 * import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <div style={{ display: "flex" }}>
 *       <ListItemChildren
 *         leftAddon={<FavoriteIcon />}
 *         rightAddon={<img alt="" src="/some-image.png" />}
 *         rightAddonType="media"
 *         secondaryText={<span>Some <strong>additional</strong> content.</span>}
 *       >
 *         Content
 *       </ListItemChildren>
 *     </div>
 *   );
 * }
 * ```
 */
export function ListItemChildren(props: ListItemChildrenProps): ReactElement {
  const {
    threeLines,
    textProps,
    textClassName,
    secondaryTextClassName,
    disableTextChildren,
    primaryText,
    secondaryText,
    secondaryTextProps,
    leftAddon,
    leftAddonType = "icon",
    leftAddonPosition = "middle",
    leftAddonClassName,
    leftAddonForceWrap,
    disableLeftAddonCenteredMedia,
    rightAddon,
    rightAddonType = "icon",
    rightAddonPosition = "middle",
    rightAddonClassName,
    rightAddonForceWrap,
    disableRightAddonCenteredMedia,
    children: propChildren,
  } = props;

  const stringifiedChildren =
    typeof propChildren === "number" ? `${propChildren}` : propChildren;

  let children = stringifiedChildren;
  if (primaryText || secondaryText || !disableTextChildren) {
    children = (
      <ListItemText
        {...textProps}
        className={textClassName}
        secondaryText={secondaryText}
        secondaryTextProps={secondaryTextProps}
        secondaryTextClamped={threeLines}
        secondaryTextClassName={secondaryTextClassName}
      >
        {(!disableTextChildren && children) || primaryText}
      </ListItemText>
    );
  }

  children = (
    <ListItemAddon
      addon={leftAddon}
      type={leftAddonType}
      position={leftAddonPosition}
      className={leftAddonClassName}
      forceAddonWrap={leftAddonForceWrap}
      disableCenteredMedia={disableLeftAddonCenteredMedia}
    >
      {children}
    </ListItemAddon>
  );
  children = (
    <ListItemAddon
      addon={rightAddon}
      addonAfter
      type={rightAddonType}
      position={rightAddonPosition}
      className={rightAddonClassName}
      forceAddonWrap={rightAddonForceWrap}
      disableCenteredMedia={disableRightAddonCenteredMedia}
    >
      {children}
    </ListItemAddon>
  );

  return (
    <>
      {children}
      {(primaryText && stringifiedChildren) || null}
    </>
  );
}
