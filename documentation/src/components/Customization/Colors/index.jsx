import React from 'react';
import Markdown from 'components/Markdown';
import ColorPalette from './ColorPalette';

import markdown from './README.md';

const Colors = () => (
  <section className="md-grid">
    <Markdown markdown={markdown} className="md-cel md-cell--12 md-text-container" component="div" />
    <ColorPalette />
  </section>
);
export default Colors;
