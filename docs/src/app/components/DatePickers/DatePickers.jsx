import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DatePicker from 'react-md/lib/DatePickers';

import DocPage from 'react-md-documentation';
import DatePickerExamples from './DatePickerExamples';
import DatePickerExamplesRaw from '!!raw!./DatePickerExamples';
//import './_picker.scss';

export default class DatePickers extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        sectionName="Date Pickers"
        components={[{
          componentName: 'Date Picker',
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
