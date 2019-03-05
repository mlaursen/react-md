import React from 'react';
import NextApp, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import MobileDetect from 'mobile-detect';
import { CSSTransition } from 'react-transition-group';
import { parse } from 'url';

import Layout from 'components/Layout';
import smoothScroll from 'utils/smoothScroll';

import './app.scss';

const upperFirst = s => s.substring(0, 1).toUpperCase() + s.substring(1);
const toTitle = s =>
  s
    .split('-')
    .map(upperFirst)
    .join(' ');

export default class App extends NextApp {
  static async getInitialProps({ Component, /* router, */ ctx }) {
    let componentProps = {};
    if (Component.getInitialProps) {
      componentProps = await Component.getInitialProps(ctx);
    }

    let tablet;
    let mobile;
    let desktop;
    if (ctx && ctx.req) {
      const md = new MobileDetect(ctx.req.headers['user-agent']);
      tablet = !!md.tablet();
      mobile = !tablet && !!md.mobile();
      desktop = !mobile && !tablet;
    }

    return {
      componentProps,
      appSize: {
        mobile,
        tablet,
        desktop,
      },
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
    Router.events.off('routeChangeComplete', this.smoothScroll);
    Router.events.off('hashChangeComplete', this.smoothScroll);
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

  getPageTitle(pathname, statusCode) {
    let title = '';
    if (statusCode) {
      switch (statusCode) {
        case 404:
          title = 'Not Found';
          break;
        default:
          title = 'Server error';
      }
    } else {
      const parts = pathname.split('/').filter(p => !!p && !/packages/.test(p));
      title = parts.map(toTitle).join(' - ');
    }

    return `react-md${title ? ` - ${title}` : ''}`;
  }

  getTitle(pageTitle) {
    const i = pageTitle.lastIndexOf('- ');
    return i > -1 ? pageTitle.substring(i + 2) : pageTitle;
  }

  render() {
    const {
      Component,
      componentProps,
      appSize,
      router: { pathname },
    } = this.props;
    const { statusCode } = componentProps;
    const pageTitle = this.getPageTitle(pathname, statusCode);
    const title = this.getTitle(pageTitle);

    return (
      <Container>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <Layout title={title} {...appSize} pathname={pathname}>
          <CSSTransition
            in
            exit={false}
            classNames={{
              enter: 'cross-fade',
              enterActive: 'cross-fade--active',
            }}
            timeout={{ enter: 300 }}
          >
            <Component {...componentProps} />
          </CSSTransition>
        </Layout>
      </Container>
    );
  }
}
