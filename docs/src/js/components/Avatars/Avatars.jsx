import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Avatar } from 'react-md';

import DocPage from '../../Documentation';
import AvatarsExamples from './AvatarsExamples';
import AvatarsExamplesRaw from '!!raw!./AvatarsExamples';
import './_avatars.scss';

export default class Avatars extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: Avatar,
          details: [],
        }]}
        examples={[{
          markdown: AvatarsExamplesRaw,
          children: <AvatarsExamples />,
        }]}
        >
        Avatars can be used to symbolize people or objects.
      </DocPage>
    );
  }
}
