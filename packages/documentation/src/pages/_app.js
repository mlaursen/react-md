import './app.scss';
import React, { Fragment } from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import MobileDetect from 'mobile-detect';
import Cookie from 'js-cookie';
import { CrossFade } from '@react-md/transition';
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
import { smoothScroll, getScrollPosition } from 'utils/smoothScroll';
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

  initialPageScroll = true;

  /**
   * This is kind of a hack here as this is used to be able to add the cross fade animation
   * only after the first render. This makes it so that server side rendering and initial
   * page render won't cause the animation, but all other pathname changes will (using `key={pathname}`)
   */
  rendered = false;

  componentDidMount() {
    this.smoothScroll(window.location.href);
    this.rendered = true;

    Router.events.on('hashChangeStart', this.beforeChange);
    Router.events.on('hashChangeComplete', this.smoothScroll);
    Router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('hashChangeStart', this.beforeChange);
    Router.events.off('hashChangeComplete', this.smoothScroll);
    Router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  beforeChange = () => {
    this.x = window.scrollX;
    this.y = window.scrollY;
  };

  handleRouteChange = url => {
    this.smoothScroll(url);
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window.ga === 'function'
    ) {
      window.ga('send', 'pageview', url);
    }
  };

  smoothScroll = url => {
    if (this.initialPageScroll) {
      this.initialPageScroll = false;

      return;
    }

    const position = getScrollPosition(url);
    if (position === 0) {
      window.scrollTo(0, 0);
    } else {
      // this is kind of hacky and I'm not sure how to fix it. When markdown
      // links are clicked, the native scroll behavior is still used for some
      // reason from the next/router and there are no options to disable it. So
      // we have to scroll back to the original position, then scroll to the
      // correct position with the header offset.
      window.scrollTo(this.x, this.y);
      smoothScroll(position);
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
      <Fragment>
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
            <CrossFade appear={this.rendered} key={pathname}>
              <Component {...componentProps} />
            </CrossFade>
          </Layout>
        </Theme>
      </Fragment>
    );
  }
}
