import "./app.scss";
import type { AppProps } from "next/app";
import { CoreProviders, ThemeProvider } from "@react-md/core";
import type { ReactElement } from "react";
import {
  defaultColorSchemeMode,
  defaultDisableHighContrastMode,
  defaultElementInteractionMode,
} from "src/constants";
import { LoadThemeStyles } from "src/components/Theme/LoadThemeStyles";
import { Header } from "src/components/Header";

export default function App(props: AppProps): ReactElement {
  const { Component, pageProps } = props;

  return (
    <CoreProviders
      colorSchemeMode={defaultColorSchemeMode}
      elementInteractionMode={defaultElementInteractionMode}
      disableHigherContrast={defaultDisableHighContrastMode}
    >
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
        <LoadThemeStyles />
      </ThemeProvider>
    </CoreProviders>
  );
}
