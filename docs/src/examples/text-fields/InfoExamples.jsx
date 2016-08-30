import React from 'react';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';

const InfoExamples = () => (
  <div className="block-text-field-examples">
    <TextField
      label="Title"
      maxLength={20}
      helpOnFocus
      helpText="I am help text that appears only on focus"
    />
    <TextField
      label="Phone"
      type="tel"
      helpText="Your home phone number"
      leftIcon={<FontIcon>phone</FontIcon>}
    />
    <TextField
      label="Title"
      defaultValue="I am amazing"
      errorText="This is an example of some error message. It should automatically wrap lines as well. It just keeps going and going and going."
    />
    <TextField
      label="Description"
      placeholder="Whatchu thinkin' bout?"
      multiline
      maxRows={4}
      helpText="I am a multiline text field that has 2 rows."
    />
  </div>
);

export default InfoExamples;
