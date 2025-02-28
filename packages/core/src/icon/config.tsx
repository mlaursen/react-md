import { type ReactNode } from "react";

import { FontIcon } from "./FontIcon.js";

/**
 * @since 5.0.0 The `download` icon has been renamed to `upload`.
 */
export interface ConfigurableIcons {
  /**
   * The icon for navigating backwards or closing an item to the left.
   *
   * @defaultValue `<FontIcon>keyboard_arrow_left</FontIcon>`
   */
  back?: ReactNode;

  /**
   * The icon to use when clearing content from a text field.
   *
   * @defaultValue `<FontIcon>clear</FontIcon>`
   * @since 6.0.0
   */
  clear?: ReactNode;

  /**
   * @defaultValue `<FontIcon>close</FontIcon>`
   *
   * @since 6.0.0
   */
  close?: ReactNode;

  /**
   * The icon to use for unchecked checkboxes.
   *
   * @defaultValue `<FontIcon>check_box_outline_blank</FontIcon>`
   * @since 6.0.0 This icon now represents the unchecked state for
   * checkboxes.
   */
  checkbox?: ReactNode;

  /**
   * The icon to use for checked checkboxes.
   *
   * @defaultValue `<FontIcon>check_box</FontIcon>`
   * @since 6.0.0
   */
  checkboxChecked?: ReactNode;

  /**
   * The icon to use for indeterminate checkboxes.
   *
   * @defaultValue `<FontIcon>indeterminate_check_box</FontIcon>`
   * @since 6.0.0
   */
  checkboxIndeterminate?: ReactNode;

  /**
   * The icon to use for dropdown menus or content that expands vertically in a
   * new material instead of inline like the `expander` icon.
   *
   * @defaultValue `<FontIcon>arrow_drop_down</FontIcon>`
   */
  dropdown?: ReactNode;

  /**
   * The icon to use when there are form errors.
   *
   * @since 2.5.0
   * @defaultValue `<FontIcon>error_outline</FontIcon>`
   */
  error?: ReactNode;

  /**
   * The icon to use for expanding content vertically.
   *
   * @defaultValue `<FontIcon>keyboard_arrow_down</FontIcon>`
   */
  expander?: ReactNode;

  /**
   * The icon for navigating forwards or closing an item to the right. This is
   * also used internally for nested dropdown menus.
   *
   * @defaultValue `<FontIcon>keyboard_arrow_right</FontIcon>`
   */
  forward?: ReactNode;

  /**
   * The general to use for displaying a main navigation menu (usually a
   * hamburger menu).
   *
   * @defaultValue `<FontIcon>menu</FontIcon>`
   */
  menu?: ReactNode;

  /**
   * The icon for displaying notifications. This is used internally in the
   * `BadgedButton` in the `@react-md/badge` package.
   *
   * @defaultValue `<FontIcon>notifications</FontIcon>`
   */
  notification?: ReactNode;

  /**
   * The icon for temporarily displaying a password's field value as plain text.
   *
   * @defaultValue `<FontIcon>remove_red_eye</FontIcon>`
   */
  password?: ReactNode;

  /**
   * The icon to use for unchecked radio buttons.
   *
   * @defaultValue `<FontIcon>radio_button_unchecked</FontIcon>`
   * @since 6.0.0 This icon now represents the unchecked state for
   * radios.
   */
  radio?: ReactNode;

  /**
   * The icon to use for checked radio buttons.
   *
   * @defaultValue `<FontIcon>radio_button_checked</FontIcon>`
   */
  radioChecked?: ReactNode;

  /**
   * The icon to use when removing elements.
   *
   * @defaultValue `<FontIcon>cancel</FontIcon>`
   */
  remove?: ReactNode;

  /**
   * The icon to use for showing that something has been selected that is not a
   * radio or checkbox. This is used internally for the `Chip` in the
   * `@react-md/core` package.
   *
   * @defaultValue `<FontIcon>check</FontIcon>`
   */
  selected?: ReactNode;

  /**
   * The icon to represent sorting content.
   *
   * @defaultValue `<FontIcon>arrow_upward</FontIcon>`
   */
  sort?: ReactNode;

  /**
   * The icon to use for the `FileInput` component (normally file
   * uploads).
   *
   * @since 5.0.0
   * @defaultValue `<FontIcon>file_upload</FontIcon>`
   */
  upload?: ReactNode;
}

export type ConfiguredIcons = Required<ConfigurableIcons>;

