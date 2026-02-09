import { type Metadata } from "next";
import Script from "next/script.js";
import { type PropsWithChildren, type ReactElement } from "react";

import { EVERY_ICON_AND_SYMBOL_GOOGLE_FONT_URL } from "@/constants/googleFontsApi.js";

export const metadata: Metadata = {
  icons: {
    other: [
      {
        rel: "stylesheet",
        url: EVERY_ICON_AND_SYMBOL_GOOGLE_FONT_URL,
      },
    ],
  },
};

export default function IconLayout({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <>
      {children}
      <Script
        src="https://kit.fontawesome.com/14d1c25c0d.js"
        crossOrigin="anonymous"
      />
    </>
  );
}
