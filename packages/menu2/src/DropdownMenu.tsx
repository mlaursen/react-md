import {
  HTMLAttributes,
  KeyboardEventHandler,
  ReactElement,
  ReactNode,
} from "react";
import { Button, ButtonProps, ButtonThemeProps } from "@react-md/button";
import {
  IconRotator,
  TextIconSpacing,
  TextIconSpacingProps,
  useIcon,
} from "@react-md/icon";

import { Menu } from "./Menu";
import { useMenuVisibility } from "./useMenuVisibility";

/**
 * @remarks \@since 4.0.0
 */
export type DropdownMenuButtonThemeProps = Pick<
  ButtonThemeProps,
  "theme" | "themeType" | "buttonType"
>;

/**
 * @remarks \@since 4.0.0
 */
export interface DropdownMenuProps
  extends HTMLAttributes<HTMLDivElement>,
    DropdownMenuButtonThemeProps,
    Pick<TextIconSpacingProps, "icon" | "iconAfter"> {
  /** {@inheritDoc MenuVisibilityHookOptions.toggleId} */
  id: string;
  /** {@inheritDoc MenuVisibilityHookOptions.menuLabel} */
  menuLabel?: string;
  /** {@inheritDoc MenuVisibilityHookOptions.onMenuKeyDown} */
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  /** {@inheritDoc MenuVisibilityHookOptions.horizontal} */
  horizontal?: boolean;

  /**
   * The children to display in the button. This should normally be text or an
   * icon.
   *
   * Note: If this is an icon, set the {@link buttonType} to `"icon"` to get the
   * correct styling and remove the dropdown icon.
   */
  buttonChildren: ReactNode;

  /**
   * Any additional props to pass to the button component.
   */
  buttonProps?: Readonly<
    Omit<ButtonProps, "children" | keyof DropdownMenuButtonThemeProps>
  >;

  /**
   * Any additional props to pass to the {@link TextIconSpacing} component that
   * surrounds the {@link buttonChildren}
   */
  textIconSpacingProps?: Readonly<
    Omit<TextIconSpacingProps, "icon" | "iconAfter" | "children">
  >;

  /**
   * Boolean if the dropdown icon should be included with the button children.
   *
   * @defaultValue `buttonType === "icon"`
   */
  disableDropdownIcon?: boolean;
}

/**
 * @remarks \@since 4.0.0
 */
export function DropdownMenu({
  id,
  icon: propIcon,
  iconAfter = true,
  textIconSpacingProps,
  theme = "clear",
  themeType = "flat",
  buttonType = "text",
  buttonProps,
  buttonChildren,
  horizontal = false,
  children,
  menuLabel,
  onKeyDown,
  disableDropdownIcon = buttonType === "icon",
  ...props
}: DropdownMenuProps): ReactElement {
  const { visible, defaultFocus, menuRef, menuProps, toggleRef, toggleProps } =
    useMenuVisibility({
      toggleId: id,
      menuLabel,
      horizontal,
      onToggleClick: buttonProps?.onClick,
      onToggleKeyDown: buttonProps?.onKeyDown,
      onMenuKeyDown: onKeyDown,
    });
  const dropdownIcon = useIcon(
    "dropdown",
    buttonType === "icon" ? null : propIcon
  );

  let icon = dropdownIcon;
  if (buttonType !== "icon" && !disableDropdownIcon) {
    icon = <IconRotator rotated={visible}>{dropdownIcon}</IconRotator>;
  }

  return (
    <>
      <Button
        {...toggleProps}
        {...buttonProps}
        ref={toggleRef}
        theme={theme}
        themeType={themeType}
        buttonType={buttonType}
      >
        <TextIconSpacing
          icon={icon}
          iconAfter={iconAfter}
          {...textIconSpacingProps}
        >
          {buttonChildren}
        </TextIconSpacing>
      </Button>
      <Menu
        {...props}
        {...menuProps}
        menuRef={menuRef}
        toggleRef={toggleRef}
        defaultFocus={defaultFocus}
        visible={visible}
        horizontal={horizontal}
      >
        {children}
      </Menu>
    </>
  );
}
