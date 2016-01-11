import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';
import Toolbar from 'react-md/Toolbar';

import DocPage from 'react-md-documentation';
import ToolbarExamples from './ToolbarExamples';
import ToolbarExamplesRaw from '!!raw!./ToolbarExamples';

export default class Toolbars extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: Toolbar,
          details: [{
            name: 'primary',
            pt: 'ba',
            desc: 'Boolean if it is a primary toolbar.',
          }, {
            name: 'secondary',
            pt: 'ba',
            desc: 'Boolean if it is a secondary toolbar.',
          }],
        }]}
        examples={[{
          markdown: ToolbarExamplesRaw,
          children: <ToolbarExamples />,
        }]}
        >
        <a href="https://www.google.com/design/spec/components/toolbars.html#toolbars-usage">
          Material Design Spec - Toolbars
        </a>
        <p>
          I'm not too sure how helpful these actually are. A more useful version
          would probably be the <Link to="/app-bar">App Bar Component</Link> which
          wraps this component with extra functionality.
        </p>
      </DocPage>
    );
  }
}
