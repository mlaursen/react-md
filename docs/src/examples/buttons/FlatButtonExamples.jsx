import React from 'react';
import Button from 'react-md/lib/Buttons';
import TextField from 'react-md/lib/TextFields';

const FlatButtonExamples = () => (
  <div className="btn-example">
    <p>Flat buttons can be unstyled or styled with the primary/secondary color.</p>
    <Button flat label="Hello, World!" />
    <Button flat primary label="Talk Dirty to Me">chat_bubble_outline</Button>
    <Button flat secondary iconBefore={false} label="Talk Dirty to Me">chat_bubble_outline</Button>

    <p>When a flat button is disabled, any styling will be overridden and they will not be clickable.</p>
    <Button flat disabled label="But I am Disabled" />
    <Button flat disabled label="But I am Disabled">accessible</Button>
    <form className="md-form" onSubmit={e => { e.preventDefault(); }}>
      <TextField
        id="test"
        label="Test Thing"
      />
      <Button flat type="submit" label="Submit" onClick={() => { console.log('Submitted.'); }} />
    </form>
  </div>
);

export default FlatButtonExamples;
