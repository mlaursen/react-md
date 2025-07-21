import { RootHtml } from "@react-md/core/RootHtml";
import { Roboto_Flex } from "next/font/google";
import { cookies } from "next/headers.js";
import { type ReactElement, type ReactNode } from "react";

import { RootProviders } from "@/components/RootProviders.jsx";
import { COLOR_SCHEME_KEY } from "@/constants.js";

import { CookieColorSchemeProvider } from "./CookieColorSchemeProvider.jsx";
import "./app.scss";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--roboto",
});

export interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({
  children,
}: LayoutProps): Promise<ReactElement> {
  const instance = await cookies();
  const colorScheme = instance.get(COLOR_SCHEME_KEY)?.value;
  const defaultColorScheme =
    colorScheme === "light" ||
    colorScheme === "dark" ||
    colorScheme === "system"
      ? colorScheme
      : "system";

  return (
    <RootHtml className={roboto.variable}>
      <CookieColorSchemeProvider defaultColorScheme={defaultColorScheme}>
        <RootProviders>{children}</RootProviders>
      </CookieColorSchemeProvider>
    </RootHtml>
  );
}
