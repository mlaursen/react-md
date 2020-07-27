import "./app.scss";
import React, { ReactElement } from "react";
import NextApp, { AppInitialProps, AppContext } from "next/app";
import Head from "next/head";
import Router from "next/router";
import MobileDetect from "mobile-detect";
import Cookie from "js-cookie";
import {
  DEFAULT_APP_SIZE,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  AppSize,
} from "@react-md/utils";

import { GA_CODE } from "constants/github";
import Layout from "components/Layout";
import GoogleFont from "components/GoogleFont";
import Theme, { ThemeMode } from "components/Theme";
import { toBreadcrumbPageTitle } from "utils/toTitle";
import { qsToString } from "utils/routes";

interface NextWebVitalsMetrics {
  id: string;
  label: string;
  name: string;
  startTime: number;
  value: number;
}

export function reportWebVitals(metrics: NextWebVitalsMetrics): void {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug(metrics);
  } else if (typeof window.gtag === "function") {
    const { id, label, value, name } = metrics;
    window.gtag("event", "web_vitals", {
      eventCategory:
        label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
      eventAction: name,
      eventValue: Math.round(name === "CLS" ? value * 1000 : value),
      eventLabel: id,
      nonInteraction: true,
    });
  }
}

interface AppProps extends AppInitialProps {
  pageProps: {
    statusCode?: number;
  };
  defaultSize: AppSize;
  defaultTheme: ThemeMode;
}

export default class App extends NextApp<AppProps> {
  static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<AppProps> {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    let defaultSize;
    let defaultTheme;
    if (ctx && ctx.req) {
      const { req } = ctx;
      const md = new MobileDetect(req.headers["user-agent"] || "");
      const isTablet = !!md.tablet();
      const isPhone = !isTablet && !!md.mobile();
      const isDesktop = !isPhone && !isTablet;
      const isLargeDesktop = isDesktop;
      defaultSize = {
        isPhone,
        isTablet,
        isDesktop,
        isLargeDesktop,
        isLandscape: true,
      };
      defaultTheme = req.cookies.theme || "light";
    } else if (typeof window !== "undefined") {
      const matchesPhone = window.matchMedia(
        `screen and (max-width: ${DEFAULT_PHONE_MAX_WIDTH})`
      ).matches;
      const matchesTablet = window.matchMedia(
        `screen and (min-width: ${DEFAULT_TABLET_MIN_WIDTH}) and (max-width: ${DEFAULT_TABLET_MAX_WIDTH})`
      ).matches;
      const isDesktop = window.matchMedia(
        `screen and (min-width: ${DEFAULT_DESKTOP_MIN_WIDTH})`
      ).matches;
      const isLargeDesktop = window.matchMedia(
        `screen and (min-width: ${DEFAULT_DESKTOP_LARGE_MIN_WIDTH})`
      ).matches;

      const isTablet = !isDesktop && matchesTablet;
      const isPhone = !isTablet && !isDesktop && matchesPhone;
      const isLandscape = window.innerWidth > window.innerHeight;
      defaultSize = {
        isPhone,
        isTablet,
        isDesktop,
        isLargeDesktop,
        isLandscape,
      };
      defaultTheme = Cookie.get("theme");
    }

    return {
      pageProps,
      defaultSize: defaultSize || DEFAULT_APP_SIZE,
      defaultTheme: defaultTheme === "dark" ? "dark" : "light",
    };
  }

  public componentDidMount(): void {
    Router.events.on("routeChangeComplete", this.handleRouteChange);
  }

  public componentWillUnmount(): void {
    Router.events.off("routeChangeComplete", this.handleRouteChange);
  }

  private handleRouteChange = (url: string): void => {
    if (
      process.env.NODE_ENV === "production" &&
      typeof window.gtag === "function"
    ) {
      window.gtag("config", GA_CODE, {
        page_title: toBreadcrumbPageTitle(url),
        page_path: url,
      });
    }
  };

  private getPathname = (): string => {
    const { pathname, query } = this.props.router;

    return Object.entries(query).reduce(
      (resolved, [key, value]) =>
        resolved.replace(`[${key}]`, qsToString(value)),
      pathname
    );
  };

  public render(): ReactElement {
    const { Component, pageProps, defaultSize, defaultTheme } = this.props;
    const { statusCode } = pageProps;
    const pathname = this.getPathname();
    const pageTitle = toBreadcrumbPageTitle(pathname, statusCode);

    return (
      <>
        <GoogleFont font="Roboto:400,500,700" />
        <GoogleFont font="Source Code Pro" />
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <title>{pageTitle}</title>
        </Head>
        <Theme defaultTheme={defaultTheme}>
          <Layout
            defaultSize={defaultSize}
            pathname={pathname}
            title={pageTitle}
          >
            <Component {...pageProps} />
          </Layout>
        </Theme>
      </>
    );
  }
}
