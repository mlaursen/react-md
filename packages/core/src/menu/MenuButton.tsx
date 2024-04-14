"use client";
import { forwardRef } from "react";
import { Button, type ButtonProps } from "../button/Button.js";
import { getIcon } from "../icon/iconConfig.js";
import { IconRotator, type IconRotatorProps } from "../icon/IconRotator.js";
import { type TextIconSpacingProps } from "../icon/TextIconSpacing.js";
import { useAppSize } from "../media-queries/AppSizeProvider.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useMenuConfiguration } from "./MenuConfigurationProvider.js";
import { useMenuVisibility } from "./MenuVisibilityProvider.js";

const noop = (): void => {
  // do nothing
};

/** @since 5.0.0 */
export type MenuButtonTextIconSpacingProps = Pick<
  TextIconSpacingProps,
  "icon" | "iconAfter"
>;

/** @since 5.0.0 */
export type MenuButtonIconRotatorProps = Omit<
  IconRotatorProps,
  "children" | "rotated"
>;

/**
 * @since 5.0.0
 * @since 6.0.0 No longer extends the {@link ButtonProps}, no longer
 * requires an `id`, and no longer supports `textIconSpacingProps`.
 */
export interface BaseMenuButtonProps extends MenuButtonTextIconSpacingProps {
  /**
   * Any additional props to pass to the {@link IconRotator} component that
   * surrounds the {@link buttonChildren}
   */
  iconRotatorProps?: Readonly<MenuButtonIconRotatorProps>;

  /**
   * Boolean if the dropdown icon should be included with the button children.
   *
   * @defaultValue `buttonType === "icon"`
   */
  disableDropdownIcon?: boolean;
}

/**
 * @since 5.0.0
 * @since 6.0.0 See {@link BaseMenuButtonProps} for breaking changes.
 */
export interface MenuButtonProps extends ButtonProps, BaseMenuButtonProps {}

/**
 * **Client Component**
 *
 * An internal component that handles rendering a button for the `DropdownMenu`
 * while implementing the correct accessibility and keyboard movement.
 *
 * @since 5.0.0
 * @since 6.0.0 See {@link BaseMenuButtonProps} for breaking changes.
 */
export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton(props, ref) {
    const {
      id: propId,
      onClick = noop,
      onKeyDown = noop,
      icon: propIcon,
      iconAfter = true,
      iconRotatorProps,
      floating,
      buttonType = floating ? "icon" : "text",
      disableDropdownIcon = buttonType === "icon",
      children,
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "menubutton");
    const { visible, setVisible, defaultFocusIndex } = useMenuVisibility();
    const { renderAsSheet } = useMenuConfiguration();
    const { isPhone } = useAppSize();
    const isSheet =
      renderAsSheet === true || (renderAsSheet === "phone" && isPhone);

    const dropdownIcon = getIcon("dropdown", propIcon);
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
        {...remaining}
        aria-haspopup={isSheet ? "dialog" : "menu"}
        aria-expanded={visible || undefined}
        id={id}
        ref={ref}
        floating={floating}
        buttonType={buttonType}
        onClick={(event) => {
          onClick(event);

          defaultFocusIndex.current = 0;
          setVisible((prevVisible) => !prevVisible);
        }}
        onKeyDown={(event) => {
          onKeyDown(event);

          switch (event.key) {
            case "ArrowDown":
              event.preventDefault();
              event.stopPropagation();
              defaultFocusIndex.current = 0;
              setVisible(true);
              break;
            case "ArrowUp":
              event.preventDefault();
              event.stopPropagation();
              defaultFocusIndex.current = -1;
              setVisible(true);
              break;
          }
        }}
      >
        {!iconAfter && icon}
        {children}
        {iconAfter && icon}
      </Button>
    );
  }
);
