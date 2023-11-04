import { type Metadata } from "next";
import { type PropsWithChildren, type ReactElement } from "react";
import "./layout.scss";

export const metadata: Metadata = {
  title: "Material icons and Symbols",
};

export default function MaterialIconsAndSymbolsLayout({
  children,
}: PropsWithChildren): ReactElement {
  return <>{children}</>;
}
