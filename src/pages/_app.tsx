import "./app.scss";

import { CoreProviders, ThemeProvider } from "@react-md/core";
import { IconProvider } from "@react-md/icon";
import type { AppProps } from "next/app";
import type { ReactElement } from "react";

import { Header } from "src/components/Header";
import { LoadThemeStyles } from "src/components/Theme/LoadThemeStyles";
import {
  defaultColorSchemeMode,
  defaultDisableHighContrastMode,
  defaultElementInteractionMode,
} from "src/constants/rmdConfig";
import Navigation from "src/components/Navigation";

export default function App(props: AppProps): ReactElement {
  const { Component, pageProps } = props;

  return (
    <CoreProviders
      colorSchemeMode={defaultColorSchemeMode}
      elementInteractionMode={defaultElementInteractionMode}
      disableHigherContrast={defaultDisableHighContrastMode}
    >
      <ThemeProvider>
        <IconProvider>
          <Header />
          <Navigation />
          <Component {...pageProps} />
          <LoadThemeStyles />
        </IconProvider>
      </ThemeProvider>
    </CoreProviders>
  );
}
