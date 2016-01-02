import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import code from './code.txt';

import DocPage from './../../DocPage';
import { Sidebar } from '../../../../src/js';

export default class Sidebars extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        imports={['Sidebar']}
        code={code}
        components={[{
          component: Sidebar,
          details: [{
            name: 'overlay',
            propType: 'ba',
            desc: 'Boolean if an overlay should be displayed when the sidebar is open.',
          }, {
            name: 'isOpen',
            propType: 'b',
            desc: 'Boolean if the sidebar is currently open.',
          }, {
            name: 'fixed',
            propType: 'ba',
            desc: 'Boolean if  the sidebar will always be fixed to the side.',
          }, {
            name: 'responsive',
            propType: 'b',
            desc: `Boolean if the sidebar is responsive. If it is responsive,
            media queries will be used to decide when to automatically fix
            the sidebar to the side and display an overlay when open.`,
          }, {
            name: 'items',
            propType: 'arrayOf(shape({ divider?, subheader?, component, primaryText }))',
            desc: 'A list of items to automatically put in a list component.',
          }, {
            name: 'header',
            propType: 'no',
            desc: 'An optional header to put before the generated items list',
          }],
        }]}
      />
    );
  }
}
