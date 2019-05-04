import './app.css';
import React from 'react';
import NextApp, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import MobileDetect from 'mobile-detect';
import {
  DEFAULT_APP_SIZE,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
} from '@react-md/sizing';
import { parse } from 'url';

import Layout from 'components/Layout';
import smoothScroll from 'utils/smoothScroll';
import { toBreadcrumbPageTitle } from 'utils/toTitle';

export default class App extends NextApp {
  static async getInitialProps({ Component, /* router, */ ctx }) {
    let componentProps = {};
    if (Component.getInitialProps) {
      componentProps = await Component.getInitialProps(ctx);
    }

    let defaultSize;
    if (ctx && ctx.req) {
      const md = new MobileDetect(ctx.req.headers['user-agent']);
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
    } else {
      defaultSize = DEFAULT_APP_SIZE;
    }

    return {
      componentProps,
      defaultSize,
    };
  }

  initialPageScroll = true;

  componentDidMount() {
    this.smoothScroll(window.location.pathname);

    Router.events.on('hashChangeStart', this.beforeChange);
    Router.events.on('hashChangeComplete', this.smoothScroll);
    Router.events.on('routeChangeComplete', this.smoothScroll);
  }

  componentWillUnmount() {
    Router.events.off('hashChangeStart', this.beforeChange);
    Router.events.off('hashChangeComplete', this.smoothScroll);
    Router.events.off('routeChangeComplete', this.smoothScroll);
  }

  beforeChange = () => {
    this.x = window.scrollX;
    this.y = window.scrollY;
  };

  smoothScroll = url => {
    if (this.initialPageScroll) {
      this.initialPageScroll = false;
      return;
    }

    const { hash } = parse(url);
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const element = document.getElementById(hash.substring(1));
    const header = document.getElementById('main-app-bar');
    if (!element || !header) {
      return;
    }

    // this is kind of hacky and I'm not sure how to fix it. When markdown
    // links are clicked, the native scroll behavior is still used for some
    // reason from the next/router and there are no options to disable it. So
    // we have to scroll back to the original position, then scroll to the
    // correct position with the header offset.
    window.scrollTo(this.x, this.y);
    smoothScroll(element.offsetTop - header.offsetHeight);
  };

  getTitle(pageTitle) {
    const i = pageTitle.lastIndexOf('- ');
    return i > -1 ? pageTitle.substring(i + 2) : pageTitle;
  }

  render() {
    const {
      Component,
      componentProps,
      defaultSize,
      router: { pathname },
    } = this.props;
    const { statusCode } = componentProps;
    const pageTitle = toBreadcrumbPageTitle(pathname, statusCode);
    const title = this.getTitle(pageTitle);

    return (
      <Container>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <Layout title={title} defaultSize={defaultSize} pathname={pathname}>
          <Component {...componentProps} />
        </Layout>
      </Container>
    );
  }
}
