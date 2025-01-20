"use client";

import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { SegmentedButton } from "@react-md/core/segmented-button/SegmentedButton";
import { SegmentedButtonContainer } from "@react-md/core/segmented-button/SegmentedButtonContainer";
import { LocalStorageColorSchemeProvider } from "@react-md/core/theme/LocalStorageColorSchemeProvider";
import { type ColorSchemeMode } from "@react-md/core/theme/types";
import { useColorScheme } from "@react-md/core/theme/useColorScheme";
import { Typography } from "@react-md/core/typography/Typography";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

import styles from "./LocalStorageExample.module.scss";

export default function LocalStorageExample(): ReactElement {
  return (
    <LocalStorageColorSchemeProvider
      // disabled so it doesn't override the website's meta tag. It is
      // recommended to keep this enabled since it fixes issues with native
      // elements while switching between color schemes
      disableMetaTag
      defaultColorSchemeMode="system"
    >
      <Content />
    </LocalStorageColorSchemeProvider>
  );
}

const MODES: ColorSchemeMode[] = ["light", "dark", "system"];

function Content(): ReactElement {
  const { colorScheme, colorSchemeMode, setColorSchemeMode } = useColorScheme();

  return (
    <Card
      className={cnb(
        colorSchemeMode === "light" && styles.light,
        colorSchemeMode === "dark" && styles.dark,
        colorSchemeMode === "system" && styles.system
      )}
    >
      <Box>
        <Typography>{`The current derived color scheme is "${colorScheme}"`}</Typography>
        <Typography>{`The current saved color scheme mode is "${colorSchemeMode}"`}</Typography>
        <SegmentedButtonContainer>
          {MODES.map((mode) => (
            <SegmentedButton
              key={mode}
              selected={mode === colorSchemeMode}
              onClick={() => {
                setColorSchemeMode(mode);
              }}
            >
              {mode}
            </SegmentedButton>
          ))}
        </SegmentedButtonContainer>
      </Box>
    </Card>
  );
}
