"use client";
import {
  createContext,
  useContext,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import { FontIcon } from "./FontIcon.js";

/**
 * @remarks \@since 5.0.0 The `download` icon has been renamed to `upload`.
 */
export interface ConfigurableIcons {
  /**
   * The icon for navigating backwards or closing an item to the left.
   *
   * @defaultValue `<FontIcon>keyboard_arrow_left</FontIcon>`
   */
  back?: ReactNode;

  /**
   * @defaultValue `<FontIcon>close</FontIcon>`
   *
   * @remarks \@since 6.0.0
   */
  close?: ReactNode;

  /**
   * The icon to use for unchecked checkboxes.
   *
   * @defaultValue `<FontIcon>check_box_outline_blank</FontIcon>`
   * @remarks \@since 6.0.0 This icon now represents the unchecked state for
   * checkboxes.
   */
  checkbox?: ReactNode;

  /**
   * The icon to use for checked checkboxes.
   *
   * @defaultValue `<FontIcon>check_box</FontIcon>`
   * @remarks \@since 6.0.0
   */
  checkboxChecked?: ReactNode;

  /**
   * The icon to use for indeterminate checkboxes.
   *
   * @defaultValue `<FontIcon>indeterminate_check_box</FontIcon>`
   * @remarks \@since 6.0.0
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
   * @remarks \@since 2.5.0
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
   * @remarks \@since 6.0.0 This icon now represents the unchecked state for
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
   * @remarks \@since 5.0.0
   * @defaultValue `<FontIcon>file_upload</FontIcon>`
   */
  upload?: ReactNode;
}

export type ConfiguredIcons = Required<ConfigurableIcons>;

const DEFAULT_ICONS: ConfiguredIcons = {
  back: <FontIcon>keyboard_arrow_left</FontIcon>,
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
  selected: <FontIcon>check</FontIcon>,
  sort: <FontIcon>arrow_upward</FontIcon>,
  upload: <FontIcon>file_upload</FontIcon>,
};

const context = createContext<ConfiguredIcons>(DEFAULT_ICONS);
context.displayName = "Icon";
const { Provider } = context;

/**
 * Gets one of the configured icons from the `IconProvider`. This is probably
 * just for use within `react-md`, but might be helpful outside if you want to
 * reuse the existing icon configuration for other custom components.
 *
 * If te second argument is provided and it is not `undefined`, that value will
 * be used instead of the inherited icon type.
 *
 * @param name - The name of the icon you want to use.
 * @param override - An optional override to use instead of the inherited icon.
 * @returns The overridden icon value or the inherited icon.
 */
export function useIcon(
  name: keyof ConfigurableIcons,
  override?: ReactNode | undefined
): ReactNode {
  const icons = useContext(context);
  if (typeof override !== "undefined") {
    return override;
  }

  return icons[name];
}

export interface IconProviderProps extends ConfigurableIcons {
  /**
   * The children that should inherit the icon provider context. This is
   * required since this component is pretty much worthless to use if you don't
   * inherit the overridden icons.
   */
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * The `IconProvider` component is used to override all the default icons within
 * `react-md` with a newly defined set of icons. This is super nice since you
 * won't need to create new component wrappers for all the components within
 * `react-md` if you want to switch to SVG icons instead of the default font
 * icons.
 */
export function IconProvider(props: IconProviderProps): ReactElement {
  const {
    children,
    back = DEFAULT_ICONS.back,
    close = DEFAULT_ICONS.close,
    checkbox = DEFAULT_ICONS.checkbox,
    checkboxChecked = DEFAULT_ICONS.checkboxChecked,
    checkboxIndeterminate = DEFAULT_ICONS.checkboxIndeterminate,
    dropdown = DEFAULT_ICONS.dropdown,
    expander = DEFAULT_ICONS.expander,
    error = DEFAULT_ICONS.error,
    forward = DEFAULT_ICONS.forward,
    menu = DEFAULT_ICONS.menu,
    notification = DEFAULT_ICONS.notification,
    password = DEFAULT_ICONS.password,
    radio = DEFAULT_ICONS.radio,
    radioChecked = DEFAULT_ICONS.radioChecked,
    selected = DEFAULT_ICONS.selected,
    sort = DEFAULT_ICONS.sort,
    upload = DEFAULT_ICONS.upload,
  } = props;

  const value = useMemo<ConfiguredIcons>(
    () => ({
      back,
      close,
      checkbox,
      checkboxChecked,
      checkboxIndeterminate,
      dropdown,
      error,
      expander,
      forward,
      menu,
      notification,
      password,
      radio,
      radioChecked,
      selected,
      sort,
      upload,
    }),
    [
      back,
      close,
      checkbox,
      checkboxChecked,
      checkboxIndeterminate,
      dropdown,
      error,
      expander,
      forward,
      menu,
      notification,
      password,
      radio,
      radioChecked,
      selected,
      sort,
      upload,
    ]
  );

  return <Provider value={value}>{children}</Provider>;
}
