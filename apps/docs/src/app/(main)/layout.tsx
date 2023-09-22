import "./layout.scss";

import { LoadThemeStyles } from "@/components/LoadThemeStyles/LoadThemeStyles.jsx";
import { RootProviders } from "@/components/RootProviders/RootProviders.jsx";
import { semver } from "@/utils/semver.js";
import { cnb } from "cnbuilder";
import { type Metadata } from "next";
import { Roboto_Flex, Source_Code_Pro } from "next/font/google";
import { headers } from "next/headers.js";
import { type PropsWithChildren, type ReactElement } from "react";
import { RootLayout } from "./RootLayout.jsx";
import { getInitialState } from "./utils.js";

export const metadata: Metadata = {
  title: "react-md",
  description: "",
};

const roboto = Roboto_Flex({
  display: "swap",
  variable: "--roboto",
  subsets: ["latin"],
});
const sourceCodePro = Source_Code_Pro({
  display: "swap",
  variable: "--source-code-pro",
  subsets: ["latin"],
  weight: "400",
});

export default async function MainRootLayout(
  props: PropsWithChildren
): Promise<ReactElement> {
  const { children } = props;
  const { version } = await import("@react-md/core/package.json").then(
    (pkg) => pkg.default
  );
  const headersInstance = headers();
  const isMac = !!headersInstance.get("user-agent")?.includes("Mac");
  const {
    defaultPrismTheme,
    defaultCodeLanguage,
    defaultPackageManager,
    prismStyles,
    themeStyles,
  } = await getInitialState();

  return (
    <html
      lang="en"
      dir="ltr"
      className={cnb(
        roboto.variable,
        sourceCodePro.variable,
        themeStyles.container,
        prismStyles.container
      )}
    >
      <body>
        <RootProviders
          defaultPrismTheme={defaultPrismTheme}
          defaultCodeLanguage={defaultCodeLanguage}
          defaultPackageManager={defaultPackageManager}
        >
          <LoadThemeStyles />
          <RootLayout
            isMac={isMac}
            titleProps={{
              ...semver(version),
              version,
            }}
          >
            {children}
          </RootLayout>
        </RootProviders>
      </body>
    </html>
  );
}
