import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Switch, RadioGroup, Radio, Checkbox } from '../../../../src/js';
import DocPage from '../../DocPage';

export default class SelectionControls extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        imports={['Switch', 'Checkbox', 'RadioGroup', 'Radio']}
        examples={[
          <Checkbox label="Default" />,
          <Checkbox label="Initially checked" isInitiallyChecked={true} />,
          <Checkbox label="Disabled" disabled />,
          <Switch />
        ]}
        components={[{
          component: Switch,
          details: [],
        }]}
        sectionName="SelectionControls"
      />
    );
  }
}
