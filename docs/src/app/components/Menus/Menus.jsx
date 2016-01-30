import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Menu from 'react-md/lib/Menus';

import DocPage from 'react-md-documentation';
import MenuExamples from './MenuExamples';
import MenuExamplesRaw from '!!raw!./MenuExamples';
import ControlledMenuExamples from './ControlledMenuExamples';
import ControlledMenuExamplesRaw from '!!raw!./ControlledMenuExamples';
import './_menu.scss';

export default class Menus extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: Menu,
          details: [],
        }]}
        examples={[{
          markdown: MenuExamplesRaw,
          children: <MenuExamples />,
        }, {
          markdown: ControlledMenuExamplesRaw,
          children: <ControlledMenuExamples />,
        }]}
      >
        Menus allow users to take an action by selecting from a
        list of choices revealed upon opening a temporary,
        new sheet of material.
      </DocPage>
    );
  }
}
