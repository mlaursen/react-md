import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { DatePicker } from 'react-md/Pickers';

import DocPage from 'react-md-documentation';
import DatePickerExamples from './DatePickerExamples';
import DatePickerExamplesRaw from '!!raw!./DatePickerExamples';
//import './_picker.scss';

export default class Pickers extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: DatePicker,
          details: [],
        }]}
        examples={[{
          markdown: DatePickerExamplesRaw,
          children: <DatePickerExamples />,
        }]}
        >
        Pickers provide a simple way to select a single value from a pre-determined set.
      </DocPage>
    );
  }
}
