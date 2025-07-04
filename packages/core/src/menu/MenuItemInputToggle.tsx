"use client";

import { cnb } from "cnbuilder";
import {
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  forwardRef,
} from "react";

import {
  type ConfigurableInputToggleIconProps,
  type IndeterminateCheckboxProps,
} from "../form/InputToggle.js";
import { InputToggleIcon } from "../form/InputToggleIcon.js";
import { SwitchTrack } from "../form/SwitchTrack.js";
import { type InputToggleSize } from "../form/inputToggleStyles.js";
import { ListItem } from "../list/ListItem.js";
import {
  type ListItemAddonPosition,
  type ListItemAddonType,
  type ListItemChildrenTextProps,
  type ListItemHeight,
} from "../list/types.js";
import { type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import {
  menuItemInputToggle,
  menuItemInputToggleBall,
  menuItemInputToggleIcon,
  menuItemInputToggleTrack,
} from "./styles.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
 */
export type MenuItemInputToggleCheckedCallback = (
  checked: boolean,
  event: MouseEvent<HTMLLIElement>
) => void;

/** @since 2.8.0 */
export interface BaseMenuItemInputToggleProps
  extends HTMLAttributes<HTMLLIElement>,
    ConfigurableInputToggleIconProps,
    ListItemChildrenTextProps {
  checked: boolean;
  onCheckedChange: MenuItemInputToggleCheckedCallback;

  /**
   * @defaultValue `"menu-item-" + useId()`
   */
  id?: string;

  /** @defaultValue `false` */
  disabled?: boolean;

  /**
   * Set this to `true` if the `Menu` should not close when the input toggle is
   * clicked. This can be useful when interacting with a checkbox group within a
   * menu or allowing the user to select multiple options before closing the
   * menu.
   *
   * @defaultValue `false`
   */
  preventMenuHideOnClick?: boolean;

  /**
   * This is set to `"auto"` by default so the icon shrinks back down to the
   * default icon size instead of relative to the current font size. You
   * probably don't want to change this since it'll also modify the height of
   * the menu item
   *
   * @defaultValue `"auto"`
   */
  size?: InputToggleSize;

  /** @defaultValue `"auto"` */
  height?: ListItemHeight;

  /** @defaultValue `false` */
  iconAfter?: boolean;

  addon?: ReactNode;
  addonType?: ListItemAddonType;
  addonPosition?: ListItemAddonPosition;

  /** @defaultValue `false` */
  addonForceWrap?: boolean;

  /** @defaultValue `false` */
  disableAddonCenteredMedia?: boolean;
}

export interface MenuItemCheckboxProps
  extends BaseMenuItemInputToggleProps,
    IndeterminateCheckboxProps {}

export type MenuItemRadioProps = BaseMenuItemInputToggleProps;

/**
 * @since 2.8.0
 * @since 6.0.0 Added additional props for styling the track and ball.
 */
export interface MenuItemSwitchProps extends BaseMenuItemInputToggleProps {
  trackProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>>;
  trackStyle?: CSSProperties;
  trackClassName?: string;
  ballProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>>;
  ballStyle?: CSSProperties;
  ballClassName?: string;
}

/**
 * @since 2.8.0
 * @since 6.0.0 Updated to be a union of the different props to enforce the
 * correct props based on `type`
 */
export type MenuItemInputToggleProps =
  | (MenuItemCheckboxProps & { type: "checkbox" })
  | (MenuItemRadioProps & { type: "radio" })
  | (MenuItemSwitchProps & { type: "switch" });

/**
 * **Client Component**
 *
 * This is a low-level component that should probably not be used externally and
 * instead the `MenuItemCheckbox`, `MenuItemRadio`, or `MenuItemSwitch` should
 * be used instead.
 *
 * @see {@link https://react-md.dev/components/menu | DropdownMenu Demos}
 * @see {@link MenuItemCheckbox} for checkbox examples
 * @see {@link MenuItemRadio} for radio examples
 * @see {@link MenuItemSwitch} for switch examples
 * @since 2.8.0
 */
export const MenuItemInputToggle = forwardRef<
  HTMLLIElement,
  MenuItemInputToggleProps
>(function MenuItemInputToggle(props, ref) {
  const {
    id: propId,
    type,
    disabled = false,
    checked,
    onCheckedChange,
    preventMenuHideOnClick = false,
    onClick = noop,
    className,
    tabIndex = -1,
    children,
    size = "auto",
    icon: propIcon,
    iconAfter = false,
    iconProps,
    iconStyle,
    iconClassName,
    checkedIcon,
    indeterminate,
    indeterminateIcon,
    addon,
    addonType,
    addonPosition,
    addonForceWrap,
    disableAddonCenteredMedia,
    ballProps,
    ballStyle,
    ballClassName,
    trackProps,
    trackStyle,
    trackClassName,
    ...remaining
  } = props as MenuItemSwitchProps &
    MenuItemCheckboxProps & { type: "checkbox" | "radio" | "switch" };
  const id = useEnsuredId(propId, "menu-item");

  let icon = propIcon;
  if (type === "switch") {
    icon = (
      <SwitchTrack
        style={trackStyle}
        {...trackProps}
        className={cnb(
          menuItemInputToggleTrack(),
          trackClassName,
          trackProps?.className
        )}
        active={checked}
        ballProps={ballProps}
        ballStyle={ballStyle}
        ballClassName={cnb(menuItemInputToggleBall(), ballClassName)}
      />
    );
  } else {
    icon = (
      <InputToggleIcon
        style={iconStyle}
        disableEm
        {...iconProps}
        className={cnb(
          menuItemInputToggleIcon(),
          iconClassName,
          iconProps?.className
        )}
        size={size}
        type={type}
        checked={checked}
        disabled={disabled}
        icon={propIcon}
        checkedIcon={checkedIcon}
        indeterminate={indeterminate}
        indeterminateIcon={indeterminateIcon}
      />
    );
  }

  let leftAddon: ReactNode;
  let leftAddonType: ListItemAddonType | undefined;
  let leftAddonPosition: ListItemAddonPosition | undefined;
  let leftAddonForceWrap: boolean | undefined;
  let disableLeftAddonCenteredMedia: boolean | undefined;
  let rightAddon: ReactNode;
  let rightAddonType: ListItemAddonType | undefined;
  let rightAddonPosition: ListItemAddonPosition | undefined;
  let rightAddonForceWrap: boolean | undefined;
  let disableRightAddonCenteredMedia: boolean | undefined;
  if (iconAfter) {
    leftAddon = addon;
    leftAddonType = addonType;
    leftAddonPosition = addonPosition;
    leftAddonForceWrap = addonForceWrap;
    disableLeftAddonCenteredMedia = disableAddonCenteredMedia;
    rightAddon = icon;
  } else {
    leftAddon = icon;
    rightAddon = addon;
    rightAddonType = addonType;
    rightAddonPosition = addonPosition;
    rightAddonForceWrap = addonForceWrap;
    disableRightAddonCenteredMedia = disableAddonCenteredMedia;
  }

  return (
    <ListItem
      {...remaining}
      // I'm not actually sure if this is correct
      aria-checked={indeterminate && checked ? "mixed" : checked}
      id={id}
      role={type === "radio" ? "menuitemradio" : "menuitemcheckbox"}
      onClick={(event) => {
        onClick(event);
        onCheckedChange(!checked, event);

        if (preventMenuHideOnClick) {
          event.stopPropagation();
        }
      }}
      ref={ref}
      className={menuItemInputToggle({ type, className })}
      disabled={disabled}
      tabIndex={tabIndex}
      leftAddon={leftAddon}
      leftAddonType={leftAddonType}
      leftAddonPosition={leftAddonPosition}
      leftAddonForceWrap={leftAddonForceWrap}
      disableLeftAddonCenteredMedia={disableLeftAddonCenteredMedia}
      rightAddon={rightAddon}
      rightAddonType={rightAddonType}
      rightAddonPosition={rightAddonPosition}
      rightAddonForceWrap={rightAddonForceWrap}
      disableRightAddonCenteredMedia={disableRightAddonCenteredMedia}
    >
      {children}
    </ListItem>
  );
});
