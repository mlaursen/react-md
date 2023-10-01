import "./layout.scss";

import { LoadThemeStyles } from "@/components/LoadThemeStyles/LoadThemeStyles.jsx";
import { RootLayout } from "@/components/RootLayout/RootLayout.jsx";
import { RootProviders } from "@/providers/RootProviders.jsx";
import { semver } from "@/utils/semver.js";
import { cnb } from "cnbuilder";
import localFont from "next/font/local";
import { headers } from "next/headers.js";
import { type PropsWithChildren, type ReactElement } from "react";
import { getInitialState } from "./utils.js";
export { metadata } from "@/constants/metadata.js";

const roboto = localFont({
  src: "./RobotoFlex.ttf",
  display: "swap",
  variable: "--roboto",
});
const sourceCodePro = localFont({
  src: "./SourceCodePro.ttf",
  display: "swap",
  variable: "--source-code-pro",
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
