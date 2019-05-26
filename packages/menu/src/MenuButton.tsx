import React, { forwardRef, FC, ReactNode } from "react";
import cn from "classnames";
import {
  AppBarActionClassNameProps,
  useActionClassName,
} from "@react-md/app-bar";
import { Button, ButtonProps } from "@react-md/button";
import { FontIcon, IconRotator, TextIconSpacing } from "@react-md/icon";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface MenuButtonProps
  extends ButtonProps,
    AppBarActionClassNameProps {
  /**
   * An id for the button. This is required so that the `Menu` can be positioned
   * relative to this component.
   */
  id: string;

  /**
   * Boolean if the menu is currently visible. This is requied for `a11y` as it will
   * automatically set the `"aria-expanded"` prop to the correct value when needed.
   */
  visible: boolean;

  /**
   * This should probably be left at the default of `"menu"`, but can also be a true string.
   * This is required for menu a11y.
   */
  "aria-haspopup"?: "menu" | "true" | true;

  /**
   * The icon to show after the children in the button when the `buttonType` is not
   * set to `"icon"`.
   */
  dropdownIcon?: ReactNode;

  /**
   * Boolean if the dropdown icon should be removed from the button. The icon will always
   * be removed for icon buttons.
   */
  disableDropdownIcon?: boolean;

  /**
   * Boolean if the menu button should be rendered as an `AppBarAction` button instead of a default
   * button. This will also be considered `true` if the `first`, `last`, or `inheritColor` props are
   * `true`.
   */
  asAppBarAction?: boolean;
}

type WithRef = WithForwardedRef<HTMLButtonElement>;
type DefaultProps = Required<
  Pick<
    MenuButtonProps,
    | "aria-haspopup"
    | "dropdownIcon"
    | "disableDropdownIcon"
    | "first"
    | "last"
    | "asAppBarAction"
  >
>;

const block = bem("rmd-menu-button");

const MenuButton: FC<MenuButtonProps & WithRef> = ({
  className,
  visible,
  children: propChildren,
  forwardedRef,
  dropdownIcon,
  disableDropdownIcon,
  first,
  last,
  inheritColor,
  asAppBarAction,
  ...props
}) => {
  let children = propChildren;
  if (props.buttonType !== "icon" && !disableDropdownIcon) {
    children = (
      <TextIconSpacing
        icon={
          <IconRotator rotated={visible} className={block("icon")}>
            {dropdownIcon}
          </IconRotator>
        }
        iconAfter
      >
        {children}
      </TextIconSpacing>
    );
  }

  const actionClassName = useActionClassName({ first, last, inheritColor });

  return (
    <Button
      {...props}
      aria-expanded={visible ? "true" : undefined}
      ref={forwardedRef}
      className={cn(
        block(),
        {
          [actionClassName]: first || last || inheritColor || asAppBarAction,
        },
        className
      )}
    >
      {children}
    </Button>
  );
};

const defaultProps: DefaultProps = {
  "aria-haspopup": "menu",
  dropdownIcon: <FontIcon>arrow_drop_down</FontIcon>,
  disableDropdownIcon: false,
  first: false,
  last: false,
  asAppBarAction: false,
};

MenuButton.defaultProps = defaultProps;

export default forwardRef<HTMLButtonElement, MenuButtonProps>((props, ref) => (
  <MenuButton {...props} forwardedRef={ref} />
));
