import React from 'react';
import Button from 'react-md/lib/Buttons/Button';

const ButtonExamples = () => (
  <section className="buttons__group">
    <Button icon tooltipLabel="I am a tooltip!">help</Button>
    <Button floating tooltipLabel="I am another tooltip!" tooltipPosition="top">add</Button>
  </section>
);
export default ButtonExamples;
