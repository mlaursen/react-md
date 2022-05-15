import type { ReactElement } from "react";
import { AppBarAction } from "@react-md/app-bar";
import { IconRotator } from "@react-md/icon";
import { Brightness4SVGIcon } from "@react-md/material-icons";
import { MenuItem } from "@react-md/menu";
import { Tooltip, useTooltip } from "@react-md/tooltip";

import useTheme from "components/Theme/useTheme";
import useThemeActions from "components/Theme/useThemeActions";

export interface ToggleThemeProps {
  as: "action" | "menuitem";
}

export default function ToggleTheme({ as }: ToggleThemeProps): ReactElement {
  const { theme } = useTheme();
  const { toggleTheme } = useThemeActions();
  const isLight = theme === "light";

  const { elementProps, tooltipProps } = useTooltip({
    baseId: "toggle-theme",
    onClick: toggleTheme,
  });

  const icon = (
    <IconRotator rotated={!isLight}>
      <Brightness4SVGIcon />
    </IconRotator>
  );

  if (as === "menuitem") {
    return (
      <MenuItem
        id="toggle-theme"
        onClick={toggleTheme}
        leftAddon={icon}
        secondaryText={`Current theme: ${theme}`}
      >
        Toggle Light/Dark Theme
      </MenuItem>
    );
  }

  return (
    <>
      <AppBarAction
        {...elementProps}
        aria-label="Dark Theme"
        aria-pressed={!isLight}
      >
        {icon}
      </AppBarAction>
      <Tooltip {...tooltipProps}>Toggle Light/Dark Theme</Tooltip>
    </>
  );
}
