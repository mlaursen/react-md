import React, { forwardRef, FunctionComponent } from "react";
import {
  IInteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";

import getListItemHeight from "./getListItemHeight";
import ListItemChildren from "./ListItemChildren";
import SimpleListItem, {
  ISimpleListItemProps,
  ListItemHeight,
} from "./SimpleListItem";

export interface IListItemProps
  extends ISimpleListItemProps,
    IInteractionStatesOptions<HTMLLIElement> {
  id: string;
}

export interface IListItemDefaultProps {
  height: ListItemHeight;
  role: string;
  tabIndex: number;
  enableKeyboardClick: boolean;
  disableSpacebarClick: boolean;
  disablePressedFallback: boolean;
}

type ListItemWithDefaultProps = IListItemProps & IListItemDefaultProps;

const ListItem: FunctionComponent<IListItemProps> = providedProps => {
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
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
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
  });

  return (
    <SimpleListItem
      {...props}
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
        rightIcon={rightIcon}
        rightAvatar={rightAvatar}
        forceIconWrap={forceIconWrap}
      >
        {children}
      </ListItemChildren>
    </SimpleListItem>
  );
};
const defaultProps: IListItemDefaultProps = {
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

export default forwardRef<HTMLLIElement, IListItemProps>((props, ref) => (
  <ListItem {...props} forwardedRef={ref} />
));
