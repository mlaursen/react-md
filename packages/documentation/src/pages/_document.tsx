/* eslint-disable react/no-danger */
import React, { ReactElement } from "react";
import Document, {
  Html,
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
      <Html lang="en" dir="ltr" className={`${theme}-theme`}>
        <Head />
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: PRISM_MANUAL_MODE }} />
          <NextScript />
          <Analytics />
        </body>
      </Html>
    );
  }
}
