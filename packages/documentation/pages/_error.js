import React, { Component } from 'react';
import Router from 'next/router';
import { Button } from '@react-md/button';

import NotFoundPage from 'components/NotFoundPage';

export default class ErrorPage extends Component {
  static getInitialProps({ res, err }) {
    const { statusCode } = res || err || { statusCode: null };

    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    if (statusCode === 404) {
      return <NotFoundPage />;
    }

    return (
      <Button id="return-home" onClick={() => Router.replace('/')}>
        Return Home
      </Button>
    );
  }
}
