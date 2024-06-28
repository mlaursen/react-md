import type { ReactElement, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowDropDownFontIcon,
  ArrowUpwardFontIcon,
  CheckBoxFontIcon,
  CheckFontIcon,
  ConfiguredIcons,
  Configuration,
  ErrorOutlineFontIcon,
  FileUploadFontIcon,
  KeyboardArrowDownFontIcon,
  KeyboardArrowLeftFontIcon,
  KeyboardArrowRightFontIcon,
  Layout as RMDLayout,
  MenuFontIcon,
  NotificationsFontIcon,
  RadioButtonCheckedFontIcon,
  RemoveRedEyeFontIcon as MyTestIcon,
  useLayoutNavigation,
} from "react-md";

import navItems from "./navItems";

const icons: ConfiguredIcons = {
  back: <KeyboardArrowLeftFontIcon />,
  checkbox: <CheckBoxFontIcon />,
  dropdown: <ArrowDropDownFontIcon />,
  error: <ErrorOutlineFontIcon />,
  expander: <KeyboardArrowDownFontIcon />,
  forward: <KeyboardArrowRightFontIcon />,
  menu: <MenuFontIcon />,
  notification: <NotificationsFontIcon />,
  password: <MyTestIcon />,
  radio: <RadioButtonCheckedFontIcon />,
  selected: <CheckFontIcon />,
  sort: <ArrowUpwardFontIcon />,
  upload: <FileUploadFontIcon></FileUploadFontIcon>,
};
