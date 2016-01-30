import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'react-md/lib/Papers';

import DocPage from 'react-md-documentation';
import PaperExamples from './PaperExamples';
import PaperExamplesRaw from '!!raw!./PaperExamples';

export default class Papers extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: Paper,
          details: [{
            name: 'zDepth',
            pt: 'nu',
            desc: 'The zDepth of the paper. This should be a number from 0 -5.',
          }],
        }]}
        examples={[{
          markdown: PaperExamplesRaw,
          children: <PaperExamples />,
        }]}
        >
        <p>
          Objects in material design possess similar qualities to objects in
          the physical world. In the physical world, objects can be stacked or
          affixed to one another, but cannot pass through each other. Objects
          cast shadows and reflect light.
        </p>
        <p>
          These qualities form a spatial model that is familiar to users and can
          be applied consistently across apps. Underpinning this spatial model
          are the concepts of elevation and shadow.
        </p>
        <p>
          Paper is used to help with giving the ability to stack pieces on a page.
        </p>
        <a href="https://www.google.com/design/spec/what-is-material/elevation-shadows.html">
          What is material? - Elevation and shadows
        </a>
      </DocPage>
    );
  }
}
