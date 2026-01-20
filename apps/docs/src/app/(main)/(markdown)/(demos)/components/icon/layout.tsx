import type { Metadata } from "next";
import Script from "next/script.js";
import { type PropsWithChildren, type ReactElement } from "react";

export const metadata: Metadata = {
  icons: {
    other: [
      {
        rel: "stylesheet",
        url: "https://fonts.googleapis.com/css2?family=Material+Icons&family=Material+Icons+Outlined&family=Material+Icons+Round&family=Material+Icons+Sharp&family=Material+Icons+Two+Tone&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block",
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
