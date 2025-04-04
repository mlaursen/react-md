import { type Metadata } from "next";
import { type PropsWithChildren, type ReactElement } from "react";

import "./layout.scss";

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
};

export default function MaterialIconsAndSymbolsLayout({
  children,
}: PropsWithChildren): ReactElement {
  return <>{children}</>;
}
