/* eslint-disable react/no-danger */
import React, { ReactElement } from "react";
import Document, {
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";
import Cookie from "js-cookie";

import Analytics from "components/Analytics";
import { ThemeMode } from "components/Theme";

interface MyDocumentProps {
  theme: ThemeMode;
}

const PRISM_MANUAL_MODE =
  "window.Prism=window.Prism||{};window.Prism.manual=true";

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    let theme = "light";
    if (ctx && ctx.req) {
      ({ theme = "light" } = ctx.req.cookies);
    } else if (typeof window !== "undefined") {
      theme = Cookie.get("theme") || "light";
    }

    return {
      ...initialProps,
      theme: theme === "dark" ? "dark" : "light",
    };
  }

  public render(): ReactElement {
    const { theme } = this.props;
    return (
      <html lang="en" dir="ltr" className={`${theme}-theme`}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: PRISM_MANUAL_MODE }} />
          <NextScript />
          <Analytics />
        </body>
      </html>
    );
  }
}
