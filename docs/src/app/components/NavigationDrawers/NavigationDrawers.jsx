import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import DocPage from 'react-md-documentation';
import NavigationDrawerExamples from './NavigationDrawerExamples';
import NavigationDrawerExamplesRaw from '!!raw!./NavigationDrawerExamples';
//import './_navigation-drawer.scss';

export default class NavigationDrawers extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        components={[{
          component: NavigationDrawer,
          details: [],
        }]}
        examples={[{
          markdown: NavigationDrawerExamplesRaw,
          children: <NavigationDrawerExamples {...this.props} />,
        }]}
        >
          Woop
      </DocPage>
    );
  }
}
