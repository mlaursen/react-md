import './app.scss';
import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import MobileDetect from 'mobile-detect';
import Cookie from 'js-cookie';
import {
  DEFAULT_APP_SIZE,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
} from '@react-md/utils';

import Layout from 'components/Layout';
import GoogleFont from 'components/GoogleFont';
import Theme from 'components/Theme';
import { toBreadcrumbPageTitle } from 'utils/toTitle';

export default class App extends NextApp {
  static async getInitialProps({ Component, /* router, */ ctx }) {
    let componentProps = {};
    if (Component.getInitialProps) {
      componentProps = await Component.getInitialProps(ctx);
    }

    let defaultSize;
    let defaultTheme;
    if (ctx && ctx.req) {
      const { req } = ctx;
      const md = new MobileDetect(req.headers['user-agent']);
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
      defaultTheme = req.cookies.theme || 'light';
    } else if (typeof window !== 'undefined') {
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
      defaultTheme = Cookie.get('theme');
    }

    return {
      componentProps,
      defaultSize: defaultSize || DEFAULT_APP_SIZE,
      defaultTheme: defaultTheme || 'light',
    };
  }

  componentDidMount() {
    Router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  handleRouteChange = (url) => {
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window.ga === 'function'
    ) {
      window.ga('send', 'pageview', url);
    }
  };

  getPathname = () => {
    const { pathname, query } = this.props.router;

    return Object.entries(query).reduce(
      (resolved, [key, value]) => resolved.replace(`[${key}]`, value),
      pathname
    );
  };

  render() {
    const { Component, componentProps, defaultSize, defaultTheme } = this.props;
    const { statusCode } = componentProps;
    const pathname = this.getPathname();
    const pageTitle = toBreadcrumbPageTitle(pathname, statusCode);

    return (
      <>
        <GoogleFont font="Roboto:400,500,700" />
        <GoogleFont font="Source Code Pro" />
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <Theme defaultTheme={defaultTheme}>
          <Layout
            defaultSize={defaultSize}
            pathname={pathname}
            title={pageTitle}
          >
            <Component {...componentProps} />
          </Layout>
        </Theme>
      </>
    );
  }
}
