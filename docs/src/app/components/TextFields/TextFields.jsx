import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TextField from 'react-md/lib/TextFields';

import DocPage from 'react-md-documentation';
import TextFieldExamples from './TextFieldExamples';
import TextFieldExamplesRaw from '!!raw!./TextFieldExamples';
import PhoneContactExample from '../../PhoneContactExample';
import PhoneContactExampleRaw from '!!raw!../../PhoneContactExample/PhoneContactExample';
import './_text-field.scss';

export default class TextFields extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: TextField,
          details: [{
            name: 'label',
            pt: 's',
            desc: `This will be the floating label, placeholder for the single line text field,
            or the label for the multiline text field.`,
          }, {
            name: 'placeholder',
            pt: 's',
            desc: 'An optional placeholder for the text field.',
          }, {
            name: 'floatingLabel',
            pt: 'ba',
            desc: 'Boolean if the label is floating.',
          }, {
            name: 'icon',
            pt: 'no',
            desc: 'An optional icon to display before the text field.',
          }, {
            name: 'lineDirection',
            pt: `one(['left', 'right', 'center'])`,
            desc: 'This is the direction that the underline will expand from when focused.',
          }, {
            name: 'defaultValue',
            pt: 's',
            desc: 'The default value for the text field',
          }, {
            name: 'type',
            pt: 's',
            desc: `This is the text field's type.`,
          }, {
            name: 'required',
            pt: 'ba',
            desc: `A boolean if the text field is required. If the label does not already have
            the required '*' at the end of the string, the '*' is automatically added.`,
          }, {
            name: 'maxLength',
            pt: 'nu',
            desc: `The max length for the text field. If this is given, a letter counter
            will be displayed as well. The field will turn red if the character limit
            is exceeded.`,
          }, {
            name: 'errorText',
            pt: 's',
            desc: `An optional error text to display below the field. This *should* be able
            to wrap multiple lines and will put the field in an error state.`,
          }, {
            name: 'helpText',
            pt: 's',
            desc: 'Any help text to display underneath the field.',
          }, {
            name: 'helpOnFocus',
            pt: 'ba',
            desc: 'Optional boolean if the help text should only display on text field focus.',
          }, {
            name: 'rows',
            pt: 'nu',
            desc: 'The number of rows for a multiline text field. This will convert the field to a textarea.',
          }, {
            name: 'maxRows',
            pt: 'nu',
            desc: `An optional number of max rows for the multiline text field.
            The text field's height will continue to grow until the number of rows equals the
            max rows. Afterwards, the text field scrollbar will appear. A value of '-1' will let the textarea grow infinitely.`,
          }, {
            name: 'any remaining props',
            desc: 'Any of the remaining props will be passed into the input or textarea tag.',
          }],
        }]}
        allRemaining={false}
        examples={[{
          markdown: TextFieldExamplesRaw,
          children: <TextFieldExamples />,
        }, {
          markdown: PhoneContactExampleRaw,
          children: <PhoneContactExample />,
        }]}
        >
        Text fields allow the user to input text, select text, and lookup data via auto-completion.
      </DocPage>
    );
  }
}
