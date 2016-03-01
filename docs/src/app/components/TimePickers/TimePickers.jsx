import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TimePicker from 'react-md/lib/TimePickers';

import DocPage from 'react-md-documentation';
import TimePickerExamples from './TimePickerExamples';
import TimePickerExamplesRaw from '!!raw!./TimePickerExamples';
//import './_time-picker.scss';

export default class TimePickers extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        components={[{
          component: TimePicker,
          details: [{
            name: 'locales',
            pt: 'oneOfType(\'string\', \'arrayOf(string)\')',
            dv: 'navigator.language',
            desc: `The locales to use for the date formatter. Will use the browser's language by default.`,
          }, {
            name: 'DateTimeFormat',
            pt: 'object',
            dv: 'Intl.DateTimeFormat || (locales, format) => date => date',
            desc: `This should be Intl.DateTimeFormat function that takes in locales and a format to
            format the calendar's date. You should probably use the [intl-polyfill](https://github.com/andyearnshaw/Intl.js/)
            to get this support for incompatible browsers.`,
          }, {
            name: 'label',
            pt: 's',
            desc: `The label to display in the text field. This can either be a floating label
            or an inline placeholder.`,
          }, {
            name: 'floatingLabel',
            pt: 'b',
            desc: `Boolean if the label should be floating.`,
          }, {
            name: 'value',
            pt: 'instanceof(Date)',
            desc: `If you want to have a controlled component, you must use a date object
            as the value. The date object will be displayed using the locale's settings.
            The value must be a date because it is effort to convert time to a date and I'm
            lazy.`,
          }, {
            name: 'onChange',
            pt: 'f',
            desc: `Function to use when the user clicks the OK button.`,
          }, {
            name: 'defaultValue',
            pt: 'instanceof(Date)',
            desc: `The defaultValue must be a Date object because it is effort to convert
            time to a date and I'm lazy.`,
          }, {
            name: 'okLabel',
            pt: 's',
            desc: `The label to display to confirm a selected date if \`autoOk\` is not enabled`,
          }, {
            name: 'okPrimary',
            pt: 'b',
            desc: `Boolean if the ok button should be styled with the primary color. If false,
            it will be styled with the secondary color.`,
          }, {
            name: 'cancelLabel',
            pt: 's',
            desc: `The label to display to cancel a selected date.`,
          }, {
            name: 'cancelPrimary',
            pt: 'b',
            desc: `Boolean if the cancel button should be styled with the primary color. If false,
            it will be styled with the secondary color.`,
          }, {
            name: 'displayMode',
            pt: 'one(\'landscape\', \'portrait\')',
            desc: `This property allows you to manully force a display mode instead of
            relying on media queries to choose the correct orientation for you.`,
          }, {
            name: 'initialTimeMode',
            pt: "one('hour', 'minute')",
            desc: `The initial mode to enter the time picker in.`,
          }, {
            name: 'icon',
            pt: 'no',
            dv: '<FontIcon>access_time</FontIcon>',
            desc: `An icon to display to the left of the date picker. This should most likely
            be a calendar icon or null if you do not want an icon.`,
          }, {
            name: 'initiallyOpen',
            pt: 'b',
            desc: `Boolean if the date picker should be opened by default.`,
          }, {
            name: 'inline',
            pt: 'ba',
            desc: `Boolean if the date picker should be displayed inline.`,
          }],
        }]}
        examples={[{
          markdown: TimePickerExamplesRaw,
          children: <TimePickerExamples {...this.props} />,
        }]}
        >
          A time picker adjusts to a user’s preferred time setting, i.e. the 12-hour
          or 24-hour format.
      </DocPage>
    );
  }
}
