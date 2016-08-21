import React from 'react';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';

const InfoExamples = () => (
  <div>
    <div>
      <TextField
        label="Title"
        maxLength={20}
        helpOnFocus
        helpText="I am help text that appears only on focus"
      />
    </div>
    <div>
      <TextField
        label="Phone"
        type="tel"
        helpText="Your home phone number"
        icon={<FontIcon>phone</FontIcon>}
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
      <TextField
        label="Description"
        placeholder="Whatchu thinkin' bout?"
        rows={2}
        maxRows={4}
        helpText="I am a multiline text field that has 2 rows."
      />
    </div>
  </div>
);

export default InfoExamples;
