import React from 'react';
import { FontIcon, TextField } from 'react-md';

const CountersAndText = () => (
  <div className="md-grid">
    <h4 className="md-cell md-cell--12">Counters</h4>
    <TextField
      id="floating-label-counter-field"
      label="Type words"
      placeholder="Words words words"
      maxLength={20}
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="multiline-counter-field"
      label="Type many words"
      placeholder="Words words words"
      rows={2}
      maxLength={200}
      className="md-cell md-cell--bottom"
    />
    <h4 className="md-cell md-cell--12">Help Text</h4>
    <TextField
      id="floating-label-help-text-field"
      label="Type words"
      placeholder="Words words words"
      className="md-cell md-cell--top"
      helpText="Look at me. I am always here!"
    />
    <TextField
      id="floating-label-focus-help-text-field"
      label="Type words"
      placeholder="Words words words"
      className="md-cell md-cell--top"
      helpOnFocus
      helpText="I magically appear when the user focuses the text field."
    />
    <TextField
      id="placeholder-help-text-counter-field"
      label="Counter and text"
      placeholder="Words words words"
      className="md-cell md-cell--top"
      maxLength={40}
      helpText="I have help text and a counter. It is quite amazing."
    />
    <h4 className="md-cell md-cell--12">Errors and Error Text</h4>
    <TextField
      id="floating-label-error-text-field"
      label="Constant error"
      placeholder="Words words words"
      className="md-cell md-cell--top"
      error
      errorText="Uh oh! It looks like there is a constant error on this field. It should somehow be fixed."
    />
    <TextField
      id="floating-label-required-error-text-field"
      required
      label="Required field"
      placeholder="Words words words"
      className="md-cell md-cell--top"
      helpText="Try to focus and blur this field without adding any input. Then add some content."
      errorText="This field is required."
    />
    <TextField
      id="floating-label-icon-counter-error-text-field"
      label="Icon and counter"
      placeholder="Words words words"
      className="md-cell md-cell--top"
      leftIcon={<FontIcon>feedback</FontIcon>}
      maxLength={40}
      helpText="The icons also gain the error state."
    />
  </div>
);

export default CountersAndText;
