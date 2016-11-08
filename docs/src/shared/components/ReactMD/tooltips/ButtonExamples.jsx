import React from 'react';

import Button from 'react-md/lib/Buttons';

const ButtonExamples = () => (
  <section className="tooltip-button-container">
    <Button icon tooltipLabel="Help! I need somebody">help</Button>
    <Button floating tooltipLabel="Add some new feature" tooltipPosition="top">add</Button>
  </section>
);

export default ButtonExamples;
