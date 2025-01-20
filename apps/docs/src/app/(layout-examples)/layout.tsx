import { RootHtml } from "@react-md/core/RootHtml";
import { Roboto_Flex } from "next/font/google";
import { type ReactElement, type ReactNode } from "react";

import { GtagAnalytics } from "@/components/GtagAnalytics.jsx";

import { RootProviders } from "./RootProviders.jsx";
import "./layout.scss";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--roboto",
});

export interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout(props: RootLayoutProps): ReactElement {
  const { children } = props;

  return (
    <RootHtml className={roboto.variable} afterBodyChildren={<GtagAnalytics />}>
      <RootProviders>{children}</RootProviders>
    </RootHtml>
  );
}
