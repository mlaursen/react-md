"use client";
import { cnb } from "cnbuilder";
import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ListItem } from "../list/ListItem.js";
import {
  type ListItemAddonPosition,
  type ListItemAddonType,
  type ListItemHeight,
} from "../list/types.js";
import { type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { bem } from "../utils/bem.js";
import {
  type IndeterminateCheckboxProps,
  type InputToggleIconProps,
} from "./InputToggle.js";
import { InputToggleIcon } from "./InputToggleIcon.js";
import { SwitchTrack } from "./SwitchTrack.js";
import { type InputToggleSize } from "./inputToggleStyles.js";

const noop = (): void => {
  // do nothing
};
const styles = bem("rmd-menu-item-input-toggle");

/** @remarks \@since 6.0.0 */
export interface MenuItemInputToggleClassNameOptions {
  className?: string;
  type: "radio" | "checkbox" | "switch";
}

/**
 * @remarks \@since 6.0.0
 */
export function menuItemInputToggle(
  options: MenuItemInputToggleClassNameOptions
): string {
  const { className, type } = options;
  return cnb(
    `rmd-${type}-menu-item`,
    styles({ switch: type === "switch" }),
    className
  );
}

/**
 * @remarks \@since 6.0.0
 */
export type MenuItemInputToggleCheckedCallback = (
  checked: boolean,
  event: MouseEvent<HTMLLIElement>
) => void;

/** @remarks \@since 2.8.0 */
export interface BaseMenuItemInputToggleProps
  extends HTMLAttributes<HTMLLIElement>,
    InputToggleIconProps {
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
  multiline?: boolean;

  /** @defaultValue `false` */
  disableTextChildren?: boolean;

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
 * @remarks
 * \@since 2.8.0
 * \@since 6.0.0 Added additional props for styling the track and ball.
 */
export interface MenuItemSwitchProps extends BaseMenuItemInputToggleProps {
  trackProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  trackStyle?: CSSProperties;
  trackClassName?: string;
  ballProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  ballStyle?: CSSProperties;
  ballClassName?: string;
}

/**
 * @remarks
 * \@since 2.8.0
 * \@since 6.0.0 Updated to be a union of the different props to enforce the
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
 * @see {@link MenuItemCheckbox} for checkbox examples
 * @see {@link MenuItemRadio} for radio examples
 * @see {@link MenuItemSwitch} for switch examples
 * @remarks \@since 2.8.0
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
  if (typeof propIcon === "undefined") {
    if (type === "switch") {
      icon = (
        <SwitchTrack
          style={trackStyle}
          {...trackProps}
          className={cnb(
            styles("track"),
            trackClassName,
            trackProps?.className
          )}
          active={checked}
          ballProps={ballProps}
          ballStyle={ballStyle}
          ballClassName={cnb(styles("ball"), ballClassName)}
        />
      );
    } else {
      icon = (
        <InputToggleIcon
          style={iconStyle}
          disableEm
          {...iconProps}
          className={cnb(styles("icon"), iconClassName, iconProps?.className)}
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
