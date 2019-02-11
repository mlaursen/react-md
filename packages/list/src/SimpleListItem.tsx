import React, { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";

import ListItemChildren, { IListItemChildrenProps } from "./ListItemChildren";
import getListItemHeight from "./getListItemHeight";

export type ListItemHeight =
  | "auto"
  | "normal"
  | "medium"
  | "large"
  | "extra-large";

export interface ISimpleListItemProps
  extends IListItemChildrenProps,
    HTMLAttributes<HTMLLIElement>,
    IWithForwardedRef<HTMLLIElement> {
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

interface ISimpleListItemDefaultProps {
  height: ListItemHeight;
}

type SimpleListItemWithDefaultProps = ISimpleListItemProps &
  ISimpleListItemDefaultProps;

const SimpleListItem: FunctionComponent<
  ISimpleListItemProps
> = providedProps => {
  const {
    className,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    leftIcon,
    rightIcon,
    forceIconWrap,
    children,
    forwardedRef,
    height: propHeight,
    threeLines,
    ...props
  } = providedProps as SimpleListItemWithDefaultProps;

  const height = getListItemHeight(providedProps);
  return (
    <li
      {...props}
      ref={forwardedRef}
      className={cn(
        "rmd-list-item",
        {
          [`rmd-list-item--${height}`]:
            height !== "auto" && height !== "normal",
          "rmd-list-item--three-lines": !!secondaryText && threeLines,
        },
        className
      )}
    >
      <ListItemChildren
        textClassName={textClassName}
        secondaryTextClassName={secondaryTextClassName}
        primaryText={primaryText}
        secondaryText={secondaryText}
        textChildren={textChildren}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        forceIconWrap={forceIconWrap}
      >
        {children}
      </ListItemChildren>
    </li>
  );
};

const defaultProps: ISimpleListItemDefaultProps = {
  height: "auto",
};

SimpleListItem.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  SimpleListItem.displayName = "SimpleListItem";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    SimpleListItem.propTypes = {
      height: PropTypes.oneOf([
        "auto",
        "normal",
        "medium",
        "large",
        "extra-large",
      ]),
    };
  }
}

export default forwardRef<HTMLLIElement, ISimpleListItemProps>((props, ref) => (
  <SimpleListItem forwardedRef={ref} {...props} />
));
