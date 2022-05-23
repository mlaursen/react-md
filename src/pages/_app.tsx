import { AppProps } from "next/app";
import { CoreProviders, ThemeProvider } from "@react-md/core";
import { ReactElement } from "react";

import "./app.scss";
import { LoadThemeStyles } from "src/components/Theme/LoadThemeStyles";

export default function App(props: AppProps): ReactElement {
  const { Component, pageProps } = props;

  return (
    <CoreProviders elementInteractionMode="press" colorSchemeMode="dark">
      <ThemeProvider>
        <Component {...pageProps} />
        <LoadThemeStyles />
      </ThemeProvider>
    </CoreProviders>
  );
}
