import "./layout.scss";

import { LoadThemeStyles } from "@/components/LoadThemeStyles/LoadThemeStyles.jsx";
import { RootLayout } from "@/components/RootLayout/RootLayout.jsx";
import { RootProviders } from "@/providers/RootProviders.jsx";
import { semver } from "@/utils/semver.js";
import { cnb } from "cnbuilder";
import { Roboto_Flex, Source_Code_Pro } from "next/font/google";
import { headers } from "next/headers.js";
import { type PropsWithChildren, type ReactElement } from "react";
import { getInitialState } from "./utils.js";
export { metadata } from "@/constants/metadata.js";

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
  const { prismStyles, themeStyles, ...providerProps } =
    await getInitialState();

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
        <RootProviders {...providerProps}>
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
