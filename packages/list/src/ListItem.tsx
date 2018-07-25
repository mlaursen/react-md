import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { StatesConsumer } from "@react-md/states";
import { KeyboardClickable } from "@react-md/a11y";
import { TextIconSpacing } from "@react-md/icon";

import ListItemText from "./ListItemText";

export interface IListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Boolean if the list item is disabled. This is only applied if the `clickable` prop
   * is also enabled.
   */
  disabled?: boolean;

  /**
   * Boolean if the list item is clickable. It will update the the `<li>` element with the
   * `KeyboardClickable` functionality of a "listitem".
   */
  clickable?: boolean;

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
   * An optional icon to display to the left of the children or provided text elements. If this is
   * a valid React element, the spacing class names will be cloned into the element. Otherwise it
   * will be wrapped with a `<span>` to have the correct class name applied. You can also use the
   * `forceIconWrap` prop to **always** wrap the icon in a `<span>` with the correct class name applied.
   */
  leftIcon?: React.ReactNode;

  /**
   * An optional icon to display to the right of the children or provided text elements. If this is
   * a valid React element, the spacing class names will be cloned into the element. Otherwise it
   * will be wrapped with a `<span>` to have the correct class name applied. You can also use the
   * `forceIconWrap` prop to **always** wrap the icon in a `<span>` with the correct class name applied.
   */
  rightIcon?: React.ReactNode;

  /**
   * Boolean if the left and/or right icons should be "forcefully" wrapped in a `<span>` with the spacing
   * class names applied instead of attempting to clone it into the provided icon element.
   */
  forceIconWrap?: boolean;

  /**
   * Boolean if the children should be treated as the `primaryText` prop. This will wrap them in an additional
   * class so that they have ellipsis for text overflow.
   *
   * If you want to have more "fredom" within the ListItem, you can disable this prop so that the height will
   * grow depending on content.
   *
   * NOTE: If the `secondaryText` prop is provided, this will always be considered `true`.
   */
  textChildren?: boolean;

  /**
   * An optional element that should be rendered as the `primaryText` within the list item. It is most likely
   * easier to use the `children` prop instead, but this allows you to create more complex components with the
   * ListItem since you can provided `children` and have the styles for the `primaryText` still applied. By
   * default, this will only allow one line of text and add ellipsis for any text overflow.
   */
  primaryText?: React.ReactNode;

  /**
   * An optional element that should be rendered as the `secondaryText` within the list item. By default, this
   * will only span one line and add ellipsis for overflow.
   */
  secondaryText?: React.ReactNode;

  /**
   * Boolean if the list item should be considered "three-lines" in height. This will update the `secondaryText`
   * to span 2 lines instead of one, but it will not correctly applied the trailing ellipsis overflow due to
   * browser compatibility of `line-clamp`. If you would still like the ellipsis to show, it is recommended to
   * use javascript to add them yourself.
   */
  threeLines?: boolean;
}

export interface IListItemDefaultProps {
  role: "listitem";
  disabled: boolean;
  clickable: boolean;
  textChildren: boolean;
  threeLines: false;
  forceIconWrap: boolean;
}

export type ListItemWithDefaultProps = IListItemProps & IListItemDefaultProps;

const ListItem: React.SFC<IListItemProps> = providedProps => {
  const {
    className,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    threeLines,
    leftIcon,
    rightIcon,
    forceIconWrap,
    children: propChildren,
    disabled: propDisabled,
    clickable,
    role,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onKeyUp,
    onKeyDown,
    ...props
  } = providedProps as ListItemWithDefaultProps;

  let children = propChildren;
  if (primaryText || textChildren) {
    children = (
      <ListItemText
        className={textClassName}
        secondaryText={secondaryText}
        secondaryTextClassName={secondaryTextClassName}
      >
        {textChildren ? children : primaryText}
      </ListItemText>
    );
  } else if (secondaryText) {
    children = children = (
      <ListItemText
        className={textClassName}
        secondaryText={secondaryText}
        secondaryTextClassName={secondaryTextClassName}
      >
        {children}
      </ListItemText>
    );
  }

  if (leftIcon) {
    children = (
      <TextIconSpacing icon={leftIcon} beforeClassName="rmd-list-item__icon rmd-list-item__icon--before">
        {children}
      </TextIconSpacing>
    );
  }

  if (rightIcon) {
    children = (
      <TextIconSpacing
        icon={rightIcon}
        iconAfter={true}
        afterClassName="rmd-list-item__icon rmd-list-item__icon--after"
      >
        {children}
      </TextIconSpacing>
    );
  }

  if (primaryText && propChildren) {
    children = (
      <React.Fragment>
        {children}
        {propChildren}
      </React.Fragment>
    );
  }

  return (
    <StatesConsumer
      disabled={propDisabled}
      pressable={clickable}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      className={cn(
        "rmd-list-item",
        {
          "rmd-list-item--disabled": propDisabled,
          "rmd-list-item--clickable": !propDisabled && clickable,
          "rmd-list-item--medium": (leftIcon || rightIcon) && !secondaryText,
          "rmd-list-item--large": !(leftIcon || rightIcon) && !!secondaryText,
          "rmd-list-item--extra-large": (leftIcon || rightIcon) && !!secondaryText,
          "rmd-list-item--three-lines": !!secondaryText && threeLines,
        },
        className
      )}
    >
      {({ disabled, ...statesProps }) => {
        if (clickable) {
          return (
            <KeyboardClickable disabled={disabled} {...statesProps} role={role}>
              {clickableProps => (
                <li {...props} {...statesProps} {...clickableProps}>
                  {children}
                </li>
              )}
            </KeyboardClickable>
          );
        }

        return (
          <li {...props} {...statesProps}>
            {children}
          </li>
        );
      }}
    </StatesConsumer>
  );
};

ListItem.propTypes = {
  disabled: PropTypes.bool,
  clickable: PropTypes.bool,
  textClassName: PropTypes.string,
  secondaryTextClassName: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  forceIconWrap: PropTypes.bool,
  textChildren: PropTypes.bool,
  primaryText: PropTypes.node,
  secondaryText: PropTypes.node,
  threeLines: PropTypes.bool,
};

ListItem.defaultProps = {
  role: "listitem",
  disabled: false,
  clickable: true,
  textChildren: true,
  threeLines: false,
  forceIconWrap: false,
} as IListItemDefaultProps;
export default ListItem;
