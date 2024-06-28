import type { ReactElement, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Configuration,
  ConfiguredIcons,
  Layout as RMDLayout,
  MaterialIcon,
  useLayoutNavigation,
} from "react-md";

import navItems from "./navItems";

const icons: ConfiguredIcons = {
  back: <MaterialIcon name="keyboard_arrow_left" />,
  checkbox: <MaterialIcon name="check_box" />,
  dropdown: <MaterialIcon name="arrow_drop_down" />,
  error: <MaterialIcon name="error_outline" />,
  expander: <MaterialIcon name="keyboard_arrow_down" />,
  forward: <MaterialIcon name="keyboard_arrow_right" />,
  menu: <MaterialIcon name="menu" />,
  notification: <MaterialIcon name="notifications" />,
  password: <MaterialIcon name="remove_red_eye" />,
  radio: <MaterialIcon name="radio_button_checked" />,
  selected: <MaterialIcon name="check" />,
  sort: <MaterialIcon name="arrow_upward" />,
  upload: <MaterialIcon name="file_upload" />,
};