/**
 * @since 6.0.0
 */
export type ConfigurableIconName = keyof ConfigurableIcons;

/**
 * This is a **mutable** object of icons that `react-md` will use for rendering
 * icons within components. The defaults will use the font versions of material
 * icons.
 *
 * @see {@link configureIcons} for a quick way of overriding the configuration
 * or the example below.
 *
 * @example Mutating this object
 * ```tsx
 * import { ICON_CONFIG } from "@react-md/core/icon/config";
 * import ArrowDropDownIcon from "@react-md/material-icons/ArrowDropDownIcon";
 * import ArrowUpwardIcon from "@react-md/material-icons/ArrowUpwardIcon";
 * import CancelIcon from "@react-md/material-icons/CancelIcon";
 * import CheckBoxIcon from "@react-md/material-icons/CheckBoxIcon";
 * import CheckBoxOutlineBlankIcon from "@react-md/material-icons/CheckBoxOutlineBlankIcon";
 * import CheckIcon from "@react-md/material-icons/CheckIcon";
 * import CloseIcon from "@react-md/material-icons/CloseIcon";
 * import ErrorOutlineIcon from "@react-md/material-icons/ErrorOutlineIcon";
 * import FileUploadIcon from "@react-md/material-icons/FileUploadIcon";
 * import IndeterminateCheckBoxIcon from "@react-md/material-icons/IndeterminateCheckBoxIcon";
 * import KeyboardArrowDownIcon from "@react-md/material-icons/KeyboardArrowDownIcon";
 * import KeyboardArrowLeftIcon from "@react-md/material-icons/KeyboardArrowLeftIcon";
 * import KeyboardArrowRightIcon from "@react-md/material-icons/KeyboardArrowRightIcon";
 * import MenuIcon from "@react-md/material-icons/MenuIcon";
 * import NotificationsIcon from "@react-md/material-icons/NotificationsIcon";
 * import RadioButtonCheckedIcon from "@react-md/material-icons/RadioButtonCheckedIcon";
 * import RadioButtonUncheckedIcon from "@react-md/material-icons/RadioButtonUncheckedIcon";
 * import RemoveRedEyeIcon from "@react-md/material-icons/RemoveRedEyeIcon";
 *
 * ICON_CONFIG.back = <KeyboardArrowLeftIcon />;
 * ICON_CONFIG.close = <CloseIcon />;
 * ICON_CONFIG.checkbox = <CheckBoxOutlineBlankIcon />;
 * ICON_CONFIG.checkboxChecked = <CheckBoxIcon />;
 * ICON_CONFIG.checkboxIndeterminate = <IndeterminateCheckBoxIcon />;
 * ICON_CONFIG.dropdown = <ArrowDropDownIcon />;
 * ICON_CONFIG.error = <ErrorOutlineIcon />;
 * ICON_CONFIG.expander = <KeyboardArrowDownIcon />;
 * ICON_CONFIG.forward = <KeyboardArrowRightIcon />;
 * ICON_CONFIG.menu = <MenuIcon />;
 * ICON_CONFIG.notification = <NotificationsIcon />;
 * ICON_CONFIG.password = <RemoveRedEyeIcon />;
 * ICON_CONFIG.radio = <RadioButtonUncheckedIcon />;
 * ICON_CONFIG.radioChecked = <RadioButtonCheckedIcon />;
 * ICON_CONFIG.remove = <CancelIcon />;
 * ICON_CONFIG.selected = <CheckIcon />;
 * ICON_CONFIG.sort = <ArrowUpwardIcon />;
 * ICON_CONFIG.upload = <FileUploadIcon />;
 * ```
 *
 *
 * @since 6.0.0
 */
export const ICON_CONFIG: ConfiguredIcons = {
  back: <FontIcon>keyboard_arrow_left</FontIcon>,
  clear: <FontIcon>clear</FontIcon>,
  close: <FontIcon>close</FontIcon>,
  checkbox: <FontIcon>check_box_outline_blank</FontIcon>,
  checkboxChecked: <FontIcon>check_box</FontIcon>,
  checkboxIndeterminate: <FontIcon>indeterminate_check_box</FontIcon>,
  dropdown: <FontIcon>arrow_drop_down</FontIcon>,
  error: <FontIcon>error_outline</FontIcon>,
  expander: <FontIcon>keyboard_arrow_down</FontIcon>,
  forward: <FontIcon>keyboard_arrow_right</FontIcon>,
  menu: <FontIcon>menu</FontIcon>,
  notification: <FontIcon>notifications</FontIcon>,
  password: <FontIcon>remove_red_eye</FontIcon>,
  radio: <FontIcon>radio_button_unchecked</FontIcon>,
  radioChecked: <FontIcon>radio_button_checked</FontIcon>,
  remove: <FontIcon>cancel</FontIcon>,
  selected: <FontIcon>check</FontIcon>,
  sort: <FontIcon>arrow_upward</FontIcon>,
  upload: <FontIcon>file_upload</FontIcon>,
};

