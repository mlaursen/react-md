import { type ReactMDCoreConfiguration } from "@react-md/core/CoreProviders";
import { configureIcons } from "@react-md/core/icon/iconConfig";
import ArrowDropDownIcon from "@react-md/material-icons/ArrowDropDownIcon";
import ArrowUpwardIcon from "@react-md/material-icons/ArrowUpwardIcon";
import CancelIcon from "@react-md/material-icons/CancelIcon";
import CheckBoxIcon from "@react-md/material-icons/CheckBoxIcon";
import CheckBoxOutlineBlankIcon from "@react-md/material-icons/CheckBoxOutlineBlankIcon";
import CheckIcon from "@react-md/material-icons/CheckIcon";
import ClearIcon from "@react-md/material-icons/ClearIcon";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import ErrorOutlineIcon from "@react-md/material-icons/ErrorOutlineIcon";
import FileUploadIcon from "@react-md/material-icons/FileUploadIcon";
import IndeterminateCheckBoxIcon from "@react-md/material-icons/IndeterminateCheckBoxIcon";
import KeyboardArrowDownIcon from "@react-md/material-icons/KeyboardArrowDownIcon";
import KeyboardArrowLeftIcon from "@react-md/material-icons/KeyboardArrowLeftIcon";
import KeyboardArrowRightIcon from "@react-md/material-icons/KeyboardArrowRightIcon";
import MenuIcon from "@react-md/material-icons/MenuIcon";
import NotificationsIcon from "@react-md/material-icons/NotificationsIcon";
import RadioButtonCheckedIcon from "@react-md/material-icons/RadioButtonCheckedIcon";
import RadioButtonUncheckedIcon from "@react-md/material-icons/RadioButtonUncheckedIcon";
import RemoveRedEyeIcon from "@react-md/material-icons/RemoveRedEyeIcon";

configureIcons({
  back: <KeyboardArrowLeftIcon />,
  clear: <ClearIcon />,
  close: <CloseIcon />,
  checkbox: <CheckBoxOutlineBlankIcon />,
  checkboxChecked: <CheckBoxIcon />,
  checkboxIndeterminate: <IndeterminateCheckBoxIcon />,
  dropdown: <ArrowDropDownIcon />,
  error: <ErrorOutlineIcon />,
  expander: <KeyboardArrowDownIcon />,
  forward: <KeyboardArrowRightIcon />,
  menu: <MenuIcon />,
  notification: <NotificationsIcon />,
  password: <RemoveRedEyeIcon />,
  radio: <RadioButtonUncheckedIcon />,
  radioChecked: <RadioButtonCheckedIcon />,
  remove: <CancelIcon />,
  selected: <CheckIcon />,
  sort: <ArrowUpwardIcon />,
  upload: <FileUploadIcon />,
});

export const rmdConfig: ReactMDCoreConfiguration = {
  ssr: true,
};

export const DISABLE_DEFAULT_SYSTEM_THEME =
  process.env.NODE_ENV !== "production";
