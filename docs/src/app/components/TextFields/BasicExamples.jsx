import React, { PropTypes } from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import TextField from 'react-md/lib/TextFields';

import Markdown from '../../Markdown';

const labelStylingMultilineMarkdown = `
Text fields are required to have a label by default. This label can either
be displayed as a floating label (moves above the text field when text or focus),
or a placeholder text.

A text field can be converted into a multiline text field by specifying
the the prop \`rows\`. This will be the initial amount of rows to display
for the multiline text field. This will auto expand until it reaches the
\`maxRows\` value. If you set \`maxRows={-1}\`, it will expand indefinitely.

There is also an additional css class you can add to the text field
to increase the font size to a "title". This is configurable and
there is a mixin to generate more of these helpers.
`;

const BasicExamples = ({ marked }) => {
  return (
    <div>
      <Markdown marked={marked} markdown={labelStylingMultilineMarkdown} />
      <h6 className="md-subheading-1">Floating Labels</h6>
      <div>
        <TextField label="Title" />
      </div>
      <div>
        <TextField label="Title" className="md-title-text-field" />
      </div>
      <div>
        <TextField label="Type many letters" rows={2} />
      </div>

      <h6 className="md-subheading-1">Placeholder Labels</h6>
      <div>
        <TextField label="Title" floatingLabel={false} />
      </div>
      <div>
        <TextField label="Title" className="md-title-text-field" floatingLabel={false} />
      </div>
      <div>
        <TextField label="Type many letters" floatingLabel={false} rows={2} maxRows={-1} />
      </div>

      <p>
        Icons can also be placed to the left of a text field which will set focus
        to the text field when clicked as well.
      </p>
      <TextField
        label="Phone"
        floatingLabel={false}
        icon={<FontIcon>phone</FontIcon>}
        type="tel"
      />
      <p>
        When a text field is set to required, the label is automatically
        updated with the '*' icon.
      </p>
      <TextField label="I am required" required />
      <p>Text fields will be inoperable when set to disabled.</p>
      <div>
        <TextField label="I am disabled" disabled />
      </div>
      <div>
        <TextField label="I am a single line disabled" floatingLabel={false} disabled />
      </div>
      <div>
        <TextField
          label="Phone"
          floatingLabel={false}
          icon={<FontIcon>phone</FontIcon>}
          type="tel"
          disabled
        />
      </div>
      <div>
        <TextField label="Try to type many letters" floatingLabel={false} rows={2} maxRows={-1} disabled />
      </div>
    </div>
  );
};

BasicExamples.propTypes = {
  marked: PropTypes.func.isRequired,
};

export default BasicExamples;
