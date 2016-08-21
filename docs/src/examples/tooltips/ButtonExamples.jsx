import React from 'react';

import { IconButton, FloatingButton } from 'react-md/lib/Buttons';

const ButtonExamples = () => (
  <section className="tooltip-button-container">
    <IconButton tooltipLabel="Help! I need somebody">help</IconButton>
    <FloatingButton tooltipLabel="Add some new feature" tooltipPosition="top">add</FloatingButton>
  </section>
);

export default ButtonExamples;
