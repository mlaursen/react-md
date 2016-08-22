import React, { PureComponent } from 'react';
import Markdown from './Markdown';
import ColorPalette from './ColorPalette';

import markdown from '../../../Colors.md';

export default class Colors extends PureComponent {
  render() {
    return (
      <main className="markdown-page">
        <Markdown markdown={markdown} component="article" className="container text-container" />
        <ColorPalette />
      </main>
    );
  }
}
