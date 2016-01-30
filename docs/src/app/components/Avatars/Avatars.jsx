import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Avatar from 'react-md/lib/Avatars';

import DocPage from 'react-md-documentation';
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
          details: [{
            name: 'src',
            pt: 's',
            desc: 'The image source for the avatar if you want to use an image.',
          }, {
            name: 'alt',
            pt: 's',
            desc: 'The image alt tag.',
          }, {
            name: 'icon',
            pt: 'no',
            desc: 'The FontIcon you want to use in the avatar.',
          }, {
            name: 'children',
            pt: 's',
            desc: 'The letter you want to use in the avatar.',
          }, {
            name: 'random',
            pt: 'ba',
            desc: `A boolean that enables adding a random material design color from the available
            avatar css color classes.`,
          }, {
            name: 'color',
            pt: 'nu',
            desc: 'The avatar color number. The css includes numbers 0 - 3 by default.',
          }, {
            name: 'maxColor',
            pt: 'nu',
            desc: 'The max color number that can be used when generating a random color for the avatar.',
          }],
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
