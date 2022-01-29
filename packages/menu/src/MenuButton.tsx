import { forwardRef } from "react";
import { Button } from "@react-md/button";
import { IconRotator, TextIconSpacing, useIcon } from "@react-md/icon";

import type { BaseMenuButtonProps } from "./types";

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export interface MenuButtonProps extends BaseMenuButtonProps {
  /**
   * Boolean if the menu is currently visible which will rotate the dropdown
   * icon when the {@link BaseMenuButtonProps.disableDropdownIcon} is not
   * `true`.
   */
  visible: boolean;
}

/**
 * This is just an internal component that handles rendering the button for a
 * `DropdownMenu` with a conditional dropdown icon.
 *
 * @internal
 * @remarks \@since 5.0.0
 */
export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton(
    {
      icon: propIcon,
      iconAfter = true,
      iconRotatorProps,
      textIconSpacingProps,
      floating,
      theme = floating ? "secondary" : "clear",
      themeType = floating ? "contained" : "flat",
      buttonType = floating ? "icon" : "text",
      disableDropdownIcon = buttonType === "icon",
      children,
      visible,
      ...props
    },
    ref
  ) {
    const dropdownIcon = useIcon("dropdown", propIcon);
    let icon = propIcon;
    if (!disableDropdownIcon) {
      icon = (
        <IconRotator {...iconRotatorProps} rotated={visible}>
          {dropdownIcon}
        </IconRotator>
      );
    }

    return (
      <Button
        {...props}
        ref={ref}
        theme={theme}
        themeType={themeType}
        buttonType={buttonType}
        floating={floating}
      >
        <TextIconSpacing
          icon={icon}
          iconAfter={iconAfter}
          {...textIconSpacingProps}
        >
          {children}
        </TextIconSpacing>
      </Button>
    );
  }
);
