import React from 'react';
import { RaisedButton } from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';

export default function RaisedButtonExamples() {
  return (
    <div>
      <RaisedButton default label="Hello world" />
      <RaisedButton primary label="Spock">
        <FontIcon iconClassName="fa fa-hand-spock-o" />
      </RaisedButton>
      <RaisedButton secondary label="Paper" iconBefore={false}>
        <FontIcon iconClassName="fa fa-hand-paper-o" />
      </RaisedButton>
      <RaisedButton disabled label="But I am Disabled" />
      <RaisedButton disabled label="But I am Disabled">
        <FontIcon>accessible</FontIcon>
      </RaisedButton>
    </div>
  );
}
