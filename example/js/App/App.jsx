import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Button } from '../../../src/js/index';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <main>
        <Button flat>normal</Button>
        <Button flat disabled>disabled</Button>
        <Button flat primary>primary</Button>
        <Button flat primary disabled>primary disabled</Button>
        <Button flat secondary>secondary</Button>
        <Button flat secondary disabled>secondary disabled</Button>

        <Button raised>raised</Button>
        <Button raised disabled>raised</Button>
        <Button raised primary>raised</Button>
        <Button raised primary disabled>raised</Button>
        <Button raised secondary>raised</Button>
        <Button raised secondary disabled>raised</Button>

        <Button floating icon="home" />
        <Button floating primary icon="grade" />
        <Button floating secondary icon="favorite" />
      </main>
    );
  }
}
