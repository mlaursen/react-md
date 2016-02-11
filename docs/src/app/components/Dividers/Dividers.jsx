import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Divider from 'react-md/lib/Dividers';

import DocPage from 'react-md-documentation';
import DividerExamples from './DividerExamples';
import DividerExamplesRaw from '!!raw!./DividerExamples';
//import './_divider.scss';

export default class Dividers extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        components={[{
          component: Divider,
          details: [],
        }]}
        examples={[{
          markdown: DividerExamplesRaw,
          children: <DividerExamples />,
        }]}
        >
        Dividers group and separate content within lists and page layouts.
        The divider is a thin rule, lightweight yet sufficient to distinguish
        content visually and spatially.
      </DocPage>
    );
  }
}