/**
 * A convenience helper to reconfigure icons within `react-md`.
 *
 * @example Using SVG Material Icons
 * ```tsx
 * "use client";
 * import { configureIcons } from "@react-md/core/icon/config";
 * import ArrowDropDownIcon from "@react-md/material-icons/ArrowDropDownIcon";
 * import ArrowUpwardIcon from "@react-md/material-icons/ArrowUpwardIcon";
 * import CancelIcon from "@react-md/material-icons/CancelIcon";
 * import CheckBoxIcon from "@react-md/material-icons/CheckBoxIcon";
 * import CheckBoxOutlineBlankIcon from "@react-md/material-icons/CheckBoxOutlineBlankIcon";
 * import CheckIcon from "@react-md/material-icons/CheckIcon";
 * import CloseIcon from "@react-md/material-icons/CloseIcon";
 * import ErrorOutlineIcon from "@react-md/material-icons/ErrorOutlineIcon";
 * import FileUploadIcon from "@react-md/material-icons/FileUploadIcon";
 * import IndeterminateCheckBoxIcon from "@react-md/material-icons/IndeterminateCheckBoxIcon";
 * import KeyboardArrowDownIcon from "@react-md/material-icons/KeyboardArrowDownIcon";
 * import KeyboardArrowLeftIcon from "@react-md/material-icons/KeyboardArrowLeftIcon";
 * import KeyboardArrowRightIcon from "@react-md/material-icons/KeyboardArrowRightIcon";
 * import MenuIcon from "@react-md/material-icons/MenuIcon";
 * import NotificationsIcon from "@react-md/material-icons/NotificationsIcon";
 * import RadioButtonCheckedIcon from "@react-md/material-icons/RadioButtonCheckedIcon";
 * import RadioButtonUncheckedIcon from "@react-md/material-icons/RadioButtonUncheckedIcon";
 * import RemoveRedEyeIcon from "@react-md/material-icons/RemoveRedEyeIcon";
 *
 * configureIcons({
 *   back: <KeyboardArrowLeftIcon />,
 *   close: <CloseIcon />,
 *   checkbox: <CheckBoxOutlineBlankIcon />,
 *   checkboxChecked: <CheckBoxIcon />,
 *   checkboxIndeterminate: <IndeterminateCheckBoxIcon />,
 *   dropdown: <ArrowDropDownIcon />,
 *   error: <ErrorOutlineIcon />,
 *   expander: <KeyboardArrowDownIcon />,
 *   forward: <KeyboardArrowRightIcon />,
 *   menu: <MenuIcon />,
 *   notification: <NotificationsIcon />,
 *   password: <RemoveRedEyeIcon />,
 *   radio: <RadioButtonUncheckedIcon />,
 *   radioChecked: <RadioButtonCheckedIcon />,
 *   remove: <CancelIcon />,
 *   selected: <CheckIcon />,
 *   sort: <ArrowUpwardIcon />,
 *   upload: <FileUploadIcon />,
 * });
 * ```
 *
 * @since 6.0.0
 */
export function configureIcons(overrides: ConfiguredIcons): void {
  Object.entries(overrides).forEach(([name, value]) => {
    if (process.env.NODE_ENV !== "production" && !(name in ICON_CONFIG)) {
      throw new Error(`${name} is an invalid react-md icon name.`);
    }

    ICON_CONFIG[name as keyof ConfiguredIcons] = value;
  });
}

/**
 * This is mostly an internal helper to get a specific icon by name and allowing
 * a custom prop to override this behavior. The main benefit of this function is
 * that icons can be removed if the override is set to `null`.
 *
 * @since 6.0.0
 */
export function getIcon(
  name: ConfigurableIconName,
  override?: ReactNode
): ReactNode {
  if (typeof override !== "undefined") {
    return override;
  }

  return ICON_CONFIG[name];
}
