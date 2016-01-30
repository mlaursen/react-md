import React from 'react';
import { FlatButton } from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';

export default function FlatButtonExamples() {
  return (
    <div>
      <FlatButton default label="Hello world" />
      <FlatButton primary label="Talk Dirty to Me">
        <FontIcon>chat_bubble_outline</FontIcon>
      </FlatButton>
      <FlatButton secondary iconBefore={false} label="Talk Dirty to Me">
        <FontIcon>chat_bubble_outline</FontIcon>
      </FlatButton>
      <FlatButton disabled label="But I am Disabled" />
      <FlatButton secondary disabled label="But I am Disabled">
        <FontIcon>accessible</FontIcon>
      </FlatButton>
    </div>
  );
}
