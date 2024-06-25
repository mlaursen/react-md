import type { ReactElement, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowDropDownSVGIcon,
  ArrowUpwardSVGIcon,
  CheckBoxSVGIcon,
  CheckSVGIcon,
  ConfiguredIcons,
  Configuration,
  ErrorOutlineSVGIcon,
  FileUploadSVGIcon,
  KeyboardArrowDownSVGIcon,
  KeyboardArrowLeftSVGIcon,
  KeyboardArrowRightFontIcon,
  Layout as RMDLayout,
  MenuSVGIcon,
  NotificationsSVGIcon,
  RadioButtonCheckedSVGIcon,
  RemoveRedEyeSVGIcon as MyTestIcon,
  useLayoutNavigation,
} from "react-md";

import navItems from "./navItems";

const icons: ConfiguredIcons = {
  back: <KeyboardArrowLeftSVGIcon />,
  checkbox: <CheckBoxSVGIcon />,
  dropdown: <ArrowDropDownSVGIcon />,
  error: <ErrorOutlineSVGIcon />,
  expander: <KeyboardArrowDownSVGIcon />,
  forward: <KeyboardArrowRightFontIcon />,
  menu: <MenuSVGIcon />,
  notification: <NotificationsSVGIcon />,
  password: <MyTestIcon />,
  radio: <RadioButtonCheckedSVGIcon />,
  selected: <CheckSVGIcon />,
  sort: <ArrowUpwardSVGIcon />,
  upload: <FileUploadSVGIcon></FileUploadSVGIcon>,
};
