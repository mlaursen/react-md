import { getMaterialSymbolsUrl } from "@react-md/core/icon/getMaterialSymbolsUrl";
import { type MaterialSymbolName } from "@react-md/core/icon/material";
import { DEFAULT_MATERIAL_SYMBOL_NAMES } from "@react-md/core/icon/symbols";
import { RootHtml } from "@react-md/core/RootHtml";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";

import "./layout.scss";
import "./symbols.scss";
import { type ReactElement, type ReactNode } from "react";

import { RootLayout } from "@/components/RootLayout";
import { RootProviders } from "@/components/RootProviders";

const names = [
  ...DEFAULT_MATERIAL_SYMBOL_NAMES,
  "more_vert",
  "light_mode",
  "dark_mode",
  "devices",
  "code_off",
  "deployed_code",
  "code_blocks",
  "markdown",
  "content_copy",

  "format_letter_spacing",

  "refresh",
] satisfies readonly MaterialSymbolName[];

export const metadata: Metadata = {
  title: "react-md - Next.js Example",
  icons: {
    other: [
      {
        rel: "stylesheet",
        url: getMaterialSymbolsUrl({ names }),
      },
    ],
  },
};

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--roboto",
});

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <RootHtml className={roboto.variable}>
      <RootProviders>
        <RootLayout>{children}</RootLayout>
      </RootProviders>
    </RootHtml>
  );
}
