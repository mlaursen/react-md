import CheckCircleOutlinedIcon from "@react-md/material-icons/CheckCircleOutlinedIcon";
import ErrorOutlineOutlinedIcon from "@react-md/material-icons/ErrorOutlineOutlinedIcon";
import InfoOutlinedIcon from "@react-md/material-icons/InfoOutlinedIcon";
import WarningOutlinedIcon from "@react-md/material-icons/WarningOutlinedIcon";
import { type ReactElement } from "react";

export type BlockquoteTheme = "warning" | "info" | "success" | "error";

export interface BlockquoteThemeIconProps {
  theme: BlockquoteTheme;
}

export function BlockquoteThemeIcon(
  props: BlockquoteThemeIconProps
): ReactElement {
  const { theme } = props;

  switch (theme) {
    case "info":
      return <InfoOutlinedIcon />;
    case "warning":
      return <WarningOutlinedIcon />;
    case "success":
      return <CheckCircleOutlinedIcon />;
    case "error":
      return <ErrorOutlineOutlinedIcon />;
  }
}
