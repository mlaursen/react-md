import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import DocPage from '../../DocPage';
import { TextField, FontIcon } from '../../../../src/js';

export default class TextFields extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        imports={['TextField']}
        examples={[
          <TextField label="Title" />,
          <TextField label="Title" helpText="I am help text that appears only on focus." helpOnFocus maxLength={20} />,
          <TextField label="Title" errorText="This is an example of some error message. It should automatically wrap lines as well. It just keeps going and going and going." />,
          <TextField label="Position" floatingLabel={false} helpText="I am a single line with help text." />,
          <TextField label="I am required" required />,
          <TextField label="I am disabled" disabled />,
          <TextField label="I am a single line disabled" floatingLabel={false} disabled />,
          <TextField
            label="Description"
            placeholder="Enter some amazing description"
            rows={2}
            maxRows={4}
            helpText="I am a multiline text field that has 2 rows."
          />,
          <TextField
            label="Phone"
            floatingLabel={false}
            icon={<FontIcon>phone</FontIcon>}
            type="phone"
          />,
        ]}
        components={[{
          component: TextField,
          details: [{
            name: 'label',
            propType: 's',
            desc: `This will be the floating label, placeholder for the single line text field,
            or the label for the multiline text field.`,
          }, {
            name: 'valueLink',
            propType: 'shape({ value: string, requestChange: func })',
            desc: `This is the optional valueLink to use for the text field. If a valueLink
            is not given, the value and onChange will be handled by the component itself.`,
          }, {
            name: 'lineDirection',
            propType: `one(['left', 'right', 'center'])`,
            desc: 'This is the direction that the underline will expand from when focused.',
          }, {
            name: 'type',
            propType: 's',
            desc: `This is the text field's type.`,
          }, {
            name: 'required',
            propType: 'ba',
            desc: `A boolean if the text field is required. If the label does not already have
            the required '*' at the end of the string, the '*' is automatically added.`,
          }, {
            name: 'maxLength',
            propType: 'nu',
            desc: `The max length for the text field. If this is given, a letter counter
            will be displayed as well. The field will turn red if the character limit
            is exceeded.`,
          }, {
            name: 'errorText',
            propType: 's',
            desc: `An optional error text to display below the field. This *should* be able
            to wrap multiple lines and will put the field in an error state.`,
          }, {
            name: 'helpText',
            propType: 's',
            desc: 'Any help text to display underneath the field.',
          }, {
            name: 'helpOnFocus',
            propType: 'ba',
            desc: 'Optional boolean if the help text should only display on text field focus.',
          }, {
            name: 'rows',
            propType: 'nu',
            desc: 'The number of rows for a multiline text field. This will convert the field to a textarea.',
          }, {
            name: 'maxRows',
            propType: 'nu',
            desc: `An optional number of max rows for the multiline text field.
            The text field's height will continue to grow until the number of rows equals the
            max rows. Afterwards, the text field scrollbar will appear.`,
          }, {
            name: 'placeholder',
            propType: 's',
            desc: 'An optional placeholder for the text field.',
          }, {
            name: 'floatingLabel',
            propType: 'ba',
            desc: 'Boolean if the label is floating.',
          }, {
            name: 'icon',
            propType: 'no',
            desc: 'An optional icon to display before the text field.',
          }, {
            name: 'any remaining props',
            desc: 'Any of the remaining props will be passed into the input or textarea tag.',
          }],
        }]}
      />
    );
  }
}
