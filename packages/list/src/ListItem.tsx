import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { StatesConsumer } from "@react-md/states";
import { KeyboardClickable } from "@react-md/a11y";

import ListItemText from "./ListItemText";
import ListItemLeftIcon from "./ListItemLeftIcon";
import ListItemRightIcon from "./ListItemRightIcon";

export type ListItemHeight = "auto" | "medium" | "large" | "extra-large" | "content";

export interface IListItemBaseProps {
  /**
   * An optional icon to display to the left of the children or provided text elements. If this is
   * a valid React element, the spacing class names will be cloned into the element. Otherwise it
   * will be wrapped with a `<span>` to have the correct class name applied. You can also use the
   * `forceIconWrap` prop to **always** wrap the icon in a `<span>` with the correct class name applied.
   *
   * @docgen
   */
  leftIcon?: React.ReactNode;

  /**
   * An optional icon to display to the right of the children or provided text elements. If this is
   * a valid React element, the spacing class names will be cloned into the element. Otherwise it
   * will be wrapped with a `<span>` to have the correct class name applied. You can also use the
   * `forceIconWrap` prop to **always** wrap the icon in a `<span>` with the correct class name applied.
   *
   * @docgen
   */
  rightIcon?: React.ReactNode;

  /**
   * Boolean if the left and/or right icons should be "forcefully" wrapped in a `<span>` with the spacing
   * class names applied instead of attempting to clone it into the provided icon element.
   *
   * @docgen
   */
  forceIconWrap?: boolean;
}

export interface IListItemBaseTextProps {
  /**
   * An optional className to apply to the `<span>` that surrounds the `primaryText` and optionally
   * `secondaryText` within the list item.
   *
   * @docgen
   */
  textClassName?: string;

  /**
   * An optional className to apply to the `<span>` that surrounds the `secondaryText` within the
   * list item.
   *
   * @docgen
   */
  secondaryTextClassName?: string;

  /**
   * Boolean if the children should be treated as the `primaryText` prop. This will wrap them in an additional
   * class so that they have ellipsis for text overflow.
   *
   * If you want to have more "fredom" within the ListItem, you can disable this prop so that the height will
   * grow depending on content.
   *
   * NOTE: If the `secondaryText` prop is provided, this will always be considered `true`.
   *
   * @docgen
   */
  textChildren?: boolean;

  /**
   * An optional element that should be rendered as the `primaryText` within the list item. It is most likely
   * easier to use the `children` prop instead, but this allows you to create more complex components with the
   * ListItem since you can provided `children` and have the styles for the `primaryText` still applied. By
   * default, this will only allow one line of text and add ellipsis for any text overflow.
   *
   * @docgen
   */
  primaryText?: React.ReactNode;

  /**
   * An optional element that should be rendered as the `secondaryText` within the list item. By default, this
   * will only span one line and add ellipsis for overflow.
   *
   * @docgen
   */
  secondaryText?: React.ReactNode;
}

export interface IListItemProps
  extends IListItemBaseProps,
    IListItemBaseTextProps,
    React.HTMLAttributes<HTMLLIElement> {
  /**
   * The role for the list item. This should really be one of:
   * - listitem
   * - treeitem
   * - option
   * - none
   *
   * but I am allowing any string just in case I forget a use case.
   *
   * @docgen
   */
  role?: string;

  /**
   * Boolean if the list item is disabled. This is only applied if the `clickable` prop
   * is also enabled.
   *
   * @docgen
   */
  disabled?: boolean;

  /**
   * Boolean if the list item is clickable. It will update the the `<li>` element with the
   * `KeyboardClickable` functionality of a "listitem".
   *
   * @docgen
   */
  clickable?: boolean;

  /**
   * Boolean if the list item is currently selected to show a selected state.
   *
   * @docgen
   */
  selected?: boolean;

  /**
   * Boolean if the list item should be considered "three-lines" in height. This will update the `secondaryText`
   * to span 2 lines instead of one, but it will not correctly applied the trailing ellipsis overflow due to
   * browser compatibility of `line-clamp`. If you would still like the ellipsis to show, it is recommended to
   * use javascript to add them yourself.
   *
   * @docgen
   */
  threeLines?: boolean;

  /**
   * The height to apply to the list item. When it is set to `"auto"`, it will use:
   * - `"medium"` if a `leftIcon` or `rightIcon` is applied with no secondary text
   * - `"large"` if no `leftIcon` or `rightIcon` is applied but has secondary text
   * - `"extra-large"` if there is both a `leftIcon` or `rightIcon` with secondary text
   *
   * @docgen
   */
  height?: ListItemHeight;
}

export interface IListItemDefaultProps {
  role: string;
  disabled: boolean;
  clickable: boolean;
  textChildren: boolean;
  threeLines: false;
  forceIconWrap: boolean;
  height: ListItemHeight;
}

export type ListItemWithDefaultProps = IListItemProps & IListItemDefaultProps;

/**
 * The `ListItem` component is used to render clickable and keyboard focusable items within
 * a list. It is also possible to render icons, avatars, and graphics before or after the mian
 * content.
 */
export default class ListItem extends React.Component<IListItemProps> {
  public static propTypes = {
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

  public static defaultProps = {
    role: "listitem",
    disabled: false,
    clickable: true,
    textChildren: true,
    threeLines: false,
    forceIconWrap: false,
    height: "auto",
  } as IListItemDefaultProps;

  public render() {
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
      selected,
      role,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      onKeyUp,
      onKeyDown,
      height,
      ...props
    } = this.props as ListItemWithDefaultProps;

    let children = propChildren;
    if (primaryText || textChildren) {
      children = (
        <ListItemText
          className={textClassName}
          secondaryText={secondaryText}
          secondaryTextClassName={secondaryTextClassName}
        >
          {textChildren && children ? children : primaryText}
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

    children = (
      <ListItemLeftIcon icon={leftIcon} forceIconWrap={forceIconWrap}>
        {children}
      </ListItemLeftIcon>
    );
    children = (
      <ListItemRightIcon icon={rightIcon} forceIconWrap={forceIconWrap}>
        {children}
      </ListItemRightIcon>
    );

    if (primaryText && propChildren) {
      children = (
        <React.Fragment>
          {children}
          {propChildren}
        </React.Fragment>
      );
    }

    const isHeightAuto = height === "auto";
    const isHeightMedium = height === "medium";
    const isHeightLarge = height === "large";
    const isHeightExtraLarge = height === "extra-large";
    return (
      <StatesConsumer
        disabled={propDisabled}
        selected={selected}
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
            "rmd-list-item--stateful": !propDisabled && clickable,
            "rmd-list-item--medium":
              isHeightMedium || (isHeightAuto && (leftIcon || rightIcon) && !secondaryText),
            "rmd-list-item--large":
              isHeightLarge || (isHeightAuto && !(leftIcon || rightIcon) && !!secondaryText),
            "rmd-list-item--extra-large":
              isHeightExtraLarge || (isHeightAuto && (leftIcon || rightIcon) && !!secondaryText),
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
                  <li {...statesProps} {...clickableProps} {...props}>
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
  }
}
