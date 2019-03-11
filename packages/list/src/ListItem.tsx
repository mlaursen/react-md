import React, { forwardRef, FunctionComponent } from "react";
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
  id: string;
  tabIndex?: number;
}

type WithRef = WithForwardedRef<HTMLLIElement>;
type DefaultProps = Required<
  Pick<
    ListItemProps,
    | "height"
    | "role"
    | "tabIndex"
    | "enableKeyboardClick"
    | "disableSpacebarClick"
    | "disablePressedFallback"
  >
>;
type ListItemWithDefaultProps = ListItemProps & DefaultProps & WithRef;

const ListItem: FunctionComponent<ListItemProps & WithRef> = providedProps => {
  const {
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    children,
    forwardedRef,
    leftIcon,
    leftAvatar,
    rightIcon,
    rightAvatar,
    forceIconWrap,
    height,
    enableKeyboardClick,
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
    ...props,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    enableKeyboardClick,
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
      preventColorPollution={false}
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
        rightIcon={rightIcon}
        rightAvatar={rightAvatar}
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
  enableKeyboardClick: true,
  disableSpacebarClick: false,
  disablePressedFallback: false,
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
      id: PropTypes.string.isRequired,
      role: PropTypes.string,
      tabIndex: PropTypes.number,
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

export default forwardRef<HTMLLIElement, ListItemProps>((props, ref) => (
  <ListItem {...props} forwardedRef={ref} />
));
