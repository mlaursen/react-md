import React, { forwardRef, FunctionComponent, ReactNode } from "react";
import cn from "classnames";
import { Button, ButtonProps } from "@react-md/button";
import { FontIcon, IconRotator, TextIconSpacing } from "@react-md/icon";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

export interface MenuButtonProps extends ButtonProps {
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
}

type WithRef = WithForwardedRef<HTMLButtonElement>;
type DefaultProps = Required<
  Pick<
    MenuButtonProps,
    "aria-haspopup" | "dropdownIcon" | "disableDropdownIcon"
  >
>;

const block = bem("rmd-menu-button");

const MenuButton: FunctionComponent<MenuButtonProps & WithRef> = ({
  className,
  visible,
  children: propChildren,
  forwardedRef,
  dropdownIcon,
  disableDropdownIcon,
  ...props
}) => {
  let children = propChildren;
  if (props.buttonType !== "icon" && !disableDropdownIcon) {
    children = (
      <TextIconSpacing
        icon={<IconRotator rotated={visible}>{dropdownIcon}</IconRotator>}
        iconAfter
      >
        {children}
      </TextIconSpacing>
    );
  }

  return (
    <Button
      {...props}
      aria-expanded={visible ? "true" : undefined}
      ref={forwardedRef}
      className={cn(block(), className)}
    >
      {children}
    </Button>
  );
};

const defaultProps: DefaultProps = {
  "aria-haspopup": "menu",
  dropdownIcon: <FontIcon>arrow_drop_down</FontIcon>,
  disableDropdownIcon: false,
};

MenuButton.defaultProps = defaultProps;

export default forwardRef<HTMLButtonElement, MenuButtonProps>((props, ref) => (
  <MenuButton {...props} forwardedRef={ref} />
));
