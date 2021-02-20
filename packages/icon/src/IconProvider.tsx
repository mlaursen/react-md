import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

import { FontIcon } from "./FontIcon";

export interface ConfigurableIcons {
  /**
   * The general icon for navigating backwards or closing an item to the left.
   */
  back?: ReactNode;

  /**
   * The general icon to use for checkboxes.
   */
  checkbox?: ReactNode;

  /**
   * The general icon to use for dropdown menus or content that expands
   * vertically in a new material instead of inline like the `expander` icon.
   */
  dropdown?: ReactNode;

  /**
   * The general icon to use for downloading content.
   */
  download?: ReactNode;

  /**
   * The general icon to use when there are form errors.
   *
   * @remarks \@since 2.5.0
   */
  error?: ReactNode;

  /**
   * The general icon to use for expanding content vertically.
   */
  expander?: ReactNode;

  /**
   * The general icon for navigating forwards or closing an item to the right.
   * This is also used internally for nested dropdown menus.
   */
  forward?: ReactNode;

  /**
   * The general icon to use for displaying a main navigation menu.
   */
  menu?: ReactNode;

  /**
   * The general icon for displaying notifications. This is used internally in
   * the `BadgedButton` in the `@react-md/badge` package.
   */
  notification?: ReactNode;

  /**
   * The general icon for temporarily displaying a password's field value as
   * plain text.
   */
  password?: ReactNode;

  /**
   * The general icon to use for radio buttons.
   */
  radio?: ReactNode;

  /**
   * The general icon to use for showing that something has been selected that
   * is not a radio or checkbox. This is used internally for the `Chip` in the
   * `@react-md/chip` package.
   */
  selected?: ReactNode;

  /**
   * The general icon for sorting content. This defaults to the sort ascending
   * behavior.
   */
  sort?: ReactNode;
}

export type ConfiguredIcons = Required<ConfigurableIcons>;

const DEFAULT_ICONS: ConfiguredIcons = {
  back: <FontIcon>keyboard_arrow_left</FontIcon>,
  checkbox: <FontIcon>check_box</FontIcon>,
  download: <FontIcon>file_download</FontIcon>,
  dropdown: <FontIcon>arrow_drop_down</FontIcon>,
  error: <FontIcon>error_outline</FontIcon>,
  expander: <FontIcon>keyboard_arrow_down</FontIcon>,
  forward: <FontIcon>keyboard_arrow_right</FontIcon>,
  menu: <FontIcon>menu</FontIcon>,
  notification: <FontIcon>notifications</FontIcon>,
  password: <FontIcon>remove_red_eye</FontIcon>,
  radio: <FontIcon>radio_button_checked</FontIcon>,
  selected: <FontIcon>check</FontIcon>,
  sort: <FontIcon>arrow_upward</FontIcon>,
};

const context = createContext<ConfiguredIcons>(DEFAULT_ICONS);
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
 * The `IconProvider` component is used to override all the default icons within
 * `react-md` with a newly defined set of icons. This is super nice since you
 * won't need to create new component wrappers for all the components within
 * `react-md` if you want to switch to SVG icons instead of the default font
 * icons.
 */
export function IconProvider({
  children,
  back = DEFAULT_ICONS.back,
  checkbox = DEFAULT_ICONS.checkbox,
  download = DEFAULT_ICONS.download,
  dropdown = DEFAULT_ICONS.dropdown,
  expander = DEFAULT_ICONS.expander,
  error = DEFAULT_ICONS.error,
  forward = DEFAULT_ICONS.forward,
  menu = DEFAULT_ICONS.menu,
  notification = DEFAULT_ICONS.notification,
  password = DEFAULT_ICONS.password,
  radio = DEFAULT_ICONS.radio,
  selected = DEFAULT_ICONS.selected,
  sort = DEFAULT_ICONS.sort,
}: IconProviderProps): ReactElement {
  const value = useMemo(
    () => ({
      back,
      checkbox,
      download,
      dropdown,
      error,
      expander,
      forward,
      menu,
      notification,
      password,
      radio,
      selected,
      sort,
    }),
    [
      back,
      checkbox,
      download,
      dropdown,
      error,
      expander,
      forward,
      menu,
      notification,
      password,
      radio,
      selected,
      sort,
    ]
  );

  return <Provider value={value}>{children}</Provider>;
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    IconProvider.propTypes = {
      children: PropTypes.node,
      back: PropTypes.node,
      checkbox: PropTypes.node,
      download: PropTypes.node,
      dropdown: PropTypes.node,
      error: PropTypes.node,
      expander: PropTypes.node,
      forward: PropTypes.node,
      menu: PropTypes.node,
      notification: PropTypes.node,
      password: PropTypes.node,
      radio: PropTypes.node,
      selected: PropTypes.node,
      sort: PropTypes.node,
    };
  } catch (e) {}
}
