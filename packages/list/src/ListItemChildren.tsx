import React, { FunctionComponent, ReactNode } from "react";
import { FixColorPollution } from "@react-md/states";

import ListItemIcon from "./ListItemIcon";
import ListItemText from "./ListItemText";

export interface ListItemChildrenProps {
  /**
   * An optional className to apply to the `<span>` that surrounds the `primaryText` and optionally
   * `secondaryText` within the list item.
   */
  textClassName?: string;

  /**
   * An optional className to apply to the `<span>` that surrounds the `secondaryText` within the
   * list item.
   */
  secondaryTextClassName?: string;

  /**
   * Boolean if the children should be treated as the `primaryText` prop. This will wrap them in
   * an additional class so that they have ellipsis for text overflow.
   *
   * If you want to have more "freedom" within the ListItem, you can disable this prop so that the
   * height will grow depending on content.
   *
   * NOTE: If the `secondaryText` prop is provided, this will always be considered `true`.
   */
  textChildren?: boolean;

  /**
   * An optional element that should be rendered as the `primaryText` within the list item. It is
   * most likely easier to use the `children` prop instead, but this allows you to create more\
   * complex components with the ListItem since you can provided `children` and have the styles for
   * the `primaryText` still applied. By default, this will only allow one line of text and add
   * ellipsis for any text overflow.
   */
  primaryText?: ReactNode;

  /**
   * An optional element that should be rendered as the `secondaryText` within the list item. By
   * default, this will only span one line and add ellipsis for overflow.
   */
  secondaryText?: ReactNode;

  /**
   * An optional icon to display to the left of the children or provided text elements. If this is
   * a valid React element, the spacing class names will be cloned into the element. Otherwise it
   * will be wrapped with a `<span>` to have the correct class name applied. You can also use the
   * `forceIconWrap` prop to **always** wrap the icon in a `<span>` with the correct class name
   * applied.
   */
  leftIcon?: ReactNode;

  /**
   * An optional icon to display to the right of the children or provided text elements. If this is
   * a valid React element, the spacing class names will be cloned into the element. Otherwise it
   * will be wrapped with a `<span>` to have the correct class name applied. You can also use the
   * `forceIconWrap` prop to **always** wrap the icon in a `<span>` with the correct class name
   * applied.
   */
  rightIcon?: ReactNode;

  /**
   * Boolean if the left and/or right icons should be "forcefully" wrapped in a `<span>` with the
   * spacing class names applied instead of attempting to clone it into the provided icon element.
   */
  forceIconWrap?: boolean;

  /**
   * An optional avatar to display to the left of the children or provided text elements. If this is
   * a valid React element, the spacing class names will be cloned into the element. Otherwise it
   * will be wrapped with a `<span>` to have the correct class name applied. You can also use the
   * `forceIconWrap` prop to **always** wrap the icon in a `<span>` with the correct class name
   * applied.
   */
  leftAvatar?: ReactNode;

  /**
   * An optional avatar to display to the right of the children or provided text elements. If this is
   * a valid React element, the spacing class names will be cloned into the element. Otherwise it
   * will be wrapped with a `<span>` to have the correct class name applied. You can also use the
   * `forceIconWrap` prop to **always** wrap the icon in a `<span>` with the correct class name
   * applied.
   */
  rightAvatar?: ReactNode;

  /**
   * Boolean if the color pollution should be fixed at this level. This is really used when
   * composing the children with clickable list items and tree items.
   */
  preventColorPollution?: boolean;
}

const ListItemChildren: FunctionComponent<ListItemChildrenProps> = ({
  textClassName,
  secondaryTextClassName,
  textChildren,
  primaryText,
  secondaryText,
  leftIcon,
  leftAvatar,
  rightIcon,
  rightAvatar,
  forceIconWrap,
  children: propChildren,
  preventColorPollution,
}) => {
  let children = propChildren;
  if (primaryText || secondaryText || textChildren) {
    children = (
      <ListItemText
        className={textClassName}
        secondaryText={secondaryText}
        secondaryTextClassName={secondaryTextClassName}
      >
        {(textChildren && children) || primaryText}
      </ListItemText>
    );
  }

  children = (
    <ListItemIcon
      avatar={!!leftAvatar}
      icon={leftIcon || leftAvatar}
      forceIconWrap={forceIconWrap}
      position="before"
    >
      {children}
    </ListItemIcon>
  );
  children = (
    <ListItemIcon
      avatar={!!rightAvatar}
      icon={rightIcon || rightAvatar}
      forceIconWrap={forceIconWrap}
      position="after"
    >
      {children}
    </ListItemIcon>
  );

  return (
    <FixColorPollution enabled={preventColorPollution}>
      {children}
      {(primaryText && propChildren) || null}
    </FixColorPollution>
  );
};

export default ListItemChildren;
