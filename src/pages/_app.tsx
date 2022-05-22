import { AppProps } from "next/app";
import { CoreProviders, ThemeProvider } from "@react-md/core";
import { ReactElement } from "react";

import "./app.scss";

export default function App(props: AppProps): ReactElement {
  const { Component, pageProps } = props;

  return (
    <CoreProviders elementInteractionMode="press" colorSchemeMode="light">
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </CoreProviders>
  );
}
