import { type Metadata } from "next";
import { type PropsWithChildren, type ReactElement } from "react";

const title = "Material icons and Symbols - react-md";
const description =
  "This page is used to help find icons available in react-md using Material Symbols or Material Icons svg components. Icons can be filtered by type, group, or name.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    other: [
      {
        rel: "stylesheet",
        url: "https://fonts.googleapis.com/css2?family=Material+Icons&family=Material+Icons+Outlined&family=Material+Icons+Round&family=Material+Icons+Sharp&family=Material+Icons+Two+Tone&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
      },
    ],
  },
};

export default function MaterialIconsAndSymbolsLayout({
  children,
}: PropsWithChildren): ReactElement {
  return <>{children}</>;
}
