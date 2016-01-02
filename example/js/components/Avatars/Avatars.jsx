import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import code from './code.txt';

import { Avatar, FontIcon } from '../../../../src/js';

import DocPage from '../../DocPage';

export default class Avatars extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        imports={['Avatar']}
        code={code}
        examples={[
          <div>
            <Avatar src="http://lorempixel.com/120/120/people" alt="some image" />
            Avatar with an image.
          </div>,
          <div>
            <Avatar icon={<FontIcon iconClassName="fa fa-hand-spock-o" />} />
            Avatar with a Font Awesome icon.
          </div>,
          <div>
            <Avatar icon={<FontIcon iconClassName="fa fa-rocket" />} random />
            Avatar with a Font Awesome icon and a random color.
          </div>,
          <div>
            <Avatar>M</Avatar>
            Avatar with a Letter and default color.
          </div>,
          <div>
            <Avatar random>O</Avatar>
            Avatar with a Letter and a random color.
          </div>,
          <div>
            <Avatar color={2}>X</Avatar>
            Avatar with a letter and avatar color 2.
          </div>,
        ]}
        components={[{
          component: Avatar,
          details: [{
            name: 'src',
            propType: 's',
            desc: 'The image source for the avatar if you want to use an image.',
          }, {
            name: 'alt',
            propType: 's',
            desc: 'The image alt tag.',
          }, {
            name: 'icon',
            propType: 'no',
            desc: 'The FontIcon you want to use in the avatar.',
          }, {
            name: 'children',
            propType: 's',
            desc: 'The letter you want to use in the avatar.',
          }, {
            name: 'random',
            propType: 'ba',
            desc: `A boolean that enables adding a random material design color from the available
            avatar css color classes.`,
          }, {
            name: 'color',
            propType: 'nu',
            desc: 'The avatar color number. The css includes numbers 0 - 3 by default.',
          }, {
            name: 'maxColor',
            propType: 'nu',
            desc: 'The max color number that can be used when generating a random color for the avatar.',
          }],
        }]}
      />
    );
  }
}

