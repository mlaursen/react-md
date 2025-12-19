import { type ColorScheme } from "@react-md/core/theme/types";
import { useColorScheme } from "@react-md/core/theme/useColorScheme";
import DarkModeOutlinedIcon from "@react-md/material-icons/DarkModeOutlinedIcon";
import DevicesOutlinedIcon from "@react-md/material-icons/DevicesOutlinedIcon";
import LightModeOutlinedIcon from "@react-md/material-icons/LightModeOutlinedIcon";
import { type ReactElement, type ReactNode } from "react";

import { SegmentedButtonGroup } from "@/components/SegmentedButtonGroup.js";

const modes: readonly ColorScheme[] = ["light", "dark", "system"];

const ICONS: Record<ColorScheme, ReactNode> = {
  light: <LightModeOutlinedIcon />,
  dark: <DarkModeOutlinedIcon />,
  system: <DevicesOutlinedIcon />,
};

export function ConfigureColorScheme(): ReactElement {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <SegmentedButtonGroup
      label="Color Scheme"
      items={modes}
      value={colorScheme}
      setValue={setColorScheme}
      icon={ICONS}
      textTransform="capitalize"
    />
  );
}
