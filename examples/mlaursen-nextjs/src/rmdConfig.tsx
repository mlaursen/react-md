"use client";

import { type ReactMDCoreConfiguration } from "@react-md/core/CoreProviders";
import { MaterialSymbol } from "@react-md/core/icon/MaterialSymbol";
import { configureIcons } from "@react-md/core/icon/config";

configureIcons({
  back: <MaterialSymbol name="keyboard_arrow_left" />,
  clear: <MaterialSymbol name="close_small" />,
  close: <MaterialSymbol name="close" />,
  checkbox: <MaterialSymbol name="check_box_outline_blank" />,
  checkboxChecked: <MaterialSymbol name="check_box" />,
  checkboxIndeterminate: <MaterialSymbol name="indeterminate_check_box" />,
  dropdown: <MaterialSymbol name="arrow_drop_down" />,
  error: <MaterialSymbol name="error" />,
  expander: <MaterialSymbol name="keyboard_arrow_down" />,
  forward: <MaterialSymbol name="keyboard_arrow_right" />,
  menu: <MaterialSymbol name="menu" />,
  notification: <MaterialSymbol name="notifications" />,
  password: <MaterialSymbol name="visibility" />,
  radio: <MaterialSymbol name="radio_button_unchecked" />,
  radioChecked: <MaterialSymbol name="radio_button_checked" />,
  remove: <MaterialSymbol name="cancel" />,
  selected: <MaterialSymbol name="check" />,
  sort: <MaterialSymbol name="arrow_upward" />,
  upload: <MaterialSymbol name="upload" />,
});

export const rmdConfig: ReactMDCoreConfiguration = {
  ssr: true,
};
