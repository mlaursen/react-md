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
            name: 'defaultValue',
            pt: 's',
            desc: `The default value to use for the date picker. This should be a locale formatted
            date string.`,
          }, {
            name: 'value',
            pt: 's',
            desc: `The value of the date picker. This is used if you want a controlled date picker.`,
          }, {
            name: 'onChange',
            pt: 'f',
            desc: `Function to use when the selected date's value changes.`,
          }, {
            name: 'initialCalendarMode',
            pt: 'one(\'calendar\', \'year\')',
            desc: `Which view of the date picker to display first.`,
          }, {
            name: 'autoOk',
            pt: 'b',
            desc: `Allows the date picker to be closed automatically when a date is selected without
            the need to hit ok.`,
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
            name: 'minDate',
            pt: 'instanceOf(Date)',
            desc: `The min date to use in the calendar.`,
          }, {
            name: 'maxDate',
            pt: 'instanceOf(Date)',
            desc: `The max date to use in the calendar`,
          }, {
            name: 'displayMode',
            pt: 'one(\'landscape\', \'portrait\')',
            desc: `This property allows you to manully force a display mode instead of
            relying on media queries to choose the correct orientation for you.`,
          }, {
            name: 'icon',
            pt: 'no',
            desc: `An icon to display to the left of the date picker. This should most likely
            be a calendar icon or null if you do not want an icon.`,
          }, {
            name: 'previousIcon',
            pt: 'no',
            dv: '<FontIcon>chevron_left</FontIcon>',
            desc: `THe icon to use for the previous month button.`,
          }, {
            name: 'nextIcon',
            pt: 'no',
            dv: '<FontIcon>chevron_right</FontIcon>',
            desc: `The icon to use for the next month button.`,
          }, {
            name: 'initialYearsDisplayed',
            pt: 'nu',
            desc: `The number of years to display by default when switching to the
            year view of the date picker.`,
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
          markdown: DatePickerExamplesRaw,
          children: <DatePickerExamples />,
        }]}
        >
        Pickers provide a simple way to select a single value from a pre-determined set.
      </DocPage>
    );
  }
}
