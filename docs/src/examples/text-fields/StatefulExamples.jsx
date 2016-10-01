import React from 'react';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';


const StatefulExamples = () => (
  <div className="block-text-field-examples">
    <p>Icons can be placed to the left of the text field as well.</p>
    <TextField
      id="iconLeftPhone"
      label="Phone"
      type="tel"
      leftIcon={<FontIcon>phone</FontIcon>}
      size={10}
    />
    <TextField
      id="iconRightPhone"
      placeholder="Phone"
      type="tel"
      rightIcon={<FontIcon>phone</FontIcon>}
      size={10}
    />
    <p>
      When a text field is set to required, the label is automatically
      updated to include the '*' icon for floating labels only.
    </p>
    <TextField id="requiredField" label="I am required" required />
    <TextField
      id="requiredPhone"
      label="Phone *"
      type="tel"
      leftIcon={<FontIcon>phone</FontIcon>}
      size={10}
      required
    />
    <p>And text fields will be un-interactable when disabled.</p>
    <TextField id="disabledText" label="Help, I am disabled" disabled />
    <TextField
      id="disabledPhone"
      label="Phone"
      type="tel"
      leftIcon={<FontIcon>phone</FontIcon>}
      size={10}
      disabled
    />
    <TextField
      id="disabledMultiline"
      label="Try to type many letters"
      placeholder="But you can't.."
      rows={2}
      maxRows={4}
      disabled
    />
  </div>
);

export default StatefulExamples;
