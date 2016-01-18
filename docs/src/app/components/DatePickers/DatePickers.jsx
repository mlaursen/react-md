import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DatePicker from 'react-md/DatePickers';

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
        sectionName="Date Pickers"
        components={[{
          componentName: 'Date Picker',
          component: DatePicker,
          details: [{
            name: 'formatDate',
            pt: 'f',
            desc: `A date formatter to use. It defaults to using Intl.DateTimeFormat.
            If it is not in the browser, it will just display everything as \`mm/dd/yyyy\`.
            It is recommended to use the [Intl Polyfill](https://github.com/andyearnshaw/Intl.js/).
            If you do not want to use the polyfill, it expects a \`function(date, options, locales)\`.`,
          }, {
            name: 'onChange',
            pt: 'f',
            desc: `Any function to call when a user hits ok, (or auto ok). You will receive
            the newly formatted date followed by the change event.`,
          }, {
            name: 'defaultValue',
            pt: 's',
            desc: `A default date value to use. This should be a formatted string.`,
          }, {
            name: 'minDate',
            pt: 'Date',
            desc: `An optional min date to use.`,
          }, {
            name: 'maxDate',
            pt: 'Date',
            desc: `An optiona max date to use.`,
          }, {
            name: 'okLabel',
            pt: 's',
            desc: `The label to display for ok in the date picker.`,
          }, {
            name: 'cancelLabel',
            pt: 's',
            desc: `The label to display for cancel in the date picker.`,
          }, {
            name: 'previousIcon',
            pt: 'no',
            desc: `The icon to use for the previous button.`,
            dv: '<FontIcon>chevron_left</FontIcon>',
          }, {
            name: 'nextIcon',
            pt: 'no',
            desc: `The icon to use for the next button.`,
            dv: '<FontIcon>chevron_right</FontIcon>',
          }, {
            name: 'calendarIcon',
            pt: 'no',
            desc: `The icon to use for the calendar.`,
            dv: '<FontIcon>date_range</FontIcon>',
          }, {
            name: 'mode',
            pt: `one('portait', 'landscape')`,
            desc: `The mode of the dialog. If neither one is given, it will go off of
            media queries to figure out if it should be landscape or portrait mode.`,
          }, {
            name: 'initialYearsDisplayed',
            pt: 'nu',
            desc: `The number of years to display in the year picker.`,
          }, {
            name: 'autoOk',
            pt: 'b',
            desc: `Boolean if the dialog should immediately close after a user
            selects a date.`,
          }, {
            name: 'label',
            pt: 's',
            desc: `A label to display in the text field.`,
          }, {
            name: 'floatingLabel',
            pt: 'b',
            desc: `Boolean if the label is floating.`,
          }, {
            name: 'inline',
            pt: 'b',
            desc: `Boolean if the date picker should be inline instead of a dialog.`,
          }],
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
