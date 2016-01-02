import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import code from './code.txt';

import DocPage from '../../DocPage';
import { Toolbar, Paper, IconButton } from '../../../../src/js';

export default class Toolbars extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { type: 0 };
  }

  nextToolbar = () => {
    const { type } = this.state;
    this.setState({ type: type + 1 > 2 ? 0 : type + 1 });
  }

  render() {
    const { type } = this.state;
    return (
      <DocPage
        imports={['Toolbar']}
        code={code}
        examples={[
          <Paper zDepth={1}>
            <Toolbar primary={type === 1} secondary={type === 2}>
              <IconButton onClick={this.nextToolbar}>menu</IconButton>
            </Toolbar>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id vehicula lorem. In sed rhoncus ex. Nunc molestie mauris erat, eget sollicitudin tellus pellentesque a. Vivamus convallis ut risus vel suscipit. Praesent in neque tortor. Duis a imperdiet nunc, et tempor ex. Nam posuere ex quis ex posuere, ac auctor augue tincidunt. Ut id efficitur velit, nec rhoncus nisi. Nullam congue justo sapien, sed finibus lorem malesuada quis. Morbi hendrerit commodo dolor ut luctus. Mauris eu accumsan dui. Maecenas quis mi in urna consequat lobortis. In non ante blandit, gravida ex id, posuere felis. Nam tempor nibh at libero iaculis, eget laoreet risus semper. Nam consectetur vitae purus eu hendrerit. Ut consectetur risus eu finibus fermentum.</p>
          </Paper>,
        ]}
        components={[{
          component: Toolbar,
          details: [{
            name: 'primary',
            propType: 'ba',
            desc: 'Boolean if it is a primary toolbar.',
          }, {
            name: 'secondary',
            propType: 'ba',
            desc: 'Boolean if it is a secondary toolbar.',
          }],
        }]}
      />
    );
  }
}
