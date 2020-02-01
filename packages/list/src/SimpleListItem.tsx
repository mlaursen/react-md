import React, { forwardRef, ReactElement, Ref } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import getListItemHeight, { SimpleListItemProps } from "./getListItemHeight";
import ListItemChildren from "./ListItemChildren";

const block = bem("rmd-list-item");

function SimpleListItem(
  {
    className,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    leftIcon,
    leftAvatar,
    leftMedia,
    leftMediaLarge,
    leftPosition = "middle",
    rightIcon,
    rightAvatar,
    rightMedia,
    rightMediaLarge,
    rightPosition = "middle",
    forceIconWrap,
    children,
    height: propHeight = "auto",
    threeLines = false,
    "aria-disabled": ariaDisabled,
    disabled,
    clickable = false,
    ...props
  }: SimpleListItemProps,
  ref?: Ref<HTMLLIElement>
): ReactElement {
  const height = getListItemHeight({
    height: propHeight,
    leftIcon,
    rightIcon,
    leftAvatar,
    rightAvatar,
    leftMedia,
    rightMedia,
    leftMediaLarge,
    rightMediaLarge,
    secondaryText,
  });

  return (
    <li
      {...props}
      aria-disabled={
        typeof ariaDisabled === "string"
          ? ariaDisabled
          : (disabled && "true") || undefined
      }
      ref={ref}
      className={cn(
        block({
          [height]: height !== "auto" && height !== "normal",
          "three-lines": threeLines,
          clickable,
        }),
        className
      )}
    >
      <ListItemChildren
        textClassName={textClassName}
        secondaryTextClassName={secondaryTextClassName}
        textChildren={textChildren}
        primaryText={primaryText}
        secondaryText={secondaryText}
        leftIcon={leftIcon}
        leftAvatar={leftAvatar}
        leftMedia={leftMedia}
        leftMediaLarge={leftMediaLarge}
        leftPosition={leftPosition}
        rightIcon={rightIcon}
        rightAvatar={rightAvatar}
        rightMedia={rightMedia}
        rightMediaLarge={rightMediaLarge}
        rightPosition={rightPosition}
        forceIconWrap={forceIconWrap}
      >
        {children}
      </ListItemChildren>
    </li>
  );
}

const ForwardedSimpleListItem = forwardRef<HTMLLIElement, SimpleListItemProps>(
  SimpleListItem
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedSimpleListItem.propTypes = {
      disabled: PropTypes.bool,
      clickable: PropTypes.bool,
      threeLines: PropTypes.bool,
      height: PropTypes.oneOf([
        "auto",
        "normal",
        "medium",
        "large",
        "extra-large",
      ]),
      leftPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
      rightPosition: PropTypes.oneOf(["top", "middle", "bottom"]),
    };
  } catch (e) {}
}

export default ForwardedSimpleListItem;
