import type { PropsWithRef } from "@react-md/core";
import { bem, useEnsuredId } from "@react-md/core";
import type {
  ListItemAddonPosition,
  ListItemAddonType,
  ListItemHeight,
} from "@react-md/list";
import { ListItem } from "@react-md/list";
import { cnb } from "cnbuilder";
import type {
  CSSProperties,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react";
import { forwardRef } from "react";
import type {
  IndeterminateCheckboxProps,
  InputToggleIconProps,
} from "./InputToggle";
import { InputToggleIcon } from "./InputToggleIcon";
import { SwitchTrack } from "./SwitchTrack";

const styles = bem("rmd-menu-item-input-toggle");

export interface MenuItemInputToggleClassNameOptions {
  className?: string;
  type: "radio" | "checkbox" | "switch";
}

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

export interface BaseMenuItemInputToggleProps
  extends HTMLAttributes<HTMLLIElement>,
    InputToggleIconProps {
  id?: string;
  disabled?: boolean;
  checked: boolean;
  onCheckedChange(checked: boolean, event: MouseEvent<HTMLLIElement>): void;

  height?: ListItemHeight;
  threeLines?: boolean;
  disableTextChildren?: boolean;
  iconAfter?: boolean;
  addon?: ReactNode;
  addonType?: ListItemAddonType;
  addonPosition?: ListItemAddonPosition;
  addonForceWrap?: boolean;
  disableAddongCenteredMedia?: boolean;
}

export interface MenuItemCheckboxProps
  extends BaseMenuItemInputToggleProps,
    IndeterminateCheckboxProps {}

export type MenuItemRadioProps = BaseMenuItemInputToggleProps;
export interface MenuItemSwitchProps extends BaseMenuItemInputToggleProps {
  trackProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  trackStyle?: CSSProperties;
  trackClassName?: string;
  ballProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  ballStyle?: CSSProperties;
  ballClassName?: string;
}

export type MenuItemInputToggleProps =
  | (MenuItemCheckboxProps & { type: "checkbox" })
  | (MenuItemRadioProps & { type: "radio" })
  | (MenuItemSwitchProps & { type: "switch" });

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
    onClick,
    className,
    tabIndex = -1,
    children,
    size = "normal",
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
    disableAddongCenteredMedia,
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
          className={trackClassName}
          {...trackProps}
          active={checked}
          ballProps={ballProps}
          ballStyle={ballStyle}
          ballClassName={ballClassName}
        />
      );
    } else {
      icon = (
        <InputToggleIcon
          style={iconStyle}
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
    disableLeftAddonCenteredMedia = disableAddongCenteredMedia;
    rightAddon = icon;
  } else {
    leftAddon = icon;
    rightAddon = addon;
    rightAddonType = addonType;
    rightAddonPosition = addonPosition;
    rightAddonForceWrap = addonForceWrap;
    disableRightAddonCenteredMedia = disableAddongCenteredMedia;
  }

  return (
    <ListItem
      {...remaining}
      aria-disabled={disabled || undefined}
      aria-checked={checked}
      id={id}
      role={type === "radio" ? "menuitemradio" : "menuitemcheckbox"}
      onClick={(event) => {
        onClick?.(event);
        onCheckedChange(!checked, event);
      }}
      ref={ref}
      className={menuItemInputToggle({ type, className })}
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
