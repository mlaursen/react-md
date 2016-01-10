import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Snackbar from 'react-md/Snackbar';

import DocPage from 'react-md-documentation';
import SnackbarExamples from './SnackbarExamples';
import SnackbarExamplesRaw from '!!raw!./SnackbarExamples';

export default class Snackbars extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: Snackbar,
          details: [],
        }]}
        examples={[{
          markdown: SnackbarExamplesRaw,
          children: <SnackbarExamples />,
        }]}
        >
        Snackbars provide lightweight feedback about an operation by showing a brief message at the bottom of the screen. Snackbars can contain an action.
      </DocPage>
    );
  }
}
