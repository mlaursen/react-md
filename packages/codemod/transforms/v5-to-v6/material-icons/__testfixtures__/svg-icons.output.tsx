import ArrowDropDownIcon from "@react-md/material-icons/ArrowDropDownIcon";
import ArrowUpwardIcon from "@react-md/material-icons/ArrowUpwardIcon";
import CheckBoxIcon from "@react-md/material-icons/CheckBoxIcon";
import CheckIcon from "@react-md/material-icons/CheckIcon";
import ErrorOutlineIcon from "@react-md/material-icons/ErrorOutlineIcon";
import FileUploadIcon from "@react-md/material-icons/FileUploadIcon";
import KeyboardArrowDownIcon from "@react-md/material-icons/KeyboardArrowDownIcon";
import KeyboardArrowLeftIcon from "@react-md/material-icons/KeyboardArrowLeftIcon";
import KeyboardArrowRightIcon from "@react-md/material-icons/KeyboardArrowRightIcon";
import MenuIcon from "@react-md/material-icons/MenuIcon";
import NotificationsIcon from "@react-md/material-icons/NotificationsIcon";
import RadioButtonCheckedIcon from "@react-md/material-icons/RadioButtonCheckedIcon";
import RemoveRedEyeIcon from "@react-md/material-icons/RemoveRedEyeIcon";
import type { ReactElement, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ConfiguredIcons, Configuration, Layout as RMDLayout, useLayoutNavigation } from "react-md";

import navItems from "./navItems";

const icons: ConfiguredIcons = {
  back: <KeyboardArrowLeftIcon />,
  checkbox: <CheckBoxIcon />,
  dropdown: <ArrowDropDownIcon />,
  error: <ErrorOutlineIcon />,
  expander: <KeyboardArrowDownIcon />,
  forward: <KeyboardArrowRightIcon />,
  menu: <MenuIcon />,
  notification: <NotificationsIcon />,
  password: <RemoveRedEyeIcon />,
  radio: <RadioButtonCheckedIcon />,
  selected: <CheckIcon />,
  sort: <ArrowUpwardIcon />,
  upload: <FileUploadIcon></FileUploadIcon>,
};
