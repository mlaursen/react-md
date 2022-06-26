import { CoreProviders, ThemeProvider } from "@react-md/core";
import type { ConfiguredIcons } from "@react-md/icon";
import { IconProvider } from "@react-md/icon";
import { ErrorOutlineIcon } from "@react-md/material-icons/filled/alert/ErrorOutlineIcon";
import { FileUploadIcon } from "@react-md/material-icons/filled/file/FileUploadIcon";
import { KeyboardArrowLeftIcon } from "@react-md/material-icons/filled/hardware/KeyboardArrowLeftIcon";
import { KeyboardArrowRightIcon } from "@react-md/material-icons/filled/hardware/KeyboardArrowRightIcon";
import { RemoveRedEyeIcon } from "@react-md/material-icons/filled/image/RemoveRedEyeIcon";
import { ArrowDropDownIcon } from "@react-md/material-icons/filled/navigation/ArrowDropDownIcon";
import { ArrowUpwardIcon } from "@react-md/material-icons/filled/navigation/ArrowUpwardIcon";
import { CheckIcon } from "@react-md/material-icons/filled/navigation/CheckIcon";
import { MenuIcon } from "@react-md/material-icons/filled/navigation/MenuIcon";
import { NotificationsIcon } from "@react-md/material-icons/filled/social/NotificationsIcon";
import { CheckBoxIcon } from "@react-md/material-icons/filled/toggle/CheckBoxIcon";
import { RadioButtonCheckedIcon } from "@react-md/material-icons/filled/toggle/RadioButtonCheckedIcon";
import { upperFirst } from "lodash";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement } from "react";
import { Header } from "src/components/Header";
import Navigation from "src/components/Navigation";
import { LoadThemeStyles } from "src/components/Theme/LoadThemeStyles";
import {
  defaultColorSchemeMode,
  defaultDisableHighContrastMode,
  defaultElementInteractionMode,
} from "src/constants/rmdConfig";
import "./app.scss";

const icons: ConfiguredIcons = {
  back: <KeyboardArrowLeftIcon />,
  checkbox: <CheckBoxIcon />,
  dropdown: <ArrowDropDownIcon />,
  error: <ErrorOutlineIcon />,
  expander: <KeyboardArrowLeftIcon />,
  forward: <KeyboardArrowRightIcon />,
  menu: <MenuIcon />,
  notification: <NotificationsIcon />,
  password: <RemoveRedEyeIcon />,
  radio: <RadioButtonCheckedIcon />,
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

  return (
    <CoreProviders
      colorSchemeMode={defaultColorSchemeMode}
      elementInteractionMode={defaultElementInteractionMode}
      disableHigherContrast={defaultDisableHighContrastMode}
    >
      <Head>
        <title>{toBreadcrumbPageTitle(router.pathname)}</title>
      </Head>
      <ThemeProvider>
        <IconProvider {...icons}>
          <Header />
          <Navigation />
          <Component {...pageProps} />
          <LoadThemeStyles />
        </IconProvider>
      </ThemeProvider>
    </CoreProviders>
  );
}
