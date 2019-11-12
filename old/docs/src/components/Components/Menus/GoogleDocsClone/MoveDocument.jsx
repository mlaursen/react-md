import React from 'react';
import { Button } from 'react-md';

const MoveDocument = () => (
  <Button
    icon
    tooltipLabel="Move to..."
    tooltipDelay={300}
    className="md-btn--toolbar"
  >
    folder
  </Button>
);
export default MoveDocument;
