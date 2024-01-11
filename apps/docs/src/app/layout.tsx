import "./layout.scss";

import { LoadThemeStyles } from "@/components/LoadThemeStyles/LoadThemeStyles.jsx";
import { RootLayout } from "@/components/RootLayout/RootLayout.jsx";
import { RootProviders } from "@/providers/RootProviders.jsx";
import { PRISM_THEMES_ID, getPrismThemeHref } from "@/utils/prismThemes.js";
import { semver } from "@/utils/semver.js";
import { getInitialState } from "@/utils/serverState.js";
import { cnb } from "cnbuilder";
import localFont from "next/font/local";
import { headers } from "next/headers.js";
import { type PropsWithChildren, type ReactElement } from "react";
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
  const headersInstance = headers();
  const version = process.env.NEXT_PUBLIC_RMD_VERSION;
  const isMac = !!headersInstance.get("user-agent")?.includes("Mac");
  const { themeStyles, ...providerProps } = await getInitialState();
  const { defaultPrismTheme } = providerProps;

  return (
    <html
      lang="en"
      dir="ltr"
      className={cnb(
        roboto.variable,
        sourceCodePro.variable,
        themeStyles.container
      )}
    >
      <head>
        <link
          id={PRISM_THEMES_ID}
          rel="stylesheet"
          href={getPrismThemeHref(defaultPrismTheme)}
        />
      </head>
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
