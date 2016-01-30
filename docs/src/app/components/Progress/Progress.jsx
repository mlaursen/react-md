import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { LinearProgress, CircularProgress } from 'react-md/lib/Progress';

import DocPage from 'react-md-documentation';
import ProgressExamples from './ProgressExamples';
import ProgressExamplesRaw from '!!raw!./ProgressExamples';

import './_progress.scss';

export default class Progress extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        sectionName="Progress"
        components={[{
          component: LinearProgress,
          details: [{
            name: 'value',
            pt: 'nu',
            desc: 'An optional current value if the progress bar is determinate.',
          }],
        }, {
          component: CircularProgress,
          allRemaining: false,
          details: [{
            name: 'value',
            pt: 'nu',
            desc: 'An optional current value if the progress bar is determinate.',
          }, {
            name: 'scale',
            pt: 'nu',
            desc: 'An optional scale to give to the circular progress for it\'s size.',
          }, {
            name: 'centered',
            pt: 'b',
            desc: 'An optional boolean if the progress should be centered in the current line.',
          }, {
            name: 'determinateDashoffset',
            pt: 'nu',
            desc: `Since the circular progress is rendered as a svg, I use
            \`strokeDashoffset\` to update the current ciruclar progress. If you
            modify your \`CircularProgress\` styling and it breaks, maybe
            playing with this will help. Who knows.`,
          }],
        }]}
        examples={[{
          markdown: ProgressExamplesRaw,
          children: <ProgressExamples />,
        }]}
        >
        Minimize visual changes that occur while your app loads content by representing each operation
        with a single activity indicator. For example, a refresh operation should display either a
        refresh bar or an activity circle, but not both.
      </DocPage>
    );
  }
}
