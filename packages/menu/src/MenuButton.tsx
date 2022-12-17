import type { ButtonProps } from "@react-md/button";
import { Button } from "@react-md/button";
import { useEnsuredId } from "@react-md/core";
import type { IconRotatorProps, TextIconSpacingProps } from "@react-md/icon";
import { IconRotator, useIcon } from "@react-md/icon";
import { forwardRef } from "react";
import { useMenuVisibility } from "./MenuVisibilityProvider";

const noop = (): void => {
  // do nothing
};

/** @remarks \@since 5.0.0 */
export type MenuButtonTextIconSpacingProps = Pick<
  TextIconSpacingProps,
  "icon" | "iconAfter"
>;

/** @remarks \@since 5.0.0 */
export type MenuButtonIconRotatorProps = Omit<
  IconRotatorProps,
  "children" | "rotated"
>;

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

export interface MenuButtonProps extends ButtonProps, BaseMenuButtonProps {}

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
    const id = useEnsuredId(propId, "menu-button");
    const { visible, setVisible, defaultFocusIndex } = useMenuVisibility();
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
        {...remaining}
        aria-haspopup="menu"
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
