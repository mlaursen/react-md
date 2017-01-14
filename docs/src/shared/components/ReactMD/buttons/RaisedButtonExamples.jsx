import React from 'react';
import Button from 'react-md/lib/Buttons/Button';

const RaisedButtonExamples = () => (
  <div className="btn-example">
    <p>Raised buttons can be unstyled or styled with the primary/secondary color.</p>
    <Button raised label="Hello, World!" />
    <Button raised primary label="Spock" iconClassName="fa fa-hand-spock-o" />
    <Button raised secondary iconBefore={false} label="Paper" iconClassName="fa fa-hand-paper-o" />

    <p>When a raised button is disabled, any styling will be overridden and they will not be clickable.</p>
    <Button raised disabled label="Disabled Button" />
    <Button raised disabled label="Disabled Button">close</Button>
  </div>
);

export default RaisedButtonExamples;
