import React, { PureComponent } from 'react';
import Markdown from './Markdown';
import ColorPalette from './ColorPalette';

import markdown from '../../readmes/Colors.md';

export default class Colors extends PureComponent {
  render() {
    return (
      <main className="md-grid">
        <div className="md-cell md-cell--12">
          <Markdown markdown={markdown} component="article" className="md-text-container" />
        </div>
        <ColorPalette />
      </main>
    );
  }
}
