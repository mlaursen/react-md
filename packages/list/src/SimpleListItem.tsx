import React, { FC, forwardRef } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

import ListItemChildren from "./ListItemChildren";
import getListItemHeight, { SimpleListItemProps } from "./getListItemHeight";

type WithRef = WithForwardedRef<HTMLLIElement>;
type DefaultProps = Required<
  Pick<
    SimpleListItemProps,
    "height" | "clickable" | "threeLines" | "leftPosition" | "rightPosition"
  >
>;
type WithDefaultProps = SimpleListItemProps & DefaultProps & WithRef;

const block = bem("rmd-list-item");

const SimpleListItem: FC<SimpleListItemProps & WithRef> = providedProps => {
  const {
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
    leftPosition,
    rightIcon,
    rightAvatar,
    rightMedia,
    rightMediaLarge,
    rightPosition,
    forceIconWrap,
    children,
    forwardedRef,
    height: propHeight,
    threeLines,
    "aria-disabled": ariaDisabled,
    disabled,
    clickable,
    ...props
  } = providedProps as WithDefaultProps;

  const height = getListItemHeight(providedProps);
  return (
    <li
      {...props}
      aria-disabled={
        typeof ariaDisabled === "string"
          ? ariaDisabled
          : (disabled && "true") || undefined
      }
      ref={forwardedRef}
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
};

const defaultProps: DefaultProps = {
  height: "auto",
  clickable: false,
  threeLines: false,
  leftPosition: "middle",
  rightPosition: "middle",
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
  }
}

export default forwardRef<HTMLLIElement, SimpleListItemProps>((props, ref) => (
  <SimpleListItem forwardedRef={ref} {...props} />
));
