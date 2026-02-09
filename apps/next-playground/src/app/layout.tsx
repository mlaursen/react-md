import { RootHtml } from "@react-md/core/RootHtml";
import { MaterialSymbolsLinks } from "@react-md/core/icon/MaterialSymbolsLinks";
import { type MaterialSymbolName } from "@react-md/core/icon/material";
import { DEFAULT_MATERIAL_SYMBOL_NAMES } from "@react-md/core/icon/symbols";
import { type Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { type ReactElement, type ReactNode } from "react";

import { RootProviders } from "@/components/RootProviders.js";

import "./app.scss";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--roboto",
});

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
  title: "Next Playground - react-md",
};

// TODO: Add this to main docs and maybe some components to automate it. should
// be synced with the LocalStorageColorSchemeProvider
const THEME_SCRIPT = `
(function() {
  const stored = localStorage.getItem('colorScheme');
  const theme = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";

  document.documentElement.classList.add(\`\${theme}-theme\`)
})();
`;

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <RootHtml
      className={roboto.variable}
      suppressHydrationWarning
      beforeBodyChildren={
        <head>
          <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
          <MaterialSymbolsLinks names={names} />
        </head>
      }
    >
      <RootProviders>{children}</RootProviders>
    </RootHtml>
  );
}
// <CookieColorSchemeProvider defaultColorScheme={defaultColorScheme}> </CookieColorSchemeProvider>
