import "./layout.scss";

import { LoadThemeStyles } from "@/components/LoadThemeStyles/LoadThemeStyles.jsx";
import { RootProviders } from "@/components/RootProviders.jsx";
import { semver } from "@/utils/semver.js";
import { AppBar, Typography, appBarTitle, box } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { headers } from "next/headers.js";
import { type PropsWithChildren, type ReactElement } from "react";
import { Configuration } from "./Configuration.jsx";
import { GithubLink } from "./GithubLink.jsx";
import { LayoutMain } from "./LayoutMain.jsx";
import { LayoutProvider } from "./LayoutProvider.jsx";
import { NavigationDrawer } from "./NavigationDrawer.jsx";
import { NavigationToggle } from "./NavigationToggle.jsx";
import { Search } from "./Search.jsx";
import { VersionDropdown } from "./VersionDropdown.jsx";
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

export default async function MainRootLayout(
  props: PropsWithChildren
): Promise<ReactElement> {
  const { children } = props;
  const { version } = await import("@react-md/core/package.json").then(
    (pkg) => pkg.default
  );
  const parsedVersion = semver(version);
  const versionProps = {
    ...parsedVersion,
    version,
  };
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
          <LayoutProvider>
            <AppBar position="fixed">
              <NavigationToggle {...versionProps} />
              <div
                style={{ "--rmd-box-gap": 0 }}
                className={appBarTitle({
                  className: box({ disablePadding: true }),
                })}
              >
                <Typography type="headline-6" margin="none">
                  react-md
                </Typography>
                <VersionDropdown isHiddenOnPhone {...versionProps} />
              </div>
              <Search isMac={isMac} />
              <GithubLink />
              <Configuration />
            </AppBar>
            <NavigationDrawer />
            <LayoutMain>{children}</LayoutMain>
          </LayoutProvider>
        </RootProviders>
      </body>
    </html>
  );
}
