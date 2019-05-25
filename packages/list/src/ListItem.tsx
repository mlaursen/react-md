import React, { forwardRef, FC } from "react";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";
import { WithForwardedRef } from "@react-md/utils";

import getListItemHeight from "./getListItemHeight";
import ListItemChildren from "./ListItemChildren";
import SimpleListItem, { SimpleListItemProps } from "./SimpleListItem";

export interface ListItemProps
  extends SimpleListItemProps,
    InteractionStatesOptions<HTMLLIElement> {
  tabIndex?: number;
}

type WithRef = WithForwardedRef<HTMLLIElement>;
type DefaultProps = Required<
  Pick<
    ListItemProps,
    | "textChildren"
    | "height"
    | "role"
    | "tabIndex"
    | "leftPosition"
    | "rightPosition"
    | "disableSpacebarClick"
    | "disablePressedFallback"
  >
>;
type ListItemWithDefaultProps = ListItemProps & DefaultProps & WithRef;

const ListItem: FC<ListItemProps & WithRef> = providedProps => {
  const {
    className: propClassName,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    children,
    forwardedRef,
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
    height,
    disableSpacebarClick,
    disableRipple,
    disableProgrammaticRipple,
    disablePressedFallback,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    tabIndex,
    role,
    ...props
  } = providedProps as ListItemWithDefaultProps;

  const { ripples, className, handlers } = useInteractionStates({
    className: propClassName,
    handlers: props,
    disabled: props.disabled,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    disableSpacebarClick,
    disablePressedFallback,
  });

  return (
    <SimpleListItem
      {...props}
      {...handlers}
      tabIndex={tabIndex}
      role={role}
      className={className}
      clickable
      height={getListItemHeight(providedProps)}
      ref={forwardedRef}
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
      {ripples}
    </SimpleListItem>
  );
};

const defaultProps: DefaultProps = {
  height: "auto",
  role: "button",
  tabIndex: 0,
  disableSpacebarClick: false,
  disablePressedFallback: false,
  textChildren: true,
  leftPosition: "middle",
  rightPosition: "middle",
};

ListItem.defaultProps = defaultProps;
if (process.env.NODE_ENV !== "production") {
  ListItem.displayName = "ListItem";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    ListItem.propTypes = {
      role: PropTypes.string,
      tabIndex: PropTypes.number,
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

export default forwardRef<HTMLLIElement, ListItemProps>((props, ref) => (
  <ListItem {...props} forwardedRef={ref} />
));
