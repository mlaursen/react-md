import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';

import Markdown from '../../Markdown';

const markdown = `
A text field can have additional information displayed below the text field.
This can either be a counter, or info/error text.

The counter is activated by setting the \`maxLength\` property to a number
greater than 0. The help or info text will automatically wrap lines.

When the additional information is added to a text field, the text field's size
is set to an arbitrary \`256px\` wide by default. This is so the text field
doesn't grow randomly depending on the length of the message and will be constant
throughout. This can be updated by changing the \`$md-text-field-info-width\` variable
or manually setting the width yourself.
`;

export default class TextFieldExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <Markdown {...this.props} markdown={markdown} />
        <div>
          <TextField
            label="Title"
            helpText="I am help text that appears only on focus."
            helpOnFocus
            maxLength={20}
          />
        </div>
        <div>
          <TextField
            label="Phone"
            floatingLabel={false}
            icon={<FontIcon>phone</FontIcon>}
            type="tel"
            helpText="Your home phone number"
          />
        </div>
        <div>
          <TextField
            label="Title"
            defaultValue="I am amazing"
            errorText="This is an example of some error message. It should automatically wrap lines as well. It just keeps going and going and going."
          />
        </div>
        <div>
          <TextField label="Position" floatingLabel={false} helpText="I am a single line with help text." />
        </div>
        <div>
          <TextField
            label="Description"
            placeholder="Enter some amazing description"
            rows={2}
            maxRows={4}
            helpText="I am a multiline text field that has 2 rows."
          />
        </div>
        <div>
          <TextField
            label="Description"
            placeholder="What are you thinking about today?"
            rows={2}
            maxRows={-1}
            maxLength={1000}
          />
        </div>
      </div>
    );
  }
}
