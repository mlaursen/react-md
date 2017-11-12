import React from 'react';
import { Grid, Cell } from 'react-md';
import Markdown from 'components/Markdown';
import ColorPalette from './ColorPalette';

import markdown from './README.md';

const Colors = () => (
  <Grid component="section">
    <Markdown markdown={markdown} className="md-text-container" component={Cell} size={12} />
    <ColorPalette />
  </Grid>
);
export default Colors;
