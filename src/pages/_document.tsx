import { Html, Head, Main, NextScript } from "next/document";
import type { ReactElement } from "react";

const PRISM_MANUAL_MODE =
  "window.Prism=window.Prism||{};window.Prism.manual=true";

export default function Document(): ReactElement {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Source+Code+Pro&display=swap"
        />
      </Head>
      <body>
        <Main />
        <script dangerouslySetInnerHTML={{ __html: PRISM_MANUAL_MODE }} />
        <NextScript />
      </body>
    </Html>
  );
}
