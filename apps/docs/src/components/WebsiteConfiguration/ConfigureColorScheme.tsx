import { SegmentedButtonGroup } from "@/components/SegmentedButtonGroup.jsx";
import { useColorScheme, type ColorSchemeMode } from "@react-md/core";
import DarkModeOutlinedIcon from "@react-md/material-icons/DarkModeOutlinedIcon";
import DevicesOutlinedIcon from "@react-md/material-icons/DevicesOutlinedIcon";
import LightModeOutlinedIcon from "@react-md/material-icons/LightModeOutlinedIcon";
import { type ReactElement, type ReactNode } from "react";

const modes: readonly ColorSchemeMode[] = ["light", "dark", "system"];

const ICONS: Record<ColorSchemeMode, ReactNode> = {
  light: <LightModeOutlinedIcon />,
  dark: <DarkModeOutlinedIcon />,
  system: <DevicesOutlinedIcon />,
};

export function ConfigureColorScheme(): ReactElement {
  const { colorSchemeMode, setColorSchemeMode } = useColorScheme();
  return (
    <SegmentedButtonGroup
      label="Color Scheme"
      items={modes}
      value={colorSchemeMode}
      setValue={setColorSchemeMode}
      icon={ICONS}
      textTransform="capitalize"
    />
  );
}
