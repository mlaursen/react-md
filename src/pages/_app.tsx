import type { AppProps } from "next/app";
import { CoreProviders, ThemeProvider } from "@react-md/core";
import type { ReactElement } from "react";
import {
  defaultColorSchemeMode,
  defaultElementInteractionMode,
} from "src/constants";
import { LoadThemeStyles } from "src/components/Theme/LoadThemeStyles";

import "./app.scss";

export default function App(props: AppProps): ReactElement {
  const { Component, pageProps } = props;

  return (
    <CoreProviders
      colorSchemeMode={defaultColorSchemeMode}
      elementInteractionMode={defaultElementInteractionMode}
    >
      <ThemeProvider>
        <Component {...pageProps} />
        <LoadThemeStyles />
      </ThemeProvider>
    </CoreProviders>
  );
}
