import React, { forwardRef, ReactNode } from "react";
import cn from "classnames";
import {
  AppBarActionClassNameProps,
  useActionClassName,
} from "@react-md/app-bar";
import { Button, ButtonProps } from "@react-md/button";
import { useIcon } from "@react-md/icon";
import { bem } from "@react-md/utils";

import { ToggleChildren } from "./ToggleChildren";

export interface MenuButtonProps
  extends ButtonProps,
    AppBarActionClassNameProps {
  /**
   * An id for the button. This is required so that the `Menu` can be positioned
   * relative to this component.
   */
  id: string;

  /**
   * Boolean if the menu is currently visible. This is requied for `a11y` as it
   * will automatically set the `"aria-expanded"` prop to the correct value when
   * needed.
   */
  visible: boolean;

  /**
   * This should probably be left at the default of `"menu"`, but can also be a
   * true string.  This is required for menu a11y.
   */
  "aria-haspopup"?: "menu" | "true" | true;

  /**
   * The icon to show after the children in the button when the `buttonType` is
   * not set to `"icon"`.
   */
  dropdownIcon?: ReactNode;

  /**
   * Boolean if the dropdown icon should be removed from the button. The icon
   * will always be removed for icon buttons.
   */
  disableDropdownIcon?: boolean;

  /**
   * Boolean if the menu button should be rendered as an `AppBarAction` button
   * instead of a default button. This will also be considered `true` if the
   * `first`, `last`, or `inheritColor` props are `true`.
   */
  asAppBarAction?: boolean;
}

const block = bem("rmd-menu-button");

/**
 * This component is an extension of the `Button` component that will:
 * - apply the required a11y prosp for a menu button
 * - dynamically add a dropdown icon after the button contents
 */
export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton(
    {
      "aria-haspopup": ariaHasPopup = "menu",
      className,
      visible,
      children,
      dropdownIcon: propDropdownIcon,
      disableDropdownIcon = false,
      first = false,
      last = false,
      inheritColor,
      asAppBarAction = false,
      ...props
    },
    ref
  ) {
    const { buttonType } = props;
    const dropdownIcon = useIcon("dropdown", propDropdownIcon);
    const actionClassName = useActionClassName({ first, last, inheritColor });
    return (
      <Button
        {...props}
        ref={ref}
        aria-haspopup={ariaHasPopup}
        aria-expanded={visible ? "true" : undefined}
        className={cn(
          block(),
          {
            [actionClassName]: first || last || inheritColor || asAppBarAction,
          },
          className
        )}
      >
        <ToggleChildren
          visible={visible}
          dropdownIcon={dropdownIcon}
          disableDropdownIcon={disableDropdownIcon || buttonType === "icon"}
        >
          {children}
        </ToggleChildren>
      </Button>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    MenuButton.propTypes = {
      "aria-haspopup": PropTypes.oneOf(["menu", "true", true]),
      id: PropTypes.string.isRequired,
      visible: PropTypes.bool.isRequired,
      dropdownIcon: PropTypes.node,
      disableDropdownIcon: PropTypes.bool,
      className: PropTypes.string,
      children: PropTypes.node,
      buttonType: PropTypes.oneOf(["text", "icon"]),
      first: PropTypes.bool,
      last: PropTypes.bool,
      inheritColor: PropTypes.bool,
      asAppBarAction: PropTypes.bool,
    };
  } catch (e) {}
}
