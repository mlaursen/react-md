import React from 'react';
import Button from 'react-md/lib/Buttons/Button';

const RaisedButtonExamples = () => (
  <div className="btn-example">
    <h5>Theme Examples</h5>
    <Button raised label="Hello, World!" />
    <Button raised primary label="Spock" iconClassName="fa fa-hand-spock-o" />
    <Button raised secondary iconBefore={false} label="Paper" iconClassName="fa fa-hand-paper-o" />
    <h5>Disabled Examples</h5>
    <Button raised disabled label="Disabled Button" />
    <Button raised disabled label="Disabled Button">close</Button>
  </div>
);

export default RaisedButtonExamples;
