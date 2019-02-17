import React from 'react';
import NextApp, { Container } from 'next/app';
import Head from 'next/head';
import MobileDetect from 'mobile-detect';
import { CSSTransition } from 'react-transition-group';

import Layout from '../components/Layout';

import './app.scss';

export default class App extends NextApp {
  static async getInitialProps({ Component, /* router, */ ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const md = new MobileDetect(ctx.req.headers['user-agent']);
    const tablet = !!md.tablet();
    const mobile = !tablet && !!md.mobile();
    const desktop = !mobile && !tablet;
    return {
      pageProps,
      appSize: {
        mobile,
        tablet,
        desktop,
      },
    };
  }

  getPageTitle(pathname) {
    const parts = pathname.split('/').filter(p => !!p && !/packages/.test(p));
    parts.unshift('react-md');
    return parts.join(' - ');
  }

  render() {
    const {
      Component,
      appSize,
      pageProps,
      router: { pathname },
    } = this.props;
    const pageTitle = this.getPageTitle(pathname);

    return (
      <Container>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <Layout title={pageTitle} {...appSize}>
          <CSSTransition
            in
            exit={false}
            classNames={{
              enter: 'cross-fade',
              enterActive: 'cross-fade--active',
            }}
            timeout={{ enter: 300 }}
          >
            <Component {...pageProps} />
          </CSSTransition>
        </Layout>
      </Container>
    );
  }
}
