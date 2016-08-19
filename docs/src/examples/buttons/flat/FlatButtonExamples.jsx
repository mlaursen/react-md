import React from 'react';
import { FlatButton } from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';

const FlatButtonExamples = () => (
  <div>
    <p>Flat buttons can be unstyled or styled with the primary/secondary color.</p>
    <FlatButton label="Hello, World!" data-ink-target="true" />
    <FlatButton primary label="Talk Dirty to Me">
      <FontIcon>chat_bubble_outline</FontIcon>
    </FlatButton>
    <FlatButton secondary iconBefore={false} label="Talk Dirty to Me">
      <FontIcon>chat_bubble_outline</FontIcon>
    </FlatButton>

    <p>When a flat button is disabled, any styling will be overridden and they will not be clickable.</p>
    <FlatButton disabled label="But I am Disabled" />
    <FlatButton disabled label="But I am Disabled">
      <FontIcon>accessible</FontIcon>
    </FlatButton>
  </div>
);

export default FlatButtonExamples;
