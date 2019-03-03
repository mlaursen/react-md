import React, { Component } from 'react';
import Router from 'next/router';
import { Button } from '@react-md/button';

export default class _error extends Component {
  static getInitialProps({ res, err }) {
    const { statusCode } = res || err || { statusCode: null };

    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <Button id="return-home" onClick={() => Router.replace('/')}>
        Return Home
      </Button>
    );
  }
}
