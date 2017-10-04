import React from 'react';
import { Card } from 'react-md';

import EditableDocument from './EditableDocument';

const DocumentContainer = () => (
  <div className="md-background menus__google-docs__document-container">
    <Card className="md-text-container">
      <EditableDocument />
    </Card>
  </div>
);

export default DocumentContainer;
