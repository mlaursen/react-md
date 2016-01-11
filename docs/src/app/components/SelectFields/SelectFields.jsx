import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SelectField from 'react-md/SelectFields';

import DocPage from 'react-md-documentation';
import SelectFieldExamples from './SelectFieldExamples';
import SelectFieldExamplesRaw from '!!raw!./SelectFieldExamples';
import './_select-fields.scss';

export default class SelectFields extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: SelectField,
          details: [],
        }]}
        examples={[{
          markdown: SelectFieldExamplesRaw,
          children: <SelectFieldExamples />,
        }]}
        >
        <p>
          This is also called Dropdown buttons in the material design specs.
        </p>
        <p>
          A dropdown button selects between multiple selections. The button
          displays the current state and a down arrow. Available states may
          be shown as a list of strings, a palette, or icons, for example.
        </p>
      </DocPage>
    );
  }
}
