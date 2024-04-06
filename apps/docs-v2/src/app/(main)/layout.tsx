import { MainLayout } from "@/components/MainLayout/MainLayout.jsx";
import { RootProviders } from "@/components/RootProviders.jsx";
import { PRISM_THEMES_ID, getPrismThemeHref } from "@/utils/prismThemes.js";
import { getAppCookies } from "@/utils/serverState.js";
import { RootHtml } from "@react-md/core/RootHtml";
import { cnb } from "cnbuilder";
import { Roboto_Flex, Source_Code_Pro } from "next/font/google";
import { type ReactElement, type ReactNode } from "react";
import "./layout.scss";
export { metadata } from "@/constants/metadata.js";

// import localFont from "next/font/local";
// const roboto = localFont({
//   src: "./RobotoFlex.ttf",
//   display: "swap",
//   variable: "--roboto",
// });
// const sourceCodePro = localFont({
//   src: "./SourceCodePro.ttf",
//   display: "swap",
//   variable: "--source-code-pro",
// });

const roboto = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--roboto",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--source-code-pro",
});

export interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout(props: RootLayoutProps): ReactElement {
  const { children } = props;

  return (
    <RootHtml
      className={cnb(roboto.variable, sourceCodePro.variable)}
      beforeBodyChildren={
        <head>
          <link
            id={PRISM_THEMES_ID}
            rel="stylesheet"
            href={getPrismThemeHref("vim-solarized-dark")}
          />
        </head>
      }
    >
      <RootProviders {...getAppCookies()}>
        <MainLayout>{children}</MainLayout>
      </RootProviders>
    </RootHtml>
  );
}
