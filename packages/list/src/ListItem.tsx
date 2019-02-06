import React, { forwardRef, FunctionComponent } from "react";
import cn from "classnames";
import { withStates, IWithStatesConfig } from "@react-md/states";

import SimpleListItem, {
  ISimpleListItemProps,
  ListItemHeight,
} from "./SimpleListItem";
import ListItemChildren from "./ListItemChildren";
import getListItemHeight from "./getListItemHeight";

export interface IListItemProps
  extends ISimpleListItemProps,
    IWithStatesConfig<HTMLLIElement> {
  id: string;
}

export interface IListItemDefaultProps {
  height: ListItemHeight;
  role: string;
  tabIndex: number;
}

type ListItemWithDefaultProps = IListItemProps & IListItemDefaultProps;

const ListItemWithStates = withStates<IListItemProps, HTMLLIElement>(
  SimpleListItem
);

const ListItem: FunctionComponent<IListItemProps> = providedProps => {
  const {
    className,
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
    ...props
  } = providedProps as ListItemWithDefaultProps;

  return (
    <ListItemWithStates
      {...props}
      height={getListItemHeight(providedProps)}
      ref={forwardedRef}
      className={cn("rmd-list-item--clickable", className)}
      enableKeyboardClick
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
    </ListItemWithStates>
  );
};
const defaultProps: IListItemDefaultProps = {
  height: "auto",
  role: "button",
  tabIndex: 0,
};

ListItem.defaultProps = defaultProps;
if (process.env.NODE_ENV !== "production") {
  // there's a problem with forwardedRef components that set the `displayName` to `undefined`
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
