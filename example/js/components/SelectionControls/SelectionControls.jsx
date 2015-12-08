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
          <div>
            <Checkbox label="Default" />
            <Checkbox label="Initially checked" isInitiallyChecked={true} />
            <Checkbox label="Disabled" disabled />
          </div>,
          <div>
            <Switch label="Some switch" />
            <Switch label="Initially checked" isInitiallyChecked={true} />
            <Switch label="Disabled" disabled />
          </div>,
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
