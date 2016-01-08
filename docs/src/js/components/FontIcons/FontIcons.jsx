import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FontIcon from 'react-md/FontIcon';

import DocPage from 'react-md-documentation';
import FontIconExamples from './FontIconExamples';
import FontIconExamplesRaw from '!!raw!./FontIconExamples';

export default class FontIcons extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: FontIcon,
          details: [],
        }]}
        examples={[{
          markdown: FontIconExamplesRaw,
          children: <FontIconExamples />,
        }]}
        >
        <span className="space-after">A helper component for generating a font icon. The default usage is for</span>
        <a href="https://design.google.com/icons/">material icons</a>.
      </DocPage>
    );
  }
}
