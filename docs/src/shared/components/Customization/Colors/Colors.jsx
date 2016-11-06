import React, { PureComponent, PropTypes } from 'react';

import Markdown from 'components/Markdown';
import markdown from './README.md';
import ColorPalette from './ColorPalette';

export default class Colors extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section className="md-grid">
        <Markdown markdown={markdown} className="md-cell md-cell--12 md-text-container" />
        <ColorPalette />
      </section>
    );
  }
}
