import Script from "next/script.js";
import { type PropsWithChildren, type ReactElement } from "react";

import "./layout.scss";

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
