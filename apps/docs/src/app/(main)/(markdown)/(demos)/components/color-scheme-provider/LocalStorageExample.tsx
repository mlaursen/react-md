"use client";

import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { SegmentedButton } from "@react-md/core/segmented-button/SegmentedButton";
import { SegmentedButtonContainer } from "@react-md/core/segmented-button/SegmentedButtonContainer";
import { LocalStorageColorSchemeProvider } from "@react-md/core/theme/LocalStorageColorSchemeProvider";
import { type ColorScheme } from "@react-md/core/theme/types";
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
      defaultColorScheme="system"
    >
      <Content />
    </LocalStorageColorSchemeProvider>
  );
}

const MODES: ColorScheme[] = ["light", "dark", "system"];

function Content(): ReactElement {
  const { currentColor, colorScheme, setColorScheme } = useColorScheme();

  return (
    <Card
      className={cnb(
        colorScheme === "light" && styles.light,
        colorScheme === "dark" && styles.dark,
        colorScheme === "system" && styles.system
      )}
    >
      <Box>
        <Typography>{`The current derived color scheme is "${currentColor}"`}</Typography>
        <Typography>{`The current saved color scheme mode is "${colorScheme}"`}</Typography>
        <SegmentedButtonContainer>
          {MODES.map((mode) => (
            <SegmentedButton
              key={mode}
              selected={mode === colorScheme}
              onClick={() => {
                setColorScheme(mode);
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
