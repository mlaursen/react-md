import React from 'react';
import Button from 'react-md/lib/Buttons/Button';

const FlatButtonExamples = () => (
  <div className="btn-example">
    <h5>Theme Examples</h5>
    <Button flat label="Hello, World!" />
    <Button flat primary label="Chat">chat_bubble_outline</Button>
    <Button flat secondary iconBefore={false} label="Chat">chat_bubble_outline</Button>
    <h5>Disabled Examples</h5>
    <Button flat disabled label="Disabled Button" />
    <Button flat disabled label="Disabled Button">close</Button>
  </div>
);

export default FlatButtonExamples;
