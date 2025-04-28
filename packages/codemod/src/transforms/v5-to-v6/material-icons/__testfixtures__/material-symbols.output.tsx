import type { ReactElement, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Configuration,
  ConfiguredIcons,
  Layout as RMDLayout,
  MaterialSymbol,
  useLayoutNavigation,
} from "react-md";

import navItems from "./navItems";

const icons: ConfiguredIcons = {
  back: <MaterialSymbol name="keyboard_arrow_left" />,
  checkbox: <MaterialSymbol name="check_box" />,
  dropdown: <MaterialSymbol name="arrow_drop_down" />,
  error: <MaterialSymbol name="error_outline" />,
  expander: <MaterialSymbol name="keyboard_arrow_down" />,
  forward: <MaterialSymbol name="keyboard_arrow_right" />,
  menu: <MaterialSymbol name="menu" />,
  notification: <MaterialSymbol name="notifications" />,
  password: <MaterialSymbol name="remove_red_eye" />,
  radio: <MaterialSymbol name="radio_button_checked" />,
  selected: <MaterialSymbol name="check" />,
  sort: <MaterialSymbol name="arrow_upward" />,
  upload: <MaterialSymbol name="file_upload" />,
};
