import { RootHtml } from "@react-md/core/RootHtml";
import { Roboto_Flex } from "next/font/google";
import { type ReactElement, type ReactNode } from "react";

import { RootLayout } from "@/components/RootLayout.jsx";
import { RootProviders } from "@/components/RootProviders.jsx";

import "./app.scss";

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
