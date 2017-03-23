import React from 'react';
import Card from 'react-md/lib/Cards/Card';

import EditableDocument from './EditableDocument';

const Playground = () => (
  <div className="md-background google-docs-playground">
    <Card className="md-text-container">
      <EditableDocument />
    </Card>
  </div>
);

export default Playground;
