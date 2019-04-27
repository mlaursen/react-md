import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import Analytics from './Analytics';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  componentDidMount() {
    require('smoothscroll-polyfill').polyfill();
  }

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Material+Icons|Roboto:400,500,700"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Analytics />
        </body>
      </html>
    );
  }
}
