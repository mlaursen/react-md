import React from 'react';
import NextApp, { Container } from 'next/app';
import Head from 'next/head';
import MobileDetect from 'mobile-detect';
import { CSSTransition } from 'react-transition-group';

import Layout from '../components/Layout';

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
        <Layout title={title} {...appSize}>
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
