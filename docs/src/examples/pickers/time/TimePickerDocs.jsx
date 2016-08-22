import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import DocPage from 'react-doc-page';
import TimePickerExamples from './TimePickerExamples';
import TimePickerExamplesRaw from '!!raw!./TimePickerExamples';
import TimePicker from './TimePickerDocgen.json';
TimePicker[0].props.DateTimeFormat.defaultValue = {
  computed: false,
  value: `Intl.DateTimeFormat || (locales, options) => { format: date => date }`,
};

const text = `
Pickers provide a simple way to select a single value from a pre-determined set.
Time pickers should be formatted to the user's locale.
`;

export default class TimePickerDocs extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        text={text}
        sectionName="Time Pickers"
        examples={[{
          code: TimePickerExamplesRaw,
          children: <TimePickerExamples />,
        }]}
        docgens={TimePicker}
      />
    );
  }
}
