"use client";

import {
  blue500,
  greenAccent700,
  orangeAccent200,
  orangeAccent400,
  red500,
} from "@react-md/core/colors";
import { ThemeProvider, useTheme } from "@react-md/core/theme/ThemeProvider";
import { type ConfigurableThemeColors } from "@react-md/core/theme/types";
import { useColorScheme } from "@react-md/core/theme/useColorScheme";
import { contrastColor } from "@react-md/core/theme/utils";
import { type ReactElement } from "react";

const darkTheme: Readonly<ConfigurableThemeColors> = {
  primaryColor: blue500,
  onPrimaryColor: contrastColor(blue500),
  secondaryColor: orangeAccent400,
  onSecondaryColor: contrastColor(orangeAccent400),
  warningColor: orangeAccent200,
  onWarningColor: contrastColor(orangeAccent200),
  errorColor: red500,
  onErrorColor: contrastColor(red500),
  successColor: greenAccent700,
  onSuccessColor: contrastColor(greenAccent700),
  backgroundColor: "#121212",
  textPrimaryColor: "#d9d9d9",
  textSecondaryColor: "#b3b3b3",
  textHintColor: "gray", // #808080
  textDisabledColor: "gray", // #808080
};

const lightTheme: Readonly<ConfigurableThemeColors> = {
  ...darkTheme,
  backgroundColor: "#fafafa",
  textPrimaryColor: "#212121",
  textSecondaryColor: "#757575",
  textHintColor: "#a8a8a8",
  textDisabledColor: "9e9e9e",
};

export default function KnownThemeExample(): ReactElement {
  const { currentColor } = useColorScheme();
  return (
    <ThemeProvider theme={currentColor === "light" ? lightTheme : darkTheme}>
      <Content />
    </ThemeProvider>
  );
}

function Content(): ReactElement {
  const theme = useTheme();
  return (
    <>
      <pre>
        <code>{JSON.stringify(theme, null, 2)}</code>
      </pre>
    </>
  );
}
