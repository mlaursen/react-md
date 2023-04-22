import "./app.scss";

// import { MDXProvider } from "@mdx-js/react";
import type { ConfiguredIcons } from "@react-md/core";
import {
  CoreProviders,
  MenuConfigurationProvider,
  ThemeProvider,
} from "@react-md/core";
import ArrowDropDownIcon from "@react-md/material-icons/ArrowDropDownIcon";
import ArrowUpwardIcon from "@react-md/material-icons/ArrowUpwardIcon";
import CheckBoxIcon from "@react-md/material-icons/CheckBoxIcon";
import CheckBoxOutlineBlankIcon from "@react-md/material-icons/CheckBoxOutlineBlankIcon";
import CheckIcon from "@react-md/material-icons/CheckIcon";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import ErrorOutlineIcon from "@react-md/material-icons/ErrorOutlineIcon";
import FileUploadIcon from "@react-md/material-icons/FileUploadIcon";
import IndeterminateCheckBoxIcon from "@react-md/material-icons/IndeterminateCheckBoxIcon";
import KeyboardArrowDownIcon from "@react-md/material-icons/KeyboardArrowDownIcon";
import KeyboardArrowLeftIcon from "@react-md/material-icons/KeyboardArrowLeftIcon";
import KeyboardArrowRightIcon from "@react-md/material-icons/KeyboardArrowRightIcon";
import MenuIcon from "@react-md/material-icons/MenuIcon";
import NotificationsIcon from "@react-md/material-icons/NotificationsIcon";
import RadioButtonCheckedIcon from "@react-md/material-icons/RadioButtonCheckedIcon";
import RadioButtonUncheckedIcon from "@react-md/material-icons/RadioButtonUncheckedIcon";
import RemoveRedEyeIcon from "@react-md/material-icons/RemoveRedEyeIcon";
import { upperFirst } from "lodash";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement } from "react";
import { CodeConfigProvider } from "src/components/Code";
import Layout from "src/components/Layout/Layout";
// import { MDX_COMPONENTS } from "src/components/MDXComponents";
import { LoadThemeStyles } from "src/components/Theme/LoadThemeStyles";
import {
  defaultColorSchemeMode,
  defaultDisableHighContrastMode,
  defaultElementInteractionMode,
} from "src/constants/rmdConfig";

const icons: ConfiguredIcons = {
  back: <KeyboardArrowLeftIcon />,
  close: <CloseIcon />,
  checkbox: <CheckBoxOutlineBlankIcon />,
  checkboxChecked: <CheckBoxIcon />,
  checkboxIndeterminate: <IndeterminateCheckBoxIcon />,
  dropdown: <ArrowDropDownIcon />,
  error: <ErrorOutlineIcon />,
  expander: <KeyboardArrowDownIcon />,
  forward: <KeyboardArrowRightIcon />,
  menu: <MenuIcon />,
  notification: <NotificationsIcon />,
  password: <RemoveRedEyeIcon />,
  radio: <RadioButtonUncheckedIcon />,
  radioChecked: <RadioButtonCheckedIcon />,
  selected: <CheckIcon />,
  sort: <ArrowUpwardIcon />,
  upload: <FileUploadIcon />,
};

const toTitle = (s: string): string => {
  if (/autocomplete/i.test(s)) {
    return "AutoComplete";
  }

  if (/^api$/i.test(s)) {
    return "API";
  }

  if (/sassdoc/i.test(s)) {
    return "SassDoc";
  }

  if (s === "[id]") {
    // TODO: Fix to use query params instead
    return "Layout";
  }

  return s
    .split("-")
    .map((part) => {
      if (/^((v\d+)|(to))$/.test(part)) {
        return part;
      }

      if (/^api$/i.test(part)) {
        return "API";
      }

      if (/^cdn$/i.test(part)) {
        return "CDN";
      }

      return upperFirst(part);
    })
    .join(" ");
};

const toBreadcrumbPageTitle = (
  pathname: string,
  statusCode?: number
): string => {
  let title = "";
  if (statusCode) {
    switch (statusCode) {
      case 404:
        title = "Not Found";
        break;
      default:
        title = "Server error";
    }
  } else if (/v\d+-to-v\d+$/.test(pathname)) {
    const [migration] = pathname.split("/").reverse();
    title = `Migration Guides - ${migration.replace(/-/g, " ")}`;
  } else {
    const parts = pathname.split("/").filter((p) => !!p && !/packages/.test(p));
    title = parts.map((p) => toTitle(p)).join(" - ");
  }

  if (title) {
    return title;
  }

  return "react-md";
};

export default function App(props: AppProps): ReactElement {
  const { Component, pageProps, router } = props;
  const { pathname } = router;
  const title = toBreadcrumbPageTitle(pathname);

  return (
    <CoreProviders
      ssr
      icons={icons}
      colorSchemeMode={defaultColorSchemeMode}
      colorSchemeModeKey="colorScheme"
      disableHigherContrast={defaultDisableHighContrastMode}
      elementInteractionMode={defaultElementInteractionMode}
    >
      <MenuConfigurationProvider renderAsSheet="phone">
        <Head>
          <title>{title}</title>
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider>
          <CodeConfigProvider>
            {/* <MDXProvider components={MDX_COMPONENTS}> */}
            <Layout title={title}>
              <Component {...pageProps} />
              <LoadThemeStyles />
            </Layout>
            {/* </MDXProvider> */}
          </CodeConfigProvider>
        </ThemeProvider>
      </MenuConfigurationProvider>
    </CoreProviders>
  );
}
