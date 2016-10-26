import React, { PureComponent } from 'react';
import Markdown from './Markdown';
import ColorPalette from './ColorPalette';

import markdown from '../../readmes/Colors.md';
import ColorsRaw from '!!raw!react-md/src/scss/_colors.scss';
import sassdoc from '../../sassdocs/colors.json';
import SassDoc from 'components/SassDoc';

export default class Colors extends PureComponent {
  render() {
    return (
      <div>
        <header className="md-grid">
          <Markdown markdown={markdown} component="article" className="md-text-container" />
        </header>
        <ColorPalette />
        <SassDoc rawFile={ColorsRaw} sassdoc={sassdoc} />
      </div>
    );
  }
}
